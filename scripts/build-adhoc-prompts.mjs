#!/usr/bin/env node
/**
 * Prompts for spreads that do not exist in the specs yet.
 *
 *   node scripts/build-adhoc-prompts.mjs
 *
 * The five new spreads planned in patch-notes/PLAN-new-spreads.md need their art before the
 * page boundaries move, so the author can generate in parallel with the re-cut. But a prompt
 * cannot come from the specs until the spread is in the specs, and it cannot go into the specs
 * until the text is re-cut. This closes that loop: the prompt bodies live here as data, and
 * they expand through `lib-prompt.mjs` — the same code that builds the four canonical volume
 * sheets, not a copy of it.
 *
 * **These entries are temporary.** When a split lands, its prompt block moves into the spec
 * verbatim and this file loses that entry. Nothing here should outlive the re-cut.
 *
 * ## Why the slugs have letter suffixes
 *
 * `parse-specs.mjs` reads a spread number with `Number(part.match(/^(\d+)/))`, so spread
 * numbers must be consecutive integers and inserting one renumbers everything after it. But
 * the image filename comes from the spread's own `Slug:` line, which is an independent field.
 * So the existing spreads keep their original slugs while their numbers shift, and no
 * delivered PNG is ever renamed — `vol2-s05.png` stays `vol2-s05.png` even once its spread is
 * numbered 6.
 *
 * The consequence is a deliberate mismatch between spread number and slug from the insertion
 * point onward. That is much the better trade: the alternative renames delivered artwork, and
 * a slug is just a key.
 */

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createExpander } from './lib-prompt.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PN = join(ROOT, 'patch-notes');

const { expand, missingRefs } = createExpander({
  rosterPath: join(PN, 'roster.json'),
  imagesDir: join(ROOT, 'public', 'images'),
});

// ---------------------------------------------------------------------------
// The five.
//
// `insertAfter` is where the new spread lands in reading order. `slug` is the filename and is
// letter-suffixed so nothing existing has to be renamed. `why` is the case for the plate
// existing at all, and is here rather than in a commit message because the author reads this
// sheet and not the log.
// ---------------------------------------------------------------------------

const ENTRIES = [
  {
    slug: 'vol2-s04b',
    insertAfter: 'vol2 spread 4',
    title: 'Owen’s map',
    shotType: 'Object or detail (group)',
    depicts:
      'The almost-closed arc on Owen’s map, with the group seeing the pattern together for '
      + 'the first time.',
    spoiler:
      'HOLD ONE THING. The gap in the arc and the blank rectangle at its centre are both on '
      + 'the page in this scene, so both may appear — but the rectangle must stay unlabelled '
      + 'and unrecognisable, and must NOT read as a school. That reveal is Volume 3 spread 4.',
    why:
      'The strongest of the five. The arc of dots is the plot’s central object, referenced in '
      + 'all four volumes, and has never been drawn. It also gives the book a visual language '
      + 'it does not otherwise have — a diagram — while still being character-forward, because '
      + 'four faces are watching it. Watch the lettering rule: a map wants street names and '
      + 'the negative block forbids lettering, so this has to read as pure geometry.',
    prompt: `{{STYLE}}
{{CHAR:LENA}}
{{WARDROBE:LENA_B}}
{{CHAR:VEX}}
{{WARDROBE:VEX_A}}
{{CHAR:PIP}}
{{WARDROBE:PIP_A}}
{{CHAR:OWEN}}
{{WARDROBE:OWEN_A}}
{{LOC:WAREHOUSE_TERMINALS}}
Four figures gathered at a bank of three monitors, every one of them looking at the middle screen. On that screen is a town map drawn as pure geometry with absolutely no text, labels, numerals or signage anywhere in it: a pale grid of thin streets on a dark field, a scatter of about a dozen small warm glowing dots, and those dots falling along a wide circular arc that is almost but not quite closed, with one clear gap in it and an empty unmarked rectangle of plain ground at the centre of the circle. One dot is noticeably brighter than the others. Owen is seated at the keyboard, turned half toward the screen, mouth open mid-objection, one hand still on the keys. Pip stands closest to the glass, very upright and unnaturally still, head level, one hand raised as though about to point at the arc. Lena leans in over Owen's shoulder from behind. Vex stands a little apart with her arms folded and her chin up. All four faces clearly visible and clearly lit. Exactly four figures in frame.
Interior, mid-morning.
Medium group shot from slightly off to one side so that the screen and all four faces are visible at once, camera at standing eye level, the arc on the monitor large enough to read as a shape.
Bright and legible. Generous warm fill from the warehouse windows and the overhead work lights so that faces, skin and clothing all read at full colour, with the monitor adding a cool rim of glow on the nearest faces only. This is not a dark room and not a screen-lit room.
{{NEGATIVE}}
Aspect ratio: 3:2`,
  },

  {
    slug: 'vol4-s07b',
    insertAfter: 'vol4 spread 7',
    title: 'Lena records The Real Feed',
    shotType: 'Character portrait',
    depicts: 'Lena recording the closing video, the pig asleep beside her.',
    spoiler: 'PASS. Nothing in frame beyond her, the pig and the couch.',
    why:
      'Lena is a broadcaster and the book has never once shown her broadcasting, which is odd '
      + 'given it is the whole shape of her arc. Also the first plate to use a screen as the '
      + 'key light on a single face, and the pig finally gets a proper appearance.',
    prompt: `{{STYLE}}
{{CHAR:LENA}}
{{WARDROBE:LENA_D}}
{{CHAR:PIG}}
{{LOC:WAREHOUSE_PIT}}
A girl sitting cross-legged on a worn couch late at night, talking directly into a phone that is propped up against a coffee mug on a low table in front of her. She leans slightly forward, caught mid-sentence, one hand open in front of her, and her expression is set and certain rather than nervous or performing. Her clothes are visibly creased and slept in. A small pot-bellied pig is asleep against her hip, completely relaxed, one ear flopped. The phone screen throws the main light up onto her face from below. Behind her the rest of the warehouse falls away into soft shadow with a few small equipment lights in it. Exactly one person and one animal in frame. The phone screen shows no text, no interface and no image.
Interior, late night.
Medium shot from just behind and beside the phone, so the viewer sits roughly where her audience does, camera at seated eye level.
Low-key but never murky. The phone is the key light and it is bright enough that her features and the colour of her clothing read fully, with a warm secondary source keeping the couch, the pig and the near wall clearly visible. A dark mood and a readable image at the same time.
{{NEGATIVE}}
Aspect ratio: 3:2`,
  },

  {
    slug: 'vol3-s01b',
    insertAfter: 'vol3 spread 1',
    title: 'Mr. Henderson running',
    shotType: 'Action moment',
    depicts: 'Beat 1. The six miles, in progress.',
    spoiler: 'PASS. The run is public knowledge by the second page of the volume.',
    why:
      'The volume is called Mr. Henderson’s Knee and the run is its title beat, but the '
      + 'existing plate shows him already stopped. Every other plate in the arc is a static '
      + 'scene; this is the only one with real physical motion in it, and an eighty-one-year-old '
      + 'in slippers running flat out at dawn is the most purely joyful image available anywhere '
      + 'in the book.',
    prompt: `{{STYLE}}
{{CHAR:MR_HENDERSON}}
{{WARDROBE:HENDERSON_A}}
{{LOC:MILLBROOK_RESIDENTIAL}}
An old man running along an empty residential sidewalk at full stride with both feet off the ground, arms working, and a folded newspaper still tucked under one arm because he never meant to go anywhere. He is dressed in ordinary house clothes and slippers rather than anything athletic. His face is the whole point of the image: astonished and delighted at the same time, mouth open, and he is looking down at his own legs rather than ahead of him. Sleeping single-storey houses with wide flat lawns run away behind him. The street is completely empty of other people and of cars. Exactly one figure in frame.
Exterior, just after sunrise.
Low three-quarter tracking shot from slightly ahead of him and below, so the stride reads as fast and his face stays clearly visible, moderate depth so the row of houses recedes behind him.
Bright, clean early-morning light. A long warm low sun from behind the camera lights his face and the fronts of the houses directly, throwing long soft shadows, and the overall key is high. A cheerful image, not a wistful one.
{{NEGATIVE}}
Aspect ratio: 3:2`,
  },

  {
    slug: 'vol3-s02b',
    insertAfter: 'vol3 spread 2',
    title: 'Cassie’s hearing',
    shotType: 'Atmospheric or subjective (portrait)',
    depicts:
      'Beat 5. What Cassie is hearing while she lists it — the wasp in the wall, the freezer '
      + 'compressor, the phone buzzing on silent in Lena’s pocket.',
    spoiler:
      'HOLD ONE THING. The rings must read as SOUND and nothing else. They must not read as a '
      + 'signal, a transmission, a network, or anything with a source or a direction, and '
      + 'nothing in the walls may be visible. That the patches live on a frequency, and that '
      + 'something is in the wiring, are both later reveals.',
    why:
      'The most inventive option and the riskiest. It would be the only subjective image in the '
      + 'book — the only one drawing something that is not physically in the room — and it '
      + 'dramatises the volume’s central idea instead of describing it. Higher ceiling than the '
      + 'running plate, lower floor: if the rings read as sci-fi transmission rather than as '
      + 'hearing, it spoils a Volume 3 reveal and has to be thrown away. Alternative to '
      + 'vol3-s01b rather than an addition, unless you want two new spreads in Volume 3.',
    prompt: `{{STYLE}}
{{CHAR:CASSIE}}
{{WARDROBE:CASSIE_A}}
{{LOC:WAREHOUSE_PIT}}
A fifteen-year-old girl sitting upright on a worn couch, filling the near half of the frame, seen slightly from the side. One hearing aid sits behind her left ear and the other lies in her open palm on her knee. She is not crying but has been, and her eyes are wide and fixed on nothing in particular, her shoulders slightly raised as though braced. Her expression is overwhelmed rather than frightened. Behind and around her the room is drawn normally, except that faint pale concentric rings spread outward through it from several separate ordinary places at once, overlapping each other where they cross: from a small point inside the wall behind her, from a chest freezer far off through the doorway, from a coat pocket on a chair nearby, from somewhere beyond the far wall. The rings are thin, soft-edged, translucent and colourless, like ripples on water seen from directly above, and they clearly pass through solid objects rather than being blocked by them. They are quiet and delicate, never bright, never beams, never rays. No sources are glowing and no machinery, wiring or device is visible anywhere in the frame. Exactly one figure in frame.
Interior, mid-morning.
Medium close portrait from just off her eyeline, camera at seated eye level, shallow enough depth that she is crisp and the ringed room behind her is soft.
Bright and warm and completely ordinary. Generous daylight from high windows so her face and the whole room read at full colour, with no dramatic shadow and no coloured light. The rings are the only unusual element and they are pale and low-contrast against a normally lit room.
{{NEGATIVE}}
Aspect ratio: 3:2`,
  },

  {
    slug: 'vol1-s08b',
    insertAfter: 'vol1 spread 8',
    title: 'The streetlight',
    shotType: 'Atmospheric',
    depicts:
      'The final beat. The streetlight across from Aunt Carol’s house going off for a fraction '
      + 'of a second.',
    spoiler:
      'HOLD ONE THING. It may show that a patch has a visible moment and that the moment looks '
      + 'wrong. It must NOT show a cause, a mechanism, a source, or anything in the walls or '
      + 'wires.',
    why:
      'The one deliberate exception to character-forward in this set, and worth agreeing to '
      + 'rather than slipping through. Across four volumes the reader is told constantly that '
      + 'the town changes and is only ever shown the aftermath — a filled pothole, a bookstore '
      + 'that was a vape store. This is the single beat where a patch happens on the page. A '
      + 'face would mean a character witnessing it, and none does; making one see it would '
      + 'change the beat. It is also the closing image of Volume 1, which is the right place in '
      + 'a volume to spend an atmospheric plate.',
    prompt: `{{STYLE}}
{{LOC:CRESCENT_HOUSE_EXT}}
A quiet suburban street at night seen from across the road, with one streetlight standing dark while the lights further down the street are still lit. In the pool of darkness where its light should be, the scene is subtly but definitely wrong: the shadows of the parked cars fall in a slightly different direction from every other shadow in the frame, the kerb line does not quite continue across it, and the colours inside it sit a shade off true. Everything outside that pool is an ordinary, calm, correctly lit night street. One upstairs window in the nearest house is lit. There are no people, no faces and no figures anywhere in the frame.
Exterior, well after midnight.
Wide static shot from across the street at standing eye level, the dark streetlight slightly off centre, with enough depth that the correctly lit street continues away behind it for contrast.
Two lighting logics in one frame, and this is the whole image. Outside the dark pool: normal warm sodium streetlight, soft and calm, everything legible. Inside it: cool, flat, directionless light whose shadows disagree with the rest of the picture. Never pitch black anywhere — the wrongness has to be visible, so the dark area stays clearly readable.
{{NEGATIVE}}
Aspect ratio: 3:2`,
  },
];

// ---------------------------------------------------------------------------

const L = [];
L.push('# New spreads: image prompt sheet');
L.push('');
L.push(`${ENTRIES.length} prompts · generated by \`node scripts/build-adhoc-prompts.mjs\` · do not hand-edit`);
L.push('');
L.push('These are for spreads that are **not in the specs yet**. See');
L.push('`patch-notes/PLAN-new-spreads.md` for where each one lands and why. Tokens are expanded');
L.push('through the same code as the four canonical volume sheets, so the style block, the');
L.push('negative block and every character description here are identical to the ones already');
L.push('in use.');
L.push('');
L.push('## Read this before generating');
L.push('');
L.push('- **The filename is not optional.** The reader resolves images by slug from one flat');
L.push('  directory, so the name given under each prompt is the only name that will appear in');
L.push('  the book.');
L.push('- **The slugs carry letter suffixes on purpose.** Inserting a spread renumbers every');
L.push('  spread after it, but the image filename comes from the spread’s own `Slug:` field,');
L.push('  which is independent of the number. So existing spreads keep their original slugs and');
L.push('  **no delivered artwork is ever renamed.**');
L.push('- **Two of these have a spoiler condition rather than a clean PASS.** They are marked');
L.push('  HOLD ONE THING and the condition is specific. Both are things that read fine to us,');
L.push('  because we know the ending, and would give it away to a first-time reader.');
L.push('- Warehouse scenes must not come back dark. Roster 6.1a, and the lighting paragraph in');
L.push('  each prompt says so explicitly.');
L.push('');
L.push('---');
L.push('');

for (const e of ENTRIES) {
  const { text, missing, attach } = expand(e.prompt, null);

  L.push(`## [ ] ${e.slug} — ${e.title}`);
  L.push('');
  L.push(`Inserts after: **${e.insertAfter}**`);
  L.push(`Shot type: ${e.shotType}`);
  L.push(`Depicts: ${e.depicts}`);
  L.push(`Spoiler check: ${e.spoiler}`);
  L.push('');
  L.push(`**Why this plate.** ${e.why}`);
  L.push('');

  if (missing.length) {
    L.push(`> **UNRESOLVED TOKENS: ${missing.join(', ')}** — fix the roster before generating.`);
    L.push('');
  }

  if (attach.length) {
    L.push('**Attach these reference images before generating:**');
    for (const a of attach) L.push(`- \`${a.file}\` — ${a.label}`);
    L.push('');
  } else {
    L.push('**No reference images to attach.** The description is the only authority.');
    L.push('');
  }

  L.push('```');
  L.push(text);
  L.push('```');
  L.push('');
  L.push(`Save as: \`public/images/${e.slug}.png\``);
  L.push('');
  L.push('---');
  L.push('');
}

const out = join(PN, 'prompt-sheet-new-spreads.md');
writeFileSync(out, L.join('\n'), 'utf8');
console.log(`${ENTRIES.length} prompts -> ${out.replace(ROOT, '.')}`);

if (missingRefs.size) {
  console.log('\nMISSING reference files, prompts say so rather than claiming them:');
  for (const f of [...missingRefs].sort()) console.log(`  ${f}`);
} else {
  console.log('All canonical references present and attached.');
}
