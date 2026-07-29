#!/usr/bin/env node
/**
 * Crop card-frame.png so its ornament sits the same distance from every edge.
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

import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'node:fs';
import { deflateSync, inflateSync } from 'node:zlib';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const IMAGES = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');
const target = join(IMAGES, 'card-frame.png');
const source = join(IMAGES, 'card-frame-source.png');

// Keep the original exactly as delivered, and always work from it, so running this twice
// crops once rather than compounding.
if (!existsSync(source)) copyFileSync(target, source);

const crc32 = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return (buf) => {
    let c = -1;
    for (let i = 0; i < buf.length; i += 1) c = t[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    return (c ^ -1) >>> 0;
  };
})();

function decode(file) {
  const d = readFileSync(file);
  let pos = 8;
  let w = 0;
  let h = 0;
  const idat = [];
  while (pos < d.length) {
    const len = d.readUInt32BE(pos);
    const type = d.toString('ascii', pos + 4, pos + 8);
    const body = d.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      w = body.readUInt32BE(0);
      h = body.readUInt32BE(4);
      if (body[8] !== 8 || body[9] !== 6) throw new Error('expected 8-bit RGBA');
    } else if (type === 'IDAT') idat.push(body);
    pos += 12 + len;
  }

  const raw = inflateSync(Buffer.concat(idat));
  const stride = w * 4;
  const out = Buffer.alloc(h * stride);
  let p = 0;
  let prev = Buffer.alloc(stride);
  for (let y = 0; y < h; y += 1) {
    const f = raw[p]; p += 1;
    const line = Buffer.from(raw.subarray(p, p + stride)); p += stride;
    for (let i = 0; i < stride; i += 1) {
      const a = i >= 4 ? line[i - 4] : 0;
      const b = prev[i];
      const c = i >= 4 ? prev[i - 4] : 0;
      if (f === 1) line[i] = (line[i] + a) & 255;
      else if (f === 2) line[i] = (line[i] + b) & 255;
      else if (f === 3) line[i] = (line[i] + ((a + b) >> 1)) & 255;
      else if (f === 4) {
        const pp = a + b - c;
        const pa = Math.abs(pp - a); const pb = Math.abs(pp - b); const pc = Math.abs(pp - c);
        line[i] = (line[i] + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 255;
      }
    }
    line.copy(out, y * stride);
    prev = line;
  }
  return { w, h, px: out };
}

function encode(w, h, px) {
  const stride = w * 4;
  // Filter 0 on every scanline. Larger than optimal filtering would give and entirely
  // adequate: this is a two-colour ornament and deflate handles it well.
  const raw = Buffer.alloc(h * (stride + 1));
  for (let y = 0; y < h; y += 1) {
    raw[y * (stride + 1)] = 0;
    px.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const chunk = (type, body) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(body.length);
    const td = Buffer.concat([Buffer.from(type, 'ascii'), body]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(td));
    return Buffer.concat([len, td, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const { w, h, px } = decode(source);
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

// Keep the top-left margin and trim right and bottom to match it, so the ornament is
// equidistant from all four edges and the corner reach measured earlier still holds.
const m = Math.min(minX, minY);
const newW = maxX + 1 + m;
const newH = maxY + 1 + m;

if (newW === w && newH === h) {
  console.log('\nAlready symmetric. Nothing written.');
  process.exit(0);
}

const outPx = Buffer.alloc(newW * newH * 4);
for (let y = 0; y < newH; y += 1) {
  px.copy(outPx, y * newW * 4, y * w * 4, y * w * 4 + newW * 4);
}

writeFileSync(target, encode(newW, newH, outPx));
console.log(`\ncropped ${w}x${h} -> ${newW}x${newH}`);
console.log(`margins now: left ${minX}  top ${minY}  right ${newW - 1 - maxX}  bottom ${newH - 1 - maxY}`);
console.log('original preserved as card-frame-source.png');
