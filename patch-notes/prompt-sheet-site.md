# Millbrook: site image prompts

Art the site needs that is not a spread plate. Generated from the roster, so
the style and negative blocks match the 37 spread prompts exactly.

Everything here drops into `public/images/` under the exact filename given, the
same as the spread plates. No build step.

| File | What | Aspect | Priority |
|---|---|---|---|
| `site-banner.png` | Landing page banner, the first thing anybody sees | 3:1 | first |
| `site-cast.png` | Cast strip for the landing page, the whole ensemble in one frame | 3:1 | first |
| `site-social.png` | Share card, what people see when a link is pasted | 1.91:1 | first |
| `site-arc2.png` | Backdrop for the reserved Arc Two band | 3:1 | second |
| `brand-slop-mark.png` | Digital Slop emblem, for the footer and the browser tab | 1:1 | second |
| `vol1-cover.png` | Volume 1 cover, The Pothole | 2:1 | second |
| `vol2-cover.png` | Volume 2 cover, The Bookstore That Was Always There | 2:1 | second |
| `vol3-cover.png` | Volume 3 cover, Mr. Henderson's Knee | 2:1 | second |
| `vol4-cover.png` | Volume 4 cover, The Press Conference | 2:1 | second |

**`brand-slop-mark.png` also becomes the favicon.** Once it exists, copy it to
`app/icon.png` and Next.js serves it as the tab icon automatically. There is no
favicon at all today, so browsers show a blank page glyph.

**Do the banner first.** It is the only one that is actually missing rather than
merely absent: the volume covers already fall back to the chapter openers, but
the landing page has nothing behind its title until `site-banner.png` exists.

---

## [ ] site-banner.png — Landing page banner, the first thing anybody sees

Aspect 3:1 · priority: first

Very wide, and the site crops it to fill, so keep the subject centred in the middle third and leave the outer thirds quiet. The title MILLBROOK is typeset over the lower portion by the site, so the bottom third must stay visually calm and reasonably dark. No lettering in the image itself.

**Attach:** nothing. No named figure in this one.

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
SETTING:
A small flat American town of low single-storey houses on a grid of wide streets, mature trees between them, a water tower on the horizon, no hills, no landmarks worth photographing.
The whole town seen from a slight elevation at the end of the day, wide and flat, streets running away toward a low horizon, the water tower standing off to one side. Trees in separate depth planes. A scatter of lit windows. No figures anywhere and no vehicles in motion.
Exterior, late afternoon going to dusk.
Very wide panoramic establishing shot, high vantage, deep focus, subject centred with the outer thirds kept quiet and uncluttered.
Low warm raking light from the left, long soft shadows across the paper, the lower third of the frame falling into cooler shadow so typeset text will sit on it cleanly.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:1
```

Save as: **`site-banner.png`**

---

## [ ] site-cast.png — Cast strip for the landing page, the whole ensemble in one frame

Aspect 3:1 · priority: first

The highest-value image on the site after the banner. A visitor currently meets five empty town landscapes and no faces, and the characters are the reason to read. Sits as a full-width band between the banner and Arc One.

Very wide, and the site may crop it, so keep every figure inside the middle 80 per cent horizontally and leave a little quiet paper above their heads. No lettering: names are typeset by the site so they can be read, translated and reached by a screen reader.

**Attach these reference images before generating:**
- `char-lena-canonical.png` — lena
- `char-milo-canonical.png` — milo
- `char-vex-canonical.png` — vex
- `char-owen-canonical.png` — owen
- `char-felix-canonical.png` — felix
- `char-pip-canonical.png` — pip
- `char-monke-canonical.png` — monke

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
- ALL SEVEN FIGURES ARE PRESENT AND EVERY FACE IS UNOBSCURED.
- Nobody is cropped by the frame edge and nobody is hidden behind anybody else.
- The relative heights are fixed and must hold: Milo tallest of the boys, Owen shorter and straighter, Felix shortest; Pip tallest of the girls, Lena medium, Vex shortest.
- Pip is a robot and her seams must be clearly visible at this scale at the jaw, neck and at least two limb joints.
- Monke is charcoal-black with a tan face, muzzle, hands and feet, and he is small, roughly knee height to the others.
- This image is exempt from the two-named-figure ceiling that governs the spread plates; that rule exists to keep story pages readable and does not apply to a cast lineup.
CHARACTER: LENA. Use the attached canonical reference image "char-lena-canonical.png" as the authority for face, build, hair and proportion. Match it; do not reinterpret it. The description below is a check on that image, not a licence to depart from it.
An eighteen year old girl of medium height within the three girls, slim and practical in build with slightly narrow shoulders, long lower legs, fair warm skin with a scatter of freckles across the nose and cheeks, a narrow youthful face with a small chin, large round brown eyes that read as startled even at rest, thin mobile eyebrows set high, a small slightly upturned nose, and a wide expressive mouth. Orange hair gathered into **one large, uneven side ponytail** high on her left side, layered and spiky, with loose wisps standing up at the crown and a fringe falling loose over her forehead; that single off-centre ponytail is her dominant silhouette and it must never be centred or split into a matched pair. A small oval pendant on a thin chain sits at the centre of her chest at all times. Her resting expression is alert and slightly anxious, and her posture is open and earnest with a slight forward lean, as though listening or about to ask a question.
Wardrobe: Travel clothes, oversized orange collared shirt worn open over a plain tee, satchel strap running diagonally across the chest
CHARACTER: MILO. Use the attached canonical reference image "char-milo-canonical.png" as the authority for face, build, hair and proportion. Match it; do not reinterpret it. The description below is a check on that image, not a licence to depart from it.
An eighteen year old boy, the tallest of the three boys, slim with long limbs, natural light-to-medium skin of ordinary healthy tone, a long clean-shaven face with a defined jaw, eyebrows and eye shape almost entirely concealed at all times behind small round glasses with red lenses, a straight narrow nose, and a flat unsmiling mouth. Dark reddish-brown hair, jaw-length and slightly messy. He wears an orange ribbed knit beanie at all times. His expression is narrow and controlled and his posture guarded; he should read calm, unreadable and visually restrained. The beanie and the red-lensed glasses are permanent and are never removed.
Wardrobe: orange beanie, red-lensed round glasses, black leather jacket with silver zippers over plain black shirt
CHARACTER: VEX. Use the attached canonical reference image "char-vex-canonical.png" as the authority for face, build, hair and proportion. Match it; do not reinterpret it. The description below is a check on that image, not a licence to depart from it.
An eighteen year old girl, slightly shorter than Lena, compact and athletic with a broad stance and a low grounded centre of gravity, warm brown natural skin with freckles across the cheeks and nose, a compact face with a firm jaw and a slightly upturned chin, large expressive eyes usually narrowed or evaluating, strong dark eyebrows, a small nose, and a mouth set like it is about to say something rude. Bright mint-green hair, short, layered and spiky, gathered into **one messy high bun** at the back left held with a small red tie, with loose pointed strands escaping the bun and framing the face; the spiky mint mass plus that single offset bun is her dominant silhouette. Her resting posture is guarded and confrontational, arms often crossed, hands on hips, or occupied with a tool. No cap and no goggles.
Wardrobe: black leather jacket with silver zippers over plain black shirt, mint-green buns tied with red
CHARACTER: OWEN. Use the attached canonical reference image "char-owen-canonical.png" as the authority for face, build, hair and proportion. Match it; do not reinterpret it. The description below is a check on that image, not a licence to depart from it.
An eighteen year old boy, slightly shorter than Milo and taller than Felix, lean and compact, a completely bald head, very pale skin, **strong dark eyebrows**, narrow eyes held in a flat mildly irritated expression, a thin straight nose, and a mouth pressed into a flat line. His silhouette is minimal and clinical. He is human: no glasses, no goggles, no mechanical seams, no robotic joints, no bandana.
Wardrobe: warm ivory two-piece technical outfit, a high-collared jacket with a small red throat closure over a charcoal undershirt, matching ivory trousers with a cargo pocket, a dark belt, a short red carabiner strap at the hip, dark boots. Smooth, clean and fabric-based, never segmented
CHARACTER: FELIX. Use the attached canonical reference image "char-felix-canonical.png" as the authority for face, build, hair and proportion. Match it; do not reinterpret it. The description below is a check on that image, not a licence to depart from it.
An eighteen year old boy, the shortest of the three boys but clearly a teenager rather than a child, compact and boyish with a straight torso and sturdy hands, dark brown skin, a round open face, bright alert eyes behind large round red-framed glasses with clear lenses, dark eyebrows, a snub nose, and a persistent amused half-grin rather than a wide open one. Short, uneven, tightly textured black hair. A compact brown utility backpack is part of his default silhouette and is worn unless a scene makes it impossible.
Wardrobe: faded teal mechanic-style work jacket with the sleeves pushed up over a dark shirt, orange suspender or harness straps across the chest, dark practical work trousers with functional pockets and tool attachments, worn red-orange sneakers. Small tools, wires or clips may appear. A small green gecko on his shoulder is optional, not a lock
CHARACTER: PIP. Use the attached canonical reference image "char-pip-canonical.png" as the authority for face, build, hair and proportion. Match it; do not reinterpret it. The description below is a check on that image, not a licence to depart from it.
A fully robotic humanoid girl, not a cyborg and not a modified person, the tallest of the three girls, slim and straight with long limbs. Her face material is a pale warm grey with a faint matte sheen and no variation in tone. Round face, large expressive eyes, fine pale eyebrows, small straight nose, and matte purple lips. A circular mechanical port sits beside her ear. Metallic seams, small fasteners and articulated joins are **clearly visible at ordinary scene distance** along the jaw, neck, shoulders, elbows, forearms, wrists, fingers, hips, knees and ankles. Sandy blonde shoulder-length layered hair with side-swept bangs, held back by a **red bandana tied across the head** with a pair of small round aviator goggles resting on top of it, plus a second **red neckerchief knotted at the throat**. Both pieces of red are present and neither replaces the other. Her posture is more vertical and balanced than a human teenager's, and her head turns and hand placements read as exact rather than loose.
Wardrobe: red bandana with goggles on top, patched doodled denim jacket over plain white shirt
CHARACTER: MONKE. Use the attached canonical reference image "char-monke-canonical.png" as the authority for face, build, hair and proportion. Match it; do not reinterpret it. The description below is a check on that image, not a licence to depart from it.
A small monkey built from shaggy layered charcoal-black paper, with a warm tan face patch, tan muzzle, tan inner ears, tan hands and tan feet, a spiky tuft standing up on the crown, very large round white eyes with small black pupils set wide apart, slender limbs, and a long tail that curls into a loose spiral at the tip.
A group of six teenagers and one small monkey standing together in one line across a wide frame, arranged as an ensemble portrait rather than a police lineup: staggered slightly in depth, some turned a few degrees toward each other, weight on different legs, at three or four different distances from the camera so the line has rhythm instead of being flat. Nobody is standing to attention. Each one holds their own characteristic posture — Lena open and leaning slightly forward, Milo guarded with hands in his jacket, Vex arms crossed and chin up, Owen slouched and unbothered, Felix grinning with his backpack on, Pip perfectly vertical and level, Monke crouched low at the near end of the line or perched on a crate. Every face is clearly visible and clearly lit. Exactly seven figures and no others.
Exterior, late afternoon, standing on cracked concrete with the town behind them.
Very wide full-length group shot, camera at chest height and square on, deep enough focus that every face reads, the background a soft flat wash of the town so nothing behind them competes with the figures.
Warm even late-afternoon light from the front left, no face in shadow, soft contact shadows pooling under each figure on the paper.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:1
```

Save as: **`site-cast.png`**

---

## [ ] site-social.png — Share card, what people see when a link is pasted

Aspect 1.91:1 · priority: first

This is the image most people will see before they ever see the site, so it earns its own generation rather than a crop. 1200 x 630 is the target pixel size and 1.91:1 the aspect.

The site typesets the title over the LEFT portion of this card, so the left third must stay calm and reasonably dark and the subject must sit right of centre. No lettering in the image.

**Attach:** nothing. No named figure in this one.

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
- THE LEFT THIRD OF THE FRAME MUST STAY QUIET AND DARK ENOUGH FOR PALE TYPE TO SIT ON IT.
- No lettering, signage copy or numerals anywhere.
- This is not the landing banner recomposed: it is a tighter, more dramatic frame with a clear focal subject rather than a calm panorama.
SETTING:
A small flat American town of low single-storey houses on a grid of wide streets, mature trees between them, a water tower on the horizon, no hills, no landmarks worth photographing.
The town at dusk seen from a low vantage at the end of a long straight residential street, the road running away from the camera toward a small bright horizon, the water tower standing dark against the last of the light off to the right. One street lamp just lit. Every house dark except three or four lit windows. The road surface carries one patch of fresh asphalt, seamless and slightly too new, catching the light differently from everything around it. No figures and no moving vehicles.
Exterior, dusk, the last few minutes of light.
Wide low-angle shot from street level looking down the road, strong one-point perspective, deep focus, the horizon placed right of centre and the left third given over to a dark quiet mass of trees and unlit houses.
Cold blue ambient with a narrow band of warm orange at the horizon only, the fresh asphalt patch picking up a faint sheen, the left of the frame falling to deep blue shadow.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 1.91:1
```

Save as: **`site-social.png`**

---

## [ ] site-arc2.png — Backdrop for the reserved Arc Two band

Aspect 3:1 · priority: second

Sits behind the four dashed placeholder slots, heavily darkened by the site, so it is read as a texture rather than a picture. Its job is to turn reserved space from "unfinished" into "coming".

Must NOT be Millbrook. The whole point is that this is somewhere else, so nothing recognisable from the four volumes may appear: no water tower, no fountain, no corner bookshop, no warehouse. Very low contrast and very few focal points, because type and card outlines will sit over it.

**Attach:** nothing. No named figure in this one.

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
- THIS IS NOT MILLBROOK.
- No water tower, no stone fountain, no corner shop with an awning, no brick warehouse.
- Keep the whole frame low in contrast and even in tone with no bright highlight anywhere, because the site darkens this image and lays dashed cards and type over it.
- No figures at all and no lettering of any kind.
A different town at night, larger and colder than Millbrook: a grid of unlit streets seen from a distance and slightly above, blocks of low buildings, a rail line running through on an embankment, a scatter of sodium street lamps too far apart, and a broad flat sky with no stars. Somewhere in the middle distance a single window is lit. Everything is a shade too orderly, the blocks a shade too regular, as though the place was laid out rather than grown.
Exterior, the middle of the night.
Very wide distant establishing shot from a slight elevation, flat deep focus, no single dominant subject, the whole frame kept even so it can carry type.
Sodium orange pinpricks in a dark blue-grey field, no moon, no strong highlight anywhere, contrast deliberately low and flat.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 3:1
```

Save as: **`site-arc2.png`**

---

## [ ] brand-slop-mark.png — Digital Slop emblem, for the footer and the browser tab

Aspect 1:1 · priority: second

The one asset that makes this read as a universe rather than a single site, and it also becomes the favicon — there is currently no favicon at all, so browsers show a blank page icon in the tab.

**This is the one prompt on the project that REQUIRES legible lettering, so the standard negative block is replaced rather than applied.**

Drop the low-resolution nameplate into `public/images/brand-nameplate-ref.png` and attach it. It is the authority for the wordmark; this generation is a redraw at usable resolution, not a reinterpretation.

Needs to stay readable at 32 x 32 pixels, so the drips must be chunky and few. Test it by shrinking it before accepting.

**Attach these reference images before generating:**
- `brand-nameplate-ref.png` — the existing low-resolution nameplate

```
STYLE: flat two-colour graphic mark, drawn to sit alongside Paper-Theater Millbrook without being a scene from it. Matte, slightly fibrous paper-cut finish, clean cut edges, no gloss. This is a logo: no diorama, no depth planes, no set.

MUST HOLD, these override anything below that appears to contradict them:
- THE WORDS MUST BE LEGIBLE AND SPELLED EXACTLY AS THEY APPEAR IN THE ATTACHED REFERENCE.
- This is the only image in the project where lettering is required rather than forbidden.
- Reproduce the attached mark faithfully: a solid filled circle in warm orange-vermilion with the wordmark in white across the middle, set on two lines, in a rounded hand-drawn lowercase with a slight rightward lean.
- Melting drips hang from the underside of the letters and from the bottom inside edge of the circle.
- Keep the drips CHUNKY and FEW so the mark survives being shrunk to a 32 pixel favicon; do not add fine or numerous drips.
- Flat colour only: exactly two colours, the orange and the white, with no gradient, no bevel, no glow, no outer stroke and no drop shadow.
- The circle is a full bleed circle centred in a square frame with a small even margin of transparent or plain white around it, and it must not be cropped.
A logo mark: a single solid circle in warm orange-vermilion, with a hand-drawn white lowercase wordmark set on two lines across its centre, and thick melting drips hanging from the letters and from the lower inside edge of the circle. Flat vector-like paper-cut finish, two colours only.
Centred square composition, the circle filling most of the frame with a small even margin, straight on and perfectly flat with no perspective.
Flat even illumination with no modelling, no highlight and no shadow.
No third colour. No gradients, bevels, glows, strokes, textures or drop shadows. No photographic realism and no 3D render finish. No background scene, no paper diorama, no characters, no objects and no border. No additional words, taglines, numerals or symbols beyond the wordmark itself. No misspelling and no invented letterforms.
Aspect ratio: 1:1
```

Save as: **`brand-slop-mark.png`**

---

## [ ] vol1-cover.png — Volume 1 cover, The Pothole

Aspect 2:1 · priority: second

Second pass, and a deliberate change of approach. The delivered covers are competent empty rooms: flat, frontal, unpeopled, and all four read as the same beige diorama at thumbnail size. They are also the four largest images a visitor sees, which makes them the weakest thing on the page.

Each cover now puts ONE character in front of that volume’s object, doing the thing the volume is about. A face at thumbnail size is worth more than a well-composed street, and it tells a browser there are people in this.

Cropped to fill at 2:1, so keep the figure and the object both inside the middle two thirds and do not let either touch a frame edge.

**Attach these reference images before generating:**
- `char-lena-canonical.png` — lena

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
CHARACTER: LENA. Use the attached canonical reference image "char-lena-canonical.png" as the authority for face, build, hair and proportion. Match it; do not reinterpret it. The description below is a check on that image, not a licence to depart from it.
An eighteen year old girl of medium height within the three girls, slim and practical in build with slightly narrow shoulders, long lower legs, fair warm skin with a scatter of freckles across the nose and cheeks, a narrow youthful face with a small chin, large round brown eyes that read as startled even at rest, thin mobile eyebrows set high, a small slightly upturned nose, and a wide expressive mouth. Orange hair gathered into **one large, uneven side ponytail** high on her left side, layered and spiky, with loose wisps standing up at the crown and a fringe falling loose over her forehead; that single off-centre ponytail is her dominant silhouette and it must never be centred or split into a matched pair. A small oval pendant on a thin chain sits at the centre of her chest at all times. Her resting expression is alert and slightly anxious, and her posture is open and earnest with a slight forward lean, as though listening or about to ask a question.
Wardrobe: Travel clothes, oversized orange collared shirt worn open over a plain tee, satchel strap running diagonally across the chest
SETTING:
A short commercial main street of two-storey brick and stucco frontages, angled parking, a scatter of vacant units, wide concrete sidewalk with pressure cracks.
A teenage girl standing alone in the middle of an empty small-town road, looking down at a single patch of fresh asphalt under her feet: seamless, slightly too new, no hole and no patch line, catching the light differently from the cracked grey road all around it. She has stopped mid-stride to look, one hand still on her satchel strap, her expression puzzled rather than alarmed. Her long shadow runs across the patch. She is the only figure in frame.
Exterior, flat late-morning daylight.
Wide medium shot, camera at chest height and square on, the figure placed off centre with the object of the volume clearly in the same frame, moderate depth so both the face and the object read.
Soft even light from one clear direction, no face in shadow, no dramatic contrast, soft contact shadows on the ground.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 2:1
```

Save as: **`vol1-cover.png`**

---

## [ ] vol2-cover.png — Volume 2 cover, The Bookstore That Was Always There

Aspect 2:1 · priority: second

Second pass, and a deliberate change of approach. The delivered covers are competent empty rooms: flat, frontal, unpeopled, and all four read as the same beige diorama at thumbnail size. They are also the four largest images a visitor sees, which makes them the weakest thing on the page.

Each cover now puts ONE character in front of that volume’s object, doing the thing the volume is about. A face at thumbnail size is worth more than a well-composed street, and it tells a browser there are people in this.

Cropped to fill at 2:1, so keep the figure and the object both inside the middle two thirds and do not let either touch a frame edge.

**Attach these reference images before generating:**
- `char-vex-canonical.png` — vex

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
- NO LEGIBLE TEXT ANYWHERE.
- The shop signboard, the shelf cards and the door sign must all read as worn marks, not words.
- Do NOT write a shop name.
- An earlier pass rendered "MILLBROOK BOOKS" plus four readable shelf cards, which breaks the negative block outright, and named the shop wrongly: in the story it is Hollow Pine Books.
- Illegible signage is the intended result, not a limitation to work around.
CHARACTER: VEX. Use the attached canonical reference image "char-vex-canonical.png" as the authority for face, build, hair and proportion. Match it; do not reinterpret it. The description below is a check on that image, not a licence to depart from it.
An eighteen year old girl, slightly shorter than Lena, compact and athletic with a broad stance and a low grounded centre of gravity, warm brown natural skin with freckles across the cheeks and nose, a compact face with a firm jaw and a slightly upturned chin, large expressive eyes usually narrowed or evaluating, strong dark eyebrows, a small nose, and a mouth set like it is about to say something rude. Bright mint-green hair, short, layered and spiky, gathered into **one messy high bun** at the back left held with a small red tie, with loose pointed strands escaping the bun and framing the face; the spiky mint mass plus that single offset bun is her dominant silhouette. Her resting posture is guarded and confrontational, arms often crossed, hands on hips, or occupied with a tool. No cap and no goggles.
Wardrobe: black leather jacket with silver zippers over plain black shirt, mint-green buns tied with red
SETTING:
The same corner unit, same footprint and same window and door positions, now presenting as a long-established bookshop: navy canvas awning, hand-painted signboard, window display of stacked paperbacks and small hand-lettered cards, a carved wooden sign in the door glass. **State B of the same location, and the framing of any image of it must match state A exactly.**
A teenage girl standing on the pavement outside a corner bookshop with her arms crossed, head tipped back, looking up at the navy awning and the hand-painted signboard above it with open suspicion. A fat ginger cat is asleep in the window among stacked paperbacks, entirely untroubled by her. The signboard above the awning, the small cards propped among the books, and the carved sign in the door glass are all PRESENT but their lettering is completely ILLEGIBLE: worn, weathered and abstract, readable as marks rather than as words. No word anywhere in the image is spellable. She is the only figure in frame.
Exterior, flat late-morning daylight.
Wide medium shot, camera at chest height and square on, the figure placed off centre with the object of the volume clearly in the same frame, moderate depth so both the face and the object read.
Soft even light from one clear direction, no face in shadow, no dramatic contrast, soft contact shadows on the ground.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 2:1
```

Save as: **`vol2-cover.png`**

---

## [ ] vol3-cover.png — Volume 3 cover, Mr. Henderson's Knee

Aspect 2:1 · priority: second

Second pass, and a deliberate change of approach. The delivered covers are competent empty rooms: flat, frontal, unpeopled, and all four read as the same beige diorama at thumbnail size. They are also the four largest images a visitor sees, which makes them the weakest thing on the page.

Each cover now puts ONE character in front of that volume’s object, doing the thing the volume is about. A face at thumbnail size is worth more than a well-composed street, and it tells a browser there are people in this.

Cropped to fill at 2:1, so keep the figure and the object both inside the middle two thirds and do not let either touch a frame edge.

**Attach these reference images before generating:**
- `char-henderson-canonical.png` — mr henderson

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
- HE IS STILL WEARING HIS OWN WORN BROWN LEATHER SHOES and the new white running shoes are on the floor in front of him, unworn.
- That contrast is the whole picture.
- He has strong white shelf-like eyebrows and thick untidy white hair swept up and back, not combed flat.
- His wristwatch is on.
CHARACTER: MR HENDERSON. Use the attached canonical reference image "char-henderson-canonical.png" as the authority for face, build, hair and proportion. Match it; do not reinterpret it. The description below is a check on that image, not a licence to depart from it.
A man of eighty-one, tall and spare and very slightly stooped, with square shoulders that have not entirely gone, tanned skin deeply lined across the forehead, around the mouth and in crow's feet at the eyes, a long face with hollowed cheeks, kind dark eyes under heavy shelf-like white eyebrows, prominent ears, a strong nose, and a thin mouth that rests in a faint smile and goes up further at one corner. Thick white hair, thinning at the front, worn swept up and back and never tidy. A wristwatch with a small round face on a dark leather strap, always on the same wrist.
Wardrobe: Pale blue-grey button-down shirt with a chest pocket and cream buttons, sleeves rolled to the forearm, tucked into tan pleated trousers with turn-ups, a brown leather belt with a square silver buckle, and worn brown leather shoes. **No running shoes yet**
SETTING:
The covered front porch of a white clapboard house with green shutters, painted floorboards, a screen door, and a two-seat wooden swing hanging on two chains.
A very old man sitting alone on a two-seat wooden porch swing, leaning forward with his forearms on his knees, looking down at a pair of brand new white running shoes set neatly on the boards in front of him, one still carrying a price tag on the tongue. He has not put them on. His own worn brown leather shoes are still on his feet. His expression is thoughtful and slightly wary, as though the shoes were a question rather than a present. He is the only figure in frame.
Exterior, flat late-morning daylight.
Wide medium shot, camera at chest height and square on, the figure placed off centre with the object of the volume clearly in the same frame, moderate depth so both the face and the object read.
Soft even light from one clear direction, no face in shadow, no dramatic contrast, soft contact shadows on the ground.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 2:1
```

Save as: **`vol3-cover.png`**

---

## [ ] vol4-cover.png — Volume 4 cover, The Press Conference

Aspect 2:1 · priority: second

Second pass, and a deliberate change of approach. The delivered covers are competent empty rooms: flat, frontal, unpeopled, and all four read as the same beige diorama at thumbnail size. They are also the four largest images a visitor sees, which makes them the weakest thing on the page.

Each cover now puts ONE character in front of that volume’s object, doing the thing the volume is about. A face at thumbnail size is worth more than a well-composed street, and it tells a browser there are people in this.

Cropped to fill at 2:1, so keep the figure and the object both inside the middle two thirds and do not let either touch a frame edge.

**Attach these reference images before generating:**
- `char-dalton-canonical.png` — mayor dalton

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
- EVERY FOLDING CHAIR IS EMPTY.
- There is no audience whatsoever and no second figure anywhere in the frame.
- He wears cardboard anaglyph 3D glasses at all times, the frame red, his OWN RIGHT lens RED and his OWN LEFT lens CYAN, and his eyes are entirely hidden behind them.
- NO LEGIBLE LETTERING on the banner: angle it or crease it so any marks read as marks rather than words.
CHARACTER: MAYOR DALTON. Use the attached canonical reference image "char-dalton-canonical.png" as the authority for face, build, hair and proportion. Match it; do not reinterpret it. The description below is a check on that image, not a licence to depart from it.
A man in his fifties, heavy and thick through the body, ruddy fair skin, a full face with heavy jowls, small pale eyes entirely concealed behind cardboard anaglyph 3D glasses with a red frame and two different lenses, the wearer's right lens red and the wearer's left lens cyan, which he wears at all times both indoors and out, thick dark brown eyebrows visible above the frame, a bald crown and forehead with dark brown hair standing up in untidy tufts at the temples and around the back, a fleshy nose, and a broad practised salesman's grin that shows his teeth. His suit is a muted dusty purple and never quite fits, pulling at the button and short in the sleeve.
Wardrobe: Ill-fitting muted dusty purple suit, cream shirt, a dark red tie patterned with cream polka dots and knotted slightly askew, a red pocket square folded into the breast pocket
SETTING:
A paved civic square in front of a squat 1960s municipal building of brick and glass, with a low permanent stage, a plain wooden podium, and space for rows of grey metal folding chairs.
A heavy middle-aged man in a dusty purple suit standing alone behind a plain wooden podium on a low stage, mid-gesture with both arms opened wide and a broad practised grin, addressing rows of completely empty grey folding chairs. A rigged cloth banner hangs behind him, seen at enough of an angle that no lettering on it is legible. The emptiness of the chairs is the joke and must be unmistakable. He is the only figure in frame.
Exterior, flat late-morning daylight.
Wide medium shot, camera at chest height and square on, the figure placed off centre with the object of the volume clearly in the same frame, moderate depth so both the face and the object read.
Soft even light from one clear direction, no face in shadow, no dramatic contrast, soft contact shadows on the ground.
No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.
Aspect ratio: 2:1
```

Save as: **`vol4-cover.png`**

---
