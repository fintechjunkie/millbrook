#!/usr/bin/env node
/**
 * Character coverage audit.
 *
 * Roster section 8 states the intent plainly: "eight new named characters arrive
 * across these four volumes and each one needs at least one image in which a
 * reader can learn their face." Nothing was checking that. This does.
 *
 * Reports, per character: which spreads carry them in an image, which volumes
 * their PROSE appears in, and therefore where a reader meets them in words
 * before ever seeing them. A character introduced in Volume 1 prose whose first
 * image is in Volume 3 is a gap, not a choice.
 *
 * Also reports the per-image named-figure count against the hard ceiling of two,
 * and flags images with a free slot, since adding a second named figure to an
 * existing frame introduces a character without adding a spread, an image, or
 * disturbing the shot mix.
 *
 *   node scripts/audit-coverage.mjs
 */

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PN = join(ROOT, 'patch-notes');

const roster = JSON.parse(readFileSync(join(PN, 'roster.json'), 'utf8'));
const vols = [1, 2, 3, 4].map((n) =>
  JSON.parse(readFileSync(join(PN, 'volumes', `vol${n}.json`), 'utf8')));

const tokens = Object.keys(roster.characters);

// Prose mentions. Matched on the display name so "Milo came in through the back
// door" counts. Deliberately generous: a false positive here understates the
// problem, and understating is the failure mode that matters.
const PROSE_NAMES = {
  LENA: ['Lena'], MILO: ['Milo'], VEX: ['Vex'], PIP: ['Pip'], OWEN: ['Owen'],
  FELIX: ['Felix'], MONKE: ['Monke'], AUNT_CAROL: ['Aunt Carol'],
  MAYOR_DALTON: ['Mayor Dalton', 'the Mayor', 'Dalton'],
  ADMIRAL_CRANE: ['Crane', 'Admiral'], CASSIE: ['Cassie'],
  MR_HENDERSON: ['Mr. Henderson', 'Henderson'],
  GREEN_CARDIGAN_WOMAN: ['green cardigan', 'woman behind the counter'],
};

const imagesFor = {};
const proseFor = {};
const perImage = [];

for (const v of vols) {
  for (const s of v.spreads) {
    const chars = tokens.filter((t) => s.image.prompt.includes(`{{CHAR:${t}}}`));
    perImage.push({
      vol: v.volume, slug: s.image.slug, shot: s.image.shotType,
      chars, free: 2 - chars.length,
    });
    for (const c of chars) (imagesFor[c] ||= []).push(s.image.slug);

    const text = (s.blocks || []).map((b) => b.v).join(' ');
    for (const [tok, names] of Object.entries(PROSE_NAMES)) {
      if (names.some((n) => text.includes(n))) {
        (proseFor[tok] ||= new Set()).add(v.volume);
      }
    }
  }
}

const firstImageVol = (t) => {
  const first = (imagesFor[t] || [])[0];
  return first ? Number(first.match(/^vol(\d)/)[1]) : null;
};

console.log('\nCHARACTER COVERAGE\n');
const rows = tokens.map((t) => {
  const imgs = imagesFor[t] || [];
  const prose = [...(proseFor[t] || [])].sort();
  const firstProse = prose[0] ?? null;
  const firstImg = firstImageVol(t);
  let verdict = 'ok';
  if (!imgs.length) verdict = 'NO IMAGE ANYWHERE';
  else if (firstProse && firstImg && firstImg > firstProse) verdict = `late by ${firstImg - firstProse} vol`;
  return {
    character: t, images: imgs.length, imageSlugs: imgs.join(' ') || '-',
    proseInVols: prose.join(',') || '-', firstProse, firstImage: firstImg, verdict,
  };
});
console.table(rows.map((r) => ({
  character: r.character, images: r.images, prose: r.proseInVols,
  'first prose': r.firstProse, 'first image': r.firstImage, verdict: r.verdict,
})));

const noImage = rows.filter((r) => r.images === 0);
const late = rows.filter((r) => r.verdict.startsWith('late'));

console.log(`\n${noImage.length} character(s) with no image at all:`);
for (const r of noImage) console.log(`  ${r.character}  prose in volumes ${r.proseInVols}`);
console.log(`\n${late.length} character(s) whose first image trails their first prose:`);
for (const r of late) console.log(`  ${r.character}  prose vol ${r.firstProse}, image vol ${r.firstImage}`);

console.log('\n\nPER-VOLUME: who a reader can see, and who they only read about\n');
for (const v of vols) {
  const inVolImages = new Set();
  for (const s of v.spreads) {
    for (const t of tokens) if (s.image.prompt.includes(`{{CHAR:${t}}}`)) inVolImages.add(t);
  }
  const inVolProse = tokens.filter((t) => (proseFor[t] || new Set()).has(v.volume));
  const unseen = inVolProse.filter((t) => !inVolImages.has(t));
  console.log(`vol${v.volume}  ${v.chapter}`);
  console.log(`  seen  (${inVolImages.size}): ${[...inVolImages].join(', ') || '-'}`);
  console.log(`  UNSEEN in this volume (${unseen.length}): ${unseen.join(', ') || '-'}`);
  console.log('');
}

console.log('IMAGES WITH A FREE NAMED-FIGURE SLOT');
console.log('(ceiling is two; adding a second figure needs no new spread)\n');
const withRoom = perImage.filter((p) => p.chars.length === 1);
console.table(withRoom.map((p) => ({
  slug: p.slug, shot: p.shot, has: p.chars.join(','), freeSlots: p.free,
})));
const empty = perImage.filter((p) => p.chars.length === 0);
console.log(`\n${empty.length} images carry no named figure at all:`);
console.log(`  ${empty.map((p) => p.slug).join(', ')}`);
console.log(`\n${perImage.filter((p) => p.chars.length === 2).length} images are already at the ceiling of two.\n`);
