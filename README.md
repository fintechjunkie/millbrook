# Millbrook

A site hosting digital flipbooks and other digital assets for the **Welcome to
Millbrook** project.

Next.js App Router, deployed on Vercel. No webfonts, no CSS framework, no
runtime markdown parsing.

## Properties

| Property | What it is | Status |
|---|---|---|
| `/patch-notes` | *The Patch Notes* — four illustrated flipbook volumes | Readers built, 0 of 37 images generated |

## Running it

```bash
npm install
npm run dev
```

| Route | What it is |
|---|---|
| `/` | Site home, a shelf of properties |
| `/patch-notes` | The four-volume shelf |
| `/patch-notes/vol1/read` … `vol4` | The readers |
| `/checks/overflow` | Build-time audit: does any page clip its prose? |

`npm run parse` regenerates the JSON from the markdown specs. It also runs as
`prebuild`, so the committed data can never drift from the specs.

## Repository layout

```
docs/
  Narrative_Flipbook_Working_Brief_v1.md   the production bible
  CLAUDE_CODE_BUILD_BRIEF.md               build instructions for this property
  FLIPBOOK-EXTRACTION.md                   reader extraction from the Unbroke project
  DECISIONS.md                             what was chosen and why, plus deviations

patch-notes/
  specs/                    hand-authored markdown. The human-readable truth.
    PATCH_NOTES_FLIPBOOK_ROSTER.md           style, characters, wardrobe, locations
    PATCH_NOTES_Vol1_Spec.md ... Vol4        spreads, prose, slugs, alt text
  roster.json               generated. Do not hand-edit; edit the spec.
  volumes/vol1.json ...     generated. Do not hand-edit; edit the spec.

public/images/              flat, filenames are slugs, no subdirectories

lib/millbrook/
  series.js                 paper, turn timing, type scale, geometry
  data.js                   static-import registry
components/millbrook/
  FlipBook.js               leaf model, turn reducer, edge stacks, navigation
  SpreadPage.js             TextPage, GraphicPage, OpenerSpread, BlankPage
  Plate.js                  grain, image resolution, missing-image placeholder
scripts/parse-specs.mjs     markdown → JSON, with word-count verification
```

## The three rules that matter most

**Images resolve by slug from the flat `public/images/` directory at runtime.**
No manifest of paths, no imports, no build step. Dropping `vol3-s04.png` in
gives Volume 3 spread 4 a picture. Do not nest by volume. Do not rename.

**The prose is not editable.** The text in `patch-notes/specs/` is verbatim from
the source manuscripts. Not a typo fix, not a smoothed sentence, not a
normalized quote mark. The parser verifies this by recounting every page against
the word count the spec declares, and fails the build on a mismatch.

**A missing image is a normal state, not an error.** All 37 are missing at the
start of production and all four books must be readable throughout, so a spread
with no art shows a labelled placeholder printing the exact filename to
generate. Nothing blocks on an image.

## Production status

Readers are complete and all four volumes read end to end. This is step 4 of the
build brief's order of operations, and the last cheap moment to catch a chunking
problem before image work begins.

Four author decisions in section 1 of the roster block the character lock, and
therefore all 37 spread images:

- [ ] **1.1** Vex's design — prose version (white hair, cat-ear aviator cap) or reference sheet version (mint-green buns)
- [ ] **1.2** Goggles assigned to Pip only
- [ ] **1.3** The single em-dash in Volume 4
- [ ] **§2** Approve the style block, currently PROPOSED, NOT APPROVED

Not yet built: the prompt sheet (G1) and the consistency contact sheet (G3).
Both come after the decisions above.

## Production arithmetic

| | Count |
|---|---|
| Text spreads | 33 |
| Chapter openers | 4 |
| Spread images | 37 |
| Words of prose | 8,138 |
| Canonical character references | 13 |
| Canonical location references | 8 |
| Blocking generations before spread work | 21 |
| Realistic total generations, including regeneration | 60 to 64 |

## Geometry

A **16:9 spread of two 8:9 pages.** Text left, image right, never alternating.
Chapter openers are one 16:9 image full-bleed across both pages, which fills the
spread exactly.

Images are **4:3 landscape** on the image pages and **16:9** on the four
openers. Both were amended in the specs, by `scripts/migrate-aspect.mjs`, while
zero images existed and the change was therefore free.

No text page scrolls on any desktop viewport from 1280×720 to 2560×1440. Two
balanced columns on desktop, one column on a phone, where pages do scroll by up
to 211px on the densest page. See `docs/DECISIONS.md` for the measurements.
