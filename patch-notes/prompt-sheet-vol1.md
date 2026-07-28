# The Patch Notes, Volume 1: image prompt sheet

Part One: The Pothole · 9 images · generated from the specs, do not hand-edit

Work through this one prompt at a time. Each entry gives the prompt as a single
copyable block, then the exact filename to save the result as. The filename is
not optional: the reader resolves images by slug from a flat directory, so
`vol1-s03.png` is the only name that will appear in the book.

Grouped by character in roster order rather than by spread number, so that drift
in a face is visible as a run. The spread number is on every entry.

## Before generating

- **The style block is a slot, not a value.** Paste the locked layered-paper
  block into section 2 of `PATCH_NOTES_FLIPBOOK_ROSTER.md`, then re-run
  `npm run parse` and `node scripts/build-prompt-sheet.mjs`. It will inline
  into all 37 prompts. Do not paste it into prompts one at a time.
- **4 roster decisions are open** and section 1 lists them:
    - Vex looks like two different people
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
Named figures: LENA (1 of a maximum 2)

```
>>> PASTE THE LOCKED STYLE BLOCK HERE <<<
An eighteen year old girl of average height and slight build, fair skin with a scatter of freckles across the nose and upper cheeks, an oval face with a soft jaw, large round brown eyes that read as startled even at rest, thin mobile eyebrows set high, a small slightly upturned nose, a wide expressive mouth, and orange hair of medium thickness pulled into two short side ponytails held with small plain hair ties, with wispy loose pieces standing up at the crown. A small oval pendant on a thin chain sits at her throat at all times.
Travel clothes, oversized orange collared shirt worn open over a plain tee, satchel strap running diagonally across the chest
A small single-storey house with pale yellow aluminium siding, a chain link fence across the front, three concrete porch steps with a plain iron rail, and a chipped ceramic frog ornament beside the bottom step with one ear broken off.
Standing at the foot of the porch steps with a duffel bag at her feet, one hand on the railing, looking up at the house rather than at the camera.
Exterior, mid afternoon.
Medium shot, slightly low angle from the walkway, shallow depth so the house softens behind her.
Warm late afternoon sun from the left, hard-edged shadows on the siding.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no 3D render finish, no anime house style. No borders, frames, panel gutters or drop shadows.
Aspect ratio: 3:2
```

Save as: **`vol1-s01.png`** · aspect 3:2

Alt text, already written, do not regenerate: A teenage girl with a duffel bag at her feet stands at the bottom of a porch's steps, looking up at a yellow house.

---

## VEX

Canonical reference: `char-vex-canonical.png` · approved: no

### [ ] vol1-s02 — spread 2

Shot type: Action moment
Depicts: Beat 3 of this page. Vex walking away with the stolen dashcam, three steps out and not running.
Spoiler check: PASS. Final beat is the woman with the stroller scolding Lena at the tripod. Not depicted; no stroller, no second adult in frame.
Named figures: VEX (1 of a maximum 2)

```
>>> PASTE THE LOCKED STYLE BLOCK HERE <<<
A short and wiry eighteen year old girl, warm brown skin with freckles across the cheeks, a round face with a pointed chin, large dark eyes usually narrowed, straight dark eyebrows, a small nose, and a mouth set like it is about to say something rude. Her hair is white, short and coarse, sticking out in pieces from under a battered brown leather aviator cap with two small stitched cat ears on the crown and unbuckled ear flaps. She wears a black leather jacket with silver zippers over a plain black shirt. No goggles.
aviator cap, black leather jacket with silver zippers over plain black shirt
A short commercial main street of two-storey brick and stucco frontages, angled parking, a scatter of vacant units, wide concrete sidewalk with pressure cracks.
Walking away down the sidewalk with a small dashcam held loosely at her side, glancing back over one shoulder without stopping. A second figure far behind her at the edge of frame is unfocused and turned away, face not legible.
Exterior sidewalk, late morning.
Medium-wide tracking shot from behind and to the side, shallow depth, subject sharp and background compressed.
Flat overcast daylight, no strong shadow.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no 3D render finish, no anime house style. No borders, frames, panel gutters or drop shadows.
Aspect ratio: 3:2
```

Save as: **`vol1-s02.png`** · aspect 3:2

Alt text, already written, do not regenerate: A short girl in a cap walks away along a sidewalk holding a small camera, glancing back over her shoulder.

---

## OWEN

Canonical reference: `char-owen-canonical.png` · approved: no

### [ ] vol1-s03 — spread 3

Shot type: Character portrait
Depicts: Beat 1. Owen at his desk after thirty-one hours awake.
Spoiler check: PASS. Final beat is Owen's line about fresh asphalt with no patch line. Not depicted; no street, no asphalt, no map detail legible.
Named figures: OWEN (1 of a maximum 2)

```
>>> PASTE THE LOCKED STYLE BLOCK HERE <<<
An eighteen year old boy of average height and thin build, a fully bald head with no eyebrows whatsoever, pale skin with faint shadows under the eyes, a narrow face with prominent cheekbones, dark deep-set eyes held in a permanent slight squint, a thin straight nose, and a mouth pressed into a flat line. He wears a white high-collared jumpsuit zipped up the front with a single small red button at the throat.
white high-collared jumpsuit, red throat button
The desk end of the same warehouse: a long trestle desk against a brick wall carrying three monitors on stacked books, a mechanical keyboard, cable runs stapled along the wall, and a row of dented energy drink cans.
Seated in a desk chair facing three monitors, turned three-quarters toward the viewer, eyes squinted against the screen glare, expression flat. Screen contents not legible.
Interior, roughly three in the morning.
Close shot, camera slightly below eye level, monitors framing him on both sides.
Cold monitor light as the only source, uplighting his face, everything behind him falling to black.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no 3D render finish, no anime house style. No borders, frames, panel gutters or drop shadows.
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
Named figures: MONKE (1 of a maximum 2)

```
>>> PASTE THE LOCKED STYLE BLOCK HERE <<<
A small brown monkey with dark sharp eyes, slender limbs and a long tail.
The desk end of the same warehouse: a long trestle desk against a brick wall carrying three monitors on stacked books, a mechanical keyboard, cable runs stapled along the wall, and a row of dented energy drink cans.
Perched on top of a monitor, leaning down with one small finger touching the front of the screen. Rendered mostly as a shape against the screen glow, face largely in shadow and not resolved. Screen shows a soft scatter of pale dots forming an incomplete arc, no text or labels.
Interior, early morning, no daylight.
Close shot from the side, camera at monitor height, shallow depth on the finger and the glass.
Screen glow from below and in front, strong rim light on the animal's silhouette, room otherwise dark.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no 3D render finish, no anime house style. No borders, frames, panel gutters or drop shadows.
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
Named figures: MAYOR_DALTON (1 of a maximum 2)

```
>>> PASTE THE LOCKED STYLE BLOCK HERE <<<
A man in his fifties, pear-shaped, narrow at the shoulders and wide at the waist, ruddy fair skin, a full face with heavy jowls, small pale eyes concealed behind red-lensed 3D glasses that he wears at all times both indoors and out, thinning sandy hair combed across, a fleshy nose, and a broad practised salesman's grin. His suit never quite fits, pulling at the button and short in the sleeve.
Ill-fitting grey suit, red 3D glasses, a tired patterned tie
A paved civic square in front of a squat 1960s municipal building of brick and glass, with a low permanent stage, a plain wooden podium, and space for rows of grey metal folding chairs.
Standing behind a plain podium mid-sentence, mouth held in a grin that has gone tight at the corners, a single bead of sweat at the temple, eyes searching off to one side. Podium bare, no signage or lettering.
Exterior, late morning.
Close shot, straight on at eye level, very shallow depth so the small crowd behind reads only as soft shapes.
Hard overhead sun, specular glare across his red lenses.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no 3D render finish, no anime house style. No borders, frames, panel gutters or drop shadows.
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

```
>>> PASTE THE LOCKED STYLE BLOCK HERE <<<
A small flat American town of low single-storey houses on a grid of wide streets, mature trees between them, a water tower on the horizon, no hills, no landmarks worth photographing.
Empty residential streets seen from a slight elevation, water tower on the horizon, no figures anywhere.
Early morning before sunrise, blue hour.
Wide establishing shot, high vantage, deep focus.
Flat pre-dawn light, streetlights still burning, one lit kitchen window.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no 3D render finish, no anime house style. No borders, frames, panel gutters or drop shadows.
Aspect ratio: 2:1
```

Save as: **`vol1-opener.png`** · aspect 2:1

Alt text, already written, do not regenerate: A small town of low houses seen from above before sunrise, streetlights still on, a water tower in the distance.

---

### [ ] vol1-s06 — spread 6

Shot type: Establishing or location
Depicts: Beat 1. The fountain in the park with the three of them on the bench, seen from Lena's distance.
Spoiler check: PASS. Final beat is Felix stopping mid-chew when he sees the photo. Not depicted; no faces legible at this distance.

```
>>> PASTE THE LOCKED STYLE BLOCK HERE <<<
A flat municipal park of mown grass and mature shade trees with a low round stone fountain at its centre and slatted wooden benches on a paved ring around it.
A stone fountain running, a slatted bench beyond it with three seated figures at enough distance that faces are not legible. Figures backlit, turned toward the water, treated as silhouettes rather than portraits.
Exterior, midday.
Wide establishing shot from across the lawn, deep focus, figures small in frame.
Backlit from behind the bench, water throwing highlights, long grass shadows in the foreground.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no 3D render finish, no anime house style. No borders, frames, panel gutters or drop shadows.
Aspect ratio: 3:2
```

Save as: **`vol1-s06.png`** · aspect 3:2

Alt text, already written, do not regenerate: A park fountain seen from across a lawn, with three small figures sitting on a bench behind it, backlit.

---

### [ ] vol1-s07 — spread 7

Shot type: Object or detail
Depicts: Beat 3. The dashcam opened up on Vex's counter, SD card pulled and read.
Spoiler check: PASS. Final beat is Pip sitting slightly too still on the milk crate stool. Not depicted; no figures in frame.

```
>>> PASTE THE LOCKED STYLE BLOCK HERE <<<
A single-room apartment above a shop where every horizontal surface is covered and most of the furniture was something else first, milk crates for stools, a bare bulb, a kitchen counter used as a workbench.
A small dashcam disassembled across a cluttered kitchen counter, casing separated, tiny screws gathered in a jar lid, a memory card standing upright in the slot of a battered laptop. No figures present. Laptop screen dark except for a single paused frame of a night street, no interface elements or text.
Interior, evening.
Close overhead shot, slight angle, shallow depth on the memory card.
One bare bulb from above and the laptop's cold spill from the left.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no 3D render finish, no anime house style. No borders, frames, panel gutters or drop shadows.
Aspect ratio: 3:2
```

Save as: **`vol1-s07.png`** · aspect 3:2

Alt text, already written, do not regenerate: A dashcam taken apart on a cluttered counter beside a laptop, with its memory card standing in the laptop's slot.

---

### [ ] vol1-s08 — spread 8

Shot type: Atmospheric or empty
Depicts: Beat 3. The back bedroom in the dark, after Lena has stopped reading her phone.
Spoiler check: PASS. Final beat is the streetlight going off for a single frame outside. Not depicted; the window shows steady light and the exterior is not the subject.

```
>>> PASTE THE LOCKED STYLE BLOCK HERE <<<
A small square bedroom holding a single bed, a closet with a visible dent low on the door, a shelf of dull sports trophies, and faded band and athlete posters taped to the walls. Blinds, not curtains.
The ceiling and upper wall of a small bedroom seen from the bed, the edge of a dented closet door in frame, old posters going grey in the dark, one phone-sized rectangle of light thrown across the ceiling. No figures visible.
Interior, the middle of the night.
Close, camera lying flat and looking up, wide angle, deep focus.
Single cold rectangle of phone light on the ceiling, weak amber streetlight bleeding through a gap in the blinds.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no 3D render finish, no anime house style. No borders, frames, panel gutters or drop shadows.
Aspect ratio: 3:2
```

Save as: **`vol1-s08.png`** · aspect 3:2

Alt text, already written, do not regenerate: A dark bedroom ceiling seen from the bed, lit by a small rectangle of phone light, the edge of a dented closet door in frame.

---
