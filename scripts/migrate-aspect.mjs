#!/usr/bin/env node
/**
 * One-time migration: portrait pages to a landscape spread.
 *
 * The book was 4:3 (two 2:3 portrait pages). It becomes 16:9 (two 8:9
 * near-square pages), because height is the binding constraint on any laptop
 * and a wider spread buys page area for free. Measured effect on desktop: text
 * overflow goes from 12 of 33 pages scrolling at 1366x768 to none at any size.
 *
 * Consequently the image aspect ratios change, and this edits the SPEC files,
 * which is deliberate. The roster's own rule is that a needed change is made in
 * the source of truth and propagates, never patched locally.
 *
 *   image pages     2:3 portrait  ->  4:3 landscape
 *   chapter openers 4:3           ->  16:9 (full bleed across both pages,
 *                                     which is now exactly the spread ratio)
 *
 * 16:9 rather than 1.9:1 so the openers sit on a native generation ratio and
 * need no crop.
 *
 * NOT touched: the prose, which is verbatim; and the composition, framing and
 * lighting lines of every prompt, which are authorial. A handful of prompts
 * describe framing chosen for a portrait frame and may deserve a human pass
 * now that the frame is landscape. That is flagged, not fixed.
 *
 * Safe to run once. Re-running is a no-op because the old values are gone.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SPECS = join(ROOT, 'patch-notes', 'specs');

const OPENER_AR = '16:9';
const PAGE_AR = '4:3';

let totalOpeners = 0;
let totalPages = 0;

for (let n = 1; n <= 4; n += 1) {
  const path = join(SPECS, `PATCH_NOTES_Vol${n}_Spec.md`);
  const src = readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

  // Split on spread headings so each block can be treated by position. The
  // opener and the image pages both currently read "Aspect ratio: 4:3" and
  // "2:3" respectively, so a blind global replace would be ambiguous once the
  // page value became 4:3.
  const parts = src.split(/(?=\n## Spread )/);

  const out = parts.map((part) => {
    const isOpener = /\n## Spread 0, chapter opener/.test(part);
    if (isOpener) {
      const next = part.replace(/^Aspect ratio: 4:3$/m, `Aspect ratio: ${OPENER_AR}`);
      if (next !== part) totalOpeners += 1;
      return next;
    }
    const next = part.replace(/^Aspect ratio: 2:3$/m, `Aspect ratio: ${PAGE_AR}`);
    if (next !== part) totalPages += 1;
    return next;
  });

  writeFileSync(path, out.join(''));
  console.log(`vol${n}: rewritten`);
}

// The roster carries the same statement and is the single source of truth.
const rosterPath = join(SPECS, 'PATCH_NOTES_FLIPBOOK_ROSTER.md');
let roster = readFileSync(rosterPath, 'utf8').replace(/\r\n/g, '\n');

const before = roster;
roster = roster.replace(
  '`Aspect ratio: 2:3` for every image page. `4:3` for the four chapter openers, which run full bleed across both pages of the spread.',
  `\`Aspect ratio: ${PAGE_AR}\` for every image page. \`${OPENER_AR}\` for the four chapter openers, which run full bleed across both pages of the spread.\n\n`
  + 'Amended from `2:3` and `4:3`. The reader spread is 16:9, made of two 8:9 '
  + 'pages, so an opener at 16:9 fills the spread exactly and a 4:3 plate sits '
  + 'landscape on its page. The previous portrait ratios were set against a 4:3 '
  + 'spread of two 2:3 pages. No images had been generated at the time of the '
  + 'change, so it cost nothing; after spread work begins it would cost a full '
  + 'regeneration.',
);
if (roster === before) {
  console.error('roster: aspect ratio statement NOT found. Amend it by hand.');
  process.exit(1);
}
writeFileSync(rosterPath, roster);

console.log(`roster: amended`);
console.log(`\n${totalOpeners} openers -> ${OPENER_AR}, ${totalPages} image pages -> ${PAGE_AR}`);
if (totalOpeners !== 4 || totalPages !== 33) {
  console.error(`Expected 4 openers and 33 image pages. Got ${totalOpeners} and ${totalPages}.`);
  process.exit(1);
}
console.log('\nFlagged for a human pass: prompts whose framing was chosen for a');
console.log('portrait frame. Composition lines were not touched.\n');
