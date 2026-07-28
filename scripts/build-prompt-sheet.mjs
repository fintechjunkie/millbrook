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

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PN = join(ROOT, 'patch-notes');

const roster = JSON.parse(readFileSync(join(PN, 'roster.json'), 'utf8'));

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
      if (ref) attach.push({ file: ref, label: name });
      const kind = IS_ANIMAL.has(k) ? 'ANIMAL' : 'CHARACTER';
      const lead = ref
        ? `${kind}: ${name}. Use the attached canonical reference image `
          + `"${ref}" as the authority for face, build, hair and proportion. `
          + `Match it; do not reinterpret it. The description below is a check on `
          + `that image, not a licence to depart from it.`
        : `${kind}: ${name}. NO CANONICAL REFERENCE YET - generate the canonical `
          + `portrait first and do not proceed from description alone.`;
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
      if (l.canonicalRef) attach.push({ file: l.canonicalRef, label: `location, ${k.replace(/_/g, ' ').toLowerCase()}` });
      const lead = l.canonicalRef
        ? `SETTING: use the attached canonical establishing image "${l.canonicalRef}" `
          + `for this location so it stays the same place between spreads.`
        : 'SETTING:';
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
        for (const a of e.attach) L.push(`- \`${a.file}\` — ${a.label}`);
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
