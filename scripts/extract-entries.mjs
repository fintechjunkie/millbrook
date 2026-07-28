#!/usr/bin/env node
/**
 * Pull selected entries out of a generated prompt sheet into a standalone file,
 * for review or for handing to somebody one batch at a time.
 *
 *   node scripts/extract-entries.mjs <volume> <slug> [slug...]
 *
 * Reads the generated sheet rather than re-deriving anything, so what comes out
 * is byte-identical to what the full sheet says. No second source of truth.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const [vol, ...slugs] = process.argv.slice(2);
if (!vol || !slugs.length) {
  console.error('usage: node scripts/extract-entries.mjs <volume> <slug> [slug...]');
  process.exit(1);
}

const sheetPath = join(ROOT, 'patch-notes', `prompt-sheet-vol${vol}.md`);
const sheet = readFileSync(sheetPath, 'utf8');

// Entries begin at a "### [ ] slug" heading and run to the next one, or to the
// next group heading.
const parts = sheet.split(/\n(?=### \[ \] )/);
const found = new Map();
for (const p of parts) {
  const m = p.match(/^### \[ \] (\S+)/);
  if (!m) continue;
  // Trim the trailing separator and anything belonging to the next group.
  const body = p.split(/\n## /)[0].replace(/\n+---\s*$/, '').trimEnd();
  found.set(m[1], body);
}

const missing = slugs.filter((s) => !found.has(s));
if (missing.length) {
  console.error(`not found in ${sheetPath}: ${missing.join(', ')}`);
  process.exit(1);
}

const out = [];
out.push(`THE PATCH NOTES, VOLUME ${vol} — SELECTED PROMPTS`);
out.push('='.repeat(64));
out.push('');
out.push('Extracted verbatim from prompt-sheet-vol' + vol + '.md. If anything here');
out.push('disagrees with that file, that file wins and this is stale.');
out.push('');
out.push('WHAT CHANGED IN THIS REVISION');
out.push('');
out.push('1. The style is now the approved, named block: Paper-Theater Millbrook.');
out.push('   Each prompt names it AND quotes it verbatim, so the project can resolve');
out.push('   it by name and the prompt still stands alone if it cannot.');
out.push('');
out.push('2. Characters are named explicitly. The immutable descriptions carry no');
out.push('   names by design, so a prompt used to describe a figure without ever');
out.push('   saying who it was. Every character block now opens with the name.');
out.push('');
out.push('3. Every prompt lists the canonical reference images to ATTACH, and tells');
out.push('   the generator the attached image is the authority and the description');
out.push('   is only a check on it. Text alone will not hold a face across 37');
out.push('   generations; the reference image is what does that work.');
out.push('');
out.push('4. Aspect ratios are 3:2 for image pages and 2:1 for chapter openers,');
out.push('   matching the reader\'s 2:1 spread of two square pages.');
out.push('');
out.push('5. Two clauses in the negative block were narrowed because they fought the');
out.push('   paper style: an unqualified "no drop shadows" forbade the soft contact');
out.push('   shadows between paper layers, which is how the style builds depth, and');
out.push('   "no 3D render finish" became "no glossy 3D render finish".');
out.push('');
out.push('='.repeat(64));
out.push('');

for (const s of slugs) {
  out.push(found.get(s));
  out.push('');
  out.push('-'.repeat(64));
  out.push('');
}

const dest = join(ROOT, 'patch-notes', `review-vol${vol}-${slugs.join('-')}.md`);
// CRLF, because this is written to be opened in Notepad.
writeFileSync(dest, out.join('\n').replace(/\n/g, '\r\n'), 'utf8');
console.log(dest);
