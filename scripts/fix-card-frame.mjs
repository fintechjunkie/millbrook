#!/usr/bin/env node
/**
 * Crop a card frame so its ornament sits the same distance from opposite edges.
 *
 *   node scripts/fix-card-frame.mjs            # card-frame
 *   node scripts/fix-card-frame.mjs card-frame-b
 *
 * The generated frame is beautiful and very slightly off-centre: the ink runs from 54px
 * to 968px horizontally but only to 937px vertically, so the bottom margin is 87px
 * against 54px at the top.
 *
 * That matters because of how `border-image` works. Each corner slice is drawn into the
 * card's corresponding corner at the border width, and the ink keeps its position WITHIN
 * that slice. A bottom slice carrying 33px more empty margin therefore renders the bottom
 * rule further inside the card than the top one -- about 7px of visible asymmetry at a
 * 32px border, which is exactly the sort of thing that reads as "slightly wrong" without
 * being identifiable.
 *
 * Trimming the extra margin off the right and bottom fixes it and touches nothing else:
 * the top-left origin is unchanged, so the corner ornaments keep their measured reach and
 * the slice value stays valid.
 *
 * Writes card-frame.png and keeps the untouched original as card-frame-source.png.
 *
 *   node scripts/fix-card-frame.mjs
 */

import { existsSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodePng, encodePng } from './lib-png.mjs';

const IMAGES = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');
const name = process.argv[2] ?? 'card-frame';
const target = join(IMAGES, `${name}.png`);
const source = join(IMAGES, `${name}-source.png`);

// Keep the original exactly as delivered, and always work from it, so running this twice
// crops once rather than compounding.
if (!existsSync(source)) copyFileSync(target, source);

const { w, h, px } = decodePng(source);
const alphaAt = (x, y) => px[(y * w + x) * 4 + 3];

// Ink bounding box, at the same threshold the measurement used.
let minX = w; let maxX = 0; let minY = h; let maxY = 0;
for (let y = 0; y < h; y += 1) {
  for (let x = 0; x < w; x += 1) {
    if (alphaAt(x, y) > 40) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
console.log(`ink bbox  x ${minX}..${maxX}   y ${minY}..${maxY}`);
console.log(`margins   left ${minX}  top ${minY}  right ${w - 1 - maxX}  bottom ${h - 1 - maxY}`);

// Mirror the LEFT margin on the right and the TOP margin on the bottom, rather than
// collapsing all four to the smallest. A frame may legitimately want a different horizontal
// and vertical inset -- card-frame-b does, at 60 across and 89 down -- and forcing them equal
// would crop 66px off the bottom to fix a 37px surplus, breaking the vertical balance to
// chase a symmetry the artwork never claimed.
const newW = maxX + 1 + minX;
const newH = maxY + 1 + minY;

if (newW === w && newH === h) {
  console.log('\nAlready symmetric. Nothing written.');
  process.exit(0);
}

const outPx = Buffer.alloc(newW * newH * 4);
for (let y = 0; y < newH; y += 1) {
  px.copy(outPx, y * newW * 4, y * w * 4, y * w * 4 + newW * 4);
}

encodePng(target, newW, newH, outPx);
console.log(`\ncropped ${w}x${h} -> ${newW}x${newH}`);
console.log(`margins now: left ${minX}  top ${minY}  right ${newW - 1 - maxX}  bottom ${newH - 1 - maxY}`);
console.log('original preserved as card-frame-source.png');
