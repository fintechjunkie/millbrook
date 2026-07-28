#!/usr/bin/env node
/**
 * Prompts for site furniture: art the site needs that is not a spread plate.
 *
 * Same discipline as the spread prompts. Style and negative blocks are expanded
 * from roster.json rather than retyped, so a change to either propagates here
 * too. Element order follows roster section 3.
 *
 *   node scripts/build-site-images.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PN = join(ROOT, 'patch-notes');
const roster = JSON.parse(readFileSync(join(PN, 'roster.json'), 'utf8'));

const STYLE = roster.styleApproved && roster.style
  ? `STYLE: ${roster.styleName} (the project's locked style, reproduced below verbatim)\n\n${roster.style}`
  : '>>> STYLE BLOCK NOT APPROVED IN THE ROSTER <<<';
const NEG = roster.negative ?? '>>> NEGATIVE BLOCK MISSING <<<';

const LOC = (k) => roster.locations[k]?.block ?? `>>> MISSING LOC:${k} <<<`;

const ITEMS = [
  {
    slug: 'site-banner',
    what: 'Landing page banner, the first thing anybody sees',
    aspect: '3:1',
    priority: 'first',
    notes:
      'Very wide, and the site crops it to fill, so keep the subject centred in '
      + 'the middle third and leave the outer thirds quiet. The title MILLBROOK is '
      + 'typeset over the lower portion by the site, so the bottom third must stay '
      + 'visually calm and reasonably dark. No lettering in the image itself.',
    loc: 'MILLBROOK_WIDE',
    body: [
      'The whole town seen from a slight elevation at the end of the day, wide and flat, streets running away toward a low horizon, the water tower standing off to one side. Trees in separate depth planes. A scatter of lit windows. No figures anywhere and no vehicles in motion.',
      'Exterior, late afternoon going to dusk.',
      'Very wide panoramic establishing shot, high vantage, deep focus, subject centred with the outer thirds kept quiet and uncluttered.',
      'Low warm raking light from the left, long soft shadows across the paper, the lower third of the frame falling into cooler shadow so typeset text will sit on it cleanly.',
    ],
  },
  ...[
    { n: 1, subject: 'A single fresh patch of asphalt in an otherwise cracked road, seamless and slightly too new, no hole and no patch line. No figures.', loc: 'MAIN_STREET', part: 'The Pothole' },
    { n: 2, subject: 'A corner bookshop under a navy awning with a window of stacked paperbacks and a fat ginger cat asleep among them, the shopfront reading as though it has stood for thirty years. No figures.', loc: 'MAPLE_AND_FOURTH_B', part: 'The Bookstore That Was Always There' },
    { n: 3, subject: 'A pair of brand new white running shoes set neatly at the foot of a porch swing, one still carrying a price tag on the tongue. No figures.', loc: 'HENDERSON_PORCH', part: "Mr. Henderson's Knee" },
    { n: 4, subject: 'A bare wooden podium on a low stage with rows of empty folding chairs in front of it and a rigged banner behind, seen almost edge on so no lettering is legible. No figures.', loc: 'TOWN_HALL_SQUARE', part: 'The Press Conference' },
  ].map((v) => ({
    slug: `vol${v.n}-cover`,
    what: `Volume ${v.n} cover, ${v.part}`,
    aspect: '2:1',
    priority: 'optional',
    notes:
      'Optional. Until this exists the shelf falls back to the volume\'s chapter '
      + 'opener, which already works. Worth doing only if you want a cover that '
      + 'states the volume\'s object rather than its place. Cropped to fill, so keep '
      + 'the subject central.',
    loc: v.loc,
    body: [
      v.subject,
      'Exterior, flat daylight.',
      'Centred medium shot, camera square on, shallow depth so the object is unmistakably the subject, generous empty paper around it.',
      'Soft even light, one clear direction, no dramatic contrast.',
    ],
  })),
];

const L = [];
L.push('# Millbrook: site image prompts');
L.push('');
L.push('Art the site needs that is not a spread plate. Generated from the roster, so');
L.push('the style and negative blocks match the 37 spread prompts exactly.');
L.push('');
L.push('Everything here drops into `public/images/` under the exact filename given, the');
L.push('same as the spread plates. No build step.');
L.push('');
L.push('| File | What | Aspect | Priority |');
L.push('|---|---|---|---|');
for (const i of ITEMS) L.push(`| \`${i.slug}.png\` | ${i.what} | ${i.aspect} | ${i.priority} |`);
L.push('');
L.push('**Do the banner first.** It is the only one that is actually missing rather than');
L.push('merely absent: the volume covers already fall back to the chapter openers, but');
L.push('the landing page has nothing behind its title until `site-banner.png` exists.');
L.push('');
L.push('---');
L.push('');

for (const i of ITEMS) {
  L.push(`## [ ] ${i.slug}.png — ${i.what}`);
  L.push('');
  L.push(`Aspect ${i.aspect} · priority: ${i.priority}`);
  L.push('');
  L.push(i.notes);
  L.push('');
  L.push('**Attach:** nothing. No named figure in any of these.');
  L.push('');
  L.push('```');
  L.push(STYLE);
  L.push('SETTING:');
  L.push(LOC(i.loc));
  for (const line of i.body) L.push(line);
  L.push(NEG);
  L.push(`Aspect ratio: ${i.aspect}`);
  L.push('```');
  L.push('');
  L.push(`Save as: **\`${i.slug}.png\`**`);
  L.push('');
  L.push('---');
  L.push('');
}

const dest = join(PN, 'prompt-sheet-site.md');
writeFileSync(dest, L.join('\n').replace(/\n/g, '\r\n'), 'utf8');
console.log(`${ITEMS.length} site images -> ${dest.replace(ROOT, '.')}`);
console.log(`style: ${roster.styleApproved ? 'inlined' : 'NOT APPROVED'}`);
