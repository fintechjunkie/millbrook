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

const CHAR = (k) => roster.characters[k]?.immutable ?? `>>> MISSING CHAR:${k} <<<`;
const CHAR_REF = (k) => roster.characters[k]?.canonicalRef ?? null;

/**
 * Wardrobe values carry a "Signature:" prefix and a trailing volume note, both of
 * which are continuity bookkeeping for a human reader of the roster. Same strip as
 * the spread generator does; duplicated rather than shared because these two
 * scripts are deliberately independent and neither should be able to break the
 * other.
 */
const WARDROBE = (k) => {
  const v = roster.wardrobe?.[k]?.value;
  if (!v) return `>>> MISSING WARDROBE:${k} <<<`;
  return v.replace(/^Signature:\s*/i, '').replace(/\.?\s*(Unchanged in all four volumes|\|.*)$/i, '').trim();
};

/**
 * The core seven, in the order the arc blurb names them: five kids, one robot and
 * a monkey. Cassie and Mr Henderson are deliberately out — they are Volume 3
 * arrivals, and a landing page that shows nine faces promises an ensemble the
 * first volume does not have yet.
 */
const CAST = [
  { key: 'LENA', wardrobe: 'LENA_A' },
  { key: 'MILO', wardrobe: 'MILO_A' },
  { key: 'VEX', wardrobe: 'VEX_A' },
  { key: 'OWEN', wardrobe: 'OWEN_A' },
  { key: 'FELIX', wardrobe: 'FELIX_A' },
  { key: 'PIP', wardrobe: 'PIP_A' },
  { key: 'MONKE', wardrobe: null },
];

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
  {
    slug: 'site-cast',
    what: 'Cast strip for the landing page, the whole ensemble in one frame',
    aspect: '3:1',
    priority: 'first',
    cast: CAST,
    notes:
      'The highest-value image on the site after the banner. A visitor currently '
      + 'meets five empty town landscapes and no faces, and the characters are the '
      + 'reason to read. Sits as a full-width band between the banner and Arc One.\n\n'
      + 'Very wide, and the site may crop it, so keep every figure inside the middle '
      + '80 per cent horizontally and leave a little quiet paper above their heads. '
      + 'No lettering: names are typeset by the site so they can be read, translated '
      + 'and reached by a screen reader.',
    hard:
      'ALL SEVEN FIGURES ARE PRESENT AND EVERY FACE IS UNOBSCURED. '
      + 'Nobody is cropped by the frame edge and nobody is hidden behind anybody else. '
      + 'The relative heights are fixed and must hold: Milo tallest of the boys, Owen shorter and straighter, Felix shortest; Pip tallest of the girls, Lena medium, Vex shortest. '
      + 'Pip is a robot and her seams must be clearly visible at this scale at the jaw, neck and at least two limb joints. '
      + 'Monke is charcoal-black with a tan face, muzzle, hands and feet, and he is small, roughly knee height to the others. '
      + 'This image is exempt from the two-named-figure ceiling that governs the spread plates; that rule exists to keep story pages readable and does not apply to a cast lineup.',
    noSetting: true,
    body: [
      'A group of six teenagers and one small monkey standing together in one line across a wide frame, arranged as an ensemble portrait rather than a police lineup: staggered slightly in depth, some turned a few degrees toward each other, weight on different legs, at three or four different distances from the camera so the line has rhythm instead of being flat. Nobody is standing to attention. Each one holds their own characteristic posture — Lena open and leaning slightly forward, Milo guarded with hands in his jacket, Vex arms crossed and chin up, Owen slouched and unbothered, Felix grinning with his backpack on, Pip perfectly vertical and level, Monke crouched low at the near end of the line or perched on a crate. Every face is clearly visible and clearly lit. Exactly seven figures and no others.',
      'Exterior, late afternoon, standing on cracked concrete with the town behind them.',
      'Very wide full-length group shot, camera at chest height and square on, deep enough focus that every face reads, the background a soft flat wash of the town so nothing behind them competes with the figures.',
      'Warm even late-afternoon light from the front left, no face in shadow, soft contact shadows pooling under each figure on the paper.',
    ],
  },
  {
    slug: 'site-social',
    what: 'Share card, what people see when a link is pasted',
    aspect: '1.91:1',
    priority: 'first',
    notes:
      'This is the image most people will see before they ever see the site, so it '
      + 'earns its own generation rather than a crop. 1200 x 630 is the target pixel '
      + 'size and 1.91:1 the aspect.\n\n'
      + 'The site typesets the title over the LEFT portion of this card, so the left '
      + 'third must stay calm and reasonably dark and the subject must sit right of '
      + 'centre. No lettering in the image.',
    loc: 'MILLBROOK_WIDE',
    hard:
      'THE LEFT THIRD OF THE FRAME MUST STAY QUIET AND DARK ENOUGH FOR PALE TYPE TO SIT ON IT. '
      + 'No lettering, signage copy or numerals anywhere. '
      + 'This is not the landing banner recomposed: it is a tighter, more dramatic frame with a clear focal subject rather than a calm panorama.',
    body: [
      'The town at dusk seen from a low vantage at the end of a long straight residential street, the road running away from the camera toward a small bright horizon, the water tower standing dark against the last of the light off to the right. One street lamp just lit. Every house dark except three or four lit windows. The road surface carries one patch of fresh asphalt, seamless and slightly too new, catching the light differently from everything around it. No figures and no moving vehicles.',
      'Exterior, dusk, the last few minutes of light.',
      'Wide low-angle shot from street level looking down the road, strong one-point perspective, deep focus, the horizon placed right of centre and the left third given over to a dark quiet mass of trees and unlit houses.',
      'Cold blue ambient with a narrow band of warm orange at the horizon only, the fresh asphalt patch picking up a faint sheen, the left of the frame falling to deep blue shadow.',
    ],
  },
  {
    slug: 'site-arc2',
    what: 'Backdrop for the reserved Arc Two band',
    aspect: '3:1',
    priority: 'second',
    notes:
      'Sits behind the four dashed placeholder slots, heavily darkened by the site, '
      + 'so it is read as a texture rather than a picture. Its job is to turn reserved '
      + 'space from "unfinished" into "coming".\n\n'
      + 'Must NOT be Millbrook. The whole point is that this is somewhere else, so '
      + 'nothing recognisable from the four volumes may appear: no water tower, no '
      + 'fountain, no corner bookshop, no warehouse. Very low contrast and very few '
      + 'focal points, because type and card outlines will sit over it.',
    hard:
      'THIS IS NOT MILLBROOK. No water tower, no stone fountain, no corner shop with an awning, no brick warehouse. '
      + 'Keep the whole frame low in contrast and even in tone with no bright highlight anywhere, because the site darkens this image and lays dashed cards and type over it. '
      + 'No figures at all and no lettering of any kind.',
    noSetting: true,
    body: [
      'A different town at night, larger and colder than Millbrook: a grid of unlit streets seen from a distance and slightly above, blocks of low buildings, a rail line running through on an embankment, a scatter of sodium street lamps too far apart, and a broad flat sky with no stars. Somewhere in the middle distance a single window is lit. Everything is a shade too orderly, the blocks a shade too regular, as though the place was laid out rather than grown.',
      'Exterior, the middle of the night.',
      'Very wide distant establishing shot from a slight elevation, flat deep focus, no single dominant subject, the whole frame kept even so it can carry type.',
      'Sodium orange pinpricks in a dark blue-grey field, no moon, no strong highlight anywhere, contrast deliberately low and flat.',
    ],
  },
  {
    slug: 'brand-slop-mark',
    what: 'Digital Slop emblem, for the footer and the browser tab',
    aspect: '1:1',
    priority: 'second',
    styleMode: 'brief',
    noSetting: true,
    attach: [{ file: 'brand-nameplate-ref.png', label: 'the existing low-resolution nameplate' }],
    notes:
      'The one asset that makes this read as a universe rather than a single site, '
      + 'and it also becomes the favicon — there is currently no favicon at all, so '
      + 'browsers show a blank page icon in the tab.\n\n'
      + '**This is the one prompt on the project that REQUIRES legible lettering, so '
      + 'the standard negative block is replaced rather than applied.**\n\n'
      + 'Drop the low-resolution nameplate into `public/images/brand-nameplate-ref.png` '
      + 'and attach it. It is the authority for the wordmark; this generation is a '
      + 'redraw at usable resolution, not a reinterpretation.\n\n'
      + 'Needs to stay readable at 32 x 32 pixels, so the drips must be chunky and few. '
      + 'Test it by shrinking it before accepting.',
    hard:
      'THE WORDS MUST BE LEGIBLE AND SPELLED EXACTLY AS THEY APPEAR IN THE ATTACHED REFERENCE. This is the only image in the project where lettering is required rather than forbidden. '
      + 'Reproduce the attached mark faithfully: a solid filled circle in warm orange-vermilion with the wordmark in white across the middle, set on two lines, in a rounded hand-drawn lowercase with a slight rightward lean. '
      + 'Melting drips hang from the underside of the letters and from the bottom inside edge of the circle. Keep the drips CHUNKY and FEW so the mark survives being shrunk to a 32 pixel favicon; do not add fine or numerous drips. '
      + 'Flat colour only: exactly two colours, the orange and the white, with no gradient, no bevel, no glow, no outer stroke and no drop shadow. '
      + 'The circle is a full bleed circle centred in a square frame with a small even margin of transparent or plain white around it, and it must not be cropped.',
    negativeOverride:
      'No third colour. No gradients, bevels, glows, strokes, textures or drop shadows. '
      + 'No photographic realism and no 3D render finish. No background scene, no paper diorama, '
      + 'no characters, no objects and no border. No additional words, taglines, numerals or '
      + 'symbols beyond the wordmark itself. No misspelling and no invented letterforms.',
    body: [
      'A logo mark: a single solid circle in warm orange-vermilion, with a hand-drawn white lowercase wordmark set on two lines across its centre, and thick melting drips hanging from the letters and from the lower inside edge of the circle. Flat vector-like paper-cut finish, two colours only.',
      'Centred square composition, the circle filling most of the frame with a small even margin, straight on and perfectly flat with no perspective.',
      'Flat even illumination with no modelling, no highlight and no shadow.',
    ],
  },
  ...[
    {
      n: 1,
      part: 'The Pothole',
      loc: 'MAIN_STREET',
      char: 'LENA',
      wardrobe: 'LENA_A',
      subject:
        'A teenage girl standing alone in the middle of an empty small-town road, looking down at a single patch of fresh asphalt under her feet: seamless, slightly too new, no hole and no patch line, catching the light differently from the cracked grey road all around it. She has stopped mid-stride to look, one hand still on her satchel strap, her expression puzzled rather than alarmed. Her long shadow runs across the patch. She is the only figure in frame.',
    },
    {
      n: 2,
      part: 'The Bookstore That Was Always There',
      loc: 'MAPLE_AND_FOURTH_B',
      char: 'VEX',
      wardrobe: 'VEX_A',
      subject:
        'A teenage girl standing on the pavement outside a corner bookshop with her arms crossed, head tipped back, looking up at the navy awning and the hand-painted signboard above it with open suspicion. A fat ginger cat is asleep in the window among stacked paperbacks, entirely untroubled by her. '
        + 'The signboard above the awning, the small cards propped among the books, and the carved sign in the door glass are all PRESENT but their lettering is completely ILLEGIBLE: worn, weathered and abstract, readable as marks rather than as words. No word anywhere in the image is spellable. She is the only figure in frame.',
      hard:
        'NO LEGIBLE TEXT ANYWHERE. The shop signboard, the shelf cards and the door sign must all read as worn marks, not words. '
        + 'Do NOT write a shop name. An earlier pass rendered "MILLBROOK BOOKS" plus four readable shelf cards, which breaks the negative block outright, '
        + 'and named the shop wrongly: in the story it is Hollow Pine Books. Illegible signage is the intended result, not a limitation to work around.',
    },
    {
      n: 3,
      part: "Mr. Henderson's Knee",
      loc: 'HENDERSON_PORCH',
      char: 'MR_HENDERSON',
      wardrobe: 'HENDERSON_A',
      subject:
        'A very old man sitting alone on a two-seat wooden porch swing, leaning forward with his forearms on his knees, looking down at a pair of brand new white running shoes set neatly on the boards in front of him, one still carrying a price tag on the tongue. He has not put them on. His own worn brown leather shoes are still on his feet. His expression is thoughtful and slightly wary, as though the shoes were a question rather than a present. He is the only figure in frame.',
      hard:
        'HE IS STILL WEARING HIS OWN WORN BROWN LEATHER SHOES and the new white running shoes are on the floor in front of him, unworn. That contrast is the whole picture. '
        + 'He has strong white shelf-like eyebrows and thick untidy white hair swept up and back, not combed flat. His wristwatch is on.',
    },
    {
      n: 4,
      part: 'The Press Conference',
      loc: 'TOWN_HALL_SQUARE',
      char: 'MAYOR_DALTON',
      wardrobe: 'MAYOR_A',
      subject:
        'A heavy middle-aged man in a dusty purple suit standing alone behind a plain wooden podium on a low stage, mid-gesture with both arms opened wide and a broad practised grin, addressing rows of completely empty grey folding chairs. A rigged cloth banner hangs behind him, seen at enough of an angle that no lettering on it is legible. The emptiness of the chairs is the joke and must be unmistakable. He is the only figure in frame.',
      hard:
        'EVERY FOLDING CHAIR IS EMPTY. There is no audience whatsoever and no second figure anywhere in the frame. '
        + 'He wears cardboard anaglyph 3D glasses at all times, the frame red, his OWN RIGHT lens RED and his OWN LEFT lens CYAN, and his eyes are entirely hidden behind them. '
        + 'NO LEGIBLE LETTERING on the banner: angle it or crease it so any marks read as marks rather than words.',
    },
  ].map((v) => ({
    slug: `vol${v.n}-cover`,
    what: `Volume ${v.n} cover, ${v.part}`,
    aspect: '2:1',
    priority: 'second',
    cast: [{ key: v.char, wardrobe: v.wardrobe }],
    notes:
      'Second pass, and a deliberate change of approach. The delivered covers are '
      + 'competent empty rooms: flat, frontal, unpeopled, and all four read as the '
      + 'same beige diorama at thumbnail size. They are also the four largest images '
      + 'a visitor sees, which makes them the weakest thing on the page.\n\n'
      + 'Each cover now puts ONE character in front of that volume’s object, doing '
      + 'the thing the volume is about. A face at thumbnail size is worth more than a '
      + 'well-composed street, and it tells a browser there are people in this.\n\n'
      + 'Cropped to fill at 2:1, so keep the figure and the object both inside the '
      + 'middle two thirds and do not let either touch a frame edge.',
    loc: v.loc,
    hard: v.hard,
    body: [
      v.subject,
      'Exterior, flat late-morning daylight.',
      'Wide medium shot, camera at chest height and square on, the figure placed off centre with the object of the volume clearly in the same frame, moderate depth so both the face and the object read.',
      'Soft even light from one clear direction, no face in shadow, no dramatic contrast, soft contact shadows on the ground.',
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
L.push('**`brand-slop-mark.png` also becomes the favicon.** Once it exists, copy it to');
L.push('`app/icon.png` and Next.js serves it as the tab icon automatically. There is no');
L.push('favicon at all today, so browsers show a blank page glyph.');
L.push('');
L.push('**Do the banner first.** It is the only one that is actually missing rather than');
L.push('merely absent: the volume covers already fall back to the chapter openers, but');
L.push('the landing page has nothing behind its title until `site-banner.png` exists.');
L.push('');
L.push('---');
L.push('');

const missingRefs = new Set();

for (const i of ITEMS) {
  L.push(`## [ ] ${i.slug}.png — ${i.what}`);
  L.push('');
  L.push(`Aspect ${i.aspect} · priority: ${i.priority}`);
  L.push('');
  L.push(i.notes);
  L.push('');

  // Attachments: canonical sheets for any named figure, plus any extra reference
  // the item asks for by hand. Same rule as the spread generator -- a prompt may
  // only claim a reference is attached if the file is actually there.
  const attach = [];
  for (const c of i.cast ?? []) {
    const ref = CHAR_REF(c.key);
    if (ref) attach.push({ file: ref, label: c.key.replace(/_/g, ' ').toLowerCase() });
    else missingRefs.add(`${c.key} has no canonicalRef in the roster`);
  }
  for (const a of i.attach ?? []) attach.push(a);

  if (attach.length) {
    L.push('**Attach these reference images before generating:**');
    for (const a of attach) L.push(`- \`${a.file}\` — ${a.label}`);
  } else {
    L.push('**Attach:** nothing. No named figure in this one.');
  }
  L.push('');

  L.push('```');
  // The emblem is a logo, not a scene. Handing it the full paper-theater town
  // treatment invites a diorama with a sign in it, which is the opposite of a mark.
  L.push(
    i.styleMode === 'brief'
      ? `STYLE: flat two-colour graphic mark, drawn to sit alongside ${roster.styleName}`
        + ' without being a scene from it. Matte, slightly fibrous paper-cut finish,'
        + ' clean cut edges, no gloss. This is a logo: no diorama, no depth planes,'
        + ' no set.'
      : STYLE,
  );
  if (i.hard) {
    L.push('');
    L.push('MUST HOLD, these override anything below that appears to contradict them:');
    for (const s of i.hard.split(/(?<=\.)\s+(?=[A-Z])/)) L.push(`- ${s.trim()}`);
  }

  for (const c of i.cast ?? []) {
    const ref = CHAR_REF(c.key);
    L.push(
      `CHARACTER: ${c.key.replace(/_/g, ' ')}. Use the attached canonical reference image `
      + `"${ref}" as the authority for face, build, hair and proportion. Match it; do not `
      + 'reinterpret it. The description below is a check on that image, not a licence to '
      + 'depart from it.',
    );
    L.push(CHAR(c.key));
    if (c.wardrobe) L.push(`Wardrobe: ${WARDROBE(c.wardrobe)}`);
  }

  if (!i.noSetting) {
    L.push('SETTING:');
    L.push(LOC(i.loc));
  }
  for (const line of i.body) L.push(line);
  // brand-slop-mark is the one prompt on the project that needs legible lettering,
  // so its negative block is replaced outright rather than appended to. Applying
  // the standard one would forbid the only thing the image is for.
  L.push(i.negativeOverride ?? NEG);
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
for (const m of missingRefs) console.warn(`  !! ${m}`);
console.log(`style: ${roster.styleApproved ? 'inlined' : 'NOT APPROVED'}`);
