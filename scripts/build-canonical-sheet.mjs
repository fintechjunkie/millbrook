#!/usr/bin/env node
/**
 * The canonical reference sheet: 13 characters and 8 locations, plus the
 * warehouse master.
 *
 * This is step 3 of the working brief's order of operations and it is BLOCKING.
 * Part D4: "Generate these before any spread work begins." Each is built from the
 * style block plus its own immutable block ALONE - no scene, no action, no story
 * beat, neutral light. Then it is attached to every prompt that uses that
 * character or place, and it is what actually holds a face across dozens of
 * generations. Prompt text on its own does not.
 *
 * The evidence is already in: Owen came back with eyebrows in one plate and
 * without them in another, and Felix came back with no bucket hat, the wrong hair
 * and no gecko, because there was nothing to match against.
 *
 *   node scripts/build-canonical-sheet.mjs
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

const NAMES = {
  AUNT_CAROL: 'Aunt Carol', MAYOR_DALTON: 'Mayor Dalton', ADMIRAL_CRANE: 'Admiral Crane',
  MR_HENDERSON: 'Mr. Henderson', GREEN_CARDIGAN_WOMAN: 'the woman in the green cardigan',
};
const nameFor = (t) => NAMES[t] ?? t.split('_').map((w) => w[0] + w.slice(1).toLowerCase()).join(' ');

// The warehouse master. Hand-written rather than derived, because it assembles
// features the prose scatters across all four volumes and no single roster block
// holds them. See roster section 6.1.
const WAREHOUSE_MASTER = {
  slug: 'loc-warehouse-canonical',
  kind: 'location',
  label: 'THE WAREHOUSE — master reference. Generate this one first.',
  aspect: '2:1',
  why:
    'Eleven of the thirty-seven images happen in this building, more than twice any '
    + 'other location, and the cast is there in every volume. The Pit, the Terminals '
    + 'and the Shop are three ends of ONE room. Generating them as separate references '
    + 'invites two plates that are each internally consistent and obviously not the '
    + 'same building. This establishes the whole space once, and the three zone '
    + 'references are then generated from it.',
  hard:
    'NO figures, NO people, NO animals. This is the room, not a scene. '
    + 'All three zones must be visible in one view with their spatial relationship clear. '
    + 'The corner near the back wall must be EMPTY and visibly unused, because Volume 4 '
    + 'fills it and that only reads as a change if it starts free. '
    + 'No legible text, no readable screen content; every monitor and television is glow or dark only.',
  body: [
    'The complete interior of a converted low brick industrial building, seen in one wide view from the back door end so the whole depth of the room reads at once. Bare concrete floor throughout. Exposed steel roof trusses overhead and high dusty clerestory windows far above them.',
    '',
    'Three working areas occupy the one space, distinct but clearly the same room:',
    '',
    'THE LOUNGE, in the middle distance: four mismatched couches, all sagging in the middle, arranged loosely around a low scarred coffee table. Behind them a wall stacked with three salvaged televisions, screens dark. Mounted high on the wall above the couches, a long plain shelf with a clear ledge, reachable only by climbing, overlooking the whole lounge.',
    '',
    'THE DESK END, along the left-hand brick wall: a long trestle desk carrying three monitors propped on stacked books, a mechanical keyboard, and a row of dented aluminium cans. Cable runs stapled in lines along the brick above it. The monitors show soft glow with no legible content.',
    '',
    'THE WORKBENCH, along the right-hand wall: a scarred plywood bench top under a hinged clamp lamp, a pegboard of hand tools above it, part-built devices in several states of assembly, a spool of solder, and dark scorch marks on the bench surface.',
    '',
    'At the near end, a service door standing propped open with a single brick on the floor, daylight coming through the gap, and a worn welcome mat just inside the threshold. At the far end, a stretch of wall left dark and unfinished, with one loose cable hanging from a bracket where something was started and abandoned. In the far corner beside it, an area of bare empty floor with nothing on it.',
    'Interior, mid morning, no story action.',
    'Very wide establishing interior, camera at standing height near the propped door looking down the length of the room, deep focus so all three zones are legible at once, nothing cropped.',
    'Daylight falling from the clerestory windows high above as the main source, cool spill from the monitors on the left, one warm clamp lamp on the right, the far end of the room falling into shadow.',
  ],
};

const items = [WAREHOUSE_MASTER];

// Characters: style plus immutable block alone. No scene, no action, neutral light.
for (const [token, c] of Object.entries(roster.characters)) {
  items.push({
    slug: (c.canonicalRef ?? `char-${token.toLowerCase()}-canonical.png`).replace(/\.png$/, ''),
    kind: 'character',
    label: `${nameFor(token)} — canonical portrait`,
    aspect: '3:2',
    approved: c.approved,
    note: c.renderingNote,
    body: [
      c.immutable ?? `>>> MISSING IMMUTABLE BLOCK FOR ${token} <<<`,
      'Standing squarely facing the camera in a neutral pose, arms relaxed at the sides, neutral expression, doing nothing. No scene, no story action, no props beyond what the description above specifies.',
      'Plain empty warm off-white paper background. No location, no setting.',
      'Full figure, head to feet, centred, camera at chest height, straight on, no perspective distortion, nothing cropped.',
      'Flat even neutral light from the front with no strong direction and no dramatic shadow, so every feature reads clearly.',
    ],
    hard:
      'This is a reference sheet, not a scene. Plain empty background, neutral pose, neutral expression. '
      + 'Every feature in the description above must be visible and correct, because every later image of this character is matched against this one.',
  });
}

// Locations that the roster marks as needing a canonical establishing image.
for (const [token, l] of Object.entries(roster.locations)) {
  if (!l.canonicalRef || token === 'WAREHOUSE_MASTER') continue;
  items.push({
    slug: l.canonicalRef.replace(/\.png$/, ''),
    kind: 'location',
    label: `${token.replace(/_/g, ' ').toLowerCase()} — canonical establishing`,
    aspect: '3:2',
    uses: l.uses,
    derivedFromWarehouse: token.startsWith('WAREHOUSE_'),
    body: [
      l.block,
      'No figures and no animals. Empty of people. No story action.',
      'Interior or exterior as the description requires, neutral time of day.',
      'Wide establishing view, camera at standing height, deep focus, the whole space legible, nothing cropped.',
      'Flat even neutral light with no strong direction, so the space reads clearly and later images can relight it.',
    ],
    hard: 'NO figures and NO animals. Empty space only. No legible text and no readable screen content.',
  });
}

const L = [];
L.push('# Millbrook: the 21 canonical references');
L.push('');
L.push('**This is the blocking step.** Working brief D4: generate these before any spread');
L.push('work begins, because a face change after thirty images means thirty regenerations.');
L.push('');
L.push('Each is built from the style block plus its own immutable block ALONE. No scene, no');
L.push('action, no story beat, neutral light. Then it is attached to every prompt that uses');
L.push('that character or place. The reference image is what holds a face across dozens of');
L.push('generations; prompt text on its own does not.');
L.push('');
L.push('The evidence is already in. Owen came back with eyebrows in one plate and correctly');
L.push('without them in another. Felix came back twice as a character his roster entry did');
L.push('not describe at all, consistently enough that the entry was rewritten to match the');
L.push('art rather than the reverse. Neither had a reference to match against, so nothing');
L.push('was holding either one still.');
L.push('');
L.push('**Record the seed and the exact prompt for each one** and put them back into the');
L.push('roster, so an approved reference can be reproduced rather than re-rolled.');
L.push('');
L.push('| # | File | What | Aspect |');
L.push('|---|---|---|---|');
items.forEach((i, n) => L.push(`| ${n + 1} | \`${i.slug}.png\` | ${i.label} | ${i.aspect} |`));
L.push('');
L.push('---');
L.push('');

items.forEach((i, n) => {
  L.push(`## [ ] ${n + 1}. ${i.slug}.png`);
  L.push('');
  L.push(`${i.label} · aspect ${i.aspect}`);
  if (i.uses) L.push(`Used by ${i.uses} spread${i.uses === 1 ? '' : 's'}.`);
  if (i.approved === false) L.push('Roster approval: **not yet approved**.');
  L.push('');
  if (i.why) { L.push(`**Why this one matters.** ${i.why}`); L.push(''); }
  if (i.derivedFromWarehouse) {
    L.push('**Generate this from the warehouse master, not independently.** Attach');
    L.push('`loc-warehouse-canonical.png` and frame in on this end of that same room, so the');
    L.push('two zones cannot drift into looking like different buildings. See roster 6.1.');
    L.push('');
  }
  if (i.note) { L.push(`**Rendering note from the roster.** ${i.note}`); L.push(''); }
  L.push('```');
  L.push(STYLE);
  if (i.hard) {
    L.push('');
    L.push('MUST HOLD, these override anything below that appears to contradict them:');
    for (const s of i.hard.split(/(?<=\.)\s+(?=[A-Z])/)) L.push(`- ${s.trim()}`);
  }
  L.push('');
  for (const line of i.body) L.push(line);
  L.push(NEG);
  L.push(`Aspect ratio: ${i.aspect}`);
  L.push('```');
  L.push('');
  L.push(`Save as: **\`${i.slug}.png\`** · then record the seed in the roster`);
  L.push('');
  L.push('---');
  L.push('');
});

const dest = join(PN, 'prompt-sheet-canonical.md');
writeFileSync(dest, L.join('\n').replace(/\n/g, '\r\n'), 'utf8');
console.log(`${items.length} canonical references -> ${dest.replace(ROOT, '.')}`);
console.log(`  1 warehouse master, ${items.filter((i) => i.kind === 'character').length} characters, `
  + `${items.filter((i) => i.kind === 'location' && i.slug !== WAREHOUSE_MASTER.slug).length} locations`);
