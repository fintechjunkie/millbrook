# The Patch Notes, Volume 1: image prompt sheet

Part One: The Pothole · 9 images · generated from the specs, do not hand-edit

Work through this one prompt at a time. Each entry gives the prompt as a single
copyable block, then the exact filename to save the result as. The filename is
not optional: the reader resolves images by slug from a flat directory, so
`vol1-s03.png` is the only name that will appear in the book.

Grouped by character in roster order rather than by spread number, so that drift
in a face is visible as a run. The spread number is on every entry.

## Before generating

- **11 canonical reference files do not exist**, so nothing is
  attached for them and their text descriptions are the only authority. Every
  such block says so explicitly. This is the reason characters drift: a prompt
  that claims a reference it does not have makes the description sound optional
  at the exact moment the description is all there is.

  Missing: `char-dalton-canonical.png`, `char-felix-canonical.png`, `char-lena-canonical.png`, `char-milo-canonical.png`, `char-monke-canonical.png`, `char-owen-canonical.png`, `char-pip-canonical.png`, `char-vex-canonical.png`, `loc-square.png`, `loc-terminals.png`, `loc-vex-apartment.png`

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

### [ ] vol1-s01 — spread 1

Shot type: Character portrait
Depicts: Beat 1. Lena arriving at the house on Crescent, bag in hand.
Spoiler check: PASS. Final beat of this page is Lena hitting record and naming the pothole. Not depicted; no phone raised, no filming.
Named figures: Lena (1 of a maximum 2)

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
Wardrobe, unchanged for this scene: Travel clothes, oversized orange collared shirt worn open over a plain tee, satchel strap running diagonally across the chest
SETTING: no reference image is attached, so the description below is the only authority for this place and every element in it is required.
A small single-storey house with pale yellow aluminium siding, a chain link fence across the front, three concrete porch steps with a plain iron rail, and a chipped ceramic frog ornament beside the bottom step with one ear broken off.
Standing at the foot of the porch steps with a duffel bag at her feet, one hand on the railing, looking up at the house rather than at the camera.
Exterior, mid afternoon.
Medium shot, slightly low angle from the walkway, shallow depth so the house softens behind her.
Warm late afternoon sun from the left, hard-edged shadows on the siding.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol1-s01.png`** · aspect 3:2

Alt text, already written, do not regenerate: A teenage girl with a duffel bag at her feet stands at the bottom of a porch's steps, looking up at a yellow house.

---

## MILO

Canonical reference: `char-milo-canonical.png` · approved: no

**Rendering note.** Because the eyes are unavailable, everything expressive has to be carried by mouth, shoulders and the angle of the head. Prompts for him should always specify posture.

### [ ] vol1-s06 — spread 6

Shot type: Character portrait or close (group three-shot)
Depicts: Beat 1. Milo, Owen and Felix on the bench by the fountain, before Lena reaches them.
Spoiler check: PASS. Final beat is Felix stopping mid-chew when Lena holds out the photo. Not depicted; Lena is absent, nothing is being held out, and Felix is still eating.
Named figures: Milo, Owen, Felix (3 of a maximum 2)

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
CHARACTER: Milo. NO REFERENCE IMAGE IS ATTACHED FOR THIS CHARACTER. The description below is therefore the ONLY authority and every detail in it is required, not optional. Do not substitute, simplify or invent any feature of the face, hair, headwear or clothing.
An eighteen year old boy, tall and lean, fair skin of ordinary healthy tone, a long face with a defined jaw, eyebrows and eye shape almost entirely concealed at all times behind small round sunglasses with red lenses, a straight narrow nose, a flat unsmiling mouth, and dark reddish-brown hair falling messily past the jaw. He wears an orange knit beanie pulled low to the eyebrows at all times. The beanie and the red-lensed glasses are permanent and are never removed.
Wardrobe, unchanged for this scene: orange beanie, red-lensed round glasses, black leather jacket with silver zippers over plain black shirt
CHARACTER: Owen. NO REFERENCE IMAGE IS ATTACHED FOR THIS CHARACTER. The description below is therefore the ONLY authority and every detail in it is required, not optional. Do not substitute, simplify or invent any feature of the face, hair, headwear or clothing.
An eighteen year old boy of average height and thin build, a fully bald head with no eyebrows whatsoever, pale skin with faint shadows under the eyes, a narrow face with prominent cheekbones, dark deep-set eyes held in a permanent slight squint, a thin straight nose, and a mouth pressed into a flat line. He wears a white high-collared jumpsuit zipped up the front with a single small red button at the throat.
Wardrobe, unchanged for this scene: white high-collared jumpsuit, red throat button
CHARACTER: Felix. NO REFERENCE IMAGE IS ATTACHED FOR THIS CHARACTER. The description below is therefore the ONLY authority and every detail in it is required, not optional. Do not substitute, simplify or invent any feature of the face, hair, headwear or clothing.
An eighteen year old boy, short and compact, warm deep brown skin, a round open face, bright alert dark eyes set wide behind round glasses with thin red frames, dark eyebrows, a snub nose, and a wide ready grin that shows his teeth. Dense black hair worn in a short upright afro. He wears a faded teal denim jacket with the sleeves pushed up over a plain black t-shirt, and a webbing harness of orange and brown straps across his chest hung with small hand tools, a wrench and a carabiner. A small bright green gecko is on his person, on a shoulder or within reach.
Wardrobe, unchanged for this scene: faded teal denim jacket with sleeves pushed up over a plain black t-shirt, orange and brown webbing harness of small hand tools across the chest
SETTING: no reference image is attached, so the description below is the only authority for this place and every element in it is required.
A flat municipal park of mown grass and mature shade trees with a low round stone fountain at its centre and slatted wooden benches on a paved ring around it.
Three eighteen year old boys arranged loosely on and around a slatted wooden bench, relaxed and unposed, none of them arranged for the camera. Milo stands at the near end with one forearm resting along the top rail of the bench back, weight on one leg, head turned to watch the fountain. Owen sits at the far end, slumped low with his knees apart, looking down at an oversized phone held in both hands. Felix sits in the middle, leaning forward with his elbows on his knees, mid-bite on a comically oversized sandwich, cheeks full, a small green gecko on his shoulder. All three faces are clearly visible and unobscured. No fourth figure. Nothing is being handed to them and no photograph or screen is being shown to them.
Exterior, midday, in the park.
Medium-wide three-shot from the far side of the bench, camera at seated eye level and square on so every face reads, the stone fountain running directly behind the bench and the park beyond it, moderate depth so the fountain stays legible while the three faces hold focus.
High midday sun from the front left, faces in clear even light with no face in shadow, the fountain's water catching bright specular highlights behind their heads.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol1-s06.png`** · aspect 3:2

Alt text, already written, do not regenerate: Three teenage boys on a park bench with a fountain running behind them, one standing and leaning on the bench back, one on his phone, one eating an oversized sandwich.

---

## VEX

Canonical reference: `char-vex-canonical.png` · approved: yes

### [ ] vol1-s02 — spread 2

Shot type: Action moment
Depicts: Beat 3 of this page. Vex walking away with the stolen dashcam, three steps out and not running.
Spoiler check: PASS. Final beat is the woman with the stroller scolding Lena at the tripod. Not depicted; no stroller, no second adult in frame.
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
A short commercial main street of two-storey brick and stucco frontages, angled parking, a scatter of vacant units, wide concrete sidewalk with pressure cracks.
Walking away down the sidewalk with a small dashcam held loosely at her side, glancing back over one shoulder without stopping. A second figure far behind her at the edge of frame is unfocused and turned away, face not legible.
Exterior sidewalk, late morning.
Medium-wide tracking shot from behind and to the side, shallow depth, subject sharp and background compressed.
Flat overcast daylight, no strong shadow.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol1-s02.png`** · aspect 3:2

Alt text, already written, do not regenerate: A short girl with mint-green hair in two buns walks away along a sidewalk holding a small camera, glancing back over her shoulder.

---

### [ ] vol1-s08 — spread 8

Shot type: Character portrait or close (two-shot)
Depicts: Beat 6. Pip on the milk-crate stool with her chin lifted and her eyes tilted at the ceiling, Vex at the counter with the laptop.
Spoiler check: PASS. Final beat is the streetlight across from Aunt Carol's house going off for a single frame. Not depicted; the scene never leaves Vex's apartment, and neither Owen, Monke, Lena nor any exterior appears.
Named figures: Vex, Pip (2 of a maximum 2)

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
CHARACTER: Pip. NO REFERENCE IMAGE IS ATTACHED FOR THIS CHARACTER. The description below is therefore the ONLY authority and every detail in it is required, not optional. Do not substitute, simplify or invent any feature of the face, hair, headwear or clothing.
A short girl of apparently sixteen who is a machine rather than a modified person, of even slender build. Her skin is a uniform pale grey with a faint matte sheen and no variation in tone anywhere. Round face, large expressive eyes with a smooth mechanical iris, fine pale eyebrows, small straight nose, and matte purple lips. On the side of the face nearest the left ear there is a small circular port, and very fine metallic seams run from the jaw down the neck and disappear into her collar. Sandy blonde shoulder-length hair with side-swept bangs, held back by a red bandana pushed up to the hairline with a pair of small round aviator goggles resting on top of it. She wears a slouchy patched denim jacket covered in small hand-drawn doodles over a plain white shirt.
Wardrobe, unchanged for this scene: red bandana with goggles on top, patched doodled denim jacket over plain white shirt
SETTING: no reference image is attached, so the description below is the only authority for this place and every element in it is required.
A single-room apartment above a shop where every horizontal surface is covered and most of the furniture was something else first, milk crates for stools, a bare bulb, a kitchen counter used as a workbench.
Two girls in a cluttered single-room apartment late at night. Pip sits on a stool made of milk crates and a cushion, both feet flat and level, hands resting symmetrically on her knees, spine straight, chin lifted so her eyes are tilted up at the ceiling as though reading something off it. Her stillness is the point: the pose is a shade too even and too level to be a person relaxing, and her face is calm and unblinking. Vex sits sideways on the floor by the kitchen counter with a battered open laptop beside her, one hand still on its edge, half turned to watch Pip rather than the screen. Both faces are clearly visible. The laptop screen holds a single dark paused frame of a night street, no legible interface. Exactly two figures in frame.
Interior, late evening.
Medium two-shot from low down at stool height, angled so Pip's lifted face and Vex's turned face both read, moderate depth so the crowded room stays legible behind them.
One bare bulb hanging above and slightly behind Pip, cold spill from the laptop screen low on the left, the corners of the room falling away into dark.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol1-s08.png`** · aspect 3:2

Alt text, already written, do not regenerate: A girl sits unnaturally still on a milk-crate stool with her chin lifted and eyes turned up at the ceiling, while another girl on the floor beside an open laptop turns to watch her.

---

## OWEN

Canonical reference: `char-owen-canonical.png` · approved: no

### [ ] vol1-s03 — spread 3

Shot type: Character portrait
Depicts: Beat 1. Owen at his desk after thirty-one hours awake.
Spoiler check: PASS. Final beat is Owen's line about fresh asphalt with no patch line. Not depicted; no street, no asphalt, no map detail legible.
Named figures: Owen (1 of a maximum 2)

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

MUST HOLD, these override anything below that appears to contradict them:
- Owen has NO EYEBROWS AT ALL — not faint, not thin, none, the brow is bare skin.
- Every screen is pure cold glow with NO legible interface: no windows, no panels, no charts, no readable content of any kind.
- The monitor glow is the ONLY light source in the frame and everything behind him falls to black; the room is not otherwise lit.
CHARACTER: Owen. NO REFERENCE IMAGE IS ATTACHED FOR THIS CHARACTER. The description below is therefore the ONLY authority and every detail in it is required, not optional. Do not substitute, simplify or invent any feature of the face, hair, headwear or clothing.
An eighteen year old boy of average height and thin build, a fully bald head with no eyebrows whatsoever, pale skin with faint shadows under the eyes, a narrow face with prominent cheekbones, dark deep-set eyes held in a permanent slight squint, a thin straight nose, and a mouth pressed into a flat line. He wears a white high-collared jumpsuit zipped up the front with a single small red button at the throat.
Wardrobe, unchanged for this scene: white high-collared jumpsuit, red throat button
SETTING: no reference image is attached, so the description below is the only authority for this place and every element in it is required.
The desk end of the same warehouse: a long trestle desk against a brick wall carrying three monitors on stacked books, a mechanical keyboard, cable runs stapled along the wall, and a row of dented energy drink cans.
Seated in a desk chair facing three monitors, turned three-quarters toward the viewer, eyes squinted against the screen glare, expression flat. His scalp is completely bald and his brow is bare skin with no eyebrows on it at all. Every screen shows nothing but soft undifferentiated glow, with no windows, panels, charts, icons or readable content of any kind.
Interior, roughly three in the morning.
Close shot, camera slightly below eye level, monitors framing him on both sides.
Cold monitor light as the single and only source in the frame, uplighting his face from below, the room behind him unlit and falling completely to black.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol1-s03.png`** · aspect 3:2

Alt text, already written, do not regenerate: A bald young man sits in a desk chair between three glowing monitors in an otherwise dark room.

---

## MONKE

Canonical reference: `char-monke-canonical.png` · approved: no

### [ ] vol1-s04 — spread 4

Shot type: Action moment
Depicts: Beat 4 of this page. Monke on top of the middle monitor, one finger against the glass.
Spoiler check: PASS. Final beat is Mayor Dalton's speech at the podium. Not depicted; scene does not leave the warehouse.
Named figures: Monke (1 of a maximum 2)

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

MUST HOLD, these override anything below that appears to contradict them:
- Monke is a SILHOUETTE, not a character portrait.
- He is seen from behind and side-on, backlit by the screen, and his face is turned away from the camera and lost in shadow.
- NO eye detail, NO facial expression, NO readable features.
- If his face is legible the image is wrong.
- Palette stays warm off-white paper with subdued colour; this is not a purple image.
ANIMAL: Monke. NO REFERENCE IMAGE IS ATTACHED FOR THIS CHARACTER. The description below is therefore the ONLY authority and every detail in it is required, not optional. Do not substitute, simplify or invent any feature of the face, hair, headwear or clothing.
A small brown monkey with dark sharp eyes, slender limbs and a long tail.
SETTING: no reference image is attached, so the description below is the only authority for this place and every element in it is required.
The desk end of the same warehouse: a long trestle desk against a brick wall carrying three monitors on stacked books, a mechanical keyboard, cable runs stapled along the wall, and a row of dented energy drink cans.
A small monkey perched on top of the middle monitor, seen from behind and slightly to the side, leaning down so one small finger touches the front of the screen. He is rendered as a dark silhouette against the screen glow. His head is turned away from the camera and his face is entirely lost in shadow: no eyes, no expression, no legible features whatsoever. Only the outline of the head, the curve of the spine, the long tail and the reaching arm are readable. Screen shows a soft scatter of pale dots forming an incomplete arc, no text or labels.
Interior, early morning, no daylight.
Close shot from behind and to the side, camera at monitor height, shallow depth on the finger and the glass.
Screen glow from in front of him and below, throwing him into near-total shadow with a strong rim light along his back and tail, room otherwise dark. Warm off-white paper palette with restrained colour.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol1-s04.png`** · aspect 3:2

Alt text, already written, do not regenerate: A small monkey perched on top of a computer monitor reaches down and touches one finger to the screen.

---

## MAYOR DALTON

Canonical reference: `char-dalton-canonical.png` · approved: no

### [ ] vol1-s05 — spread 5

Shot type: Character portrait
Depicts: Beat 2. The Mayor's grin tightening under questioning, one bead of sweat at the temple.
Spoiler check: PASS. Final beat is the three boys vanishing from the crowd. Not depicted; no crowd faces in focus.
Named figures: Mayor Dalton (1 of a maximum 2)

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

MUST HOLD, these override anything below that appears to contradict them:
- The suit is MUTED DUSTY PURPLE and ill-fitting.
- The 3D glasses have a RED FRAME with two DIFFERENT lenses: his right lens red, his left lens CYAN.
- The tie is dark red with cream polka dots and there is a red pocket square.
- His crown is BALD with dark brown hair in untidy tufts at the temples only.
CHARACTER: Mayor Dalton. NO REFERENCE IMAGE IS ATTACHED FOR THIS CHARACTER. The description below is therefore the ONLY authority and every detail in it is required, not optional. Do not substitute, simplify or invent any feature of the face, hair, headwear or clothing.
A man in his fifties, heavy and thick through the body, ruddy fair skin, a full face with heavy jowls, small pale eyes entirely concealed behind cardboard anaglyph 3D glasses with a red frame and two different lenses, the wearer's right lens red and the wearer's left lens cyan, which he wears at all times both indoors and out, thick dark brown eyebrows visible above the frame, a bald crown and forehead with dark brown hair standing up in untidy tufts at the temples and around the back, a fleshy nose, and a broad practised salesman's grin that shows his teeth. His suit is a muted dusty purple and never quite fits, pulling at the button and short in the sleeve.
Wardrobe, unchanged for this scene: Ill-fitting muted dusty purple suit, cream shirt, a dark red tie patterned with cream polka dots and knotted slightly askew, a red pocket square folded into the breast pocket
SETTING: no reference image is attached, so the description below is the only authority for this place and every element in it is required.
A paved civic square in front of a squat 1960s municipal building of brick and glass, with a low permanent stage, a plain wooden podium, and space for rows of grey metal folding chairs.
Standing behind a plain podium mid-sentence, both hands on the podium edge, grinning broadly with his teeth showing, a bead of sweat running from his temple. Eyes hidden behind the mismatched lenses. Podium bare, no signage or lettering, two microphones on short stands in front of him.
Exterior, late morning.
Close shot from slightly below, straight on, very shallow depth so the small crowd behind reads only as soft shapes and the municipal building behind them goes soft.
Hard overhead sun, specular glare across the red and the cyan lens.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol1-s05.png`** · aspect 3:2

Alt text, already written, do not regenerate: A heavyset man in an ill-fitting suit and red glasses stands behind a podium, grinning stiffly, sweating at one temple.

---

## LOCATIONS AND OBJECTS, no named character

### [ ] vol1-opener — chapter opener

Shot type: Establishing (full bleed, both pages)
Depicts: Millbrook itself, before anyone is awake. No story beat.
Spoiler check: PASS. Chapter opener precedes all prose. Deliberately does not show Main Street or the repaired asphalt, which is the reveal on text page 2.

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
A small flat American town of low single-storey houses on a grid of wide streets, mature trees between them, a water tower on the horizon, no hills, no landmarks worth photographing.
Empty residential streets seen from a slight elevation, water tower on the horizon, no figures anywhere.
Early morning before sunrise, blue hour.
Wide establishing shot, high vantage, deep focus.
Flat pre-dawn light, streetlights still burning, one lit kitchen window.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 2:1
```

Save as: **`vol1-opener.png`** · aspect 2:1

Alt text, already written, do not regenerate: A small town of low houses seen from above before sunrise, streetlights still on, a water tower in the distance.

---

### [ ] vol1-s07 — spread 7

Shot type: Object or detail
Depicts: Beat 3. The dashcam opened up on Vex's counter, SD card pulled and read.
Spoiler check: PASS. Final beat is Pip sitting slightly too still on the milk crate stool. Not depicted; no figures in frame.

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
A single-room apartment above a shop where every horizontal surface is covered and most of the furniture was something else first, milk crates for stools, a bare bulb, a kitchen counter used as a workbench.
A small dashcam disassembled across a cluttered kitchen counter, casing separated, tiny screws gathered in a jar lid, a memory card standing upright in the slot of a battered laptop. No figures present. Laptop screen dark except for a single paused frame of a night street, no interface elements or text.
Interior, evening.
Close overhead shot, slight angle, shallow depth on the memory card.
One bare bulb from above and the laptop's cold spill from the left.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:2
```

Save as: **`vol1-s07.png`** · aspect 3:2

Alt text, already written, do not regenerate: A dashcam taken apart on a cluttered counter beside a laptop, with its memory card standing in the laptop's slot.

---
