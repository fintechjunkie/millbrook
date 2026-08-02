#!/usr/bin/env node
/**
 * Web-sized derivatives for everything in public/images.
 *
 * The plates arrive as full-size PNGs — around 3MB each, 1536px wide, and lossless,
 * which is the worst possible container for a continuous-tone illustration. Nothing
 * in the project condensed them, so a reader downloaded the master: 14.6MB to open
 * the landing page and 31MB to read Volume 1.
 *
 * This writes WebP siblings at a few widths and leaves the PNGs untouched as the
 * masters. Two separate wins, and it is worth knowing they are separate:
 *
 *   RESIZE  is arithmetic and certain. A volume cover is 1774px wide and displays
 *           at 267px, so the page was being sent about 44x the pixels it uses.
 *   FORMAT  is the win on the plates, which are only ~2.3x oversized once retina is
 *           allowed for. PNG is lossless and built for flat colour and hard edges;
 *           these are painterly. WebP at q82 does the same job far smaller.
 *
 * INCREMENTAL, because this is standing infrastructure rather than a one-off sweep.
 * New art lands in public/images continuously while an arc is being generated, so
 * the common case is "one new plate" and that must cost one encode, not ninety-five.
 * A derivative is rebuilt only when it is missing or older than its source.
 *
 *   npm run images          build what is missing or stale
 *   npm run images -- --force    rebuild everything
 *   npm run images:check    exit 1 if anything is missing or stale, and name it
 *
 * `--check` runs in `prebuild`, so a production build fails loudly when art has been
 * added without derivatives. Same tripwire discipline as the declared word count:
 * the build refusing is the point, and it must not silently repair itself, because
 * the repair would mean shipping unprocessed masters to readers.
 *
 * `sharp` is a devDependency and is needed only to AUTHOR derivatives. They are
 * committed, so building and deploying the site needs nothing installed and no
 * runtime image loader.
 */

import { readdirSync, statSync, mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { join, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

// sharp is imported LAZILY, inside the encode path only.
//
// `prebuild` runs this with --check, and a top-level import made every production
// build depend on a native module that only exists to AUTHOR derivatives. That
// contradicted the design and put a compiled binary on the deploy's critical path
// for no reason. --check now reads the filesystem and the manifest; it needs
// nothing installed.
let sharpMod = null;
const getSharp = async () => {
  sharpMod ??= (await import('sharp')).default;
  return sharpMod;
};

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = join(ROOT, 'public', 'images');
const OUT_DIR = join(SRC_DIR, 'derived');
const MANIFEST = join(ROOT, 'lib', 'millbrook', 'derivatives.json');

/**
 * The width ladder, chosen from what the site actually displays rather than from a
 * round-number habit:
 *
 *   400   a phone plate at 1x, and a shelf cover at 1.5x
 *   800   a phone plate at 2x (355 CSS px), a shelf cover at 3x
 *   1200  a desktop plate on a 1.25x display, which is the common laptop
 *   1600  a desktop plate at 2x (656 CSS px needs 1312)
 *
 * 1200 is here because of a measurement rather than a hunch. Without it the ladder
 * jumped 800 to 1536, and a 1440x900 laptop at DPR 1.25 needs about 820px — just
 * over the 800 rung, so every plate fetched the full-size file. Adding one rung
 * takes the common desktop case from 272KB to around 180KB for one extra encode.
 *
 * Any target at or above the source width is dropped — upscaling a master is worse
 * than useless, it is a bigger file that looks the same. The source width is always
 * emitted too, so there is a full-resolution WebP for a large display.
 */
const TARGETS = [400, 800, 1200, 1600];
const QUALITY = 82;
const EXTS = new Set(['.png', '.jpg', '.jpeg']);

const args = new Set(process.argv.slice(2));
const FORCE = args.has('--force');
const CHECK = args.has('--check');

const fmtMB = (n) => (n / 1024 / 1024).toFixed(1) + 'MB';
const fmtKB = (n) => Math.round(n / 1024) + 'KB';

function sources() {
  if (!existsSync(SRC_DIR)) return [];
  return readdirSync(SRC_DIR)
    .filter((f) => EXTS.has(extname(f).toLowerCase()))
    .sort();
}

/** Widths this source should have, given its own dimensions. */
function widthsFor(srcWidth) {
  const w = TARGETS.filter((t) => t < srcWidth);
  if (!w.includes(srcWidth)) w.push(srcWidth);
  return w;
}

const outName = (file, width) => `${basename(file, extname(file))}-${width}.webp`;

/**
 * Stale means missing, or older than the master it is derived from.
 *
 * **Only ever used while BUILDING, never while checking, and that distinction is
 * the whole of a Vercel outage.** git does not store mtimes: a fresh clone stamps
 * every file with checkout time, written in index order. `public/images/derived/`
 * sorts between the masters, so on a clean clone 62 of the 99 masters — everything
 * from `loc-` to `vol4-` — land with mtimes LATER than their own derivatives. This
 * function then calls all of them stale, `--check` exits 1, and the deploy dies
 * listing most of the library. It cannot reproduce on a working copy, where the
 * mtimes are real.
 *
 * So mtime is a local authoring convenience for "do not re-encode 400 files to add
 * one", and it is meaningless anywhere the tree was cloned rather than built.
 */
function isStale(srcPath, outPath) {
  if (!existsSync(outPath)) return true;
  return statSync(outPath).mtimeMs < statSync(srcPath).mtimeMs;
}

/**
 * The CI gate: does every master have every derivative the manifest promises?
 *
 * Existence only. A missing file is a fact that survives a clone; "older than" is
 * not. This is also why it needs neither sharp nor the image dimensions — the
 * widths were decided when the manifest was written, and a master that is not in
 * the manifest at all is exactly the "new art, unprocessed" case being caught.
 */
function checkOnly(files) {
  const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};
  const problems = [];

  for (const file of files) {
    const widths = manifest[file];
    if (!widths?.length) {
      problems.push(`${file} — not in the manifest (new art: run \`npm run images\`)`);
      continue;
    }
    for (const width of widths) {
      const out = outName(file, width);
      if (!existsSync(join(OUT_DIR, out))) problems.push(`${file} -> ${out} missing`);
    }
  }

  // A master that was deleted or renamed leaves an entry behind. Not fatal — the
  // reader only ever looks up slugs it is rendering — but it means the manifest and
  // the directory have drifted, and the next person to read it should know.
  for (const file of Object.keys(manifest)) {
    if (!files.includes(file)) problems.push(`${file} — in the manifest but no longer in public/images`);
  }

  return problems;
}

async function main() {
  const files = sources();
  if (!files.length) {
    console.log('No images in public/images.');
    return;
  }

  if (CHECK) {
    const problems = checkOnly(files);
    if (problems.length) {
      console.error(`${problems.length} problem(s):\n`);
      for (const p of problems.slice(0, 20)) console.error(`  ${p}`);
      if (problems.length > 20) console.error(`  ... and ${problems.length - 20} more`);
      console.error('\nRun `npm run images` and commit public/images/derived.');
      process.exit(1);
    }
    console.log(`All ${files.length} images have their derivatives.`);
    return;
  }

  mkdirSync(OUT_DIR, { recursive: true });
  const sharp = await getSharp();

  const manifest = {};
  let built = 0;
  let srcBytes = 0;
  let largestDerivBytes = 0;

  for (const file of files) {
    const srcPath = join(SRC_DIR, file);
    const meta = await sharp(srcPath).metadata();
    const widths = widthsFor(meta.width);
    manifest[file] = widths;
    srcBytes += statSync(srcPath).size;

    for (const width of widths) {
      const outPath = join(OUT_DIR, outName(file, width));
      if (FORCE || isStale(srcPath, outPath)) {
        await sharp(srcPath).resize({ width, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(outPath);
        built += 1;
      }
    }

    // The full-width derivative is what a desktop reader actually receives, so it is
    // the honest number to compare against the master.
    const biggest = join(OUT_DIR, outName(file, widths[widths.length - 1]));
    if (existsSync(biggest)) largestDerivBytes += statSync(biggest).size;
  }

  writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

  const saved = srcBytes - largestDerivBytes;
  console.log(`${files.length} images, ${built} derivative(s) written.`);
  console.log(`masters              ${fmtMB(srcBytes)}`);
  console.log(`full-width WebP      ${fmtMB(largestDerivBytes)}`);
  console.log(`saved                ${fmtMB(saved)}  (${Math.round((saved / srcBytes) * 100)}%)`);
  console.log(`manifest             ${MANIFEST.replace(ROOT, '.')}`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
