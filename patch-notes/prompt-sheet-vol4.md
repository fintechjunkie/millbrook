# The Patch Notes, Volume 4: image prompt sheet

Part Four: The Press Conference · 10 images · generated from the specs, do not hand-edit

Work through this one prompt at a time. Each entry gives the prompt as a single
copyable block, then the exact filename to save the result as. The filename is
not optional: the reader resolves images by slug from a flat directory, so
`vol1-s03.png` is the only name that will appear in the book.

Grouped by character in roster order rather than by spread number, so that drift
in a face is visible as a run. The spread number is on every entry.

## Before generating

- **21 canonical reference files do not exist**, so nothing is
  attached for them and their text descriptions are the only authority. Every
  such block says so explicitly. This is the reason characters drift: a prompt
  that claims a reference it does not have makes the description sound optional
  at the exact moment the description is all there is.

  Missing: `char-cardigan-canonical.png`, `char-carol-canonical.png`, `char-cassie-canonical.png`, `char-crane-canonical.png`, `char-dalton-canonical.png`, `char-felix-canonical.png`, `char-henderson-canonical.png`, `char-lena-canonical.png`, `char-milo-canonical.png`, `char-monke-canonical.png`, `char-owen-canonical.png`, `char-pip-canonical.png`, `char-vex-canonical.png`, `loc-corner-a.png`, `loc-corner-b.png`, `loc-hollow-pine-int.png`, `loc-pit.png`, `loc-residential.png`, `loc-square.png`, `loc-terminals.png`, `loc-vex-apartment.png`

  Generate them from `prompt-sheet-canonical.md`, drop them into
  `public/images/`, and re-run `npm run prompts`. Every affected prompt then
  switches to attaching the real file with no further edits.

- **4 roster decisions are open** and section 1 lists them:
    - RESOLVED 2026-07-28 — the reference sheet wins
    - Two goggle girls, introduced eleven pages apart
    - One em-dash in the source, Part 4
    - Pip's jacket, minor
  Vex is expanded below from the entry the roster marks ACTIVE, which is the
  prose version. If the reference sheet wins instead, every Vex prompt changes.
- **Aspect ratios were changed for the new page geometry.** Image pages are now
  `2:3` landscape and the chapter openers `4:3`.
  Some framing lines were written for a portrait frame and may want a human pass;
  they were deliberately not rewritten.

---

## LENA

Canonical reference: `char-lena-canonical.png` · approved: no

**Rendering note.** Her face is the book's emotional register and it shows every thought she has. Resist neutral expressions on her.

### [ ] vol4-s01 — spread 1

Shot type: Character portrait
Depicts: Beat 3. Lena and her aunt watching the announcement from two different rooms.
Spoiler check: PASS. Final beat is Felix saying the circle finishes today. Not depicted; the scene never leaves the house and no phone is in hand.
Named figures: Lena, Aunt Carol (2 of a maximum 2)

**Attach:** nothing. No named figure and no recurring location in this frame.

```
STYLE: Paper-Theater Millbrook (the project's locked style, reproduced below verbatim)

Paper-Theater Millbrook

A dimensional-looking but clearly handmade world assembled from flat painted paper shapes.

Character treatment
- Each character is built from layered, articulated paper forms.
- No realistic 3D modeling. Depth comes from overlaps, cut edges, and soft physical shadows.
- Faces use replaceable expression pieces, almost like a sophisticated paper puppet.
- Limbs remain long enough for readable full-body gestures.
- Signature objects are slightly exaggerated in size: Owen's phone, Felix's sandwich, Lena's satchel, Milo's glasses.

The result feels like a stop-motion series made from an eccentric community theater's scenery, but polished enough to support a full book.

Town treatment
- Fountain, bench, trees, storefronts, and pathways occupy separate depth planes.
- Paper seams and imperfect cut edges remain visible.
- Repeating objects may differ slightly. One bench slat is too short. One fountain tile is the wrong shade. One distant window has moved between scenes.
- This physical imperfection naturally supports Millbrook's patched reality.

Palette
Warm off-white paper base with subdued town colors and stronger character-specific accents. Printed pencil textures or dry brush may appear on the paper, but no glossy 3D surfaces.
CHARACTER: Lena. NO REFERENCE IMAGE IS ATTACHED FOR THIS CHARACTER. The description below is therefore the ONLY authority and every detail in it is required, not optional. Do not substitute, simplify or invent any feature of the face, hair, headwear or clothing.
An eighteen year old girl of average height and slight build, fair skin with a scatter of freckles across the nose and upper cheeks, an oval face with a soft jaw, large round brown eyes that read as startled even at rest, thin mobile eyebrows set high, a small slightly upturned nose, a wide expressive mouth, and orange hair of medium thickness pulled into two short side ponytails held with small plain hair ties, with wispy loose pieces standing up at the crown. A small oval pendant on a thin chain sits at her throat at all times.
Wardrobe, unchanged for this scene: Same orange collared shirt, visibly creased and slept in, satchel strap present
CHARACTER: Aunt Carol. NO REFERENCE IMAGE IS ATTACHED FOR THIS CHARACTER. The description below is therefore the ONLY authority and every detail in it is required, not optional. Do not substitute, simplify or invent any feature of the face, hair, headwear or clothing.
A woman in her late fifties, average height and heavyset, fair skin gone slack at the jaw, a broad face with deep lines at the mouth, tired hooded hazel eyes, sparse eyebrows, a broad nose, and a mouth that rests closed and level. Grey-brown hair cut short and practical. Reading glasses on a beaded chain around her neck, and a shapeless cardigan.
Wardrobe, unchanged for this scene: Shapeless cardigan over a housedress, reading glasses on their chain at the collarbone
SETTING: no reference image is attached, so the description below is the only authority for this place and every element in it is required.
A cramped living room with a sagging patterned couch, a doily-covered side table, a boxy older television on a low stand, and an open doorway through to the kitchen.
A girl sitting forward on the edge of a couch watching an unseen television off frame, and behind her in the kitchen doorway an older woman standing with a plate and a dish towel, drying a plate that is already dry, watching the same unseen screen. Neither looks at the other. Exactly two named figures in frame and no others. Television not in shot.
Interior, late morning.
Medium-wide two shot from beside the television, camera at seated height, moderate depth so both planes read.
Hard flickering screen light from off frame left as the key, warm kitchen light behind the older woman, the room between them dim.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol4-s01.png`** · aspect 3:2

Alt text, already written, do not regenerate: A girl sits forward on a couch watching an unseen television while an older woman dries a plate in the kitchen doorway behind her.

---

## ADMIRAL CRANE

Canonical reference: `char-crane-canonical.png` · approved: no

### [ ] vol4-s05 — spread 5

Shot type: Character portrait
Depicts: Beat 1. Crane, having stopped, before anything is offered.
Spoiler check: PASS. Final beat is the Mayor's speech breaking off mid-sentence. Not depicted; the Mayor is absent and no card is in frame.
Named figures: Admiral Crane (1 of a maximum 2)

**Attach:** nothing. No named figure and no recurring location in this frame.

```
STYLE: Paper-Theater Millbrook (the project's locked style, reproduced below verbatim)

Paper-Theater Millbrook

A dimensional-looking but clearly handmade world assembled from flat painted paper shapes.

Character treatment
- Each character is built from layered, articulated paper forms.
- No realistic 3D modeling. Depth comes from overlaps, cut edges, and soft physical shadows.
- Faces use replaceable expression pieces, almost like a sophisticated paper puppet.
- Limbs remain long enough for readable full-body gestures.
- Signature objects are slightly exaggerated in size: Owen's phone, Felix's sandwich, Lena's satchel, Milo's glasses.

The result feels like a stop-motion series made from an eccentric community theater's scenery, but polished enough to support a full book.

Town treatment
- Fountain, bench, trees, storefronts, and pathways occupy separate depth planes.
- Paper seams and imperfect cut edges remain visible.
- Repeating objects may differ slightly. One bench slat is too short. One fountain tile is the wrong shade. One distant window has moved between scenes.
- This physical imperfection naturally supports Millbrook's patched reality.

Palette
Warm off-white paper base with subdued town colors and stronger character-specific accents. Printed pencil textures or dry brush may appear on the paper, but no glossy 3D surfaces.
CHARACTER: Admiral Crane. NO REFERENCE IMAGE IS ATTACHED FOR THIS CHARACTER. The description below is therefore the ONLY authority and every detail in it is required, not optional. Do not substitute, simplify or invent any feature of the face, hair, headwear or clothing.
A man in his sixties, tall and very upright, thin, with pale weathered skin at the temples and around the eyes, which is the only part of his face visible because a pale blue medical mask covers everything from the bridge of the nose down and is never removed. Grey hair cut short and military. The visible eyes are pale, calm and tired, set in fine lines, under level grey eyebrows. He wears navy dress uniform with a dense block of ribbons and medals across the left breast, and he stands with both hands clasped behind his back.
Wardrobe, unchanged for this scene: Navy dress uniform, full medals, pale blue medical mask
SETTING: no reference image is attached, so the description below is the only authority for this place and every element in it is required.
A paved civic square in front of a squat 1960s municipal building of brick and glass, with a low permanent stage, a plain wooden podium, and space for rows of grey metal folding chairs.
Standing squared up and still with both hands clasped behind his back, chin level, the visible skin around the eyes calm and tired. Empty handed. Alone in frame.
Exterior, early afternoon.
Medium close shot, straight on at eye level, very shallow depth so the crowd behind reduces to soft shapes.
Hard overhead sun, sharp shadow under the brow and along the jaw, medals catching hard specular points.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol4-s05.png`** · aspect 3:2

Alt text, already written, do not regenerate: An older officer in navy dress uniform and a medical mask stands squared up with his hands clasped behind his back.

---

## MR HENDERSON

Canonical reference: `char-henderson-canonical.png` · approved: no

### [ ] vol4-s06 — spread 6

Shot type: Action moment
Depicts: Beat 6. Mr. Henderson getting up out of the front row.
Spoiler check: PASS. Final beat is the city reporter's expression. Not depicted; the reporter and her camera operator are not in frame.
Named figures: Mr. Henderson (1 of a maximum 2)

**Attach:** nothing. No named figure and no recurring location in this frame.

```
STYLE: Paper-Theater Millbrook (the project's locked style, reproduced below verbatim)

Paper-Theater Millbrook

A dimensional-looking but clearly handmade world assembled from flat painted paper shapes.

Character treatment
- Each character is built from layered, articulated paper forms.
- No realistic 3D modeling. Depth comes from overlaps, cut edges, and soft physical shadows.
- Faces use replaceable expression pieces, almost like a sophisticated paper puppet.
- Limbs remain long enough for readable full-body gestures.
- Signature objects are slightly exaggerated in size: Owen's phone, Felix's sandwich, Lena's satchel, Milo's glasses.

The result feels like a stop-motion series made from an eccentric community theater's scenery, but polished enough to support a full book.

Town treatment
- Fountain, bench, trees, storefronts, and pathways occupy separate depth planes.
- Paper seams and imperfect cut edges remain visible.
- Repeating objects may differ slightly. One bench slat is too short. One fountain tile is the wrong shade. One distant window has moved between scenes.
- This physical imperfection naturally supports Millbrook's patched reality.

Palette
Warm off-white paper base with subdued town colors and stronger character-specific accents. Printed pencil textures or dry brush may appear on the paper, but no glossy 3D surfaces.
CHARACTER: Mr. Henderson. NO REFERENCE IMAGE IS ATTACHED FOR THIS CHARACTER. The description below is therefore the ONLY authority and every detail in it is required, not optional. Do not substitute, simplify or invent any feature of the face, hair, headwear or clothing.
A man of eighty-one, tall and spare with square shoulders that have not entirely gone, tanned skin deeply lined across the forehead and at the eyes, a long face, kind pale blue eyes under heavy white brows, a strong nose, a thin mouth that goes up at one corner, and thick white hair combed back. He wears a plain button-down shirt tucked into khakis.
Wardrobe, unchanged for this scene: Button-down and khakis with brand new white running shoes, one of which still carries a price tag on the tongue
SETTING: no reference image is attached, so the description below is the only authority for this place and every element in it is required.
A paved civic square in front of a squat 1960s municipal building of brick and glass, with a low permanent stage, a plain wooden podium, and space for rows of grey metal folding chairs.
An old man rising out of a folding chair in the front row, one hand on the chair back, most of the way up, looking toward the stage off frame. Surrounding seated figures are turned away and thrown out of focus, no other face legible.
Exterior, early afternoon.
Medium shot from the side along the front row, camera at seated height, shallow depth.
Hard high sun from behind the stage, the man rim lit, his front in bounced fill off the paving.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol4-s06.png`** · aspect 3:2

Alt text, already written, do not regenerate: An elderly man rises out of a folding chair in the front row of an outdoor audience, one hand on the chair back.

---

## LOCATIONS AND OBJECTS, no named character

### [ ] vol4-opener — chapter opener

Shot type: Establishing (full bleed, both pages)
Depicts: The square being set up. No story beat.
Spoiler check: PASS. Chapter opener precedes all prose. Empty of people, so it gives away nothing about the conference itself.

**Attach:** nothing. No named figure and no recurring location in this frame.

```
STYLE: Paper-Theater Millbrook (the project's locked style, reproduced below verbatim)

Paper-Theater Millbrook

A dimensional-looking but clearly handmade world assembled from flat painted paper shapes.

Character treatment
- Each character is built from layered, articulated paper forms.
- No realistic 3D modeling. Depth comes from overlaps, cut edges, and soft physical shadows.
- Faces use replaceable expression pieces, almost like a sophisticated paper puppet.
- Limbs remain long enough for readable full-body gestures.
- Signature objects are slightly exaggerated in size: Owen's phone, Felix's sandwich, Lena's satchel, Milo's glasses.

The result feels like a stop-motion series made from an eccentric community theater's scenery, but polished enough to support a full book.

Town treatment
- Fountain, bench, trees, storefronts, and pathways occupy separate depth planes.
- Paper seams and imperfect cut edges remain visible.
- Repeating objects may differ slightly. One bench slat is too short. One fountain tile is the wrong shade. One distant window has moved between scenes.
- This physical imperfection naturally supports Millbrook's patched reality.

Palette
Warm off-white paper base with subdued town colors and stronger character-specific accents. Printed pencil textures or dry brush may appear on the paper, but no glossy 3D surfaces.
SETTING: no reference image is attached, so the description below is the only authority for this place and every element in it is required.
A paved civic square in front of a squat 1960s municipal building of brick and glass, with a low permanent stage, a plain wooden podium, and space for rows of grey metal folding chairs.
Rows of empty folding chairs set out in front of a bare podium, a large banner rigged behind the stage but seen almost edge on so that no lettering is legible. No figures anywhere.
Exterior, early morning before the event.
Wide establishing shot from behind the last row of chairs, low camera, deep focus.
Cool flat early light, long chair shadows raking across the paving.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 2:1
```

Save as: **`vol4-opener.png`** · aspect 2:1

Alt text, already written, do not regenerate: Rows of empty folding chairs face a bare podium in a town square early in the morning, a banner rigged edge-on behind.

---

### [ ] vol4-s02 — spread 2

Shot type: Object or detail
Depicts: Beat 2. Felix's countdown device on the bench after twelve hours of work.
Spoiler check: PASS. Final beat is Pip naming the Mayor as the next patch. Not depicted; no figures in frame and the device shows no readable numerals.

**Attach:** nothing. No named figure and no recurring location in this frame.

```
STYLE: Paper-Theater Millbrook (the project's locked style, reproduced below verbatim)

Paper-Theater Millbrook

A dimensional-looking but clearly handmade world assembled from flat painted paper shapes.

Character treatment
- Each character is built from layered, articulated paper forms.
- No realistic 3D modeling. Depth comes from overlaps, cut edges, and soft physical shadows.
- Faces use replaceable expression pieces, almost like a sophisticated paper puppet.
- Limbs remain long enough for readable full-body gestures.
- Signature objects are slightly exaggerated in size: Owen's phone, Felix's sandwich, Lena's satchel, Milo's glasses.

The result feels like a stop-motion series made from an eccentric community theater's scenery, but polished enough to support a full book.

Town treatment
- Fountain, bench, trees, storefronts, and pathways occupy separate depth planes.
- Paper seams and imperfect cut edges remain visible.
- Repeating objects may differ slightly. One bench slat is too short. One fountain tile is the wrong shade. One distant window has moved between scenes.
- This physical imperfection naturally supports Millbrook's patched reality.

Palette
Warm off-white paper base with subdued town colors and stronger character-specific accents. Printed pencil textures or dry brush may appear on the paper, but no glossy 3D surfaces.
SETTING: no reference image is attached, so the description below is the only authority for this place and every element in it is required.
A workbench end of the same warehouse, scarred plywood top under a clamp lamp, hand tools on a pegboard, part-built devices in various states, solder spool, scorch marks.
A handmade device on a scarred workbench, roughly the size and shape of a kitchen timer crossed with a smoke detector, hand-cut casing, exposed wire loops, a small dark display panel with no legible characters. Around it, solder spool, cutters, a cold half-drunk mug. No figures.
Interior, morning.
Close shot, camera low and level with the bench, very shallow depth on the display panel.
Single clamp lamp from the upper left, hard small shadows, dust visible.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol4-s02.png`** · aspect 3:2

Alt text, already written, do not regenerate: A handmade device the size of a kitchen timer sits on a scarred workbench among solder and tools.

---

### [ ] vol4-s03 — spread 3

Shot type: Action moment
Depicts: Beat 6. The kid on the bike going past with a backpack too big for him.
Spoiler check: PASS. Final beat is Lena sitting with what Pip has told her. Not depicted; the two seated figures are cropped and out of focus and the image carries none of the conversation.

**Attach:** nothing. No named figure and no recurring location in this frame.

```
STYLE: Paper-Theater Millbrook (the project's locked style, reproduced below verbatim)

Paper-Theater Millbrook

A dimensional-looking but clearly handmade world assembled from flat painted paper shapes.

Character treatment
- Each character is built from layered, articulated paper forms.
- No realistic 3D modeling. Depth comes from overlaps, cut edges, and soft physical shadows.
- Faces use replaceable expression pieces, almost like a sophisticated paper puppet.
- Limbs remain long enough for readable full-body gestures.
- Signature objects are slightly exaggerated in size: Owen's phone, Felix's sandwich, Lena's satchel, Milo's glasses.

The result feels like a stop-motion series made from an eccentric community theater's scenery, but polished enough to support a full book.

Town treatment
- Fountain, bench, trees, storefronts, and pathways occupy separate depth planes.
- Paper seams and imperfect cut edges remain visible.
- Repeating objects may differ slightly. One bench slat is too short. One fountain tile is the wrong shade. One distant window has moved between scenes.
- This physical imperfection naturally supports Millbrook's patched reality.

Palette
Warm off-white paper base with subdued town colors and stronger character-specific accents. Printed pencil textures or dry brush may appear on the paper, but no glossy 3D surfaces.
SETTING: no reference image is attached, so the description below is the only authority for this place and every element in it is required.
The outside of a low brick industrial building on a quiet back street, a roller shutter door, a concrete kerb, weeds at the base of the wall.
A young child riding a bicycle past on the road with a backpack visibly too large for him, one hand off the bars in a wave, caught mid pedal. In the near foreground, cropped at the bottom of frame and thrown well out of focus, the shoulders of two figures seated on a curb, faces not visible.
Exterior, early afternoon.
Medium-wide shot from the curb, camera very low, shallow depth holding the cyclist sharp.
High hard afternoon sun, short crisp shadows on the asphalt.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol4-s03.png`** · aspect 3:2

Alt text, already written, do not regenerate: A child on a bicycle with an oversized backpack waves as he rides past, seen over two out-of-focus figures sitting on a curb.

---

### [ ] vol4-s04 — spread 4

Shot type: Establishing or location
Depicts: Beat 1. The square at quarter past two, filling up.
Spoiler check: PASS. Final beat is Crane crossing the stage to stop in front of Lena. Not depicted; the stage is unoccupied and no uniformed figure is present.

**Attach:** nothing. No named figure and no recurring location in this frame.

```
STYLE: Paper-Theater Millbrook (the project's locked style, reproduced below verbatim)

Paper-Theater Millbrook

A dimensional-looking but clearly handmade world assembled from flat painted paper shapes.

Character treatment
- Each character is built from layered, articulated paper forms.
- No realistic 3D modeling. Depth comes from overlaps, cut edges, and soft physical shadows.
- Faces use replaceable expression pieces, almost like a sophisticated paper puppet.
- Limbs remain long enough for readable full-body gestures.
- Signature objects are slightly exaggerated in size: Owen's phone, Felix's sandwich, Lena's satchel, Milo's glasses.

The result feels like a stop-motion series made from an eccentric community theater's scenery, but polished enough to support a full book.

Town treatment
- Fountain, bench, trees, storefronts, and pathways occupy separate depth planes.
- Paper seams and imperfect cut edges remain visible.
- Repeating objects may differ slightly. One bench slat is too short. One fountain tile is the wrong shade. One distant window has moved between scenes.
- This physical imperfection naturally supports Millbrook's patched reality.

Palette
Warm off-white paper base with subdued town colors and stronger character-specific accents. Printed pencil textures or dry brush may appear on the paper, but no glossy 3D surfaces.
SETTING: no reference image is attached, so the description below is the only authority for this place and every element in it is required.
A paved civic square in front of a squat 1960s municipal building of brick and glass, with a low permanent stage, a plain wooden podium, and space for rows of grey metal folding chairs.
Around forty people in folding chairs seen from behind, an unoccupied podium and stage beyond them, a rigged banner turned so its lettering is not legible. In the near foreground a camera tripod, unattended. All seated figures are distant, backs turned, no faces legible.
Exterior, early afternoon.
Wide establishing shot from behind the back row, camera at standing height, deep focus.
Hard high sun, chairs and heads throwing short shadows forward.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol4-s04.png`** · aspect 3:2

Alt text, already written, do not regenerate: Forty people seen from behind in folding chairs facing an empty podium and stage, a camera tripod in the foreground.

---

### [ ] vol4-s07 — spread 7

Shot type: Object or detail
Depicts: Beat 3. Room made in the corner. Owen's cans moved without comment.
Spoiler check: PASS. Final beat is Lena's recorded line about not asking permission. Not depicted; no figures, no camera, nothing recording.

**Attach:** nothing. No named figure and no recurring location in this frame.

```
STYLE: Paper-Theater Millbrook (the project's locked style, reproduced below verbatim)

Paper-Theater Millbrook

A dimensional-looking but clearly handmade world assembled from flat painted paper shapes.

Character treatment
- Each character is built from layered, articulated paper forms.
- No realistic 3D modeling. Depth comes from overlaps, cut edges, and soft physical shadows.
- Faces use replaceable expression pieces, almost like a sophisticated paper puppet.
- Limbs remain long enough for readable full-body gestures.
- Signature objects are slightly exaggerated in size: Owen's phone, Felix's sandwich, Lena's satchel, Milo's glasses.

The result feels like a stop-motion series made from an eccentric community theater's scenery, but polished enough to support a full book.

Town treatment
- Fountain, bench, trees, storefronts, and pathways occupy separate depth planes.
- Paper seams and imperfect cut edges remain visible.
- Repeating objects may differ slightly. One bench slat is too short. One fountain tile is the wrong shade. One distant window has moved between scenes.
- This physical imperfection naturally supports Millbrook's patched reality.

Palette
Warm off-white paper base with subdued town colors and stronger character-specific accents. Printed pencil textures or dry brush may appear on the paper, but no glossy 3D surfaces.
SETTING: no reference image is attached, so the description below is the only authority for this place and every element in it is required.
The desk end of the same warehouse: a long trestle desk against a brick wall carrying three monitors on stacked books, a mechanical keyboard, cable runs stapled along the wall, and a row of dented energy drink cans.
A cleared corner of desk where a row of dented energy drink cans has been pushed tightly to one side to open a rectangle of bare surface, a small closed laptop set down in the new space, a cable already run to it along the wall. No figures.
Interior, night.
Close shot, camera low and level with the desk, shallow depth on the gap between the cans and the laptop.
Cold spill from unseen monitors off to the right, one warm lamp far behind.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol4-s07.png`** · aspect 3:2

Alt text, already written, do not regenerate: Dented energy drink cans pushed tightly to one side of a desk to make room for a small closed laptop.

---

### [ ] vol4-s08 — spread 8

Shot type: Atmospheric or empty
Depicts: Beat 4. The hotel room the last view comes from.
Spoiler check: PASS. Final beat is the woman in the bookshop looking up at nothing. Not depicted; the bookshop does not appear.

**Attach:** nothing. No named figure and no recurring location in this frame.

```
STYLE: Paper-Theater Millbrook (the project's locked style, reproduced below verbatim)

Paper-Theater Millbrook

A dimensional-looking but clearly handmade world assembled from flat painted paper shapes.

Character treatment
- Each character is built from layered, articulated paper forms.
- No realistic 3D modeling. Depth comes from overlaps, cut edges, and soft physical shadows.
- Faces use replaceable expression pieces, almost like a sophisticated paper puppet.
- Limbs remain long enough for readable full-body gestures.
- Signature objects are slightly exaggerated in size: Owen's phone, Felix's sandwich, Lena's satchel, Milo's glasses.

The result feels like a stop-motion series made from an eccentric community theater's scenery, but polished enough to support a full book.

Town treatment
- Fountain, bench, trees, storefronts, and pathways occupy separate depth planes.
- Paper seams and imperfect cut edges remain visible.
- Repeating objects may differ slightly. One bench slat is too short. One fountain tile is the wrong shade. One distant window has moved between scenes.
- This physical imperfection naturally supports Millbrook's patched reality.

Palette
Warm off-white paper base with subdued town colors and stronger character-specific accents. Printed pencil textures or dry brush may appear on the paper, but no glossy 3D surfaces.
SETTING: no reference image is attached, so the description below is the only authority for this place and every element in it is required.
A tidy budget hotel room, one made double bed, a laminate desk, a wall-mounted television, and an open closet alcove with a hanging rail.
A tidy budget hotel room at night, a navy dress uniform jacket heavy with medals hanging in an open closet, an open laptop on the made bed throwing light at the ceiling, screen content not legible. No figures present.
Interior, late night.
Medium-wide shot from the doorway, camera at standing height, deep focus.
Laptop glow as the main source from low on the bed, one weak bedside lamp, the closet in cold half light.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol4-s08.png`** · aspect 3:2

Alt text, already written, do not regenerate: A tidy hotel room at night with a medal-heavy navy uniform hanging in an open closet and an open laptop glowing on the bed.

---

### [ ] vol4-s09 — spread 9

Shot type: Atmospheric or empty
Depicts: The counter after the lights go off. Setting and object only.
Spoiler check: PASS. Final beat is Monke returning to the shelf to wait for morning. Not depicted; no animal appears in frame at all, and the drawer is shut.

**Attach:** nothing. No named figure and no recurring location in this frame.

```
STYLE: Paper-Theater Millbrook (the project's locked style, reproduced below verbatim)

Paper-Theater Millbrook

A dimensional-looking but clearly handmade world assembled from flat painted paper shapes.

Character treatment
- Each character is built from layered, articulated paper forms.
- No realistic 3D modeling. Depth comes from overlaps, cut edges, and soft physical shadows.
- Faces use replaceable expression pieces, almost like a sophisticated paper puppet.
- Limbs remain long enough for readable full-body gestures.
- Signature objects are slightly exaggerated in size: Owen's phone, Felix's sandwich, Lena's satchel, Milo's glasses.

The result feels like a stop-motion series made from an eccentric community theater's scenery, but polished enough to support a full book.

Town treatment
- Fountain, bench, trees, storefronts, and pathways occupy separate depth planes.
- Paper seams and imperfect cut edges remain visible.
- Repeating objects may differ slightly. One bench slat is too short. One fountain tile is the wrong shade. One distant window has moved between scenes.
- This physical imperfection naturally supports Millbrook's patched reality.

Palette
Warm off-white paper base with subdued town colors and stronger character-specific accents. Printed pencil textures or dry brush may appear on the paper, but no glossy 3D surfaces.
SETTING: no reference image is attached, so the description below is the only authority for this place and every element in it is required.
The interior of a settled second-hand bookshop, floor-to-ceiling wooden shelving, worn overlapping rugs on board floors, a wooden counter with a low lamp, warm lampshades, a stack of cookbooks with a high shelf above it.
The shop counter in the dark after closing, one shallow drawer shut tight with a small brass keyhole in the front, a cordless handset absent from its place. No glow of any kind. No figures and no animal in frame.
Interior, three in the morning.
Close shot at counter height, slight angle across the drawer front, shallow depth on the keyhole.
One narrow shaft of streetlight through the shopfront falling across the drawer, everything else in deep shadow.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol4-s09.png`** · aspect 3:2

Alt text, already written, do not regenerate: A shop counter drawer shut tight with a small brass keyhole, lit by a single narrow shaft of streetlight in a dark store.

---
