#!/usr/bin/env node
/**
 * Token expansion for image prompts, shared by every generator.
 *
 * Extracted from build-prompt-sheet.mjs so that an ad-hoc sheet -- prompts for spreads
 * that do not exist in the specs yet -- expands through exactly the same code as the four
 * canonical volume sheets. Re-implementing this was the obvious shortcut and would have
 * been the wrong one: the missing-reference detection, the location stand-in rules and the
 * "which figure in the shared sheet" targeting below each exist because a generation went
 * wrong once, and a second copy would drift away from them silently.
 *
 * The extraction was verified by regenerating all four sheets and requiring byte-identical
 * output, so it is a move, not a rewrite.
 */

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export function createExpander({ rosterPath, imagesDir }) {
  const roster = JSON.parse(readFileSync(rosterPath, 'utf8'));
  const IMAGES = imagesDir;

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

  return { roster, expand, rosterOrder, charsIn, nameFor, missingRefs, refExists };
}
