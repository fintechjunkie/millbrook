#!/usr/bin/env node
/**
 * G1, the prompt sheet. Emits one markdown file per volume with every token
 * expanded from roster.json.
 *
 *   node scripts/build-prompt-sheet.mjs          all four volumes
 *   node scripts/build-prompt-sheet.mjs 1        volume 1 only
 *
 * Element order is fixed by roster section 3 and is not optimised per image:
 *
 *   {{STYLE}}
 *   {{CHAR:...}} {{WARDROBE:...}}   one pair per named figure, roster order
 *   {{LOC:...}}
 *   action / setting and time / framing and shot type / lighting
 *   {{NEGATIVE}}
 *   Aspect ratio
 *
 * Tokens are expanded HERE, at assembly time, never inline in the spec. A
 * change to a character's hair is then one edit in roster.md that propagates to
 * all 37 prompts. Typing a character description into a prompt is the mechanism
 * by which these projects fail.
 *
 * Grouping is by CHARACTER in roster order, not by spread number, per working
 * brief D5. Drift is easy to see in a run of images of one face and nearly
 * invisible when they are scattered through a story. Spreads with no named
 * character fall into a final location-and-object group. Every entry carries its
 * spread number so a reader can find their place either way.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PN = join(ROOT, 'patch-notes');
const IMAGES = join(ROOT, 'public', 'images');

const roster = JSON.parse(readFileSync(join(PN, 'roster.json'), 'utf8'));

/**
 * Does the canonical reference actually exist on disk?
 *
 * This check exists because of a real failure. Every prompt was telling the
 * generator "use the attached canonical reference image X as the authority for
 * face, build, hair and proportion, match it, do not reinterpret it" while all
 * 21 of those files were missing. Nothing could be attached, so the generator
 * fell back to the text description, and the text description was stale. Felix
 * came back with no bucket hat, the wrong hair and no gecko.
 *
 * A prompt that claims an authority it does not have is worse than one that
 * admits it has none, because it makes the description sound optional at exactly
 * the moment the description is all there is.
 */
const refExists = (file) => Boolean(file) && existsSync(join(IMAGES, file));
const missingRefs = new Set();

const STYLE_SLOT = roster.styleApproved && roster.style
  ? roster.style
  : '>>> STYLE BLOCK NOT APPROVED IN THE ROSTER <<<';

const rosterOrder = Object.keys(roster.characters);

/**
 * Display names.
 *
 * The immutable blocks are pure description and deliberately carry no name, so
 * that no adjective about a locked character can drift. But a prompt that only
 * describes a figure gives the generator nothing to hang continuity on, and
 * nothing to match an attached reference against. So every character block is
 * now introduced by name.
 *
 * Derived from the token where a simple title-case is right, and mapped where it
 * is not. The green cardigan woman has no name in the prose, which is the point
 * of her, so she gets a descriptive handle instead.
 */
const NAMES = {
  AUNT_CAROL: 'Aunt Carol',
  MAYOR_DALTON: 'Mayor Dalton',
  ADMIRAL_CRANE: 'Admiral Crane',
  MR_HENDERSON: 'Mr. Henderson',
  GREEN_CARDIGAN_WOMAN: 'the woman in the green cardigan',
};
const nameFor = (token) =>
  NAMES[token]
  ?? token.split('_').map((w) => w[0] + w.slice(1).toLowerCase()).join(' ');

/**
 * Monke is an animal, not a person, and the roster is explicit that he is never
 * given a resolved hero portrait. His reference is still attached for continuity
 * of build, but the prompt must not invite a portrait of him.
 */
const IS_ANIMAL = new Set(['MONKE']);

function expand(prompt, hardConstraints) {
  const missing = [];
  const attach = [];

  // Hoisted directly under the style, because that is where a model weights
  // hardest. Every line in here corresponds to something a generation actually
  // got wrong while the requirement sat unread in the negative block.
  const HARD = hardConstraints
    ? `\n\nMUST HOLD, these override anything below that appears to contradict them:\n${
      hardConstraints.split(/(?<=\.)\s+(?=[A-Z])/).map((s) => `- ${s.trim()}`).join('\n')}`
    : '';

  const out = prompt
    // The style is named as well as quoted. The generation project resolves
    // "Paper-Theater Millbrook" by name, and naming it also means a human
    // reading the sheet can see at a glance that the right style is in play.
    .replace(/\{\{STYLE\}\}/g, () =>
      (roster.styleApproved && roster.styleName
        ? `STYLE: ${roster.styleName} (the project's locked style, reproduced below verbatim)\n\n${STYLE_SLOT}${HARD}`
        : `${STYLE_SLOT}${HARD}`))
    .replace(/\{\{NEGATIVE\}\}/g, roster.negative ?? '>>> NEGATIVE BLOCK MISSING <<<')
    // Character block: named, then told to use the attached canonical image as
    // the authority, then the immutable description. The reference image is what
    // actually holds a face across dozens of generations; the text alone will
    // not. See working brief D4.
    .replace(/\{\{CHAR:([A-Z_0-9]+)\}\}/g, (_, k) => {
      const c = roster.characters[k];
      if (!c?.immutable) { missing.push(`CHAR:${k}`); return `>>> MISSING CHAR:${k} <<<`; }
      const name = nameFor(k);
      const ref = c.canonicalRef;
      const have = refExists(ref);
      if (ref && !have) missingRefs.add(ref);
      if (have) attach.push({ file: ref, label: c.refLocation ? `${name} (${c.refLocation})` : name });
      const kind = IS_ANIMAL.has(k) ? 'ANIMAL' : 'CHARACTER';
      // Only claim an authority that exists. Where it does not, say so plainly
      // and put the weight on the description, which is then the only thing
      // holding the character together.
      // On a shared sheet, say which figure to look at. Attaching a group sheet
      // without that is an invitation to blend several characters together.
      const where = c.refLocation
        ? ` ${name} is the figure ${c.refLocation} in that sheet; ignore the other `
          + `figures in it, they are different characters.`
        : '';
      const lead = have
        ? `${kind}: ${name}. Use the attached canonical reference image `
          + `"${ref}" as the authority for face, build, hair and proportion.${where} `
          + `Match it; do not reinterpret it. The description below is a check on `
          + `that image, not a licence to depart from it.`
        : `${kind}: ${name}. NO REFERENCE IMAGE IS ATTACHED FOR THIS CHARACTER. `
          + `The description below is therefore the ONLY authority and every detail `
          + `in it is required, not optional. Do not substitute, simplify or invent `
          + `any feature of the face, hair, headwear or clothing.`;
      return `${lead}\n${c.immutable}`;
    })
    .replace(/\{\{WARDROBE:([A-Z_0-9]+)\}\}/g, (_, k) => {
      const w = roster.wardrobe[k];
      if (!w?.value) { missing.push(`WARDROBE:${k}`); return `>>> MISSING WARDROBE:${k} <<<`; }
      return `Wardrobe, unchanged for this scene: ${cleanWardrobe(w.value)}`;
    })
    .replace(/\{\{LOC:([A-Z_0-9]+)\}\}/g, (_, k) => {
      const l = roster.locations[k];
      if (!l?.block) { missing.push(`LOC:${k}`); return `>>> MISSING LOC:${k} <<<`; }
      const pretty = k.replace(/_/g, ' ').toLowerCase();
      const have = refExists(l.canonicalRef);
      // A stand-in only counts when there is no purpose-made reference. It is a
      // fallback, not a peer, so a real establishing shot always wins.
      const standIn = !have && refExists(l.standInRef) ? l.standInRef : null;
      if (l.canonicalRef && !have && !standIn) missingRefs.add(l.canonicalRef);

      let lead;
      if (have) {
        attach.push({ file: l.canonicalRef, label: `location, ${pretty}` });
        lead = `SETTING: use the attached canonical establishing image "${l.canonicalRef}" `
          + `for this location so it stays the same place between spreads.`;
      } else if (standIn) {
        attach.push({ file: standIn, label: `location, ${pretty} (stand-in, a delivered scene plate)` });
        // The distinction matters. A scene plate carries people, staging and a
        // time of day that belong to its own page, and copying those across
        // would import the wrong scene wholesale. Only the room is authority.
        lead = `SETTING: no purpose-made establishing shot exists for this place, so use the `
          + `attached scene plate "${standIn}" as the authority for the LOCATION ONLY — `
          + `its architecture, materials, colours, furniture and the position of things in `
          + `the room. Ignore everything else in that image: ignore its characters, their `
          + `poses and wardrobe, its staging, its camera angle and its time of day. Those `
          + `belong to a different page and this prompt specifies its own below.`;
      } else {
        lead = 'SETTING: no reference image is attached, so the description below is the only'
          + ' authority for this place and every element in it is required.';
      }
      return `${lead}\n${l.block}`;
    });

  return { text: out, missing, attach };
}

/**
 * Wardrobe values in the roster table carry bookkeeping a generator should
 * never see: a "Signature:" prefix marking the outfit as invariant, and a
 * trailing note about which volumes it covers. Both are continuity metadata for
 * a human. Stripped here rather than in the roster, because the roster is the
 * human-facing document and the note is useful there.
 */
function cleanWardrobe(v) {
  return v
    .replace(/^Signature:\s*/i, '')
    .replace(/[.,]?\s*Unchanged in all four volumes\.?\s*$/i, '')
    .replace(/\s*\*\*(new)\*\*\s*/gi, ' $1 ')
    .trim()
    .replace(/[.,]$/, '');
}

/** Characters named in a prompt, in roster order. */
const charsIn = (prompt) => rosterOrder.filter((k) => prompt.includes(`{{CHAR:${k}}}`));

function build(volNum) {
  const vol = JSON.parse(readFileSync(join(PN, 'volumes', `vol${volNum}.json`), 'utf8'));

  const entries = vol.spreads.map((s) => {
    const { text, missing, attach } = expand(s.image.prompt, s.image.hardConstraints);
    return {
      attach,
      spread: s.n,
      kind: s.kind,
      slug: s.image.slug,
      shotType: s.image.shotType,
      depicts: s.image.depicts,
      spoiler: s.image.spoilerCheck,
      alt: s.image.alt,
      aspect: s.image.aspect,
      chars: charsIn(s.image.prompt),
      prompt: text,
      missing,
    };
  });

  // Group by character in roster order; unnamed ones last.
  const groups = [];
  const used = new Set();
  for (const key of rosterOrder) {
    const inGroup = entries.filter((e) => !used.has(e.slug) && e.chars[0] === key);
    if (!inGroup.length) continue;
    inGroup.forEach((e) => used.add(e.slug));
    groups.push({ title: key, ref: roster.characters[key], entries: inGroup });
  }
  const rest = entries.filter((e) => !used.has(e.slug));
  if (rest.length) groups.push({ title: 'LOCATIONS AND OBJECTS, no named character', ref: null, entries: rest });

  const L = [];
  L.push(`# The Patch Notes, Volume ${volNum}: image prompt sheet`);
  L.push('');
  L.push(`${vol.chapter} · ${entries.length} images · generated from the specs, do not hand-edit`);
  L.push('');
  L.push('Work through this one prompt at a time. Each entry gives the prompt as a single');
  L.push('copyable block, then the exact filename to save the result as. The filename is');
  L.push('not optional: the reader resolves images by slug from a flat directory, so');
  L.push('`vol1-s03.png` is the only name that will appear in the book.');
  L.push('');
  L.push('Grouped by character in roster order rather than by spread number, so that drift');
  L.push('in a face is visible as a run. The spread number is on every entry.');
  L.push('');
  L.push('## Before generating');
  L.push('');
  if (missingRefs.size) {
    L.push(`- **${missingRefs.size} canonical reference files do not exist**, so nothing is`);
    L.push('  attached for them and their text descriptions are the only authority. Every');
    L.push('  such block says so explicitly. This is the reason characters drift: a prompt');
    L.push('  that claims a reference it does not have makes the description sound optional');
    L.push('  at the exact moment the description is all there is.');
    L.push('');
    L.push('  Missing: ' + [...missingRefs].sort().map((f) => `\`${f}\``).join(', '));
    L.push('');
    L.push('  Generate them from `prompt-sheet-canonical.md`, drop them into');
    L.push('  `public/images/`, and re-run `npm run prompts`. Every affected prompt then');
    L.push('  switches to attaching the real file with no further edits.');
    L.push('');
  }
  if (!roster.styleApproved) {
    L.push('- **The style block is a slot, not a value.** Paste the locked layered-paper');
    L.push('  block into section 2 of `PATCH_NOTES_FLIPBOOK_ROSTER.md`, then re-run');
    L.push('  `npm run parse` and `node scripts/build-prompt-sheet.mjs`. It will inline');
    L.push('  into all 37 prompts. Do not paste it into prompts one at a time.');
  }
  const openDecisions = roster.blockingDecisions.filter((d) => !d.resolved);
  if (openDecisions.length) {
    L.push(`- **${openDecisions.length} roster decisions are open** and section 1 lists them:`);
    for (const d of openDecisions) L.push(`    - ${d.title}`);
    L.push('  Vex is expanded below from the entry the roster marks ACTIVE, which is the');
    L.push('  prose version. If the reference sheet wins instead, every Vex prompt changes.');
  }
  L.push('- **Aspect ratios were changed for the new page geometry.** Image pages are now');
  L.push(`  \`${roster.aspect.imagePage}\` landscape and the chapter openers \`${roster.aspect.chapterOpener}\`.`);
  L.push('  Some framing lines were written for a portrait frame and may want a human pass;');
  L.push('  they were deliberately not rewritten.');
  L.push('');
  L.push('---');
  L.push('');

  for (const g of groups) {
    L.push(`## ${g.title.replace(/_/g, ' ')}`);
    L.push('');
    if (g.ref) {
      L.push(`Canonical reference: \`${g.ref.canonicalRef ?? 'none'}\` · approved: ${g.ref.approved ? 'yes' : 'no'}`);
      if (g.ref.renderingNote) {
        L.push('');
        L.push(`**Rendering note.** ${g.ref.renderingNote}`);
      }
      L.push('');
    }
    for (const e of g.entries) {
      L.push(`### [ ] ${e.slug} — ${e.kind === 'opener' ? 'chapter opener' : `spread ${e.spread}`}`);
      L.push('');
      L.push(`Shot type: ${e.shotType}`);
      L.push(`Depicts: ${e.depicts}`);
      L.push(`Spoiler check: ${e.spoiler}`);
      if (e.chars.length) {
        L.push(`Named figures: ${e.chars.map(nameFor).join(', ')} (${e.chars.length} of a maximum 2)`);
      }
      L.push('');
      if (e.attach.length) {
        L.push('**Attach these reference images before generating:**');
        // Dedupe by filename: several characters can share one grouped sheet, and
        // it should be attached once with all of them listed against it.
        const byFile = new Map();
        for (const a of e.attach) {
          byFile.set(a.file, [...(byFile.get(a.file) ?? []), a.label]);
        }
        for (const [file, labels] of byFile) L.push(`- \`${file}\` — ${labels.join('; ')}`);
      } else {
        L.push('**Attach:** nothing. No named figure and no recurring location in this frame.');
      }
      L.push('');
      L.push('```');
      L.push(e.prompt.trim());
      L.push('```');
      L.push('');
      L.push(`Save as: **\`${e.slug}.png\`** · aspect ${e.aspect}`);
      L.push('');
      L.push(`Alt text, already written, do not regenerate: ${e.alt}`);
      if (e.missing.length) L.push(`\n**UNRESOLVED TOKENS: ${e.missing.join(', ')}**`);
      L.push('');
      L.push('---');
      L.push('');
    }
  }

  const path = join(PN, `prompt-sheet-vol${volNum}.md`);
  writeFileSync(path, L.join('\n'));
  const allMissing = entries.flatMap((e) => e.missing);
  console.log(
    `vol${volNum}: ${entries.length} prompts, ${groups.length} groups -> ${path.replace(ROOT, '.')}`
    + (allMissing.length ? `  UNRESOLVED: ${[...new Set(allMissing)].join(', ')}` : ''),
  );
  return entries;
}

const which = process.argv[2] ? [Number(process.argv[2])] : [1, 2, 3, 4];
for (const n of which) build(n);
console.log(
  `\nStyle block: ${roster.styleApproved ? 'inlined' : 'SLOT, paste the locked block into the roster'}`,
);

if (missingRefs.size) {
  console.warn(`\n!! ${missingRefs.size} canonical reference files are MISSING from public/images/.`);
  console.warn('   Nothing is attached for these, so the text description is the only');
  console.warn('   authority and the prompts now say so instead of claiming otherwise.');
  for (const f of [...missingRefs].sort()) console.warn(`     ${f}`);
  console.warn('\n   Generate from prompt-sheet-canonical.md, drop into public/images/,');
  console.warn('   then re-run. No prompt edits needed.\n');
} else {
  console.log('All canonical references present and attached.\n');
}
