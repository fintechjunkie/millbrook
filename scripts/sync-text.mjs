#!/usr/bin/env node
/**
 * Recount the prose in every volume spec and rewrite the declared word counts.
 *
 * Why this is a separate command rather than something parse-specs does for you:
 * the declared count is a TRIPWIRE. It exists so that a mis-sliced page boundary
 * fails loudly at parse time instead of silently at read time, and a tripwire that
 * silently repairs itself is not a tripwire.
 *
 * But it is a nuisance in the one case where the mismatch is intentional -- you
 * edited the prose on purpose. So the two cases get two commands:
 *
 *   npm run text     I edited the prose. Recount and update the declarations.
 *   npm run parse    Verify. Fails if anything still disagrees.
 *
 * That keeps the safety property while making authoring a single step. Run with
 * --check to report what would change without writing anything.
 *
 * ---
 *
 * IMPLEMENTATION NOTE, and it is here because the first version corrupted three
 * spec files before it was caught.
 *
 * That version located each spread by splitting the file on "\n## Spread " and
 * rejoined the pieces with the file's own line ending. These files are CRLF, so
 * splitting on "\n" left a bare "\r" at the tail of every chunk and rejoining added
 * a full "\r\n" in front of it. Each run therefore appended one more carriage
 * return, and because the dev watcher runs this on every save, they accumulated into
 * hundreds of them.
 *
 * The rule that prevents a whole class of that bug: NEVER take a text file apart and
 * put it back together to change a few characters in it. One global regex with a
 * callback rewrites only the matched digits and leaves every other byte, including
 * every line ending, untouched.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SPECS = join(ROOT, 'patch-notes', 'specs');
const check = process.argv.includes('--check');

// Must match parse-specs exactly or the two disagree forever. Counting is done on
// the RAW extracted block, literal "###" tokens and all, because that is what the
// declared numbers have always meant.
const countWords = (s) => (s.trim().match(/\S+/g) ?? []).length;

/**
 * One spread's declared count and the prose it is meant to describe.
 *
 * Groups: 1 header up to the number, 2 the number itself, 3 everything between the
 * header and the end of the verbatim marker, 4 the prose, 5 the image-page marker.
 * Lazy quantifiers keep each match inside a single spread, and the chapter opener
 * has neither a Words header nor a verbatim block so it simply never matches.
 */
const SPREAD = new RegExp(
  '(Pages\\s+\\d+\\s+to\\s+\\d+\\s*\\|[^|\\r\\n]*\\|\\s*Words\\s+)'
  + '(\\d+)'
  + '([\\s\\S]*?### Text page \\(left\\), verbatim\\s*?\\r?\\n)'
  + '([\\s\\S]*?)'
  + '(\\r?\\n### Image page \\(right\\))',
  'g',
);

let changed = 0;
let unchanged = 0;
const rows = [];

for (const n of [1, 2, 3, 4]) {
  const file = join(SPECS, `PATCH_NOTES_Vol${n}_Spec.md`);
  const src = readFileSync(file, 'utf8');
  let seen = 0;

  const out = src.replace(SPREAD, (_m, head, declared, gap, prose, tail) => {
    seen += 1;
    const actual = countWords(prose);
    if (Number(declared) === actual) {
      unchanged += 1;
      return `${head}${declared}${gap}${prose}${tail}`;
    }
    rows.push({
      page: `vol${n} spread ${seen}`,
      declared: Number(declared),
      actual,
      delta: actual - Number(declared),
    });
    changed += 1;
    return `${head}${actual}${gap}${prose}${tail}`;
  });

  // Belt and braces on the lesson above: a run that only rewrites digits can never
  // change the file length by more than the digits themselves, and can never change
  // the number of lines at all. If either moved, something is wrong and writing
  // would do damage.
  const lines = (s) => s.split('\n').length;
  if (lines(out) !== lines(src)) {
    console.error(
      `REFUSING TO WRITE ${file}: line count changed ${lines(src)} -> ${lines(out)}.`,
    );
    process.exit(1);
  }

  if (out !== src && !check) writeFileSync(file, out, 'utf8');
}

if (rows.length) {
  console.log(check ? 'Would update:' : 'Updated:');
  const w = Math.max(...rows.map((r) => r.page.length));
  for (const r of rows) {
    const sign = r.delta > 0 ? `+${r.delta}` : String(r.delta);
    console.log(`  ${r.page.padEnd(w)}  ${r.declared} -> ${r.actual}  (${sign})`);
  }
}

console.log(
  `\n${changed} spread${changed === 1 ? '' : 's'} ${check ? 'would change' : 'updated'}, `
  + `${unchanged} already correct.`,
);

if (!check && changed) {
  console.log('\nNow run `npm run parse` to rebuild the volume JSON the reader uses.');
}
