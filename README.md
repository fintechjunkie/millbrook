# Millbrook

A site hosting digital flipbooks and other digital assets for the **Welcome to Millbrook** project.

## Properties

| Property | What it is | Status |
|---|---|---|
| `patch-notes/` | *The Patch Notes* — four illustrated flipbook volumes | Spec complete, build not started |

## Repository layout

```
docs/                       method documents, apply to every flipbook property
  Narrative_Flipbook_Working_Brief_v1.md    the production bible
  CLAUDE_CODE_BUILD_BRIEF.md                build instructions for this property

patch-notes/
  specs/                    source markdown, hand-authored, the human-readable truth
    PATCH_NOTES_FLIPBOOK_ROSTER.md            style, characters, wardrobe, locations
    PATCH_NOTES_Vol1_Spec.md ... Vol4_Spec.md  spreads, prose, slugs, alt text
  roster.json               generated from the roster md
  volumes/vol1.json ...     generated from the volume specs
  images/                   flat, filenames are slugs, no subdirectories
  vol1.html ... vol4.html   the four readers
  prompt-sheet.html         the image generation working document
  contact-sheet.html        build-time consistency audit tool
  index.html                the shelf

src/                        shared reader component, styles, page-curl logic
index.html                  site home
```

## The two rules that matter most

**Images resolve by slug from the flat `patch-notes/images/` directory at runtime.**
No manifest of paths, no imports, no build step to add art. Dropping
`vol3-s04.png` into that directory gives Volume 3 spread 4 a picture. Do not
nest by volume. Do not rename.

**The prose is not editable.** The text in `patch-notes/specs/` is verbatim from
the source manuscripts. Not a typo fix, not a smoothed sentence, not a
normalized quote mark. See Part B4 of the working brief.

## Production status

Four decisions block all image work. They are author decisions and are recorded
in section 1 of the roster:

- [ ] **1.1** Vex's design — prose version (white hair, cat-ear aviator cap) or reference sheet version (mint-green buns)
- [ ] **1.2** Goggles assigned to Pip only
- [ ] **1.3** The single em-dash in Volume 4
- [ ] **§2** Approve the style block, currently marked PROPOSED, NOT APPROVED

Readers can be built and read end to end on placeholders before any of these
land. That is step 4 of the order of operations and it is the cheapest point at
which to catch a chunking problem.

## Production arithmetic

| | Count |
|---|---|
| Text spreads | 33 |
| Chapter openers | 4 |
| Spread images | 37 |
| Canonical character references | 13 |
| Canonical location references | 8 |
| Blocking generations before spread work | 21 |
| Realistic total generations, including regeneration | 60 to 64 |
