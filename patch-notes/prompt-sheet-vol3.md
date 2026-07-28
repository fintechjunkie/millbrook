# The Patch Notes, Volume 3: image prompt sheet

Part Three: Mr. Henderson's Knee · 9 images · generated from the specs, do not hand-edit

Work through this one prompt at a time. Each entry gives the prompt as a single
copyable block, then the exact filename to save the result as. The filename is
not optional: the reader resolves images by slug from a flat directory, so
`vol1-s03.png` is the only name that will appear in the book.

Grouped by character in roster order rather than by spread number, so that drift
in a face is visible as a run. The spread number is on every entry.

## Before generating

- **20 canonical reference files do not exist**, so nothing is
  attached for them and their text descriptions are the only authority. Every
  such block says so explicitly. This is the reason characters drift: a prompt
  that claims a reference it does not have makes the description sound optional
  at the exact moment the description is all there is.

  Missing: `char-cardigan-canonical.png`, `char-carol-canonical.png`, `char-cassie-canonical.png`, `char-dalton-canonical.png`, `char-felix-canonical.png`, `char-henderson-canonical.png`, `char-lena-canonical.png`, `char-milo-canonical.png`, `char-monke-canonical.png`, `char-owen-canonical.png`, `char-pip-canonical.png`, `char-vex-canonical.png`, `loc-corner-a.png`, `loc-corner-b.png`, `loc-hollow-pine-int.png`, `loc-pit.png`, `loc-residential.png`, `loc-square.png`, `loc-terminals.png`, `loc-vex-apartment.png`

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

## VEX

Canonical reference: `char-vex-canonical.png` · approved: yes

### [ ] vol3-s05 — spread 5

Shot type: Character portrait
Depicts: Beat 1. Vex on her feet in the Pit, ending the two-team argument.
Spoiler check: PASS. Final beat is Mr. Henderson thinking while the porch swing creaks. Not depicted; the scene never leaves the warehouse.
Named figures: Vex (1 of a maximum 2)

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
CHARACTER: Vex. NO REFERENCE IMAGE IS ATTACHED FOR THIS CHARACTER. The description below is therefore the ONLY authority and every detail in it is required, not optional. Do not substitute, simplify or invent any feature of the face, hair, headwear or clothing.
A short and wiry eighteen year old girl, warm brown skin with freckles across the cheeks, a round face with a pointed chin, large dark eyes usually narrowed, straight dark eyebrows, a small nose, and a mouth set like it is about to say something rude. Her hair is bright mint green, worn in two messy buns high on either side of the head, held with a small red hair tie. She wears a black leather jacket with silver zippers over a plain black shirt. No cap and no goggles.
Wardrobe, unchanged for this scene: black leather jacket with silver zippers over plain black shirt, mint-green buns tied with red
SETTING: no reference image is attached, so the description below is the only authority for this place and every element in it is required.
The lounge end of a converted warehouse interior: four mismatched couches sagging in the middle arranged around a low scarred coffee table on bare concrete, a wall of three salvaged televisions behind them, a high shelf on the wall above, exposed steel roof trusses and high dusty clerestory windows far above.
Standing upright in the middle of a cluttered room mid-sentence, one arm out and pointing hard off frame to the left, jaw set, entirely unembarrassed. She is the only figure in frame.
Interior, late afternoon.
Medium shot, camera slightly below eye level so she reads taller than she is, moderate depth.
Warm low window light raking in from the right, dust in the beam, shadow thrown long across the floor.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol3-s05.png`** · aspect 3:2

Alt text, already written, do not regenerate: A short girl with mint-green hair in two buns stands in a cluttered room mid-sentence, pointing hard off to one side.

---

## PIP

Canonical reference: `char-pip-canonical.png` · approved: no

**Rendering note.** The tell is stillness, not hardware. Every prompt involving her body should specify a posture that is a shade too even, too level or too symmetrical. Never render her mid-blink and never give her an asymmetric slouch.

### [ ] vol3-s03 — spread 3

Shot type: Action moment
Depicts: Beat 2. Pip kneeling in front of Cassie with two fingertips just behind her left ear.
Spoiler check: PASS. Final beat is Felix's conclusion that the patches are payment. Not depicted; the map is not in frame and Felix is absent.
Named figures: Pip, Cassie (2 of a maximum 2)

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
CHARACTER: Pip. NO REFERENCE IMAGE IS ATTACHED FOR THIS CHARACTER. The description below is therefore the ONLY authority and every detail in it is required, not optional. Do not substitute, simplify or invent any feature of the face, hair, headwear or clothing.
A short girl of apparently sixteen who is a machine rather than a modified person, of even slender build. Her skin is a uniform pale grey with a faint matte sheen and no variation in tone anywhere. Round face, large expressive eyes with a smooth mechanical iris, fine pale eyebrows, small straight nose, and matte purple lips. On the side of the face nearest the left ear there is a small circular port, and very fine metallic seams run from the jaw down the neck and disappear into her collar. Sandy blonde shoulder-length hair with side-swept bangs, held back by a red bandana pushed up to the hairline with a pair of small round aviator goggles resting on top of it. She wears a slouchy patched denim jacket covered in small hand-drawn doodles over a plain white shirt.
Wardrobe, unchanged for this scene: red bandana with goggles on top, patched doodled denim jacket over plain white shirt
CHARACTER: Cassie. NO REFERENCE IMAGE IS ATTACHED FOR THIS CHARACTER. The description below is therefore the ONLY authority and every detail in it is required, not optional. Do not substitute, simplify or invent any feature of the face, hair, headwear or clothing.
A small, slight girl of fifteen who reads younger than her age, fair skin with a scatter of freckles across the nose and cheeks, a narrow face with a small chin, very large dark eyes, fine dark eyebrows, a small nose, and a small closed mouth that rests level and a little downturned. Straight mid-brown hair falling to the jaw with the ends turning out slightly, tucked behind one ear so that a small pale beige behind-the-ear hearing aid with a fine clear earhook is fully visible there.
Wardrobe, unchanged for this scene: Soft sage-green flat cap worn pushed back, sage-green long-sleeved top with the cuffs turned back, dark indigo denim dungarees with brass buttons and deep turn-ups at the ankle, black high-top canvas sneakers with white laces and pale toe caps. Her working hearing aid is visible behind one ear; the second, dead one is loose in her hand or her pocket
SETTING: no reference image is attached, so the description below is the only authority for this place and every element in it is required.
The lounge end of a converted warehouse interior: four mismatched couches sagging in the middle arranged around a low scarred coffee table on bare concrete, a wall of three salvaged televisions behind them, a high shelf on the wall above, exposed steel roof trusses and high dusty clerestory windows far above.
One girl kneeling on the floor in front of another who is seated, reaching up with two fingertips resting very lightly on the skin just behind the seated girl's left ear. The kneeling girl's face is calm and measuring rather than tender. Exactly two named figures in frame and no others.
Interior, mid morning.
Medium close two shot from the side at kneeling height, shallow depth carried on the touching fingertips.
Soft directional window light from behind the seated girl, the kneeling girl's face in cool fill.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol3-s03.png`** · aspect 3:2

Alt text, already written, do not regenerate: A girl kneels in front of a seated girl and rests two fingertips lightly on the skin behind her ear.

---

## CASSIE

Canonical reference: `char-cassie-canonical.png` · approved: no

**Rendering note.** The hearing aid is the whole point and must stay visible in every image of her. In Volume 4 she wears over-ear headphones and the aid is beneath them, so specify that it is still there.

### [ ] vol3-s02 — spread 2

Shot type: Character portrait
Depicts: Beat 4. Cassie on the couch in the Pit, one hearing aid still behind her ear and the other in her open hand.
Spoiler check: PASS. Final beat is her line about not knowing how to make her brain stop hearing. Not depicted; she is not speaking and her mouth is closed.
Named figures: Cassie (1 of a maximum 2)

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
CHARACTER: Cassie. NO REFERENCE IMAGE IS ATTACHED FOR THIS CHARACTER. The description below is therefore the ONLY authority and every detail in it is required, not optional. Do not substitute, simplify or invent any feature of the face, hair, headwear or clothing.
A small, slight girl of fifteen who reads younger than her age, fair skin with a scatter of freckles across the nose and cheeks, a narrow face with a small chin, very large dark eyes, fine dark eyebrows, a small nose, and a small closed mouth that rests level and a little downturned. Straight mid-brown hair falling to the jaw with the ends turning out slightly, tucked behind one ear so that a small pale beige behind-the-ear hearing aid with a fine clear earhook is fully visible there.
Wardrobe, unchanged for this scene: Soft sage-green flat cap worn pushed back, sage-green long-sleeved top with the cuffs turned back, dark indigo denim dungarees with brass buttons and deep turn-ups at the ankle, black high-top canvas sneakers with white laces and pale toe caps. Her working hearing aid is visible behind one ear; the second, dead one is loose in her hand or her pocket
SETTING: no reference image is attached, so the description below is the only authority for this place and every element in it is required.
The lounge end of a converted warehouse interior: four mismatched couches sagging in the middle arranged around a low scarred coffee table on bare concrete, a wall of three salvaged televisions behind them, a high shelf on the wall above, exposed steel roof trusses and high dusty clerestory windows far above.
A small fifteen year old sitting far back on a sagging couch, shoulders drawn in, one hearing aid visible behind her left ear and the second one lying in her open upturned palm. Eyes red rimmed and dry, mouth closed. One adult-sized hand rests on her back at the very edge of frame, the owner cropped out entirely.
Interior, mid morning.
Close shot, camera slightly above eye level looking gently down, shallow depth.
Diffuse high window light from the left, the couch and floor falling into shadow.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol3-s02.png`** · aspect 3:2

Alt text, already written, do not regenerate: A small girl sits drawn in on a couch with one hearing aid behind her ear and the other lying in her open palm.

---

## MR HENDERSON

Canonical reference: `char-henderson-canonical.png` · approved: no

### [ ] vol3-s01 — spread 1

Shot type: Character portrait
Depicts: Beat 1. Mr. Henderson stopped at the end of the block, newspaper still under his arm, aware that nothing hurts.
Spoiler check: PASS. Final beat is Aunt Carol at the coffee pot saying she would have left thirty years ago. Not depicted; the scene never enters the kitchen.
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
A man of eighty-one, tall and spare and very slightly stooped, with square shoulders that have not entirely gone, tanned skin deeply lined across the forehead, around the mouth and in crow's feet at the eyes, a long face with hollowed cheeks, kind dark eyes under heavy shelf-like white eyebrows, prominent ears, a strong nose, and a thin mouth that rests in a faint smile and goes up further at one corner. Thick white hair, thinning at the front, worn swept up and back and never tidy. A wristwatch with a small round face on a dark leather strap, always on the same wrist.
Wardrobe, unchanged for this scene: Pale blue-grey button-down shirt with a chest pocket and cream buttons, sleeves rolled to the forearm, tucked into tan pleated trousers with turn-ups, a brown leather belt with a square silver buckle, and worn brown leather shoes. **No running shoes yet**
SETTING: no reference image is attached, so the description below is the only authority for this place and every element in it is required.
A residential street of modest single-storey houses set back behind short lawns, chain link and low hedges, cracked concrete sidewalk, power lines overhead, parked sedans.
An old man stopped in the middle of an empty sidewalk with a rolled newspaper under one arm, looking down at his own legs with an expression of plain confusion rather than joy.
Exterior, early morning.
Medium shot, camera at chest height, shallow depth so the street behind him softens.
Low warm sunrise light from behind and to the right, rim lighting his white hair, face in soft fill.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol3-s01.png`** · aspect 3:2

Alt text, already written, do not regenerate: An elderly man stands on an empty sidewalk with a newspaper under his arm, looking down at his own legs, puzzled.

---

## LOCATIONS AND OBJECTS, no named character

### [ ] vol3-opener — chapter opener

Shot type: Atmospheric (full bleed, both pages)
Depicts: A Millbrook street at the hour the volume begins. No story beat.
Spoiler check: PASS. Chapter opener precedes all prose. Shows no figure and no running, so it cannot give away the six miles.

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
A residential street of modest single-storey houses set back behind short lawns, chain link and low hedges, cracked concrete sidewalk, power lines overhead, parked sedans.
A long residential street of modest houses with a rolled newspaper lying on one porch step in the foreground. No figures anywhere.
Exterior, just after sunrise.
Wide low shot from the middle of the empty road, deep focus, strong perspective down the street.
Low raking sunrise light from the far end of the street, very long shadows across the asphalt, dew haze.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 2:1
```

Save as: **`vol3-opener.png`** · aspect 2:1

Alt text, already written, do not regenerate: An empty residential street just after sunrise with long shadows and a rolled newspaper on a porch step.

---

### [ ] vol3-s04 — spread 4

Shot type: Establishing or location
Depicts: Beat 5. The old elementary school at the centre of the arc.
Spoiler check: PASS. Final beat is the argument line about the start of nothing. Not depicted; no figures and no warehouse.

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
A long low single-storey 1960s school building behind a sagging chain link fence, ground-floor windows boarded with plywood, six acres of dead grass, and a play structure with the swings removed leaving the crossbar and cut chains.
A long low abandoned school building behind a sagging chain link fence, ground floor windows boarded with plywood, six acres of dead grass, a play structure in the middle distance with the swings removed and only the empty crossbar and hanging chains left. No figures anywhere.
Exterior, overcast afternoon.
Wide establishing shot from outside the fence, fence in the near foreground and slightly out of focus, deep focus beyond it.
Flat heavy overcast, no shadows, colour drained toward grey green.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol3-s04.png`** · aspect 3:2

Alt text, already written, do not regenerate: An abandoned school behind a chain link fence with boarded windows and a swing set stripped of its swings.

---

### [ ] vol3-s06 — spread 6

Shot type: Atmospheric or empty
Depicts: The porch itself, empty, before or after the conversation. Setting only.
Spoiler check: PASS. Final beat is Mr. Henderson saying something is going to come and ask him for something. Not depicted; no figures at all, and the image gives away nothing that is said.

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
The covered front porch of a white clapboard house with green shutters, painted floorboards, a screen door, and a two-seat wooden swing hanging on two chains.
An empty porch swing hanging on two chains, still moving very slightly, worn painted floorboards, green shutters and white clapboard behind it, a screen door shut. No figures present.
Exterior, mid afternoon.
Medium shot from the porch steps, camera at seat height, shallow depth on the near chain.
Bright dappled afternoon light through leaves off frame, moving shadow patterns on the boards.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol3-s06.png`** · aspect 3:2

Alt text, already written, do not regenerate: An empty porch swing hanging still on its chains in front of white clapboard and green shutters.

---

### [ ] vol3-s07 — spread 7

Shot type: Establishing or location
Depicts: Beat 1. The warehouse after midnight with everyone asleep where they landed.
Spoiler check: PASS. Final beat is Pip's threat to the thing in the wall. Not depicted; Pip is not in frame and the back wall is out of shot.

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
The lounge end of a converted warehouse interior: four mismatched couches sagging in the middle arranged around a low scarred coffee table on bare concrete, a wall of three salvaged televisions behind them, a high shelf on the wall above, exposed steel roof trusses and high dusty clerestory windows far above.
A wide dark interior after midnight, sleeping figures scattered across couches and one slumped at a workbench, all of them distant, turned away, or covered so that no face is legible. One work lamp burning at a bench. High on a shelf at the top of frame, a small animal silhouette, unresolved.
Interior, well after midnight.
Wide establishing shot from the far end of the room, high vantage, deep focus.
One warm work lamp as the only source, monitors as distant cold points, most of the frame in near darkness.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol3-s07.png`** · aspect 3:2

Alt text, already written, do not regenerate: A wide dark warehouse interior after midnight with sleeping figures on couches and a single work lamp burning.

---

### [ ] vol3-s08 — spread 8

Shot type: Object or detail
Depicts: Beat 5. The granola bar Vex hands over, held and not eaten.
Spoiler check: PASS. Final beat is Monke crossing the floor to sit beside Cassie and Cassie stopping frowning in her sleep. Not depicted; no animal and no couch in frame.

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
The lounge end of a converted warehouse interior: four mismatched couches sagging in the middle arranged around a low scarred coffee table on bare concrete, a wall of three salvaged televisions behind them, a high shelf on the wall above, exposed steel roof trusses and high dusty clerestory windows far above.
A close view of two hands holding an unopened wrapped granola bar level in front of them, held the way a person holds an object they have been given rather than food they intend to eat. The hands have a faintly grey even tone and very fine seams tracking across the backs of the wrists. Wrapper design plain, no legible lettering. No face in frame.
Interior, the small hours.
Close shot, camera at hand height and straight on, very shallow depth.
One warm lamp far off to the left, most of the frame in low blue darkness.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol3-s08.png`** · aspect 3:2

Alt text, already written, do not regenerate: Two faintly grey hands with fine seams at the wrists hold an unopened granola bar level, not eating it.

---
