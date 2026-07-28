# The Patch Notes Flip Books: Build Brief for Claude Code

Read this file, then `PATCH_NOTES_FLIPBOOK_ROSTER.md`, then the four volume specs. Read all of it before writing anything, because the failure modes live at the seam between the spec and the build.

## What exists and what you are making

Inputs, already written:

```
PATCH_NOTES_FLIPBOOK_ROSTER.md     style, negatives, characters, locations, wardrobe
PATCH_NOTES_Vol1_Spec.md           9 spreads   2252 words
PATCH_NOTES_Vol2_Spec.md           9 spreads   1961 words
PATCH_NOTES_Vol3_Spec.md           9 spreads   1948 words
PATCH_NOTES_Vol4_Spec.md          10 spreads   2082 words
```

Four separate flip books, one per volume, as requested. They share a codebase, a component set and a style, and each builds and opens independently.

Three outputs per Part G of the working brief: a prompt sheet, the readers, and a consistency contact sheet.

## Target layout

```
patch-notes/
  roster.json                 parsed from the roster md, single source of truth
  volumes/
    vol1.json                 parsed from the spec: spreads, prose, slugs, alt text
    vol2.json  vol3.json  vol4.json
  images/                     flat, no subdirectories, filenames are slugs
    vol1-opener.png
    vol1-s01.png ... vol1-s08.png
    vol2-opener.png ...
  prompt-sheet.html           G1, one document covering all four volumes
  contact-sheet.html          G3, build-time audit tool
  vol1.html vol2.html vol3.html vol4.html    G2, the four readers
  index.html                  a shelf, four covers, links to the readers
  src/                        shared reader component, styles, page-curl logic
```

Images live in one flat directory keyed by slug so that dropping a regenerated file in place updates every book with no code change. Do not nest by volume. Do not rename.

## G1, the prompt sheet

A standalone numbered working document. It is built to be worked through one prompt at a time, not read.

Each entry carries, in this order: the checkbox, the volume and spread number, the shot type, the fully expanded prompt as copyable text in a single selectable block, the reference image to attach if any, the seed if any, and the exact output filename, which is the slug plus `.png`.

Three requirements that are easy to miss.

**Expand tokens at assembly time, never inline in the spec.** Every `{{CHAR:...}}`, `{{WARDROBE:...}}`, `{{LOC:...}}`, `{{STYLE}}` and `{{NEGATIVE}}` is substituted from `roster.json` when the sheet is generated. A change to a character's hair is then one edit in one place that propagates to all thirty-seven prompts. If you find yourself typing a character description into a prompt, stop, because that is the mechanism by which these projects fail.

**Element order is fixed and you do not optimise it.** Style, then character blocks in roster order each followed by its wardrobe token, then the location block, then action, setting and time, framing and shot type, lighting, negatives, aspect ratio. Do not rearrange, condense or merge lines for a particular subject even where it reads awkwardly. Section 3 of the roster has the exact order.

**Group by character in roster order, not by spread number.** This is counterintuitive and it is the point of Part D5: drift is easy to see in twenty images of one face in a row and nearly invisible when they are scattered through a story. Spreads with no named character go into a final location-and-object group. Show the spread number on every entry so the person can find their place either way.

Copy buttons per prompt. Persist the checkbox state locally so the person can close the tab.

## G2, the readers

Physical page-turn mechanics, matching the flip book reader in the other project: page-curl animation, paper grain, visible edge stacks on both sides.

Fixed placement throughout. **Text always left, image always right.** Never alternate. The one exception is the chapter opener spread, which runs a single full-bleed 4:3 image across both pages with the volume title block typeset over it.

Navigation: keyboard arrows, swipe, a spread counter, and a jump list built from the section headings inside the prose.

Prose renders with the hierarchy from the house formatting standard. The `###` headings inside each text page are section names and are set larger and bold above the body. Body is regular weight. The closing `*To be continued...*` and `*End of...*` lines are italic. Arial throughout unless you have a better licensed match for the graphic-novel register, in which case ask first rather than substituting.

**Two behaviours that matter more than they sound.**

It must render gracefully with images missing. Any spread whose image file is absent shows a labelled placeholder printing the slug and the shot type. The text will be complete long before thirty-seven images exist and all four books must be readable throughout production. Do not build a loading state that blocks on the image.

Images resolve by slug from the flat `images/` directory at runtime. No manifest of image paths, no imports, no build step required to add art. Drop `vol3-s04.png` in and Volume 3 spread 4 has a picture.

Alt text comes from the spec and goes on every image. It is written to describe what is depicted rather than what it means, and that is deliberate, so use it as given.

## G3, the consistency contact sheet

A build-time page, not part of any reader. One row per character, every image in which that character appears laid out together at thumbnail size, character name and the spread slug under each. A second block does the same for each recurring location, and specifically puts `vol2-opener` and `vol2-s02` side by side, because those two images are the same street corner in two states and their framing is supposed to match exactly.

This is the tool for the audit pass. Clicking through four books will not reveal a face changing; a row of eleven thumbnails will.

## Order of operations

Steps 1 and 2 are blocking. Skipping them is the expensive mistake, because a face change after thirty images means thirty regenerations.

1. **Resolve the four flagged decisions in section 1 of the roster.** Two of them, the Vex conflict and the goggles collision, block the character lock outright. Do not proceed past this step by picking one yourself.
2. **Approve the style block.** Section 2 of the roster carries a proposal, not an approval.
3. **Generate and approve the 21 canonical references.** Thirteen characters, eight recurring locations, each from the style block plus its own immutable block alone, no scene, no action, neutral light. Record the exact prompt string, the seed if the generator exposes one, and the saved filename back into `roster.json`.
4. **Build the readers with placeholders and read all four books end to end.** This is the cheapest chance to catch a chunking problem. Everything after here gets more expensive.
5. **Assemble the prompt sheet.**
6. **Generate the 37 spread images in roster order.** Save with the exact slugs.
7. **Run the contact sheet audit.** Budget for regenerating two to six.
8. **Build.**

## Things not to do

**Do not edit the prose.** It is verbatim from source and it has been verified byte-identical, paragraph for paragraph, against the four source files. Not a typo fix, not a smoothed sentence, not a normalised quote mark. There is one em-dash in Volume 4 and it is flagged in the roster as an open author question; leave it exactly where it is.

**Do not improve an immutable block.** If a prompt reads clumsily at spread 20, that is the cost of the block being a constant. Rewriting it to be more evocative changes the character from that spread onward and there is no recovery except regeneration.

**Do not add a third named character to any image.** The ceiling is two and several spreads sit exactly at it. Where a scene has more people, the prompt already specifies the others as cropped, turned or thrown out of focus, and that phrasing is load-bearing rather than decorative.

**Do not put text inside an image.** The negative block excludes all lettering, and several prompts deliberately describe signage, screens and handwriting as present but illegible. That is the intended result, not a limitation to work around.

**Do not break the spoiler discipline if you regenerate anything.** Every spread carries a written spoiler check naming the final beat of its text page and confirming the image does not depict it. If you change an image's subject for any reason, rewrite that check and re-verify it. It is the cheapest quality control in the pipeline and it only works if it is written out rather than assumed.
