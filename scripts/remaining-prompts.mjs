#!/usr/bin/env node
/**
 * The prompts still outstanding for a volume, and nothing else.
 *
 *   node scripts/remaining-prompts.mjs u1
 *
 * "Outstanding" is decided by what is on disk: a plate whose public/images/<slug>.png does not
 * exist has not been delivered. That is the same test the reader uses, so the sheet cannot
 * disagree with the book.
 *
 * A plate is flagged as a RE-CUT if a parked attempt exists under
 * patch-notes/incoming/attempt1/<slug>-attempt1.png, so the author can see at a glance which
 * of these have been tried once and which are fresh.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createExpander } from './lib-prompt.mjs';
import { ALL_SLUGS } from './lib-specs.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PN = join(ROOT, 'patch-notes');
const IMAGES = join(ROOT, 'public', 'images');

const slug = process.argv[2];
if (!slug || !ALL_SLUGS.includes(slug)) {
  console.error(`usage: remaining-prompts.mjs <slug>\nknown: ${ALL_SLUGS.join(', ')}`);
  process.exit(1);
}

const { expand } = createExpander({ rosterPath: join(PN, 'roster.json'), imagesDir: IMAGES });
const vol = JSON.parse(readFileSync(join(PN, 'volumes', `${slug}.json`), 'utf8'));

const todo = vol.spreads.filter((s) => !existsSync(join(IMAGES, `${s.image.slug}.png`)));
const done = vol.spreads.length - todo.length;

const L = [];
L.push(`# ${slug} — still to generate`);
L.push('');
L.push(`${vol.chapter} · ${done} of ${vol.spreads.length} delivered · ${todo.length} outstanding`);
L.push('');
L.push('Only the plates with no image on disk appear here. Generated from the volume JSON, so');
L.push('this list cannot drift from what the book actually has.');
L.push('');
if (!todo.length) {
  L.push('**Nothing outstanding. Every plate in this volume is delivered.**');
  L.push('');
} else {
  L.push('| Plate | State | Reference folder |');
  L.push('|---|---|---|');
  for (const s of todo) {
    const p = s.image.slug;
    const recut = existsSync(join(PN, 'incoming', 'attempt1', `${p}-attempt1.png`));
    const { attach } = expand(s.image.prompt, s.image.hardConstraints);
    const n = new Set((attach || []).map((a) => a.file)).size;
    L.push(`| \`${p}\` | ${recut ? '**RE-CUT** — one attempt parked' : 'not yet attempted'} | ${n ? `\`refs-${slug}/${p}/\` (${n})` : 'none needed'} |`);
  }
  L.push('');
}

for (const s of todo) {
  const p = s.image.slug;
  const recut = existsSync(join(PN, 'incoming', 'attempt1', `${p}-attempt1.png`));
  const { text, attach, missing } = expand(s.image.prompt, s.image.hardConstraints);
  const files = [...new Set((attach || []).map((a) => a.file))].sort();

  L.push('---');
  L.push('');
  L.push(`## [ ] ${p}${recut ? ' · RE-CUT' : ''} · ${s.image.aspect}`);
  L.push('');
  L.push(`Save as **\`${p}.png\`**. Shot type: ${s.image.shotType}.`);
  L.push('');
  L.push(`**Depicts:** ${s.image.depicts}`);
  L.push('');
  L.push(`**Spoiler check:** ${s.image.spoilerCheck}`);
  L.push('');
  if (recut) {
    L.push('**This is a second attempt.** The first is parked at');
    L.push(`\`patch-notes/incoming/attempt1/${p}-attempt1.png\`. The prompt below has been`);
    L.push('rewritten since, and it now names what the first attempt got wrong.');
    L.push('');
  }
  if (files.length) {
    L.push(`**Attach these ${files.length}**, all of them in \`patch-notes/refs-${slug}/${p}/\`:`);
    L.push('');
    for (const f of files) L.push(`- \`${f}\``);
  } else {
    L.push('**No reference images.** The prompt text is the only authority.');
  }
  L.push('');
  L.push('```');
  L.push(text);
  L.push('```');
  L.push('');
  if (missing.length) L.push(`**UNRESOLVED TOKENS: ${missing.join(', ')}**`, '');
  L.push(`Alt text, already written, do not regenerate: ${s.image.alt}`);
  L.push('');
}

const dest = join(PN, `remaining-${slug}.md`);
writeFileSync(dest, L.join('\r\n'));
console.log(`${todo.length} outstanding of ${vol.spreads.length} -> patch-notes/remaining-${slug}.md`);
for (const s of todo) {
  const recut = existsSync(join(PN, 'incoming', 'attempt1', `${s.image.slug}-attempt1.png`));
  console.log(`  ${s.image.slug.padEnd(11)} ${recut ? 'RE-CUT' : 'new   '}  ${s.image.shotType}`);
}
