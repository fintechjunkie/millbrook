# The Patch Notes: Flip Book Roster

Single source of truth for style, negative constraints, characters, wardrobe states and locations across all four volumes. Spec version 1, dated 2026-07-28.

**Deviation from the working brief, stated plainly.** Part F1 puts the roster in each spec's front matter. Four volumes share one cast, so four copies of the roster would be four things to keep in sync, and Part D2 is explicit that there should be one roster and one source of truth. The roster therefore lives here and the volume specs carry tokens only. Claude Code loads this file first and expands from it.

**The hard rule from D2 applies to this file and nothing else.** No descriptive adjective about a locked character appears anywhere except in its roster entry below. If a spread needs a detail that is not here, this file gets amended first and the amendment propagates. Nobody adds it locally.

---

## 1. Blocking decisions

Items 1 and 2 block the character lock, which per Part H blocks all image work. Neither is mine to resolve.

### 1.1 RESOLVED 2026-07-28 — the reference sheet wins

**Author decision: the mint-green buns.** The prose has been amended to match,
which is the direction this section said would be required if the sheet won.
Three sentences carried her appearance and all three were changed:

| Where | Was | Now |
|---|---|---|
| Vol 1, spread 2 | `White hair sticking out from under a beat-up aviator cap with little cat ears on top. Goggles on her forehead.` | `Mint-green hair in two messy buns, one on either side of her head, tied off with red.` |
| Vol 1, spread 6 | `Short girl, white hair, weird hat.` | `Short girl, green hair, two buns.` |
| Vol 2, spread 1 | `The girl with the white hair walked in` | `The girl with the green hair walked in` |

This is the only sanctioned edit to the prose in the project, and it is recorded
here rather than made quietly, per Part B4. Volume 1 spread 2's declared word
count went from 229 to 226 and the header was updated to match, so the parser's
verification still holds. Two alt texts that described a cap were also updated.

**1.2 is resolved as a side effect.** Dropping `Goggles on her forehead` from
that sentence means goggles now belong to Pip alone, which is what 1.2 below
recommended. No separate edit was needed.

The original discussion follows, kept because it records why.

#### Original: Vex looks like two different people

The character reference sheet and the Patch Notes prose disagree, and not at the edges.

- **Reference sheet:** bright mint-green hair in two messy buns high on either side of the head, red hair tie, warm brown skin, black leather jacket cut like Milo's.
- **Patch Notes prose, Part 1:** short, white hair sticking out from under a beat-up aviator cap with little cat ears on top, goggles on her forehead.

These cannot both be rendered. The recommendation is **the prose wins for these four volumes**, because the prose is the text being illustrated and a reader holding the book will check the picture against the sentence in front of them, not against a reference sheet they have never seen. The cost is that the sheet then describes a different Vex from the one in the published flip books, so the sheet should be amended rather than left to contradict.

The counter-argument is real and worth weighing: mint-green hair is a much stronger silhouette than white hair under a cap, it distinguishes her from Pip instantly, and if Vex is going to appear across a lot of future Digital Slop material then the sheet is the longer-lived document. If that argument wins, the prose descriptions in Part 1 and Part 2 need a light amendment, which is an author decision and not something to do quietly.

**The active entry below uses the prose version. Overwrite it if the sheet wins.**

### 1.2 Two goggle girls, introduced eleven pages apart

In the prose Vex has goggles on her forehead and Pip has goggles in her hair. In text that reads as a shared scavenger aesthetic. In illustration it reads as a mistake, because two short girls of similar age enter the story within one volume of each other wearing the same distinguishing feature, and distinguishing features are the entire mechanism by which a reader tells characters apart at thumbnail size.

Recommendation: **goggles belong to Pip only.** Vex keeps the cat-ear aviator cap, which is a stronger and funnier signature and is hers alone. This is a one-word change in each of two prose sentences, or it can be handled purely at the image level by simply not rendering Vex's goggles, which the immutable block below currently does.

### 1.3 One em-dash in the source, Part 4

Part 4 contains a single em-dash, in the Mayor's interrupted line: `a strategic plan that I have personally—`. Every other dash across the four parts is clean. Flagged and **not fixed**, per Part B4. It reads as a deliberate interruption dash rather than a stylistic one, and the house rule against em-dashes plausibly was never meant to cover a sentence being cut off mid-word. If it should go, an ellipsis or a hard stop both work, but that is the author's call and the ingest pass does not get to make it silently.

### 1.4 Pip's jacket, minor

Prose says a patched-up engineer jacket. The sheet says a slouchy denim jacket with small doodled details all over it. These reconcile if the doodled denim jacket is also the patched one, which is how the immutable block below reads. No amendment needed unless that is wrong.

---

## 2. Style

```
{{STYLE}} = Paper-Theater Millbrook — APPROVED, locked 2026-07-28
```

**Approved.** This resolves the Part E block on all image work. It is a *named*
style, known to the generation project as `Paper-Theater Millbrook`, and the
block below is reproduced byte-identically at the head of every prompt. It does
not get tuned per image. Improving it on spread 20 changes the world from spread
20 onward and there is no recovery except regeneration.

```style
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
```

Two notes on why this works for the format. The deliberate imperfection is doing
continuity work rather than decoration: a world that is *supposed* to have a
mis-cut edge and a slightly wrong tile absorbs the small variation between
generations that a crisp style would put on display. And it earns the story's
premise for free, because a town visibly patched together out of paper is a town
that can be quietly rewritten overnight.

Note the tension to watch: the style says paper seams and wrong-shade tiles are
wanted, while `{{NEGATIVE}}` forbids a 3D render finish. Those agree. But if a
generation starts reading as *clean* paper craft rather than *eccentric* paper
craft, the fix belongs in the negative block below, not in this one.

```
{{NEGATIVE}} =
```

> No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name.

This block grows during production as failures reveal themselves. It lives here so additions propagate to every prompt in one edit.

**Amended when the style was approved.** Two clauses fought the Paper-Theater
style and were narrowed rather than dropped:

- `no drop shadows` became `no graphic or decorative drop shadow applied to the
  image as a whole`. The unqualified version forbade the soft contact shadows
  between paper layers, which is the mechanism the entire style uses to build
  depth. It would have read as an instruction to flatten the artwork.
- `no 3D render finish` became `no glossy 3D render finish`, matching the style's
  own wording. The style *is* dimensional; what is unwanted is the plastic sheen
  of a render, not depth itself.

**Amended again when Milo's green tinge was removed.** Added: no green or unwell cast
to any *human* character's skin unless the prompt asks for it by name. In this world
green skin means somebody is ill, so the colour is a signal and has to stay available
to mean that. The clause stops it arriving by accident while leaving it usable on
purpose.

The word *human* is load-bearing. Pip's immutable block specifies **uniform pale
grey** skin because she is a machine, and Volume 3 spread 8 shows her hands as
*faintly grey* with fine seams at the wrists. A first draft of this clause excluded
grey as well and would have fought both of those. Green is the signal; grey is Pip.

`Aspect ratio: 3:2` for every image page. `2:1` for the four chapter openers, which run full bleed across both pages of the spread.

Amended twice, from `2:3`/`4:3` and then from `4:3`/`16:9`. The reader spread is now 2:1, made of two square pages, so an opener at 2:1 fills the spread exactly and a 3:2 plate sits landscape on its page. Both changes were made while zero images existed and therefore cost nothing; after spread work begins the same change costs a full regeneration.

---

## 3. Prompt assembly convention

Element order is fixed by Part D6 and is not negotiable per image. Slot 2 of that order allows either a character block or a location block; several spreads need both. **The convention is character blocks first in roster order, then the location block, both inside slot 2.** Claude Code assembles in this order every time and does not optimise, rearrange or condense for a particular subject.

```
{{STYLE}}
{{CHAR:...}} {{WARDROBE:...}}   one pair per named figure, roster order
{{LOC:...}}
[action]
[setting and time of day]
[framing and shot type]
[lighting]
{{NEGATIVE}}
Aspect ratio
```

---

## 4. Character roster

Each immutable block is one paragraph, pasted verbatim into every prompt in which the character appears. Never paraphrased, never reordered, never expanded for a particular scene. Where the reference sheet was silent on a required field, the value below is an invention that needs approving once, here, rather than being decided fresh in eleven prompts.

None of the entries are approved yet. Approval means a canonical portrait has been generated from the style block plus the immutable block alone, iterated until right, and its prompt string, seed and filename recorded. That is a blocking step under Part D4.

### {{CHAR:LENA}}
**Immutable:** An eighteen year old girl of average height and slight build, fair skin with a scatter of freckles across the nose and upper cheeks, an oval face with a soft jaw, large round brown eyes that read as startled even at rest, thin mobile eyebrows set high, a small slightly upturned nose, a wide expressive mouth, and orange hair of medium thickness pulled into two short side ponytails held with small plain hair ties, with wispy loose pieces standing up at the crown. A small oval pendant on a thin chain sits at her throat at all times.
**Canonical reference:** `char-lena-canonical.png` · Seed: pending · Approved: no
**Rendering note:** Her face is the book's emotional register and it shows every thought she has. Resist neutral expressions on her.

### {{CHAR:MILO}}
**Immutable:** An eighteen year old boy, tall and lean, fair skin of ordinary healthy tone, a long face with a defined jaw, eyebrows and eye shape almost entirely concealed at all times behind small round sunglasses with red lenses, a straight narrow nose, a flat unsmiling mouth, and dark reddish-brown hair falling messily past the jaw. He wears an orange knit beanie pulled low to the eyebrows at all times. The beanie and the red-lensed glasses are permanent and are never removed.
**Canonical reference:** `char-milo-canonical.png` · Seed: pending · Approved: no
**Rendering note:** Because the eyes are unavailable, everything expressive has to be carried by mouth, shoulders and the angle of the head. Prompts for him should always specify posture.
**Amended 2026-07-28: the green tinge is removed.** It said *skin carrying a distinct
cool green tinge*, inherited from the character reference sheet.

**In this world green skin means somebody is ill.** A permanent tinge therefore read
as Milo being permanently sick, which is not the character and would have quietly
mistold the reader something every time he appeared. The colour is a signal and it
has to stay available to mean what it means.

Two things make this a clean amendment rather than a costly one:

- **The prose never says it.** Milo is described only as *tall and dark-haired* with
  *a jacket that fit him better than most teenage boys could manage*. Unlike the Vex
  amendment, no sentence of the manuscript has to change.
- **Both existing plates already omit it.** `vol1-s06` and `vol2-s06` render him with
  ordinary fair skin, so they become correct retroactively and nothing needs
  regenerating. They had been drifting toward the right answer for the wrong reason.

See the addition to `{{NEGATIVE}}` in section 2, which keeps green from arriving by
accident on anybody else while leaving it usable deliberately.

### {{CHAR:VEX}}
**Immutable:** A short and wiry eighteen year old girl, warm brown skin with freckles across the cheeks, a round face with a pointed chin, large dark eyes usually narrowed, straight dark eyebrows, a small nose, and a mouth set like it is about to say something rude. Her hair is bright mint green, worn in two messy buns high on either side of the head, held with a small red hair tie. She wears a black leather jacket with silver zippers over a plain black shirt. No cap and no goggles.
**Canonical reference:** `char-vex-canonical.png` · Seed: pending · Approved: yes, resolved by 1.1

### {{CHAR:PIP}}
**Immutable:** A short girl of apparently sixteen who is a machine rather than a modified person, of even slender build. Her skin is a uniform pale grey with a faint matte sheen and no variation in tone anywhere. Round face, large expressive eyes with a smooth mechanical iris, fine pale eyebrows, small straight nose, and matte purple lips. On the side of the face nearest the left ear there is a small circular port, and very fine metallic seams run from the jaw down the neck and disappear into her collar. Sandy blonde shoulder-length hair with side-swept bangs, held back by a red bandana pushed up to the hairline with a pair of small round aviator goggles resting on top of it. She wears a slouchy patched denim jacket covered in small hand-drawn doodles over a plain white shirt.
**Canonical reference:** `char-pip-canonical.png` · Seed: pending · Approved: no
**Rendering note:** The tell is stillness, not hardware. Every prompt involving her body should specify a posture that is a shade too even, too level or too symmetrical. Never render her mid-blink and never give her an asymmetric slouch.

### {{CHAR:OWEN}}
**Immutable:** An eighteen year old boy of average height and thin build, a fully bald head with no eyebrows whatsoever, pale skin with faint shadows under the eyes, a narrow face with prominent cheekbones, dark deep-set eyes held in a permanent slight squint, a thin straight nose, and a mouth pressed into a flat line. He wears a white high-collared jumpsuit zipped up the front with a single small red button at the throat.
**Canonical reference:** `char-owen-canonical.png` · Seed: pending · Approved: no

### {{CHAR:FELIX}}
**Immutable:** An eighteen year old boy, short and compact, warm deep brown skin, a round open face, bright alert dark eyes set wide behind round glasses with thin red frames, dark eyebrows, a snub nose, and a wide ready grin that shows his teeth. Dense black hair worn in a short upright afro. He wears a faded teal denim jacket with the sleeves pushed up over a plain black t-shirt, and a webbing harness of orange and brown straps across his chest hung with small hand tools, a wrench and a carabiner. A small bright green gecko is on his person, on a shoulder or within reach.
**Canonical reference:** `char-felix-canonical.png` · Seed: pending · Approved: no
**Rewritten 2026-07-28 to match the art.** The old block described a character the
project had stopped drawing: *auburn hair in two small ponytails like antennae, a blue
and orange floral-patterned bucket hat, a black turtleneck, a purple polka-dot
button-up worn open*. None of that has ever been rendered.

What has been rendered, **consistently and twice**, in `vol1-s06` and `vol2-s04`: deep
brown skin, a short upright black afro, round glasses with thin red frames, a faded
teal denim jacket over a black t-shirt, and a strap harness of small hand tools across
the chest. Two independent generations agreeing with each other and disagreeing with
the roster is not drift, it is the roster being out of date.

The gecko survived both plates and stays. It was the one element of the old block the
art kept, which is worth noting: the gecko is named in the prose and the wardrobe was
not.

**This is why the description had to move rather than the images.** With no reference
file on disk, the description was the only authority, and it was describing somebody
who does not exist in this project. Re-rendering the old block would have produced a
third Felix.

### {{CHAR:MONKE}}
**Immutable:** A small brown monkey with dark sharp eyes, slender limbs and a long tail.
**Canonical reference:** `char-monke-canonical.png` · Seed: pending · Approved: no
**Rendering note, and this one is a constraint not a preference.** The reference sheet says do not explain Monke, and in this format the image is capable of explaining him whether or not the prose does. He is therefore never given a resolved hero portrait. Across all four volumes he appears twice, once as a shape against screen glow with his face largely in shadow and once as an unresolved silhouette on a high shelf, and he is deliberately absent from the final image of Volume 4 even though he is the subject of its last paragraph. If a later pass wants him more prominent, that is a decision about how much of him the reader is allowed to understand, and it should be made on purpose.

### {{CHAR:AUNT_CAROL}}
**Immutable:** A woman in her late fifties, average height and upright, lean rather than soft, warm mid-toned skin with a scatter of freckles across the nose and cheeks, a face that has kept its structure, alert dark eyes under dark eyebrows that contrast strongly with her hair, a straight nose, and a mouth that rests closed and level and goes up at one corner when she is amused. Abundant silver-white hair swept up and back off the face with volume at the crown, held with a patterned rust-red headscarf knotted in it. A single gold hoop earring.
**Canonical reference:** `char-carol-canonical.png` · Seed: pending · Approved: no
**Rendering note:** She is not defeated and should not be drawn sad. The register is a woman carrying something heavy competently and for a long time.
**Rewritten 2026-07-28 to match the art, on thinner evidence than Felix.** The old
block read *heavyset, fair skin gone slack at the jaw, a broad face with deep lines at
the mouth, tired hooded hazel eyes, sparse eyebrows, a broad nose, grey-brown hair cut
short and practical, reading glasses on a beaded chain, a shapeless cardigan*. The
delivered plate contradicts nearly every clause of that.

Worth saying plainly: the delivered Carol serves her own rendering note **better than
the old description did**. That note says she is not defeated and should not be drawn
sad, and that the register is competence carried for a long time. *Tired hooded eyes*
and *a shapeless cardigan* were pulling against it. The plate reads as someone who has
held a difficult line for thirty years and is still entirely present.

**Caveat, and it is the reason this entry says so.** This is rewritten from **one**
plate, `vol2-s07`, where Felix had two agreeing ones. She appears again in Volume 4
spread 1, and that plate will either confirm this block or expose it. If they disagree,
this entry is the one to doubt.

### {{CHAR:MAYOR_DALTON}}
**Immutable:** A man in his fifties, heavy and thick through the body, ruddy fair skin, a full face with heavy jowls, small pale eyes entirely concealed behind cardboard anaglyph 3D glasses with a red frame and two different lenses, the wearer's right lens red and the wearer's left lens cyan, which he wears at all times both indoors and out, thick dark brown eyebrows visible above the frame, a bald crown and forehead with dark brown hair standing up in untidy tufts at the temples and around the back, a fleshy nose, and a broad practised salesman's grin that shows his teeth. His suit is a muted dusty purple and never quite fits, pulling at the button and short in the sleeve.
**Canonical reference:** `char-dalton-canonical.png` · Seed: pending · Approved: no
**Amended 2026-07-28 to match the accepted plate.** Volume 1 spread 5 was flagged for
regeneration and the author kept it, so the roster follows the image rather than the
reverse. He appears in Volumes 1, 3 and 4, so the block had to move or the later
plates would have contradicted the one already made. Changed, each against what is
actually visible in `vol1-s05.png`:

| Was | Now |
|---|---|
| `red-lensed 3D glasses` | red frame, right lens red, left lens **cyan** — real anaglyph glasses |
| `thinning sandy hair combed across` | **bald crown**, dark brown hair in **untidy tufts** at the temples |
| suit implied grey by the wardrobe entry | **muted dusty purple**, stated here so it cannot drift |
| no eyebrows specified | thick dark brown, visible above the frame |
| `pear-shaped, narrow at the shoulders and wide at the waist` | `heavy and thick through the body` |

That last one is the softest change and the reason is worth stating: the accepted
plate is a low-angle chest-up crop in which his shoulders read broad, contradicting
`narrow at the shoulders`, but his waist is not in frame at all. Rather than invent a
silhouette from a crop that cannot show one, the build is described in terms the image
does support. His full-length canonical portrait, entry 10 on the canonical sheet, is
what should settle the silhouette properly.

### {{CHAR:ADMIRAL_CRANE}}
**Immutable:** A man in his sixties, tall and very upright, thin, with pale weathered skin at the temples and around the eyes, which is the only part of his face visible because a pale blue medical mask covers everything from the bridge of the nose down and is never removed. Grey hair cut short and military. The visible eyes are pale, calm and tired, set in fine lines, under level grey eyebrows. He wears navy dress uniform with a dense block of ribbons and medals across the left breast, and he stands with both hands clasped behind his back.
**Canonical reference:** `char-crane-canonical.png` · Seed: pending · Approved: no

### {{CHAR:CASSIE}}
**Immutable:** A small slight fifteen year old girl, fair skin, a narrow face with a small chin, wide grey-blue eyes, fine light eyebrows, a small nose, and a soft mouth that rests slightly open. Straight mid-brown hair to the shoulders, tucked behind the left ear so that a small beige hearing aid is visible there.
**Canonical reference:** `char-cassie-canonical.png` · Seed: pending · Approved: no
**Rendering note:** The hearing aid is the whole point and must stay visible in every image of her. In Volume 4 she wears over-ear headphones and the aid is beneath them, so specify that it is still there.

### {{CHAR:MR_HENDERSON}}
**Immutable:** A man of eighty-one, tall and spare with square shoulders that have not entirely gone, tanned skin deeply lined across the forehead and at the eyes, a long face, kind pale blue eyes under heavy white brows, a strong nose, a thin mouth that goes up at one corner, and thick white hair combed back. He wears a plain button-down shirt tucked into khakis.
**Canonical reference:** `char-henderson-canonical.png` · Seed: pending · Approved: no

### {{CHAR:GREEN_CARDIGAN_WOMAN}}
**Immutable:** A woman of about sixty, average height and comfortably built, fair skin with fine lines, a soft round face, warm brown eyes, faded eyebrows, a small nose, and a genuinely warm smile that sits easily on her. Salt-and-pepper hair gathered in a low bun at the nape. Reading glasses on a chain. She wears a soft green cardigan on which one button, the third from the top, is a slightly different green from the rest.
**Canonical reference:** `char-cardigan-canonical.png` · Seed: pending · Approved: no
**Rendering note:** Never render her as sinister. The mismatched button is the only thing in the frame that is wrong, and it should be legible without being pointed at.

---

## 5. Wardrobe states

The four volumes cover roughly a fortnight: Volume 1 is day one, Volume 2 is day two, Volume 3 is a Tuesday and Wednesday of a later week, Volume 4 is that Friday. States are keyed to that story time. Most of the cast wear a signature outfit that does not change, which is a gift for continuity, so only the states that actually vary are listed as variants.

| Token | Value | Story time |
|---|---|---|
| `{{WARDROBE:LENA_A}}` | Travel clothes, oversized orange collared shirt worn open over a plain tee, satchel strap running diagonally across the chest | Vol 1, day one |
| `{{WARDROBE:LENA_B}}` | Same orange collared shirt, sleeves pushed up, satchel strap present | Vol 2, day two |
| `{{WARDROBE:LENA_C}}` | Same orange collared shirt, worn buttoned, satchel strap present | Vol 3 |
| `{{WARDROBE:LENA_D}}` | Same orange collared shirt, visibly creased and slept in, satchel strap present | Vol 4 |
| `{{WARDROBE:MILO_A}}` | Signature: orange beanie, red-lensed round glasses, black leather jacket with silver zippers over plain black shirt. Unchanged in all four volumes | all |
| `{{WARDROBE:VEX_A}}` | Signature: black leather jacket with silver zippers over plain black shirt, mint-green buns tied with red. Unchanged in all four volumes | all |
| `{{WARDROBE:PIP_A}}` | Signature: red bandana with goggles on top, patched doodled denim jacket over plain white shirt. Unchanged in all four volumes | all |
| `{{WARDROBE:OWEN_A}}` | Signature: white high-collared jumpsuit, red throat button. Unchanged in all four volumes | all |
| `{{WARDROBE:FELIX_A}}` | Signature: faded teal denim jacket with sleeves pushed up over a plain black t-shirt, orange and brown webbing harness of small hand tools across the chest. Unchanged in all four volumes | all |
| `{{WARDROBE:CAROL_A}}` | Dark teal button-up work shirt with brass buttons, collar up, a rust-red knit layer at the throat, rust-red braces over the shirt, brown leather belt with a brass buckle, charcoal trousers | all |
| `{{WARDROBE:MAYOR_A}}` | Ill-fitting muted dusty purple suit, cream shirt, a dark red tie patterned with cream polka dots and knotted slightly askew, a red pocket square folded into the breast pocket | Vols 1 to 3 |
| `{{WARDROBE:MAYOR_B}}` | The same ill-fitting purple suit and red pocket square, but a conspicuously **new** tie, stiff and bright and still holding its fold creases, replacing the polka-dot one | Vol 4 only |
| `{{WARDROBE:CRANE_A}}` | Navy dress uniform, full medals, pale blue medical mask | all |
| `{{WARDROBE:CASSIE_A}}` | Zip hoodie over a tee, one hearing aid visible behind the left ear, the second one loose in her hand or pocket | Vol 3 |
| `{{WARDROBE:CASSIE_B}}` | The same hoodie, plus large over-ear headphones. The hearing aid is still present beneath them. Holding a folded sheet of paper with handwriting that is not legible | Vol 4 |
| `{{WARDROBE:HENDERSON_A}}` | Button-down and khakis, worn old slip-on shoes, no running shoes yet | Vol 3, Tuesday morning |
| `{{WARDROBE:HENDERSON_B}}` | Button-down and khakis with brand new white running shoes, one of which still carries a price tag on the tongue | Vol 3 afternoon onward, and Vol 4 |
| `{{WARDROBE:CARDIGAN_A}}` | Green cardigan with the mismatched third button, plain blouse, reading glasses on their chain | all |

The Mayor's new tie and Mr. Henderson's price-tagged shoes are both stated in the prose, which means an attentive reader can check them. They are the two continuity details most worth getting right.

---

## 6. Location roster

Recurring locations get a canonical establishing image before spread work begins, per Part D4. Locations used once do not, and are marked accordingly.

| Token | Block | Uses | Canonical ref |
|---|---|---|---|
| `{{LOC:MILLBROOK_WIDE}}` | A small flat American town of low single-storey houses on a grid of wide streets, mature trees between them, a water tower on the horizon, no hills, no landmarks worth photographing. | 1 | not required |
| `{{LOC:MILLBROOK_RESIDENTIAL}}` | A residential street of modest single-storey houses set back behind short lawns, chain link and low hedges, cracked concrete sidewalk, power lines overhead, parked sedans. | 2 | `loc-residential.png` |
| `{{LOC:CRESCENT_HOUSE_EXT}}` | A small single-storey house with pale yellow aluminium siding, a chain link fence across the front, three concrete porch steps with a plain iron rail, and a chipped ceramic frog ornament beside the bottom step with one ear broken off. | 1 | not required |
| `{{LOC:BACK_BEDROOM}}` | A small square bedroom holding a single bed, a closet with a visible dent low on the door, a shelf of dull sports trophies, and faded band and athlete posters taped to the walls. Blinds, not curtains. | 1 | not required |
| `{{LOC:AUNT_CAROL_KITCHEN}}` | A dated kitchen with wood-look cabinets, patterned linoleum, a small round table with a vinyl tablecloth and four mismatched chairs, a single bulb on a chain hanging low over the table. | 1 | not required |
| `{{LOC:AUNT_CAROL_LIVING_ROOM}}` | A cramped living room with a sagging patterned couch, a doily-covered side table, a boxy older television on a low stand, and an open doorway through to the kitchen. | 1 | not required |
| `{{LOC:MAIN_STREET}}` | A short commercial main street of two-storey brick and stucco frontages, angled parking, a scatter of vacant units, wide concrete sidewalk with pressure cracks. | 1 | not required |
| `{{LOC:THE_PARK}}` | A flat municipal park of mown grass and mature shade trees with a low round stone fountain at its centre and slatted wooden benches on a paved ring around it. | 1 | not required |
| `{{LOC:TOWN_HALL_SQUARE}}` | A paved civic square in front of a squat 1960s municipal building of brick and glass, with a low permanent stage, a plain wooden podium, and space for rows of grey metal folding chairs. | 6 | `loc-square.png` |
| `{{LOC:WAREHOUSE_MASTER}}` | The whole converted warehouse interior in one view. **Reference only, never expanded into a spread prompt.** See section 6.1. | — | `loc-warehouse-canonical.png` |
| `{{LOC:WAREHOUSE_PIT}}` | The lounge end of a converted warehouse interior: four mismatched couches sagging in the middle arranged around a low scarred coffee table on bare concrete, a wall of three salvaged televisions behind them, a high shelf on the wall above, exposed steel roof trusses and high dusty clerestory windows far above. | 7 | `loc-pit.png` |
| `{{LOC:WAREHOUSE_TERMINALS}}` | The desk end of the same warehouse: a long trestle desk against a brick wall carrying three monitors on stacked books, a mechanical keyboard, cable runs stapled along the wall, and a row of dented energy drink cans. | 4 | `loc-terminals.png` |
| `{{LOC:WAREHOUSE_SHOP}}` | A workbench end of the same warehouse, scarred plywood top under a clamp lamp, hand tools on a pegboard, part-built devices in various states, solder spool, scorch marks. | 1 | not required |
| `{{LOC:WAREHOUSE_EXT}}` | The outside of a low brick industrial building on a quiet back street, a roller shutter door, a concrete kerb, weeds at the base of the wall. | 1 | not required |
| `{{LOC:VEX_APARTMENT}}` | A single-room apartment above a shop where every horizontal surface is covered and most of the furniture was something else first, milk crates for stools, a bare bulb, a kitchen counter used as a workbench. | 2 | `loc-vex-apartment.png` |
| `{{LOC:LAUNDROMAT}}` | A small laundromat with two banks of white front-loading machines facing each other, a wall-mounted bench along the window, a folding counter, worn vinyl floor, fluorescent tubes overhead. | 1 | not required |
| `{{LOC:MAPLE_AND_FOURTH_A}}` | A corner retail unit with cheap flat plastic signage, a grey vinyl awning sagging at one corner, a dark window with an illuminated sign in it. **State A of a single location.** | 1 | `loc-corner-a.png` |
| `{{LOC:MAPLE_AND_FOURTH_B}}` | The same corner unit, same footprint and same window and door positions, now presenting as a long-established bookshop: navy canvas awning, hand-painted signboard, window display of stacked paperbacks and small hand-lettered cards, a carved wooden sign in the door glass. **State B of the same location, and the framing of any image of it must match state A exactly.** | 1 | `loc-corner-b.png` |
| `{{LOC:HOLLOW_PINE_INT}}` | The interior of a settled second-hand bookshop, floor-to-ceiling wooden shelving, worn overlapping rugs on board floors, a wooden counter with a low lamp, warm lampshades, a stack of cookbooks with a high shelf above it. | 2 | `loc-hollow-pine-int.png` |
| `{{LOC:HENDERSON_PORCH}}` | The covered front porch of a white clapboard house with green shutters, painted floorboards, a screen door, and a two-seat wooden swing hanging on two chains. | 1 | not required |
| `{{LOC:OLD_SCHOOL}}` | A long low single-storey 1960s school building behind a sagging chain link fence, ground-floor windows boarded with plywood, six acres of dead grass, and a play structure with the swings removed leaving the crossbar and cut chains. | 1 | not required |
| `{{LOC:HOTEL_ROOM}}` | A tidy budget hotel room, one made double bed, a laminate desk, a wall-mounted television, and an open closet alcove with a hanging rail. | 1 | not required |

**Location state pattern.** `MAPLE_AND_FOURTH_A` and `B` follow the same discipline Part D3 sets out for damaged wardrobe: B is defined as a change to A rather than as a new place, and the two images are framed identically from the same camera position. The point of the volume is that the corner was one thing and is now another, and a reader who flips back one volume and finds the composition matches will get that for free. It is the single highest-value image decision in the set and it is worth insisting on.

---

## 6.1 The Warehouse, and why it gets a master reference

**PIT, TERMINALS and SHOP are three ends of one room, not three rooms.** Eleven of
the thirty-seven images happen in this building, which is more than twice any other
location, and the cast is there in every volume.

Generating `loc-pit.png` and `loc-terminals.png` as independent references invites
the failure this system exists to prevent: two plates that are each internally
consistent and clearly not the same building. A reader who sees the couches in one
image and the desk in another has to believe they are forty feet apart.

So `WAREHOUSE_MASTER` is generated **first**, as one wide view of the whole interior
with all three zones and their spatial relationship visible. The three zone
references are then generated *from* it, as crops or nearer views of the same space,
and every spread prompt attaches its zone reference. The master is a reference
document and is never expanded into a spread prompt.

### Fixed features, assembled from what the prose actually says

Each of these is load-bearing somewhere in the arc, so the master image has to
establish all of them, and nothing later may contradict them.

| Feature | Where the prose establishes it |
|---|---|
| A back door, propped open with a brick | Vol 1 sp3: *"the back door, which Felix had jammed open with a brick again"* |
| A welcome mat just inside it | Vol 2 sp4: *"Technically I'm on the welcome mat. I haven't crossed the threshold yet."* |
| Four mismatched sagging couches around a low scarred table, on bare concrete | Roster; Vol 2 sp6 *"either end of a sagging couch"* |
| A wall of three salvaged televisions behind the couches | Roster |
| A high shelf, above and overlooking the lounge | Vol 2 sp5, Vol 3 sp7, Vol 3 sp8: Monke sits on it and *"watches everything"* |
| Owen's long trestle desk: three monitors on stacked books, mechanical keyboard, cables stapled along the brick, a row of dented cans | Roster; Vol 1 sp3 |
| Felix's Shop: scarred plywood bench under a clamp lamp, pegboard of hand tools, part-built devices, solder spool, scorch marks | Roster; Vol 2 sp5 *"Vex was inspecting Felix's Shop"* |
| A dark stretch near the back wall with an abandoned second-router attempt | Vol 3 sp7: *"where Felix had once been trying to set up a second router and had given up"* |
| Exposed steel roof trusses, high dusty clerestory windows far above | Roster |
| A low brick industrial building with a roller shutter door | `WAREHOUSE_EXT` |

**One thing the master must leave room for.** In Volume 4 they clear a corner near
the back wall and put a small desk there for Lena, next to Owen's setup, and Owen
moves his cans to make room. So the master shows that corner **empty and unused**,
and the Volume 4 plate shows it occupied. That is a state change on the same
location, the same discipline as the Maple and Fourth pair, and it only works if the
corner exists in the master and is visibly free.

No figures and no animals in the master. It is the room, not a scene.

---

## 7. Production arithmetic

| | Count |
|---|---|
| Text spreads | 33 |
| Chapter openers | 4 |
| **Spread images total** | **37** |
| Canonical character references | 13 |
| Canonical location references | 8 |
| **Blocking generations before spread work** | **21** |
| Expected regeneration at 5 to 15 percent | 2 to 6 |
| **Realistic total generations** | **60 to 64** |

This is a comfortable number. Part B5 warns about novel length, where the count runs past three hundred and the forks in Part H become necessary. At 37 spread images none of that applies: the full one-image-per-spread format holds, the object and atmospheric share does not need inflating as a release valve, and no volume needs splitting since the largest is ten spreads against a threshold of one hundred and fifty.

## 8. Shot mix, all four volumes

| Type | Target | Actual | Count |
|---|---|---|---|
| Establishing or location | 20 to 25% | 21.6% | 8 |
| Character portrait or close | 25 to 30% | 29.7% | 11 |
| Object or detail | 15 to 20% | 16.2% | 6 |
| Action moment | 15 to 20% | 16.2% | 6 |
| Atmospheric or empty | 15 to 20% | 16.2% | 6 |

All five bands satisfied. No three consecutive spreads share a shot type in any volume. Portraits sit at the top of their band deliberately: eight new named characters arrive across these four volumes and each one needs at least one image in which a reader can learn their face.
