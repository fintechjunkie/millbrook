/**
 * Minimal 8-bit RGBA PNG read/write.
 *
 * Exists because this project has no image dependency and should not gain one for a
 * couple of one-off asset repairs. Handles colour types 2 (RGB) and 6 (RGBA) at bit depth
 * 8, and all five filter types. RGB is decoded UP to RGBA with alpha 255, so callers only
 * ever deal with 4 channels; the generated plates arrive as type 2 and the frame as type 6.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { deflateSync, inflateSync } from 'node:zlib';

const crcTable = new Int32Array(256);
for (let n = 0; n < 256; n += 1) {
  let c = n;
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  crcTable[n] = c;
}
const crc32 = (buf) => {
  let c = -1;
  for (let i = 0; i < buf.length; i += 1) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
};

export function decodePng(file) {
  const d = readFileSync(file);
  let pos = 8;
  let w = 0;
  let h = 0;
  let colour = 6;
  const idat = [];
  while (pos < d.length) {
    const len = d.readUInt32BE(pos);
    const type = d.toString('ascii', pos + 4, pos + 8);
    const body = d.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      w = body.readUInt32BE(0);
      h = body.readUInt32BE(4);
      colour = body[9];
      if (body[8] !== 8 || (colour !== 2 && colour !== 6)) {
        throw new Error(`${file}: expected 8-bit RGB or RGBA, got depth ${body[8]} type ${colour}`);
      }
    } else if (type === 'IDAT') idat.push(body);
    pos += 12 + len;
  }

  const bpp = colour === 6 ? 4 : 3;
  const raw = inflateSync(Buffer.concat(idat));
  const stride = w * bpp;
  const rows = Buffer.alloc(h * stride);
  let p = 0;
  let prev = Buffer.alloc(stride);
  for (let y = 0; y < h; y += 1) {
    const f = raw[p]; p += 1;
    const line = Buffer.from(raw.subarray(p, p + stride)); p += stride;
    for (let i = 0; i < stride; i += 1) {
      const a = i >= bpp ? line[i - bpp] : 0;
      const b = prev[i];
      const c = i >= bpp ? prev[i - bpp] : 0;
      if (f === 1) line[i] = (line[i] + a) & 255;
      else if (f === 2) line[i] = (line[i] + b) & 255;
      else if (f === 3) line[i] = (line[i] + ((a + b) >> 1)) & 255;
      else if (f === 4) {
        const pp = a + b - c;
        const pa = Math.abs(pp - a); const pb = Math.abs(pp - b); const pc = Math.abs(pp - c);
        line[i] = (line[i] + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 255;
      }
    }
    line.copy(rows, y * stride);
    prev = line;
  }

  if (bpp === 4) return { w, h, px: rows, hadAlpha: true };

  // Widen RGB to RGBA so every caller works in one format.
  const px = Buffer.alloc(w * h * 4);
  for (let i = 0, j = 0; i < rows.length; i += 3, j += 4) {
    px[j] = rows[i]; px[j + 1] = rows[i + 1]; px[j + 2] = rows[i + 2]; px[j + 3] = 255;
  }
  return { w, h, px, hadAlpha: false };
}

export function encodePng(file, w, h, px) {
  const stride = w * 4;
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
  ihdr[8] = 8; ihdr[9] = 6;
  writeFileSync(file, Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]));
}
