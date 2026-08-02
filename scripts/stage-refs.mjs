/**
 * Stage the reference images a volume's prompts ask for, one folder per plate.
 *
 * Built from the volume JSON through the same expander the prompt sheet uses, so the folder
 * contents cannot disagree with the sheet. Scraping the markdown was the first attempt and it
 * is exactly the kind of thing that silently returns nothing.
 *
 * The point: every prompt wants a different handful of faces out of a directory of a hundred
 * files. A folder per plate means dragging the whole folder in, and no chance of attaching the
 * wrong face.
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createExpander } from './lib-prompt.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PN = join(ROOT, 'patch-notes');
const IMAGES = join(ROOT, 'public', 'images');

const slug = process.argv[2] || 'u1';
const OUT = join(PN, `refs-${slug}`);

const { expand } = createExpander({ rosterPath: join(PN, 'roster.json'), imagesDir: IMAGES });
const vol = JSON.parse(readFileSync(join(PN, 'volumes', `${slug}.json`), 'utf8'));

if (existsSync(OUT)) rmSync(OUT, { recursive: true });
mkdirSync(OUT, { recursive: true });

const index = [`# Reference images for ${slug} — ${vol.chapter}`, ''];
index.push('One folder per plate, in reading order. Drag the whole folder into the generator:');
index.push('everything in it is required for that prompt, and nothing else is.');
index.push('');
index.push('Generated from the volume JSON through the same expander that writes');
index.push('`prompt-sheet-' + slug + '.md`, so the two cannot disagree.');
index.push('');

let copies = 0;
const rows = [];
for (const s of vol.spreads) {
  const plate = s.image.slug;
  const { attach } = expand(s.image.prompt, s.image.hardConstraints);
  // attach is [{ file, label }], not bare filenames.
  const files = [...new Set((attach || []).map((a) => a.file))].sort();
  if (!files.length) {
    rows.push([plate, '—', 'no reference; the prompt text is the only authority']);
    continue;
  }
  const dir = join(OUT, plate);
  mkdirSync(dir, { recursive: true });
  const named = [];
  for (const f of files) {
    const src = join(IMAGES, f);
    if (!existsSync(src)) { named.push(`${f} (MISSING)`); continue; }
    copyFileSync(src, join(dir, f));
    copies += 1;
    named.push(f);
  }
  rows.push([plate, String(named.length), named.join(', ')]);
}

index.push('| Plate | Refs | Files |');
index.push('|---|---|---|');
for (const r of rows) index.push(`| \`${r[0]}\` | ${r[1]} | ${r[2]} |`);
index.push('');
writeFileSync(join(OUT, 'README.md'), index.join('\r\n'));

console.log(`${vol.spreads.length} plates, ${copies} reference copies -> patch-notes/refs-${slug}`);
for (const r of rows) console.log(`  ${r[0].padEnd(12)} ${r[1].padStart(2)}  ${r[2].slice(0, 90)}`);
