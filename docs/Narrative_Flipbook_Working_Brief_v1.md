# Narrative Flip Books: Working Brief v1

**A method for turning a work of fiction into an illustrated flip book, where an ingest window produces a markdown spec and Claude Code builds the reader plus an image prompt sheet.**

This document is the equivalent of a production bible. It is written to be handed to two different consumers: the **ingest window**, which reads the story and writes the spec, and **Claude Code**, which reads the spec and builds the artifact. Both should read all of it, because most of the failure modes live at the seam between them.

---

# PART A: WHAT THIS FORMAT IS

A flip book with physical page-turn mechanics. The reader opens it to a **two-page view** and turns through the story one spread at a time.

**Every spread is one page of prose and one image.** Text on the left, image on the right, fixed for the whole book. The only exception is a chapter opener, which may run a full-bleed image across both pages with the chapter title.

Fixed placement rather than alternating. Alternating looks more dynamic in a design mock and it costs the reader a moment of orientation on every single turn, which across two hundred spreads is a lot of friction spent on decoration.

**The core consequence of the two-page view, and the thing most illustrated fiction gets wrong.** Both pages are visible simultaneously, and the right page is seen first, before a single word is read. The image is therefore not an illustration of the text. It is a thing the reader encounters *before* the text. Every rule in Part C follows from this.

**What this format is good at:** Atmosphere, place, faces, scale, and the pause before a turn. The image gives the reader a room to stand in while they read.

**What this format is bad at:** Plot mechanics, dialogue-heavy exchanges, and anything where the pace should accelerate. A page turn is a speed limit. Fast sequences will feel slower than the prose intends and there is no fixing that with better images.

---

# PART B: CHUNKING THE PROSE

This is the least glamorous part of the job and the one that determines whether the book reads well.

## B1. The unit

**220 to 320 words per text page.** Below 200 the page looks under-set and the turn arrives too often. Above 340 the page becomes a wall and the facing image starts to feel decorative.

Target the middle. Let the story override the target where it needs to: a 160-word page that lands on a hard beat is better than a padded 260-word page, and an occasional short page is a rhythm instrument.

## B2. Where to cut

Ranked. Always cut at the highest available option.

1. **A beat boundary.** The end of a small unit of action or realisation.
2. **A paragraph boundary.**
3. **A sentence boundary.**
4. Never mid-sentence. Printed novels break mid-sentence constantly and it is fine there, because the page is not a composed unit. Here each spread is composed against an image, so a sentence severed by a turn reads as an error rather than as flow.

## B3. The last line of every page is doing work

Because the turn is a pause, the final line of each text page is the most emphasised sentence on it. This is free and most adaptations waste it.

**Cadence, not constant tension.** A book where every page ends on a hook is exhausting and the hooks stop registering by spread twenty. Aim for roughly this mix:

- **Most pages** end on a soft pull: an unanswered question, a shift in attention, a line with a slight forward lean.
- **Roughly one in six** ends on a hard hook.
- **A few, deliberately,** end on rest. A closed beat, a settled image, nothing pulling. These are what make the hard hooks work.

## B4. The prose is not yours to edit

**The ingest window transcribes verbatim. It does not rewrite, trim, smooth, modernise, or fix the author's prose.**

If a passage genuinely cannot be chunked without damage, for example a three-thousand-word unbroken sequence, do not solve it by cutting the prose. Flag it in the spec with a note and propose options for the author to choose between. Same discipline as a contested figure: surface it, do not silently resolve it.

Exception, and only this one: obvious typographic artifacts from the source file, such as doubled spaces, broken smart quotes, or stray line breaks mid-sentence.

## B5. Arithmetic to run before anything else

Word count divided by 270 gives the approximate spread count, and therefore the image count.

| Story length | Spreads | Images |
|---|---|---|
| 5,000 words | ~19 | ~19 |
| 20,000 words | ~74 | ~74 |
| 50,000 words | ~185 | ~185 |
| 90,000 words | ~333 | ~333 |

**Run this number first and look at it honestly.** At novel length this is a serious image production undertaking with character consistency required across hundreds of generations. If the number is uncomfortable, the fork is named in Part H.

---

# PART C: WHAT EARNS AN IMAGE, AND WHAT THE IMAGE MAY SHOW

## C1. The spoiler rule

**The image may depict any beat on the facing page except the last one.**

This is the single most important rule in the document and it is the one that is easiest to break by accident, because the instinct is to illustrate the most striking moment on the page, and the most striking moment is usually at the end.

The reader sees the image before reading a word. An image of a character finding the letter, facing a page whose final line is the discovery of the letter, has destroyed the beat. The prose spent 280 words building to something the art gave away for free.

Safe subjects, always: the opening beat of the facing page, a character portrait, a location, an object, weather, an atmospheric register. Unsafe: anything from the final third of the page, and absolutely anything from the last paragraph.

**Corollary.** Where the whole page is one continuous rising action to a single terminal beat, do not illustrate the action at all. Illustrate the place it happens in, empty, before anyone arrives. That is frequently the better image anyway.

## C2. The redundancy rule

**Text and image should not carry the same information.**

If the prose says the tower stood black against a bleached sky, do not render the tower black against a bleached sky. The reader has already had that image, delivered better, in their own head.

A workable division of labour:

- **Prose owns** interiority, dialogue, motive, time, causation, and anything a character knows.
- **Image owns** space, scale, weather, texture, distance, and faces.

The best images in this format show the thing the prose declined to describe. If the author spent the page inside a character's head during a conversation, the image is the room they are sitting in, which the prose never mentioned. If the author spent the page describing a landscape in detail, the image is the character's face while looking at it.

## C3. Shot variety

Every image being a medium shot of a person is the default failure and it is deadening by spread ten. Prescribe a mix and track it across the book.

| Type | Share | What it does |
|---|---|---|
| Establishing or location | 20 to 25% | Gives the reader a place to stand |
| Character portrait or close | 25 to 30% | Anchors identity and emotion |
| Object or detail | 15 to 20% | Cheapest to keep consistent, high atmosphere |
| Action moment | 15 to 20% | Use sparingly, subject to the spoiler rule |
| Atmospheric or empty | 15 to 20% | Weather, light, an empty room, breathing space |

**Never three consecutive spreads of the same type.** The ingest window should check this and report the running mix in the spec.

**Object and detail images are strategically valuable** beyond composition. They contain no faces, so they cannot drift, and they cost nothing to keep consistent. When the image count is high, they are the release valve.

## C4. Multi-character images

**Ceiling: two named characters in a single image.** Three or more will fail at consistency and will keep failing no matter how the prompt is written.

Where a scene has four people at a table, render one of them in the foreground with the others as unfocused or turned figures, and say so explicitly in the prompt. Unnamed background figures are free. Named ones are not.

---

# PART D: THE CHARACTER LOCK SYSTEM

This is the part that determines whether the book looks like one book. It is also the part where most projects fail, and they fail for a boring reason: the prompts drift because a human keeps improving them.

## D1. The immutable and mutable split

Every character gets one entry with two blocks.

**Immutable block.** Written once, approved once, and **pasted verbatim into every single prompt in which the character appears.** Never paraphrased. Never reordered. Never expanded for a particular scene.

Contains: apparent age, build and height, skin tone, face shape, eye colour and shape, eyebrows, nose, mouth, hair colour and texture and length, and any permanent distinguishing feature such as a scar, a gap, a birthmark, or glasses.

**Mutable block.** Varies by scene and is written into the scene line, not the character token.

Contains: expression, wardrobe, hair styling, dirt or injury or wetness, posture, and what the character is doing.

The split exists because generators drift on whatever you rephrase. If the immutable string is byte-identical across three hundred prompts, the face has a fighting chance. If it is "improved" in spread 40, the character changes in spread 40.

## D2. Token substitution

Characters are referenced in the spec by token, exactly the way the sourcing tokens worked in the other project. The spec never writes a character description inline.

```
{{CHAR:MARA}}
{{CHAR:ELIAS}}
{{LOC:LIGHTHOUSE_INTERIOR}}
{{STYLE}}
```

Claude Code expands these at prompt-assembly time from a single roster block at the top of the file. One roster, one source of truth, and a change to a character's hair propagates to every prompt in one edit instead of three hundred.

**Hard rule for both the ingest window and Claude Code: no descriptive adjective about a locked character may appear anywhere except inside the roster entry.** If a scene needs a detail that is not in the roster, the roster gets amended first and the amendment propagates. Nobody adds it locally.

## D3. Wardrobe continuity by story segment

Characters must not change clothes between two images of the same afternoon, and this is a mistake that is very easy to make when generating spread 12 on Tuesday and spread 19 on Thursday.

Define **wardrobe states** keyed to story time, and attach each spread to a state.

```
{{WARDROBE:MARA_A}}  Chapters 1 to 4, the journey out
{{WARDROBE:MARA_B}}  Chapter 5, the storm, same clothes soaked and torn at the left cuff
{{WARDROBE:MARA_C}}  Chapters 6 onward, borrowed clothes
```

State B being explicitly a damaged version of A rather than a new description is the pattern to follow. It keeps the continuity legible to a reader who is paying attention, and those are the readers who matter.

## D4. Canonical reference images

**Generate these before any spread work begins.** This is a blocking step.

For each named character: one canonical portrait, generated from the style block plus the immutable block alone, with no scene, no action, and neutral light. Iterate until it is right. Approve it. Then record, in the roster entry:

- The exact prompt string that produced it
- The seed, if the generator exposes seeds
- The saved filename of the approved image

Every subsequent prompt for that character carries the approved image as a reference input where the generator supports image reference, and reuses the seed where it supports seeds. The prompt text alone will not hold a face across a novel. The reference image is what does the work.

Do the same for each recurring location: one canonical establishing image, approved, referenced thereafter.

## D5. Generate in roster order, not story order

Counterintuitive and it matters. Once the spread map is approved, generate **all of one character's images consecutively**, then move to the next character. Drift is far easier to see when you are looking at twenty images of the same face in a row than when they are scattered across a story.

Then run a **consistency audit pass**: lay every image of each character side by side and look for the face changing. Expect to regenerate somewhere between five and fifteen percent. Budget for it rather than being surprised by it.

## D6. Prompt element order is fixed

Generators are sensitive to order, so the order is part of the lock. Every prompt, without exception:

```
[STYLE BLOCK]
[CHARACTER IMMUTABLE BLOCK, or LOCATION BLOCK]
[MUTABLE STATE: wardrobe, condition, expression]
[ACTION]
[SETTING and TIME OF DAY]
[FRAMING and SHOT TYPE]
[LIGHTING]
[NEGATIVE CONSTRAINTS]
[ASPECT RATIO]
```

Claude Code assembles in this order every time. It does not optimise, rearrange, or condense for a particular subject.

---

# PART E: THE STYLE BLOCK

Currently unresolved and **blocking on all image work.**

When the style is settled it becomes a single verbatim string, reproduced identically at the head of every prompt. It is not a description of a style, it is a fixed incantation, and it does not get tuned per image.

It should specify medium, rendering technique, palette constraint, line treatment, level of detail, and mood. It should not specify subject matter, framing, or lighting, because those vary per spread and belong in later blocks.

Until it lands, the ingest window writes `{{STYLE}}` and everything downstream still works. The subject blocks, framing, and negatives are all style-independent, so a style change late in the process costs one roster edit rather than a rewrite. **Build the spec now, lock the style in parallel.**

Also standing: a **negative constraint block**, also verbatim on every prompt. Typically excluding text and lettering in the image, watermarks, extra limbs, multiple faces where one is specified, modern objects in a period setting, and whatever specific artifacts the chosen style produces. This one grows during production as failures reveal themselves, so it lives in the roster and propagates.

---

# PART F: THE MARKDOWN SPEC

What the ingest window produces and Claude Code consumes. One file per book, or per volume if the book is long.

## F1. Front matter

```markdown
# [Title]: Flip Book Spec
Source: [filename of the story]
Spreads: [n]  Images: [n]  Words: [n]
Spec version: [n]  Date: [date]

## Style
{{STYLE}} = [verbatim string, or PENDING]
{{NEGATIVE}} = [verbatim string]
Aspect ratio: [portrait ratio for the image page]

## Character roster
### {{CHAR:MARA}}
Immutable: [one paragraph, verbatim in every prompt]
Canonical reference: mara-canonical.png
Seed: [n or none]
Approved: [yes or no]
Wardrobe states:
- {{WARDROBE:MARA_A}} = [description] · Chapters 1 to 4
- {{WARDROBE:MARA_B}} = [description] · Chapter 5

## Location roster
### {{LOC:LIGHTHOUSE_INTERIOR}}
Block: [one paragraph, verbatim in every prompt]
Canonical reference: loc-lighthouse-interior.png

## Shot mix running total
Establishing [n] · Portrait [n] · Object [n] · Action [n] · Atmospheric [n]
```

## F2. Per-spread block

Repeated once per spread. This is the whole payload.

```markdown
---
## Spread 12
Pages 23 to 24 · Chapter 3 · Words 274

### Text page (left)
[The prose, verbatim from source, exactly as it appears.
No summary. No paraphrase. Line breaks and paragraphing preserved.]

### Image page (right)
Slug: spread-12-image
Shot type: Object or detail
Depicts: Beat 1 of this page, the coat on the hook by the door
Spoiler check: PASS · Final beat of this page is the sound on the stair, not depicted

Prompt:
{{STYLE}}
{{LOC:COTTAGE_HALL}}
A heavy wet wool coat hanging on an iron hook, water pooling on flagstones beneath it.
No figures present.
Interior, late afternoon.
Close, slightly low angle, shallow depth.
Single cold window light from the left.
{{NEGATIVE}}
Aspect ratio: 2:3

Alt text: A wet wool coat hangs on an iron hook above a small pool of water on a stone floor.
```

## F3. Rules the ingest window must satisfy

- Prose verbatim. Any place it wanted to edit is flagged, not fixed.
- Every spread carries an explicit **spoiler check** naming the final beat of the page and confirming the image does not depict it. This is a one-line self-audit and it is the cheapest quality control in the pipeline.
- No character or location described inline. Tokens only.
- Shot type declared, and the running mix reported in front matter.
- No three consecutive spreads of the same shot type.
- Two named characters maximum per image.
- Alt text written for every image, describing what is depicted rather than what it means.
- Chapter openers marked as such, since they render differently.

---

# PART G: WHAT CLAUDE CODE BUILDS

Three outputs.

## G1. The prompt sheet

A standalone numbered document the person works through one prompt at a time. This is what the user asked for and it should be built to be used, not read.

For each image: the spread number, the assembled prompt with every token expanded, the reference image to attach if any, the seed if any, and **the exact filename to save the result as**, matching the slug in the spec. Deterministic naming is what lets the reader find the files.

Grouped by character in roster order rather than by spread number, per D5. Include a checkbox column, because at two hundred images the person needs to know where they stopped.

## G2. The reader

Physical page-turn mechanics, matching the flip book reader already built in the other project: page-curl animation, paper grain, visible edge stacks. Text page and image page composed as one spread. Keyboard and swipe navigation, a spread counter, and chapter jump.

**Two behaviours that matter more than they sound.** It must render gracefully with images missing, showing a labelled placeholder with the slug, because the text will be complete long before three hundred images exist and the book must be readable throughout production. And image files load by slug from a single directory, so dropping a regenerated file in place updates the book with no code change.

## G3. The consistency contact sheet

A build-time page, not part of the reader. Every image of a given character, laid out together at thumbnail size, one row per character. This is the tool for the D5 audit pass and it makes drift obvious in a way that clicking through a book never will.

---

# PART H: ORDER OF OPERATIONS

The sequence matters. Steps 1 and 2 are blocking and skipping them is the expensive mistake.

1. **Lock the style.** In progress. Blocks all image work and nothing else.
2. **Lock characters and locations.** Write the immutable blocks. Generate canonical references. Approve them. Record seeds. **Do not begin spread work until faces are approved,** because a face change after two hundred images means two hundred regenerations.
3. **Chunk the story and produce the spread map.** Text placement, shot types, spoiler checks. Deliver for approval before writing a single prompt. Cheap to change here, expensive later.
4. **Assemble the prompt sheet.**
5. **Generate images in roster order.** Save with the exact slugs.
6. **Run the consistency audit.** Regenerate the drifters.
7. **Build.**

## Two forks worth deciding early

**Image density at length.** The format specifies one image per spread, which at novel length is three hundred plus images. If that number is not viable, the honest alternative is not fewer images per spread, it is **a higher object and atmospheric share in the mix**, since those are the ones that neither drift nor require reference chaining. Pushing objects and atmospheric to fifty percent combined roughly halves the hard image count without changing the format the reader experiences.

**Volume splitting.** Above roughly one hundred and fifty spreads, split into volumes at act boundaries. Smaller files, faster builds, and character rosters that stay legible.

---

# PART I: FAILURE MODES

Named so they can be checked for rather than discovered late.

**The spoiler.** The most common and the most damaging. Prevented only by the per-spread spoiler check being written out rather than assumed.

**Prompt improvement.** Somebody, quite possibly Claude Code, rewrites an immutable block to be more evocative on spread 60. The character changes. There is no recovery except regeneration. The immutable block is a constant, not a draft.

**The talking heads book.** Every image a medium portrait. Caught by tracking the shot mix in front matter, not by good intentions.

**Wardrobe teleportation.** Two images of the same hour, different clothes. Prevented by wardrobe states keyed to story time.

**Silent prose editing.** The ingest window smooths a clumsy sentence. It is not the window's sentence. Flag, never fix.

**Composition drift at the group scene.** Four named characters in one frame. Prevented by the hard ceiling of two.

**Filename divergence.** The person saves an image as `mara2.png` and the reader looks for `spread-12-image.png`. Prevented by the prompt sheet stating the filename on every entry, and by the reader showing labelled placeholders so the gap is visible immediately.
