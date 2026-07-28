#!/usr/bin/env node
/**
 * Set the image aspect ratios in the specs to match the reader geometry.
 *
 * Idempotent and re-runnable: it rewrites whatever "Aspect ratio:" value is
 * present, so it can be re-pointed by editing the two constants below and run
 * again. The ratios have moved twice during layout work, which is exactly why
 * this is a script rather than 37 hand edits.
 *
 * History, all of it while zero images existed and therefore free:
 *
 *   portrait spread 4:3    image pages 2:3   openers 4:3
 *   wide spread 16:9       image pages 4:3   openers 16:9
 *   square pages, 2:1      image pages 3:2   openers 2:1     <- current
 *
 * The reader spread is 2:1 made of two square pages. An opener at 2:1 fills the
 * spread exactly. A 3:2 plate sits landscape on a square page.
 *
 * This edits the SPEC files deliberately. The roster's own rule is that a
 * needed change is made in the source of truth and propagates, never patched
 * locally.
 *
 * NOT touched: the prose, which is verbatim; and the composition, framing and
 * lighting lines of every prompt, which are authorial. Some prompts were framed
 * for a portrait frame and want a human pass now the frame is landscape. That
 * is flagged, not fixed.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SPECS = join(ROOT, 'patch-notes', 'specs');

const OPENER_AR = '2:1';
const PAGE_AR = '3:2';

const AR_LINE = /^Aspect ratio: .+$/m;

let openers = 0;
let pages = 0;

for (let n = 1; n <= 4; n += 1) {
  const path = join(SPECS, `PATCH_NOTES_Vol${n}_Spec.md`);
  const src = readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

  // Split on spread headings so each block is treated by position. A blind
  // global replace cannot tell an opener's ratio from an image page's.
  const parts = src.split(/(?=\n## Spread )/);

  const out = parts.map((part) => {
    const isOpener = /\n## Spread 0, chapter opener/.test(part);
    const want = isOpener ? OPENER_AR : PAGE_AR;
    if (!AR_LINE.test(part)) return part;
    const next = part.replace(AR_LINE, `Aspect ratio: ${want}`);
    if (isOpener) openers += 1; else pages += 1;
    return next;
  });

  writeFileSync(path, out.join(''));
  console.log(`vol${n}: rewritten`);
}

// The roster carries the same statement and is the single source of truth.
const rosterPath = join(SPECS, 'PATCH_NOTES_FLIPBOOK_ROSTER.md');
const roster = readFileSync(rosterPath, 'utf8').replace(/\r\n/g, '\n');

const stmt = /`Aspect ratio: [^`]+` for every image page\. `[^`]+` for the four chapter openers/;
if (!stmt.test(roster)) {
  console.error('roster: aspect ratio statement NOT found. Amend it by hand.');
  process.exit(1);
}
writeFileSync(
  rosterPath,
  roster.replace(
    stmt,
    `\`Aspect ratio: ${PAGE_AR}\` for every image page. \`${OPENER_AR}\` for the four chapter openers`,
  ),
);
console.log('roster: amended');

console.log(`\n${openers} openers -> ${OPENER_AR}, ${pages} image pages -> ${PAGE_AR}`);
if (openers !== 4 || pages !== 33) {
  console.error(`Expected 4 openers and 33 image pages. Got ${openers} and ${pages}.`);
  process.exit(1);
}
console.log('\nFlagged for a human pass: prompts whose framing was chosen for a');
console.log('portrait frame. Composition lines were not touched.\n');
