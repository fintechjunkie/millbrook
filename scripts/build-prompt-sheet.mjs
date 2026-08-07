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
import { createExpander } from './lib-prompt.mjs';
import { ALL_SLUGS } from './lib-specs.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PN = join(ROOT, 'patch-notes');
const IMAGES = join(ROOT, 'public', 'images');

const { roster, expand, rosterOrder, charsIn, nameFor, missingRefs } = createExpander({
  rosterPath: join(PN, 'roster.json'),
  imagesDir: IMAGES,
});


// Title for the sheet header. The arc name lives in the volume JSON; the number
// is the tail of the slug, so this works for `vol3` and `u1` alike.
const ARC_TITLE = {
  patch: 'The Patch Notes',
  understudies: 'The Understudies',
  nightjar: 'The Nightjar',
};

function build(slug) {
  const vol = JSON.parse(readFileSync(join(PN, 'volumes', `${slug}.json`), 'utf8'));

  // A volume whose header still says PENDING has no prompts in its spec yet, so there is nothing
  // to expand. Skip those spreads and say how many were skipped, rather than throwing: running
  // this across every volume is the normal thing to do, and one uncommissioned volume should not
  // take the other six down with it.
  const pending = vol.spreads.filter((s) => !s.image.prompt);
  const ready = vol.spreads.filter((s) => s.image.prompt);
  if (!ready.length) {
    console.log(`${slug}: no prompts in the spec yet (${pending.length} spreads pending) - skipped`);
    return;
  }

  const entries = ready.map((s) => {
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
  L.push(`# ${ARC_TITLE[vol.arc] ?? vol.arc}, Volume ${vol.volume}: image prompt sheet`);
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

  const path = join(PN, `prompt-sheet-${slug}.md`);
  writeFileSync(path, L.join('\n'));
  const allMissing = entries.flatMap((e) => e.missing);
  console.log(
    `${slug}: ${entries.length} prompts, ${groups.length} groups -> ${path.replace(ROOT, '.')}`
    + (pending.length ? `  (${pending.length} spread(s) still pending, omitted)` : '')
    + (allMissing.length ? `  UNRESOLVED: ${[...new Set(allMissing)].join(', ')}` : ''),
  );
  return entries;
}

// Accepts a slug (`u1`), a bare arc-one number (`3`, kept for muscle memory), or
// nothing at all, which does every volume of both arcs.
const arg = process.argv[2];
const which = !arg
  ? ALL_SLUGS
  : [/^\d+$/.test(arg) ? `vol${arg}` : arg];
for (const s of which) {
  if (!ALL_SLUGS.includes(s)) {
    console.error(`unknown volume "${s}". Known: ${ALL_SLUGS.join(', ')}`);
    process.exit(1);
  }
}
for (const s of which) build(s);
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
