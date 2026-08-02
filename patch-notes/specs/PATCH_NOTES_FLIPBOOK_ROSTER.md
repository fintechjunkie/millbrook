# The Patch: Flip Book Roster

Single source of truth for style, negative constraints, characters, wardrobe states and locations across all four volumes. Spec version 1, dated 2026-07-28.

**Deviation from the working brief, stated plainly.** Part F1 puts the roster in each spec's front matter. Four volumes share one cast, so four copies of the roster would be four things to keep in sync, and Part D2 is explicit that there should be one roster and one source of truth. The roster therefore lives here and the volume specs carry tokens only. Claude Code loads this file first and expands from it.

**The hard rule from D2 applies to this file and nothing else.** No descriptive adjective about a locked character appears anywhere except in its roster entry below. If a spread needs a detail that is not here, this file gets amended first and the amendment propagates. Nobody adds it locally.

---

## 1. Blocking decisions

Items 1 and 2 block the character lock, which per Part H blocks all image work. Neither is mine to resolve.

### 1.1 RESOLVED 2026-07-28 — the reference sheet wins

**Author decision: the mint-green buns — TWO of them, one on each side.** Confirmed again by
the author on 2026-07-29 after a new plate came back with a single bun. The cause was this
document contradicting itself: the reference-sheet note above and the wardrobe table both said
"buns", plural, while the immutable block in Part 2 had been amended to "one messy high bun at
the back left". The immutable block is the text pasted verbatim into every prompt, so the one
wrong line was the only one the generator ever saw, and it obediently produced one bun.

The lesson is the standing one in this file, arrived at from the wrong direction: check the
canonical image, and when the prose disagrees with itself, the block that reaches the prompt is
the one that matters. The prose has been amended to match,
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

> No text, lettering, numerals, signage copy, captions, watermarks or logos anywhere in the image. No extra, missing or malformed limbs, hands or fingers. No additional faces beyond those specified. No duplicated or mirrored figures. No lens flare, bloom or chromatic aberration. No legible screen or display content and no phone interface elements. No photographic realism, no glossy 3D render finish, no anime house style. No borders, frames or panel gutters. No graphic or decorative drop shadow applied to the image as a whole. No green or unwell cast to any human character's skin unless the prompt asks for it by name. No murky, underlit or crushed interior: whatever the hour, wall colour, furniture and every face in frame stay clearly readable, and large areas of the frame must not fall to featureless black unless the prompt names a single light source and asks for it.

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
**Immutable:** An eighteen year old girl of medium height within the three girls, slim and practical in build with slightly narrow shoulders, long lower legs, fair warm skin with a scatter of freckles across the nose and cheeks, a narrow youthful face with a small chin, large round brown eyes that read as startled even at rest, thin mobile eyebrows set high, a small slightly upturned nose, and a wide expressive mouth. Orange hair gathered into **one large, uneven ponytail high at the BACK of her head**, layered and spiky, with loose wisps standing up at the crown and a fringe falling loose over her forehead; that single heavy ponytail is her dominant silhouette and it must never be split into a matched pair. In three-quarter and profile views it swings out to one side and reads as a side ponytail, but it is gathered centrally at the back — the canonical sheet is a three-quarter view and this is what it is showing. A small oval pendant on a thin chain sits at the centre of her chest at all times. Her resting expression is alert and slightly anxious, and her posture is open and earnest with a slight forward lean, as though listening or about to ask a question.
**Canonical reference:** `char-lena-canonical.png` · Seed: pending · Approved: no
**Rendering note:** Her face is the book's emotional register and it shows every thought she has. Resist neutral expressions on her.

### {{CHAR:MILO}}
**Immutable:** An eighteen year old boy, the tallest of the three boys, slim with long limbs, natural light-to-medium skin of ordinary healthy tone, a long clean-shaven face with a defined jaw, eyebrows and eye shape almost entirely concealed at all times behind small round glasses with red lenses, a straight narrow nose, and a flat unsmiling mouth. Dark reddish-brown hair, jaw-length and slightly messy. He wears an orange ribbed knit beanie at all times. His expression is narrow and controlled and his posture guarded; he should read calm, unreadable and visually restrained. The beanie and the red-lensed glasses are permanent and are never removed.
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
**Immutable:** An eighteen year old girl, slightly shorter than Lena, compact and athletic with a broad stance and a low grounded centre of gravity, warm brown natural skin with freckles across the cheeks and nose, a compact face with a firm jaw and a slightly upturned chin, large expressive eyes usually narrowed or evaluating, strong dark eyebrows, a small nose, and a mouth set like it is about to say something rude. Bright mint-green hair, short, layered and spiky, gathered into **two messy buns, one high on each side of the head**, each held with a small red tie, with loose pointed strands escaping them and framing the face; the spiky mint mass plus that symmetrical pair of high side buns is her dominant silhouette, and it must never be reduced to a single bun or a single ponytail. Her resting posture is guarded and confrontational, arms often crossed, hands on hips, or occupied with a tool. No cap and no goggles.
**Canonical reference:** `char-vex-canonical.png` · Seed: pending · Approved: yes, resolved by 1.1
**Enriched 2026-07-28 from `MILLBROOK_MAIN_CHARACTER_LOCKS.md`.** Adds what the lock file
specifies and the entry lacked: her height *relative to Lena*, the compact athletic build
and grounded stance, the guarded resting posture, and the note that the two buns are the
dominant silhouette. The lock also forbids the discarded alternative in terms worth
keeping visible — *"do not make the hair pastel blue, white, or dark green"* and *"do not
remove the two mint hair buns"* — which is the same decision 1.1 reached, arrived at
independently.

### {{CHAR:PIP}}
**Immutable:** A fully robotic humanoid girl, not a cyborg and not a modified person, the tallest of the three girls, slim and straight with long limbs. Her face material is a pale warm grey with a faint matte sheen and no variation in tone. Round face, large expressive eyes, fine pale eyebrows, small straight nose, and matte purple lips. A circular mechanical port sits beside her ear. Metallic seams, small fasteners and articulated joins are **clearly visible at ordinary scene distance** along the jaw, neck, shoulders, elbows, forearms, wrists, fingers, hips, knees and ankles. Sandy blonde shoulder-length layered hair with side-swept bangs, held back by a **red bandana tied across the head** with a pair of small round aviator goggles resting on top of it, plus a second **red neckerchief knotted at the throat**. Both pieces of red are present and neither replaces the other. Her posture is more vertical and balanced than a human teenager's, and her head turns and hand placements read as exact rather than loose.
**Hair and headwear corrected 2026-07-29 against `MILLBROOK_CANONICAL_GIRLS_LINEUP_v1.png`,
and this was the same class of error as Owen's eyebrows.** The lock file's *written* anchor
list for all three girls disagrees with the lock file's own *lineup image* — Lena's text says
two ponytails and the image shows one, Vex's text says two buns and the image shows one, Pip's
text says a bandana on the head and the image has it at the neck. Section 1 of the lock
resolves this itself: *"When a written prompt conflicts with the canonical lineup, the lineup
controls."* So the image wins in all three cases and the roster now follows it.

**Lena and Vex need no regeneration.** Every delivered plate already matches the lineup,
because the generator attaches the canonical reference and the model followed the picture over
my text. The artwork was right and the roster was wrong, which is the reverse of the Owen case.

**Pip's bandana resolved 2026-07-29: it is worn on the HEAD.** The delivered plates win
over the lineup here, the same way Mayor Dalton's suit did.

Three plates — `vol1-s08`, `vol2-s05`, `vol3-s03` — already tie the bandana across her head
with the goggles resting on top, because this roster told them to. They agree with each other,
the arrangement reads better at thumbnail scale because it breaks up the blonde silhouette,
and following the lineup instead would have cost three regenerations to fix nothing a reader
can see.

**One wrinkle worth knowing, because it is visible on the busiest page of the site.**
`site-cast.png` gives her *both*: bandana tied on the head **and** a red neckerchief at the
throat. That is not in either the lineup or these plates, and it is the first image a visitor
sees. It is also the better design — the neckerchief picks up the red at her collar and the
head tie keeps the silhouette — so the block below now specifies both, and the cast strip is
the reference for it rather than the exception to it.

**Canonical reference:** `char-pip-canonical.png` · Seed: pending · Approved: no
**Rendering note:** The tell is stillness, not hardware. Every prompt involving her body should specify a posture that is a shade too even, too level or too symmetrical. Never render her mid-blink and never give her an asymmetric slouch.
**Mechanical visibility rule, from the lock file, and it modifies the note above.** Pip's
seams are *not* subtle background detail and must be readable at ordinary illustration
scale. Never cover every seam with clothing: show construction at the jaw and neck **plus
at least two limb joints**, and in full-body images show arm and leg articulation wherever
the pose allows. The rendering note above says the tell is stillness rather than hardware,
and that stays true of her *acting* — but it must not be read as licence to hide the
hardware. Both are required.

The bandana and goggles are recurring anchors and should appear in most images. They may be
omitted only where a scene calls for it, and she must still read through face, hair, purple
lips, port, seams and posture.

### {{CHAR:OWEN}}
**Immutable:** An eighteen year old boy, slightly shorter than Milo and taller than Felix, lean and compact, a completely bald head, very pale skin, **strong dark eyebrows**, narrow eyes held in a flat mildly irritated expression, a thin straight nose, and a mouth pressed into a flat line. His silhouette is minimal and clinical. He is human: no glasses, no goggles, no mechanical seams, no robotic joints, no bandana.
**Canonical reference:** `char-owen-canonical.png` · Seed: pending · Approved: yes, by the lineup
**Corrected 2026-07-28, and this one was my error rather than the spec's.** The block said
*a fully bald head with no eyebrows whatsoever*. Both `MILLBROOK_MAIN_CHARACTER_LOCKS.md`
and `char-owen-canonical.png` give him **strong dark brows**, clearly and unambiguously.

I made it worse before I found the lock. Volume 1 spread 3's first generation had eyebrows
and was *correct*; I read it as drift against the roster, wrote `NO EYEBROWS AT ALL` into
its hard constraints, and had it regenerated to remove them. So three delivered plates now
disagree with canon on his face because of a constraint I added: `vol1-s03`, `vol1-s06` and
`vol2-s05`. `vol2-s04` is unaffected, his back is turned.

Also corrected: the outfit is not a *white high-collared jumpsuit zipped up the front*. The
canonical is a **two-piece** cream technical jacket with a high collar and a small red
throat closure, worn over a **charcoal undershirt**, with matching trousers, a belt, a
cargo pocket with a red carabiner, and dark boots. Moved to the wardrobe entry.

The lock adds a warning worth keeping: *"Owen is human. His pale outfit must remain smooth,
clean, and fabric-based so he never reads as Pip. Pip is segmented and mechanical; Owen is
minimal and clinical."*

### {{CHAR:FELIX}}
**Immutable:** An eighteen year old boy, the shortest of the three boys but clearly a teenager rather than a child, compact and boyish with a straight torso and sturdy hands, dark brown skin, a round open face, bright alert eyes behind large round red-framed glasses with clear lenses, dark eyebrows, a snub nose, and a persistent amused half-grin rather than a wide open one. Short, uneven, tightly textured black hair. A compact brown utility backpack is part of his default silhouette and is worn unless a scene makes it impossible.
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

**Superseded by `MILLBROOK_MAIN_CHARACTER_LOCKS.md`, which confirms the rewrite and
corrects it.** The lock file forbids the old block outright — *"Do not use patchwork
quilting, floral clothing, ponytails, or a mandatory hat"* — and adds three things the
plate-inferred version missed: **large** round red frames rather than thin ones, a
**persistent amused half-grin** rather than a wide open one, and a **compact brown
utility backpack described as part of his default silhouette**. The backpack is now in
the immutable block.

**Correcting something I asserted earlier and got wrong.** An earlier note here claimed
the gecko was *named in the prose*. It is not. The gecko appears in **zero** prose blocks
across all four volumes; it exists only in image prompts, and the lock file does not
mention it either, listing instead *"small tools, wires, clips, or a handheld
invention"*. So the gecko was an invention of the original roster with no support in
either source. It has been rendered once, in `vol2-s04`, and it is charming, so it is
demoted to optional in the wardrobe rather than deleted — but it is not a lock and
nothing should be regenerated to obtain it.

**This is why the description had to move rather than the images.** With no reference
file on disk, the description was the only authority, and it was describing somebody who
does not exist in this project. Re-rendering the old block would have produced a third
Felix.

### {{CHAR:MONKE}}
**Immutable:** A small monkey built from shaggy layered charcoal-black paper, with a warm tan face patch, tan muzzle, tan inner ears, tan hands and tan feet, a spiky tuft standing up on the crown, very large round white eyes with small black pupils set wide apart, slender limbs, and a long tail that curls into a loose spiral at the tip.
**Canonical reference:** `char-monke-canonical.png` · Seed: pending · Approved: no
**Colour corrected 2026-07-29.** The block said *a small brown monkey*. `char-monke-canonical.png` and `MILLBROOK_CANONICAL_ANIMAL_LINEUP_v1.png` both show him charcoal-black with tan extremities. `vol1-s04` already followed the image, so the artwork was right and the text was wrong.

**Rendering note, superseded 2026-07-29 and kept here because the reasoning still matters.** The reference sheet says do not explain Monke, so this block used to forbid him a resolved portrait: across four volumes he was to appear only as a shape against screen glow and an unresolved silhouette on a high shelf.

That has now been overruled twice, both times by the same call — `vol1-s04` came back as a fully resolved hero portrait and was accepted, and `vol3-s08` was then commissioned as a lit, legible Monke on purpose. **He is allowed to be seen clearly.** The mystery is carried by what he does, not by whether the reader can make out his face, and the prose is strong enough to hold it alone.

**One guardrail survives, and it is a plot constraint rather than a mood one.** Volume 4 ends with Monke deliberately climbing down, finding a locked drawer and putting a finger on it. That is the arc's reveal that he is not behaving like an animal. So no image before it may give him a *clever* tell: no neatly folded or squared-off wrappers, no sorted or inventoried hoard, no tool held correctly, no object arranged with intent. Things he has plainly gathered are fine and welcome. Things he has plainly **organised** are not, because they spend Volume 4's ending a volume early.

He remains deliberately absent from the final image of Volume 4 even though he is the subject of its last paragraph.

### {{CHAR:PIG}}
**Immutable:** A plump pink pig built from layered paper in a soft dusty rose, with a large round darker-rose snout carrying two clear nostrils, small floppy triangular ears lined a deeper pink, round white eyes with black pupils set wide and a thin dark brow above each, a short curled tail wound into a tight spiral, and four stubby dark brown hooves. He is broad and low, roughly the size of a large dog, and his default expression is placid and faintly pleased.
**Canonical reference:** `char-pig-canonical.png` · Seed: pending · Approved: yes, by the animal lineup
**Added 2026-07-29.** The sheet had existed since the canonical drop but the pig had no roster block, so the one scene that calls for him by name -- Volume 3 spread 7, where Lena falls asleep on a couch with him -- had no token to reference and he was simply left out of the image. An animal with a delivered canonical and no roster entry is invisible to the generator.
**Rendering note.** He is livestock, not a mascot: he is never doing anything clever, never reacting to plot, and never given an expression that implies he understands. He sleeps, stands and leans on people. Monke carries all of the project's animal ambiguity and the pig carries none of it, which is what keeps Monke unsettling.

### {{CHAR:DRAGON}}
**Immutable:** A mini dragon about the size of a house cat, built from layered paper. Rust-orange
body with a paler sandy-cream belly and throat, a row of **dark red triangular plates running down
the spine from the back of the head to the tail**, and a long tapering tail. A broad blunt snout with
two clear nostrils, a wide mouth showing a few small pale triangular teeth, and large round white
eyes with black pupils set forward and close together, with a heavy dark brow over each. Short thick
hind legs and small front arms, all four with pale claws. **It has NO WINGS of any kind.** Its
default expression is cheerful and slightly gormless.
**Canonical reference:** `char-dragon-canonical.png` · Seed: pending · Approved: yes, by the animal lineup

**Added 2026-08-01, and the sheet is older than the block.** It was delivered in the 28 July drop and
archived as `Dino`, then never given a roster entry — the same failure the pig block records above,
and with more at stake, because the dragon appears in **all four volumes** of The Understudies and it
causes the climax. Archived at `reference-source/ANIMALS/Dragon/`.

**The prose was changed to match the sheet, not the other way round.** It read *“dull green, and the
wings didn’t look like they’d hold anything up”*; the sheet is rust-orange and wingless. Both
references were rewritten (Understudies Vol 1 and Vol 3) on author instruction that the delivered
image is the source. **The wings were carrying a joke, so a joke replaced them** rather than the
clause simply being cut — see the note in `WRITING_GUIDE.md` about gaps that are actually jokes.

**It is heat-seeking, and that is its whole behaviour.** It sleeps on top of the fridge, on the
router, and puts its face in the fan vent. In Volume 4 it rides Felix’s shoulder down the boiler
hatch, goes for the warm thing on the bench, gets a foot caught and **takes the stamp off the bench
with it** — so it is not set dressing, it is the mechanism of the arc’s climax. Wherever there is a
warm object in frame, that is where it is.

**It sets things on fire**, and Felix keeps a list on the wall of what. Nothing in a plate should
show it breathing fire, because the prose never does either — the fires are always already over.

**It is not a mascot and not clever.** Same rule as the pig: Monke carries all of this project’s
animal ambiguity and nothing else is allowed to. The dragon wants heat and that is all it wants.

### {{CHAR:DUCK}}
**Immutable:** A plain white domestic duck built from layered paper, standing on both feet. The whole
body is clean white with no markings of any kind: a smoothly rounded head, a long neck held in a
relaxed S-curve rather than stretched up, a deep rounded breast, a plump body, the wing folded flat
against the side and only just readable as a wing, and a short tail lifting slightly at the back. A
broad flat **bright yellow bill**, and a **single small round black eye with no white around it**, set
high on the side of the head. Short orange-yellow legs and broad flat webbed orange-yellow feet. Its
expression is blank and mildly self-important.
**Canonical reference:** `char-duck-canonical.png` · Approved: yes, 2026-08-01 · Seed: pending

**It exists for one joke, and the joke lands twice.** *“Pip tilted her head, and everybody in the
Warehouse shut up, because they’d learned what that meant. **Even the duck.**”* (Understudies Vol 1
spread 8), and *“The room went quiet. **Even the duck.**”* (Vol 2). **That is why it stayed a duck**
when the black cat and the croc were both available and free: the line only works because a duck is
loud and stupid and is the last thing in the room you would expect to notice anything. A cat is quiet
already, so the joke dies; a crocodile falling silent is not a change of state.

**So it must read LOUD even standing still** — bill open in a plate, chest out, no self-awareness. Its
other appearance is Vol 1 spread 6, *“standing in the middle of the floor honking at nothing”*.

**Animal format, 10:9**, on the sandy animal ground with the pig, Monke and the dragon, because all
four are in frame together in Vol 1 spread 6. **It is livestock, not a mascot**, same rule as the pig:
it never reacts to plot and never looks like it understands anything.

### {{CHAR:AUNT_CAROL}}
**Immutable:** A woman in her late fifties, tall, upright and lean rather than soft — she is **never** drawn stout, heavy or matronly, and the canonical sheet is the authority on her build — fair skin with a scatter of freckles across the nose and cheeks, a face that has kept its structure with no slackness at the jaw, large alert dark eyes under fine dark eyebrows that contrast strongly with her hair, a straight nose, and a small closed mouth that rests level and goes up at one corner when she is amused. Abundant hair worn piled up and back off the face with height at the crown and loose curling strands escaping it, silver-white shot through with darker charcoal streaks rather than uniformly grey. A rust-red patterned headscarf is tied as a band across the front of the hairline at all times with its knotted ends trailing loose behind her left ear, and a single long brass drop earring hangs from that ear.
**Canonical reference:** `char-carol-canonical.png` · Seed: pending · Approved: no
**Rendering note:** She is not defeated and should not be drawn sad. The register is a woman carrying something heavy competently and for a long time.
**Rewritten twice on 2026-07-28. This version is from the canonical sheet and is the
one to trust.** The original block read *heavyset, fair skin gone slack at the jaw, a
broad face with deep lines at the mouth, tired hooded hazel eyes, sparse eyebrows, a
broad nose, grey-brown hair cut short and practical, reading glasses on a beaded chain,
a shapeless cardigan*. The art contradicts nearly every clause of it.

Worth saying plainly: the canonical Carol serves her own rendering note **better than
the old description did**. That note says she is not defeated and should not be drawn
sad, and that the register is competence carried for a long time. *Tired hooded eyes*
and *a shapeless cardigan* were pulling against it.

**The intermediate version got a costume detail wrong, and how it went wrong is worth
recording.** It was written from `vol2-s07` alone, where she is seated at a table, and
it described *rust-red braces over the shirt*. There are no braces. The rust-red
diagonal across her chest is the **strap of a satchel**, which a seated three-quarter
view cannot distinguish from a suspender. It also called the earring a hoop when it is a
long brass drop, and missed the darker streaks running through the white hair.

None of those are large on their own. Together they are the argument for canonical
references existing before spread work rather than after: a full-length neutral figure
on a plain ground settles in one image what four plates of inference will keep getting
slightly wrong, and each wrong inference then propagates to every prompt.

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
**Immutable:** A small, slight girl of fifteen who reads younger than her age, fair skin with a scatter of freckles across the nose and cheeks, a narrow face with a small chin, very large dark eyes, fine dark eyebrows, a small nose, and a small closed mouth that rests level and a little downturned. Straight mid-brown hair falling to the jaw with the ends turning out slightly, tucked behind her LEFT ear so that a small pale beige behind-the-ear hearing aid with a fine clear earhook is fully visible there.
**Canonical reference:** `char-cassie-canonical.png` · Seed: pending · Approved: no
**Rendering note:** The hearing aid is the whole point and must stay visible in every image of her. In Volume 4 she wears over-ear headphones and the aid is beneath them, so specify that it is still there.
**Rewritten 2026-07-28 from the canonical sheet.** Changed: the eyes are large and dark,
not *wide grey-blue*; the eyebrows are dark, not *fine light*; the mouth is closed and
slightly downturned, not *soft and resting slightly open*; the hair falls to the jaw with
the ends turning out, not *to the shoulders*; and freckles were not previously mentioned.

**The ear is settled: RIGHT. Reversed on author instruction, 2026-07-30, and this overrides an
explicit lock.** It was LEFT until now, and the reasoning for LEFT was not weak: the
project’s own `MILLBROOK_SECONDARY_CHARACTER_LOCKS.md` said *hearing aid behind the left ear*
in its anchor list, repeated it in the mandatory prompt block, and gated it in the approval
checklist as a reject criterion. The prose agreed with it in three places.

**Both delivered plates show it on her right.** `vol3-s02b` and `vol3-s03` put the aid on the
viewer’s left of a near-frontal head, which is her right ear, and `vol3-s03` confirms it
independently of any reading of her face: Pip is seated at Cassie’s viewer-left, which is her
right-hand side, and that is the ear Pip reaches for. The two plates agree with each other.

So this was a real conflict between a locked spec and delivered art, not the usual case of stale
prose. The author chose the art. Every reference was changed in the same pass -- the two Volume 3
prose mentions, four image blocks, `CASSIE_A`, `CASSIE_B`, and all three statements in the lock
file -- because leaving any one of them saying LEFT would recreate exactly the failure that
produced Vex’s single bun: one wrong line surviving in the document that feeds the prompts,
invisible because everything around it was right.

The alternative was regenerating two delivered plates, and it was available. If the lock is ever
restored to LEFT, those two plates have to be regenerated with it.

The lock file also names her cap **teal knit**, where the canonical reads as a soft flat
cap. The wardrobe entry below follows the canonical on shape and the lock file on colour.

### {{CHAR:MR_HENDERSON}}
**Immutable:** A man of eighty-one, tall and spare and very slightly stooped, with square shoulders that have not entirely gone, tanned skin deeply lined across the forehead, around the mouth and in crow's feet at the eyes, a long face with hollowed cheeks, kind dark eyes under heavy shelf-like white eyebrows, prominent ears, a strong nose, and a thin mouth that rests in a faint smile and goes up further at one corner. Thick white hair, thinning at the front, worn swept up and back and never tidy. A wristwatch with a small round face on a dark leather strap, always on the same wrist.
**Canonical reference:** `char-henderson-canonical.png` · Seed: pending · Approved: no
**Rewritten 2026-07-28 from the canonical sheet.** Changed: the hair is swept up and
untidy rather than *combed back*; the eyes read dark rather than *pale blue*; and the
canonical adds a slight stoop, hollowed cheeks, prominent ears, a resting faint smile and
a wristwatch, none of which the block had. The watch is worth having in the immutable
block rather than the wardrobe: it is the kind of small fixed object a reader notices
across two volumes, and Part D1 puts permanent items there.

### {{CHAR:GREEN_CARDIGAN_WOMAN}}
**Immutable:** A woman of about sixty, average height and comfortably built, fair skin with fine lines, a soft round face, warm brown eyes, faded eyebrows, a small nose, and a genuinely warm smile that sits easily on her. Salt-and-pepper hair gathered in a low bun at the nape. Reading glasses on a chain. She wears a soft green cardigan on which one button, the third from the top, is a slightly different green from the rest.
**Canonical reference:** `char-cardigan-canonical.png` · Seed: pending · Approved: no
**Rendering note:** Never render her as sinister. The mismatched button is the only thing in the frame that is wrong, and it should be legible without being pointed at.

---

## 4.1 The Great Event

**Established 2026-07-29, and it is canon rather than website copy.** The prose names it three
times and never explains it, correctly: every character was there, so none of them would ever
explain it to another. That works inside the book and strands a reader outside it, which is why
a primer now sits on the landing page. This is the version it is built on.

**Six months ago, on an ordinary Thursday afternoon in October, every clock in Millbrook lost
the same ninety seconds.** The elementary school on the east side was emptied that afternoon and
never reopened. A chain link fence went up around its six acres within a week and has never come
down. Nobody was hurt, no building fell, and nobody in Millbrook remembers being frightened.
What the town lost was not really the ninety seconds. It was the habit of asking about them.

**The ninety seconds is the load-bearing part and it was already in the text.** Volume 1 spread
4: *"The traffic cam at Main and Birch went dark for ninety seconds and when it came back, the
pothole was gone."* The Event and every patch since share one signature, which means the Event
was the first patch and the largest, and the reason the town can be patched at all. That
connection was sitting in the draft unremarked; naming the Event this way makes it retroactive
rather than invented.

**Revised to six months on 2026-07-29, on author instruction, and the shorter timeline is the
better one for a reason that was already in the text.** Volume 2 spread 8: Vex keeps a bin of
dead devices because *"they’d all stopped working at the same time, on the same night, six
months ago. The night the patches had started."* At twelve years the Event and the start of the
patches were separate events needing separate explanations. At six months they are the same
night, which is what the Event was always supposed to be — the thing that made the town
patchable.

The primer deliberately does NOT state that connection. Both dates now read "six months", and
a reader who notices has found something rather than been told it. Owen and Vex work it out
inside the book, which is where the discovery belongs.

Two knock-on details worth knowing rather than fixing. October plus six months puts the present
day in April, which nothing in the prose contradicts. And the school being emptied mid-term
rather than between years is more disturbing, not less. The delivered school plate shows dead
grass and a sagging fence; dead grass reads fine after a winter, and the sag is a small stretch
at six months that is not worth a regeneration.

It also explains, without any new machinery, three things the prose already relies on: why the
school is fenced and central, why residents cannot hold a change in mind long enough to question
it, and why a man in a navy dress uniform turns up in Volume 4 and does not take his mask off.

**What stays unwritten, and must.** What was switched on, who switched it, what is in the walls,
why it talks to Pip, and what is left standing inside the fence. The primer gives the reader only
what a resident could tell them. Nothing above may be contradicted by later prose; nothing below
it may be revealed early.

## 4.2 The six roles, and why the party cannot be smaller

**Author doctrine, 2026-07-29.** To be developed properly in the next storyline, but it governs
dialogue from here on, so it is written down now.

**The design rule: each of the six is the ONLY one who can do their thing, so every split of the
group forces itself.** Nobody is redundant, and no scene should ever be solvable by swapping one
of them for another. If a plan can be carried out with five of them, the plan is wrong.

| | Can do | Cannot do |
|---|---|---|
| **Milo** | Reads rooms and people. Talks adults down. The only one who can stand in front of Crane and not lose. | Zero technical ability, and that stays true. He never fixes, builds or hacks anything. |
| **Owen** | Signals, records, patterns, infrastructure. Beats institutions with their own paperwork. | Cannot be in front of a human being. |
| **Felix** | Builds new things from nothing, and half of them fail. | — his hidden skill is that he is delighted by everyone he meets, which makes him the one strangers talk to. |
| **Lena** | Gets people to say true things on camera, and controls what a town believes. The only one who understands publicity as a weapon. | — |
| **Vex** | Breaking and entering. Locks, roofs, fences, hardware teardown, and she knows every street. **The Artful Dodger.** Also advocates for the vulnerable, **which is a skill, not a trait.** | — |
| **Pip** | The other band. Reads config files across a room, hears what nobody hears, and now translates. | — she is the bridge, so the whole plot has to route through her. |

### The Artful Dodger, and why it resolves Vex’s apparent contradiction

**Author note, 2026-07-30: Vex is the one who can break and enter — the Artful Dodger.** That
reference does more work than it looks like, because it explains why the two things listed
against her name are one skill rather than two.

On the face of it, "picks locks and climbs fences" and "advocates for the vulnerable" have
nothing to do with each other, and a lesser character would just have both bolted on. But the
Dodger is precisely the figure who is both: he is the thief, and he is also the one who spots
the friendless kid and brings him in. Vex steals a stranger’s dashcam in Volume 1 and sits on the
floor beside Cassie all night in Volume 3, and those are not two sides of her. They are the same
instinct: she has decided who counts, and the rules were never going to be the thing that
stopped her acting on it.

What follows for the writing:

- **Her competence should read as ease, not effort.** She is never shown straining at a lock or
  scrambling at a fence. She is already through, already up, already sitting somewhere she has
  no business being, entirely comfortable. The effort is invisible; that is the whole flex.
- **She takes rather than asks, including when she is helping.** She does not request permission
  to look after somebody any more than she requests permission to enter a building.
- **The warmth is never stated by her.** Volume 3 spread 2 is the model: she puts her own jacket
  behind Cassie and never once says the word cold. If Vex ever explains that she cares, the
  register is wrong.

### Three of these are easy to write wrong

**Owen's weakness is not shyness, it is a hard limit.** He is not awkward-but-gets-there. Put him
in front of a stranger and the scene stops. This is why he is turned away from the room in Volume
2 spread 4 and why Milo does the talking every single time. If Owen ever charms somebody, the
character is broken.

**Milo having zero technical ability is load-bearing, not colour.** He is the leader, and the
temptation in every scene is to let the leader also be competent at the thing in front of him.
He must always need one of the other five. His skill is entirely people.

**Felix's real function is not the gadgets.** Half of what he builds fails, so he cannot be the
one the plot depends on for hardware. What he is unmatched at is that he likes everybody
immediately and completely, so strangers tell him things they would never tell Lena with a camera
or Owen with a spreadsheet. He is the group's way in.

### What this means for the prose

Where a page has room, spend it on a character doing the thing only they can do, in dialogue
rather than narration. Two tests before adding any such beat:

1. **Could another character have done this?** If yes, it is the wrong beat.
2. **Does it announce itself?** A character explaining their own speciality is dead on the page.
   Show the skill working and let the reader name it.

## 4.3 The four out of the trunk — The Understudies

**All four locked 2026-07-31 from delivered full-body sheets, and the sheets are the source.**
Author instruction: where the art and the prose disagreed, the art won and the prose was
changed to match. What that cost and what it saved is recorded in 4.3a.

Each is 1086x1448, which is 3:4, RGB with no alpha, on a flat sand. The **exact ground differs
slightly per sheet** and is recorded below, because CLAUDE.md forbids colour-keying a
background out of a character plate: a portrait on a panel works by setting the panel to that
character’s own ground so the two agree. Assuming one value for all four is how a faint
rectangle appears behind a face.

| Character | Slug | Ground | Archive |
|---|---|---|---|
| Ottie | `char-ottie-canonical.png` | `rgb(237,217,192)` | `SECONDARY/Ottie/OTTIE_CANONICAL_FULL_BODY.png` |
| Rocco | `char-rocco-canonical.png` | `rgb(237,217,192)` | `SECONDARY/Rocco/ROCCO_CANONICAL_FULL_BODY.png` |
| Wren | `char-wren-canonical.png` | `rgb(231,208,184)` | `SECONDARY/Wren/WREN_CANONICAL_FULL_BODY.png` |
| Sybil | `char-sybil-canonical.png` | `rgb(233,211,187)` | `SECONDARY/Sybil/SYBIL_CANONICAL_FULL_BODY.png` |

The main cast sits on `rgb(238,221,197)`, so all four are within five points of it and of each
other. Cassie came back on 226,199,163 and Crane on 235,212,182, which is the drift this table
exists to stop.

**The mechanic, because it constrains all four costumes.** A school props inventory and an old
programme disagreed, and the patch fixed the document it judged broken. It made four pretend
things true — *“correct in every detail”* — with one exception that is the whole tell:

- **Prop-ness was made real.** Painted canvas over a wooden frame became steel plate. Vinyl
  gloves marked *prop only, not for use* became leather. A bow recorded as *string missing* is
  **not missing a string now**.
- **Anything the inventory DESCRIBED persists, including the flaws.** The armor’s entry reads
  *damage to the right shoulder noted*, so the real armor still carries that dent. Pip’s line:
  *“it left the dent in the shoulder, because somebody had written the dent down too.”*

---

### {{CHAR:OTTIE}} — Dame Ottilie, “Ottie”, the knight
**Immutable:** A girl, small and slight inside the armor. Fair skin with a warm flush high on
the cheek, a round soft-jawed face and a small pursed mouth. **Short strawberry-blonde hair,
tousled and swept up and back as though windblown, with a single loose curl standing away at
the crown** — never long, never tied, never braided, never in buns. Heavy-lidded eyes under thin
brows with a **pale lilac wash across the lid** and a dark upper lash line, which gives her a
permanently unimpressed and faintly tired expression that does not change much whatever is
happening around her. No glasses.
Worn, head to foot: a **real steel** cuirass with a high gorget and articulated pauldrons over a
red under-layer, red sleeves, steel vambraces and couters on both arms, a wide brown leather
belt with a plain round steel buckle, **red skirting cut in a ragged fringe** below the belt,
steel poleyns at the knee over red hose, steel greaves, and **brown leather buckled shoes**. The
steel is scuffed and scratched from use rather than polished.
**A deep beaten DENT in her RIGHT pauldron**, with radiating creases, clearly readable at a
glance. She **carries a plain steel longsword**, point down, usually in her right hand.
**Canonical reference:** `char-ottie-canonical.png` · Approved: yes, 2026-07-31 · Seed: pending
**The dent moved shoulder and the sword was allowed in, both on the art’s authority.** The prompt
forbade a sword in the MUST HOLD block and again in the negative, and the generator drew one
anyway — which is why it was named twice. Rather than re-roll a sheet that is otherwise right,
the sword joined the armor’s inventory entry and the leftovers in trunk seven became the straw
hat and the rubber boots. *“We got lucky”* still means what it meant: it could have made more.
The dent is a good dent and it is on her right, so the two prose lines that named a side now say
right. There were TWO of them, and the second was nearly missed: the inventory, and *“There was a
dent in the right shoulder, and the dent was the only part of it that came from a school play.”*
**Superseded sheet, recorded so it cannot be reused.** The first reference gave her mint-green
hair in two high side buns with red ties, which is Vex’s dominant silhouette as locked in 1.1.
It would have read as Vex at scene distance, where hair is the whole silhouette, and would have
cost the Volume 2 exchange *“I’d wear the armor.” / “You’d love the armor.”*
**Hard constraint:** helmet **on, with the visor jammed** by the truck impact, from Volume 3
onward until Felix frees it on the last morning of Volume 4 — then off, with **the shoulder
plate carried under her arm**. The canonical sheet is bare-headed so the face reads as the
identity reference.

### {{CHAR:ROCCO}} — Rocco Vance, the boxer
**Immutable:** A man of about twenty-five, the only adult of the four, **built like a filing
cabinet**: square, heavy through the shoulders and chest, with no taper. **Bald**, medium-brown
skin, a short dark beard and moustache kept close to the jaw. Large round eyes with the whites
well clear of the pupil, habitually turned up and away to one side, so his resting expression is
apprehensive rather than aggressive — the face of a man about to ask whether this is allowed.
Worn: a **dark grey hooded sweatshirt** with drawstrings, printed GOLDEN GLOVES across the back
with MILLBROOK HIGH SPRING 1987 under it in smaller letters; matching dark grey joggers gathered
at the ankle; and **dark boots with pale toe caps and pale laces**. **Grey laced leather boxing
gloves on both hands**, usually up in a loose guard in front of the chest.
**Canonical reference:** `char-rocco-canonical.png` · Approved: yes, 2026-07-31 · Seed: pending
**The lettering is prose only and must never be rendered.** The negative block forbids text in
an image, so GOLDEN GLOVES and MILLBROOK HIGH SPRING 1987 exist in the manuscript and not on the
plate. That is the same arrangement as Wren’s stencil.
**Hard constraints:** the gloves are **leather, soft and worn, never vinyl and never glossy** —
the inventory says vinyl, and *“Rocco’s gloves are leather”* is how the correction gets detected.
**The expression is the character and must survive every plate.** He asks Benny twice whether he
minds him being there and asks permission to drink water. He apologises to a television. He
holds a game controller *“like a bird”*. Hit by a truck, he calls it a good four days. Nothing in
a plate should ever make him look like a fighter squaring up — the guard is a habit, not a threat.

### {{CHAR:WREN}} — Wren Ashbury, the archer
**Immutable:** A girl, small and wiry. Fair skin, a round face, a small orange-red mouth, and
**thick dark expressive eyebrows that do most of her acting**, frequently one raised. Large round
alert eyes, usually looking off to one side at something nobody else has noticed yet. **Dark teal
hair, straight and chin-length**, with a heavy side-swept fringe falling either side of the face.
Worn, head to foot: a **teal knitted cap with two pointed animal ears** standing up from it, white
tufts inside the ears and a small orange patch at the crown — her most recognisable feature at any
distance. A large **orange neckerchief** at the throat, spread across the chest. A teal-green
long-sleeved tunic belted at the waist with a brown leather belt and a square steel buckle, a
small brown pouch on the belt. A **rust-orange pack** on both shoulders on brown leather straps,
with a **quiver rising past her right shoulder** holding twelve blunt practice arrows, fletchings
orange, teal and cream. **Charcoal cargo trousers**, loose and gathered into a cuff at the
ankle, with a single flap pocket on the right thigh, over **brown leather boots with buckled
straps at the ankle**. A **strung** recurve bow of warm wood with pale
teal tips, carried in her left hand, the string clearly present.
**Canonical reference:** `char-wren-canonical.png` · Approved: yes, 2026-07-31 · Seed: pending
**Delivered clean.** The supplied portrait carried a small red fire extinguisher clipped beside
the bow, which was excluded from the prompt as a generation artifact. It is absent from the
sheet, and the bow is correctly strung.
**Second sheet, 2026-07-31, and the trousers are why.** The first had her in olive cargo
trousers with patches and deep turn-ups over teal socks and dark boots with pale toe caps,
which is VEX_A almost item for item — and the two girls already share teal-family hair, so
cropping both at the waist in one plate would have been genuinely ambiguous. Charcoal trousers
and brown buckled boots share nothing with Vex’s wardrobe, so they now separate on the legs as
well as on silhouette and skin: eared cap and chin-length hair against two high buns, fair skin
against warm brown with freckles.
**Hard constraints:** the bow is **strung** — the inventory recorded it string-missing and the
correction is a plot point. Arrows are **twelve blunt practice arrows**, never broadheads.

### {{CHAR:SYBIL}} — Sybil Prine, the witch
**Immutable:** A girl of about twelve, small. Fair skin with **freckles scattered across the nose
and upper cheeks**, a small orange-red mouth, thin dark brows, and large round eyes usually
turned upward. **Dark brown-black hair, short and loosely curled, ending at the jaw**, with a
fringe and strands escaping around the face. A **single gold hoop earring**, on her left.
Worn, head to foot: a **soft orange-red pointed hat with a floppy drooping tip** over a darker
red underbrim; a long-sleeved orange dress to the knee, **printed all over with small black cats,
potion bottles, bats and stars**, the sleeves long enough to half-swallow her hands, which she
habitually holds clasped at her chest; cream ribbed socks slouched at the ankle; and **bright
multicoloured sneakers encrusted with plastic jewels, hearts and stars** in pink, purple, teal and
blue, fastened with two velcro straps each. The shoes are the loudest thing about her and they
are the point: they are what a twelve-year-old chose, and the rest of the costume is what a
school cupboard chose for her.
**Canonical reference:** `char-sybil-canonical.png` · Approved: yes, 2026-07-31 · Seed: pending
**She reads as a child, and the prose was written for an older woman.** *“Sorry, dear”* and the
hand on Lena’s shoulder as she passes were an older woman’s lines. Delivered by a girl of this age
they become funnier rather than wrong, so **the dialogue stands unchanged** and only the
inventory’s garment size moved, from *adult small* to *child large*. Play the lines straight; the
joke is that she does not appear to notice she is twelve.
**What she does, and it is never violent.** She knocks nobody down; she makes it impossible to
run a military unit. Every device near her can stop at once — she puts one finger on a trackpad
and every machine in the building shuts off. On her way out she touches Lena’s shoulder and every
screen in Millbrook flickers, and four thousand people notice and not one of them calls anybody.

---

### 4.3a Which document is true — RESOLVED 2026-07-31

The arc turns on a props inventory being read literally and made true, so the inventory and the
four sheets had to describe the same four costumes. They did not.

**Author instruction: the newly generated images are the source, and the text changes to reflect
them.** Six passages were rewritten in ONE pass, because they describe the same four costumes
from different angles and editing them one at a time is how half of them end up disagreeing.

| | Was | Now |
|---|---|---|
| Rocco | green-and-gold satin robe, gloves carried in one hand | grey hooded sweatshirt carrying the same lettering, gloves on both hands |
| Wren | a green tunic, ROBIN HOOD 1994 inside the collar | a knitted green cap with ears, and the stencil moved to *inside her collar* |
| Sybil | THE CRUCIBLE 2009, black wool dress with a white collar | FALL FESTIVAL 2009, orange dress printed with cats and potion bottles, drooping felt hat |
| Ottie | dent in the LEFT shoulder, no sword | dent in the RIGHT shoulder, and the sword joins the armor’s inventory entry |
| trunk seven | the wooden sword next to a straw hat | the straw hat next to a pair of rubber boots |

**What was saved, and it looked like a casualty.** Rocco’s robe set up a joke a page later, where a
sergeant has to radio the sighting in and *“the hardest part of the whole morning was having to say
the words green and gold on a live channel with his lieutenant listening. Then he had to spell
Millbrook. Then he had to say 1987.”* Moving the lettering to a school athletics hoodie — which is
arguably a more natural thing to have GOLDEN GLOVES printed across than a satin robe — keeps the
whole beat: he now has to say *golden gloves* on a live channel instead.

**What was lost, stated plainly.** THE CRUCIBLE 2009 is gone. Sybil coming out of a production of
The Crucible made her an ACCUSED witch out of Arthur Miller, which was the sharpest of the four
costume ideas; an orange dress printed with cats is a costume-shop witch. FALL FESTIVAL 2009
keeps the naming system — every costume is still a named school production with a year on it —
but the idea underneath it does not survive. Recorded here rather than quietly dropped.

**The mechanism survived intact**, which was the requirement. Every inventory item still carries
exactly one recorded flaw or prop marking, because three later lines of dialogue turn on specific
ones: *“The bow was missing a string”*, *“the gloves say prop only. Not for use”*, and the dent. Sybil’s
hat earns its own — the inventory records the tip as bent, so the real hat droops, which is what
the sheet shows.

**Wardrobe letters:** `ROCCO_A`, `WREN_A`, `OTTIE_A`, `OTTIE_B` (helmet off, shoulder plate
carried), `SYBIL_A`. New arc, new letters, per 5.1. Never rewrite an existing one.
## 4.4 The unit, and two of the town — The Understudies

Locked 2026-07-31 from delivered art. Same rules as 4.3: the sheets are the source, the
ground is recorded per character, and the archive lives under
`reference-source/SECONDARY/<Name>/`.

| Character | Slug | Size | Ground |
|---|---|---|---|
| Ida Prewitt | `char-ida-canonical.png` | 1086x1448 | `rgb(235,209,181)` |
| Bill Rensch | `char-rensch-canonical.png` | 1086x1448 | `rgb(242,214,176)` |
| Specialist Tovar | `char-tovar-canonical.png` | 543x724 | `rgb(245,221,190)` |
| Sergeant Reyes | `char-reyes-canonical.png` | 543x724 | `rgb(245,221,192)` |
| Private Dunphy | `char-dunphy-canonical.png` | 543x724 | `rgb(243,219,188)` |
| Lieutenant Pace | `char-pace-canonical.png` | 543x724 | `rgb(246,222,192)` |

### The four soldiers came out of one lineup, and that was the point

`char-soldiers-lineup.png`, archived as
`SOURCE_LINEUPS/MILLBROOK_CANONICAL_SOLDIERS_LINEUP_v1.png`. A group sheet is right for these
four and was wrong for the four out of the trunk, for opposite reasons: those are four costumes
out of one cupboard and a shared sheet homogenises faces, which is how the first knight came
back wearing Vex’s hair. **These four are one unit in one uniform, so the risk runs the other
way** — generated separately they drift, and four soldiers who do not match each other is a
worse failure than four who are small in frame. Section 1.1 applies: if a written description
and the lineup ever disagree, the lineup wins, so it is kept.

**Cut on the figures, not on quarters.** The four came back bunched toward the middle, so an
equal-quarter cut would have contained each of them and centred none. The crop finds the ground
from the corners, marks every column holding a pixel far enough from it to be a figure, groups
those into four runs and cuts a window centred on each. At 724 tall the window is 543 wide,
which is exactly 3:4, so every crop matches the other nineteen references with no padding and
no scaling. Margins came out 125 to 150px.

**Two known deviations, both recorded rather than fixed.** The carved four are 543x724 against
1086x1448 for a single sheet — half the linear resolution, which is the price of a group sheet
and was accepted because uniform consistency matters more for four figures who appear in two to
four spreads each. And they are RGBA where every other sheet is RGB, because the encoder writes
one format; alpha was verified as 255 across every pixel of all four, so nothing is transparent.

### {{CHAR:TOVAR}} — Specialist Tovar
**Immutable:** A man in his thirties, the heaviest built of the unit, thick through the neck and
shoulders. Pale skin, a full dark beard and moustache, and thick dark brown hair in tight loose
curls standing out from the head. Round wire spectacles. Large round eyes with the whites well
clear of the pupil and the brows raised, an expression of mild permanent alarm that never quite
resolves. Carries a rifle across his chest in both gloved hands.
**He is the one who lays hands on Ottie** and moves her exactly nothing: *“Tovar put his shoulder
into it and it didn’t rock.”* He should look strong enough for that to be a surprise.
**Canonical reference:** `char-tovar-canonical.png` · Approved: yes, 2026-07-31 · Seed: pending

### {{CHAR:REYES}} — Sergeant Marisol Reyes
**Immutable:** A woman in her late twenties, warm light skin with freckles across the nose,
straight black hair pulled back into a short low ponytail. A dark ball cap with a green brim,
worn forward. A calm, faintly amused half-smile — the only one of the four who looks like she is
enjoying her morning. Carries a thick stack of folded paper notes in both hands against her
chest, and no weapon of any kind.
**The notes are the character.** She hand-carries nine of them across a softball field in one
afternoon *“because the only other option was shouting”*, Sybil having made every radio in the
camp work perfectly on the wrong channel.
**Canonical reference:** `char-reyes-canonical.png` · Approved: yes, 2026-07-31 · Seed: pending

### {{CHAR:DUNPHY}} — Private Kyle Dunphy
**Immutable:** A young man of about nineteen, the youngest and smallest of the unit. Warm brown
skin, a round soft face with no beard, round thin-rimmed spectacles, and **bright green hair,
short and standing up in stiff spikes**. A mild, patient, slightly resigned expression. His rifle
is slung muzzle-down across his BACK and he does not hold it.
**He carries four spreads, more than any other soldier**, and he is the human face of the Army in
this arc: he has the Route 9 stop from six to two, *“and he didn’t mind it, because people kept
bringing him things. Two doughnuts and a folding chair, so far.”* Rocco later drops him with one
light exact punch to the jaw and catches him on the way down.
**Canonical reference:** `char-dunphy-canonical.png` · Approved: yes, 2026-07-31 · Seed: pending

### {{CHAR:PACE}} — Lieutenant Pace
**Immutable:** A woman in her thirties, medium brown skin with freckles across the nose, and
**short bright blue hair swept up and back off the forehead**, shaved close at the sides. Strong
dark brows drawn together, jaw set, mouth flat — the one visibly holding a bad morning together.
Stands with her arms folded. No rifle and no weapon.
**Her gender was never stated in the manuscript** and is a free choice made here. She is the one
whose orders come out of a speaker on a folding table in the mess tent while the questions about
them arrive at a radio locked inside a truck.
**Canonical reference:** `char-pace-canonical.png` · Approved: yes, 2026-07-31 · Seed: pending

### {{CHAR:IDA}} — Ida Prewitt
**Immutable:** A woman in her early seventies, small and brisk. Short silver-white hair in close
natural curls, worn uncovered with nothing on her head. A round face gone soft at the jaw, deep
laugh lines, warm pale skin with freckles across the nose, small gold stud earrings, no
spectacles. Her resting expression is mildly pleased and completely unsurprised.
Worn: a **buttercup-yellow quilted half-zip anorak** with a chest pocket, a lilac sweatshirt at
the neck and cuffs, navy tracksuit trousers with a white side stripe, and white trainers.
In her left hand she holds a brown leather lead that splits to **TWO tricolour beagles**, both
standing calmly beside her.
**Invented within the style on author instruction**, because the manuscript gives her two
sentences and no description: she walks her beagles at six in the morning, and she waves at the
trucks. Every choice steers away from something taken — no cap, because Wren and Reyes both have
one; no teal hair, because Wren and Vex do; no headscarf, because that is Aunt Carol’s one
identifying feature; no reading glasses on a chain and no green cardigan, because the woman in
the green cardigan owns both. Nobody in either arc wears yellow.
**The beagles are in her sheet rather than a separate animal reference.** She never appears
without them and they are half the joke.
**Her wave is deliberately not in the sheet.** Every canonical reference is neutral pose, doing
nothing; a sheet that performs an action stops being a reference. The wave belongs in the plate.
**Canonical reference:** `char-ida-canonical.png` · Approved: yes, 2026-07-31 · Seed: pending

### {{CHAR:RENSCH}} — Bill Rensch, the county administrator
**Immutable:** A man in his sixties, thin, narrow-shouldered and stooped forward from the neck. A
completely bald head, pale skin, and a close-trimmed grizzled beard and moustache in mixed grey
and warm brown covering the jaw and chin. Round wire-rimmed spectacles sitting low. Small eyes
turned up and away, a permanently put-upon and faintly self-important expression: a man who
believes he is owed a better morning than this one.
Worn: a grey-blue wool overcoat worn open, a mustard-ochre waistcoat with two pewter buttons, a
white shirt, a loosely knotted brown cravat slightly askew, grey trousers with turn-ups, and
brown leather lace-up boots.
**Two things the manuscript fixes.** The curfew belongs to him — *“Crane is going to want a curfew
he can actually enforce, and he can’t have one, because the curfew belongs to the dumbest man in
this county”* — and he is the Mayor’s rival for ceremonial glory. Dalton’s nightmare is *“Bill
Rensch would be standing at my ribbon, in front of my banner, holding my scissors, and I would be
down at the other end of it like a boy at a wedding.”* He owns a pontoon boat, which Dalton says
the way other people say something unforgivable.
**The delivered sheet is mid-stride with one finger raised**, where every other reference is a
neutral standing pose. Kept, because it holds the face, the spectacles and the whole costume,
which is the job — but it is the one sheet in the set that is a little bit a scene.
**He is the FOURTH bald man in the series**, after Owen, Mayor Dalton and Rocco, and Rocco is the
closest: both bald with beards. They separate on skin, spectacles, age and dress, and they never
share a scene. Do not frame them alike.
**Canonical reference:** `char-rensch-canonical.png` · Approved: yes, 2026-07-31 · Seed: pending

## 4.5 Benny — The Understudies

Locked 2026-07-31 from delivered art. Sheet: `char-benny-canonical.png`, 1086x1448, exactly
3:4, RGB with no alpha, ground `rgb(244,222,197)`. Archived at
`reference-source/SECONDARY/Benny/`.

### {{CHAR:BENNY}} — Benny, who owns the gym
**Immutable:** A man in his mid fifties, brown skin, solidly built and thick through the chest
and shoulders — someone who trained hard a long time ago and stayed strong without staying lean.
**Platinum-white hair, bleached rather than aged, short and spiked on top with the sides and
back shaved close.** A thin beard following the jaw and chin only, going white, with no
moustache. **Heavy-lidded eyes with the lids low and level** and a small closed-mouth wry
expression: a man who has been at that desk since five thirty and has already decided this is
going to be funny. A small silver stud in one ear, deep lines at the corners of the eyes.
Worn: a **cream-white drawstring hooded sweatshirt, a pullover with a kangaroo pocket**, over a
dark charcoal t-shirt visible at the neck; black tracksuit trousers with a **double white stripe**
down the outside of each leg; and white low-top trainers. **A pair of reading glasses pushed up
into the front of his hair**, never on his face.
**Canonical reference:** `char-benny-canonical.png` · Approved: yes, 2026-07-31 · Seed: pending

**His age is fixed by arithmetic, not by description.** The manuscript gives him no physical
detail at all, but it gives him a number: he has *"been opening that gym at five thirty for
twenty-six years"*. That puts a floor under him, so the delivered art was written up into the
mid fifties rather than the thirty the hair suggests on its own. Do not draw him young.

**He shares two spreads with Rocco and both wear a drawstring pullover hoodie.** That is an
authorial choice, made deliberately, and it means the costume does NOT separate them. Three
things do, and every plate holding both men has to keep all three legible:

| | Benny | Rocco |
|---|---|---|
| Hair | spiked platinum, shaved sides | **bald** |
| Hands | empty | **grey leather boxing gloves, always** |
| Expression | wry, heavy-lidded, ahead of you | apprehensive, eyes up and away |

The gloves carry most of it, because Rocco is never without them. There are also thirty years
and a hoodie colour between them, cream against dark grey. **Do not frame the two alike**, and
where both appear Benny is the one at rest.

**Ida is also white-haired**, and that is fine: hers is aged silver in close natural curls on a
woman of seventy. They never share a scene.

**The hoodie carries no lettering**, the same arrangement as Rocco’s GOLDEN GLOVES and Wren’s
stencil — the negative block forbids text in an image, so it lives in the prose.

**He is the arc’s first reaction shot.** He lets a stranger in a bathrobe use the heavy bag
purely *because Benny wanted to see what would happen*, and he is the one who phones Milo:
*"Milo, he asked me for permission to drink water."* The wry look is the character and has to
survive every plate.

## 4.6 Behind the wall — The Understudies

Locked 2026-07-31 from delivered art. Both sheets 1086x1448, exactly 3:4, RGB with no alpha.
Archived under `reference-source/SECONDARY/`.

| Character | Slug | Ground |
|---|---|---|
| Chet | `char-chet-canonical.png` | `rgb(241,223,194)` |
| The man in the coat | `char-the-man-canonical.png` | `rgb(243,219,181)` |

**Both are small, and both are small on purpose.** Chet fits a four-and-a-half-foot door and
the man sits in a chair with his feet nowhere near the floor. Whatever is behind that wall is
not built to human scale, and these two sheets are the only evidence of it a reader ever gets.

### {{CHAR:CHET}} — Chet
**Immutable:** A small, worn-out humanoid robot, **about three feet tall**, squat and solid. His
head is a rounded metal box in pale bone-grey enamel gone chalky, with panel seams, rivets,
dents and rubbed-through patches. A recessed dark band across the upper face holds **two large
rounded-rectangular eye panels, flat white, each with a small low black pupil**. **He has no
nose and no mouth**: below the eyes the face is a blank panel. A round machined port with a
chrome rim sits at each side of the head, and a thin black cable trails from behind one. Out of
the open top of the head grows **a shock of coarse straw-blond hair in stiff untidy spikes**.
His neck is an exposed coiled spring. His torso is an upright riveted canister in the same
bone-grey with a small hinged access panel, a dark vent slot and **one recessed indicator lamp
glowing dull orange-red** on the chest. Large exposed ball-joint shoulders in dark steel, thin
segmented arms, segmented legs and flat oval feet. A hundred repairs old.
**Canonical reference:** `char-chet-canonical.png` · Approved: yes, 2026-07-31 · Seed: pending

**His height is stated in the prose, and the sheet cannot show it.** A figure alone on a flat
ground has no scale reference in frame, so the number has to live here. Volume 4: *“He was maybe
three feet tall, gray and scuffed and dented at one hip.”* It also gives the door he walks
through as *“about four and a half feet tall”*, and **he steps through it rather than stooping
through it** — which makes that absurd little door his door, built to his measure. Never draw
him man-sized.

*Corrected 2026-08-01 from four feet to three.* The first figure was inferred from the door
before the Volume 4 description was read closely; the prose states it outright and the prose
wins. The same passage confirms the rest of the sheet — *“a head shaped like a bread box, two
wide eyes set into it, and a spray of stiff blond hair coming off the top like somebody had
glued a paintbrush up there”* — and adds one thing the sheet should be read as having: **he is
dented at one hip.**

**He resembles Pip, and that resemblance is load-bearing.** Both are pale, both have a round
port at the side of the head, and their hair is nearly the same colour. The arc’s last real beat
is *“He’s the one who wanted to see how you all turned out.” Chet looked at Pip when he said
it.* A family resemblance is carrying that line and designing it away would cost the ending
something it cannot get back. They separate completely on everything else:

| | Chet | Pip |
|---|---|---|
| Face | a metal box, blank below the eye band, **no mouth and no nose** | a girl’s face — eyes, brows, nose, purple lips |
| Build | four feet, squat, riveted, spring neck | tall, slim, straight, long-limbed |
| Wear | nothing, ever | red bandana, goggles, red neckerchief |
| Condition | dented, chipped, rubbed through | clean, matte, exact |

**Nothing about him may read as powerful or sinister.** *“I’m slow. I’m eleven hundred years
old and I have never once been the smart one.”* He is patient, hangdog and a little defensive
about his work — *“They came out good, though. Didn’t they come out good?”* He sweeps broken
glass into a square of paper towel, and *watching a machine do that was the saddest thing any of
them had ever seen.* **His eyes do something that is not quite a blink**, which is why the eye
panels are lit with a movable pupil rather than fixed glass.

**The legs were invented.** The supplied art stopped at the chest; everything above the waist is
transcription and the legs were written to match the shoulder joints.

### {{CHAR:THE_MAN}} — The man in the coat
**Immutable:** A very small man, no taller than a young child, bald, with a smooth pale head,
small ears and a plain face wearing a flat, closed, faintly serious expression — patient,
unhurried and entirely unsurprised. **Round spectacles with fine dark rims and blank white
lenses.** Worn: a plain black wool overcoat cut long, nearly to the ankles, with a small
standing collar and **exactly THREE round burnt-orange buttons** down the front; black trousers
and plain black shoes. **Both hands stay in the coat pockets.** No hat, no scarf, no bag, no
watch, no jewellery.
**Canonical reference:** `char-the-man-canonical.png` · Approved: yes, 2026-07-31 · Seed: pending

**The token and the filename are provisional.** He has no name in the manuscript, and
`{{CHAR:THE_MAN}}` was chosen so that nothing invented leaks into canon by the back door.

**Three buttons, always.** The prose counts them: *“a small figure in a black wool coat with
three orange buttons.”* Not two and not four.

**His head is larger relative to his body than a man’s, and that is kept.** It contradicts the
brief, which asked for adult proportions — but a canonical sheet is a figure alone on a flat
ground with nothing in frame to measure against, so head-to-body ratio is the only tool it has
to say *“He was very short.”* It also leans into the prose’s own phrase, *the face of a serious
child who had been sitting at the same desk for a long, long time*. **True scale is fixed in the
plates**, by putting him next to people. He is a grown man and must never read as an actual
child.

**He is on screen for six sentences and never speaks**, and every one of them is restraint:
*“he wasn’t angry and he wasn’t surprised and he didn’t look caught. He took his time about
it.”* Then *“he looked at Pip and nodded once, the way a man nods at somebody who has finally
shown up to a meeting he scheduled years ago.”* **The nod belongs to the plate.** The sheet is
neutral, the same rule that kept Ida’s wave out of hers.

**His room is not yet built.** *“Bookshelves, or file drawers, rows and rows of them in low gold
light, going up much further than the ceiling above their heads had any business allowing.”*
Plus a wooden chair much too big for him. It is the last image of the arc and the only
impossible space in either arc so far.

## 5. Wardrobe states

The four volumes cover roughly a fortnight: Volume 1 is day one, Volume 2 is day two, Volume 3 is a Tuesday and Wednesday of a later week, Volume 4 is that Friday. States are keyed to that story time. Most of the cast wear a signature outfit that does not change, which is a gift for continuity, so only the states that actually vary are listed as variants.

### 5.1 Wardrobe is allowed to change between installments

**Standing instruction from the author, 2026-07-29.** The cast will change clothes in later
arcs. This is expected and should be planned for rather than resisted: a signature outfit that
never varies across five arcs stops reading as a character choice and starts reading as a
costume the book cannot afford to change.

**The rule that makes it safe is the split this roster already enforces.** Identity lives in
the immutable block; clothing lives in the wardrobe table. So a new outfit is a new wardrobe
row, never an edit to a character block, and a reader recognises somebody from the things that
did not move:

- **Never negotiable, whatever they are wearing.** Face, build, relative height, skin tone,
  hair construction and colour, and the permanent features named as such — Milo's beanie and
  red lenses, Felix's red glasses, Pip's visible seams and port, Lena's single side ponytail
  and oval pendant, Vex's mint bun, Owen's brows and bald head, Monke's tan face patch.
- **Free to change.** Garment type, cut, layering, condition and season. A character may move
  from a jacket to a coat, from trousers to shorts, from clean to filthy.
- **Change one anchor at a time, and never the colour and the silhouette together.** Vex in a
  different jacket is still obviously Vex; Vex in a different jacket *and* without the mint bun
  is a new character. If an accent colour is doing identifying work — Lena's orange, Felix's
  teal, Owen's ivory, Vex's black-and-mint — carry it into the new outfit somewhere, even if
  the garment carrying it changes.
- **A new arc gets new letters, not rewritten ones.** `LENA_A` through `LENA_D` are the first
  arc and stay put, because the delivered plates depend on them. Arc two starts at `LENA_E`.
  Nothing already generated should be invalidated by a wardrobe decision made later.

**Practical consequence for prompts.** Because wardrobe is a separate token, a change costs one
table row and nothing else: no character block edits, no regeneration of the canonical sheets,
and the generator keeps attaching the same reference image for the face. That is the whole point
of the token split and it is worth not eroding.

| Token | Value | Story time |
|---|---|---|
| `{{WARDROBE:LENA_A}}` | Travel clothes, oversized orange collared shirt worn open over a plain tee, satchel strap running diagonally across the chest | Vol 1, day one |
| `{{WARDROBE:LENA_B}}` | Same orange collared shirt, sleeves pushed up, satchel strap present | Vol 2, day two |
| `{{WARDROBE:LENA_C}}` | Same orange collared shirt, worn buttoned, satchel strap present | Vol 3 |
| `{{WARDROBE:LENA_D}}` | Same orange collared shirt, visibly creased and slept in, satchel strap present | Vol 4 |
| `{{WARDROBE:MILO_A}}` | Signature: orange ribbed knit beanie, small round red-lensed glasses, black leather biker jacket with silver zippers worn open over a plain black t-shirt, a single dog-tag pendant on a ball chain at the throat, a black belt with a square silver buckle and a short chain looping at the hip, black slim jeans with worn tears at the knees, black lace-up boots. Unchanged in all four volumes | all |
| `{{WARDROBE:VEX_A}}` | Signature: black leather jacket with silver zippers and a small red shoulder patch, worn open over a plain dark top, a studded choker, olive-green cargo trousers with visible patches and deep turn-ups, a silver chain looping from the belt at the hip, green socks and black high-top boots with pale toe caps. Mint-green buns tied with red. Unchanged in all four volumes | all |
| `{{WARDROBE:PIP_A}}` | Signature: red bandana with goggles on top, patched doodled denim jacket over plain white shirt. Unchanged in all four volumes | all |
| `{{WARDROBE:OWEN_A}}` | Signature: warm ivory two-piece technical outfit, a high-collared jacket with a small red throat closure over a charcoal undershirt, matching ivory trousers with a cargo pocket, a dark belt, a short red carabiner strap at the hip, dark boots. Smooth, clean and fabric-based, never segmented. Unchanged in all four volumes | all |
| `{{WARDROBE:FELIX_A}}` | Signature: faded teal mechanic-style work jacket with the sleeves pushed up over a dark shirt, orange suspender or harness straps across the chest, dark practical work trousers with functional pockets and tool attachments, worn red-orange sneakers. Small tools, wires or clips may appear. A small green gecko on his shoulder is optional, not a lock. Unchanged in all four volumes | all |
| `{{WARDROBE:CAROL_A}}` | Signature: dark teal button-up shirt with brass buttons and the sleeves rolled to the forearm, worn over a rust-red knit high-neck layer that shows at the throat and at the cuffs. High-waisted charcoal wide-leg cropped trousers with turn-ups, a brown leather belt with a large square brass buckle, rust-red socks and dark ankle boots with a low heel. A rust-red leather satchel on a long strap worn diagonally across the body from the right shoulder. Unchanged in all four volumes | all |
| `{{WARDROBE:MAYOR_A}}` | Ill-fitting muted dusty purple suit, cream shirt, a dark red tie patterned with cream polka dots and knotted slightly askew, a red pocket square folded into the breast pocket | Vols 1 to 3 |
| `{{WARDROBE:MAYOR_B}}` | The same ill-fitting purple suit and red pocket square, but a conspicuously **new** tie, stiff and bright and still holding its fold creases, replacing the polka-dot one | Vol 4 only |
| `{{WARDROBE:CRANE_A}}` | Navy dress uniform, full medals, pale blue medical mask | all |
| `{{WARDROBE:CASSIE_A}}` | Muted teal knit cap worn pushed back off the forehead, teal long-sleeved top with the cuffs turned back, dark indigo denim dungarees with brass buttons and deep turn-ups at the ankle, black high-top canvas sneakers with white laces and pale toe caps. Her working hearing aid is visible behind her right ear; the second, dead one is loose in her hand or her pocket. No backpack, pins or decorative props | Vol 3 |
| `{{WARDROBE:CASSIE_B}}` | The same cap, top, dungarees and sneakers, plus large over-ear headphones worn over the cap. The hearing aid behind her right ear is still present and still visible beneath them. Holding a folded sheet of paper with handwriting that is not legible | Vol 4 |
| `{{WARDROBE:HENDERSON_A}}` | Pale blue-grey button-down shirt with a chest pocket and cream buttons, sleeves rolled to the forearm, tucked into tan pleated trousers with turn-ups, a brown leather belt with a square silver buckle, and worn brown leather shoes. **No running shoes yet** | Vol 3, Tuesday morning |
| `{{WARDROBE:HENDERSON_B}}` | The same shirt, trousers and belt, but the brown shoes are replaced by brand new white running shoes, one of which still carries a price tag on the tongue | Vol 3 afternoon onward, and Vol 4 |
| `{{WARDROBE:CARDIGAN_A}}` | Green cardigan with the mismatched third button, plain blouse, reading glasses on their chain | all |

The Mayor's new tie and Mr. Henderson's price-tagged shoes are both stated in the prose, which means an attentive reader can check them. They are the two continuity details most worth getting right.

---

## 6. Location roster

Recurring locations get a canonical establishing image before spread work begins, per Part D4. Locations used once do not, and are marked accordingly.

| Token | Block | Uses | Canonical ref |
|---|---|---|---|
| `{{LOC:MILLBROOK_WIDE}}` | A small flat American town of low single-storey houses on a grid of wide streets, mature trees between them, a water tower on the horizon, no hills, no landmarks worth photographing. | 1 | not required |
| `{{LOC:MILLBROOK_RESIDENTIAL}}` | A residential street of modest single-storey houses set back behind short lawns, chain link and low hedges, cracked concrete sidewalk, power lines overhead, parked sedans. | 2 | `loc-residential.png` — stand-in: `vol3-opener.png` |
| `{{LOC:CRESCENT_HOUSE_EXT}}` | A small single-storey house with pale yellow aluminium siding, a chain link fence across the front, three concrete porch steps with a plain iron rail, and a chipped ceramic frog ornament beside the bottom step with one ear broken off. | 1 | not required — stand-in: `vol1-s01.png` |
| `{{LOC:BACK_BEDROOM}}` | A small square bedroom holding a single bed, a closet with a visible dent low on the door, a shelf of dull sports trophies, and faded band and athlete posters taped to the walls. Blinds, not curtains. | 1 | not required |
| `{{LOC:AUNT_CAROL_KITCHEN}}` | A dated kitchen with wood-look cabinets, patterned linoleum, a small round table with a vinyl tablecloth and four mismatched chairs, a single bulb on a chain hanging low over the table. | 1 | not required |
| `{{LOC:AUNT_CAROL_LIVING_ROOM}}` | A cramped living room with a sagging patterned couch, a doily-covered side table, a boxy older television on a low stand, and an open doorway through to the kitchen. | 1 | not required |
| `{{LOC:MAIN_STREET}}` | A short commercial main street of two-storey brick and stucco frontages, angled parking, a scatter of vacant units, wide concrete sidewalk with pressure cracks. | 1 | not required |
| `{{LOC:THE_PARK}}` | A flat municipal park of mown grass and mature shade trees with a low round stone fountain at its centre and slatted wooden benches on a paved ring around it. | 2 | not required — stand-in: `vol1-s06.png` |
| `{{LOC:TOWN_HALL_SQUARE}}` | A paved civic square in front of a squat 1960s municipal building of brick and glass, with a low permanent stage, a plain wooden podium, space for rows of grey metal folding chairs, **a flagpole with a low brick sitting wall around its base**, benches, planters and lamp standards. | 6 | `loc-square.png` — **see the note below: the delivered reference has no flagpole and no low wall** |

**`loc-square.png` predates two features of this location, and any prompt that needs them has
to add them explicitly.** The delivered reference has benches, planters and lamp standards but
**no flagpole and no low sitting wall**. Understudies Vol 1 spread 2 puts Vex *“up on the low
wall by the flagpole with her boots hanging off it”*, and that position is simply not available
in the room the reference shows.

Two attempts proved it. The first put her on the ground; the second resolved the impossibility
by **removing her from the picture entirely**. Neither was disobedience — the generator takes
the room from the attached image, and in that room there is nowhere for her to sit.

This is the general rule in CLAUDE.md about a reference being authoritative over absence, in
its most literal form: the missing thing was not a person but a piece of architecture. The
block above now records both features so a future regeneration of `loc-square.png` includes
them and this stops being a per-prompt problem.
| `{{LOC:WAREHOUSE_MASTER}}` | The whole converted warehouse interior in one view. **Reference only, never expanded into a spread prompt.** See section 6.1. | — | `loc-warehouse-canonical.png` |
| `{{LOC:WAREHOUSE_PIT}}` | The lounge end of a converted warehouse interior: four mismatched couches sagging in the middle arranged around a low scarred coffee table on bare concrete, a wall of three salvaged televisions behind them, a high shelf on the wall above, exposed steel roof trusses and high dusty clerestory windows far above. | 7 | `loc-pit.png` — stand-in: `loc-warehouse-canonical.png` |
| `{{LOC:WAREHOUSE_TERMINALS}}` | The desk end of the same warehouse: a long trestle desk against a brick wall carrying three monitors on stacked books, a mechanical keyboard, cable runs stapled along the wall, and a row of dented energy drink cans. | 4 | `loc-terminals.png` — stand-in: `loc-warehouse-canonical.png` |
| `{{LOC:WAREHOUSE_SHOP}}` | A workbench end of the same warehouse, scarred plywood top under a clamp lamp, hand tools on a pegboard, part-built devices in various states, solder spool, scorch marks. | 1 | stand-in: `loc-warehouse-canonical.png` |
| `{{LOC:WAREHOUSE_EXT}}` | The outside of a low brick industrial building on a quiet back street, a roller shutter door, a concrete kerb, weeds at the base of the wall. | 1 | not required — stand-in: `vol4-s03.png` |
| `{{LOC:VEX_APARTMENT}}` | A single-room apartment above a shop where every horizontal surface is covered and most of the furniture was something else first, milk crates for stools, a bare bulb, a kitchen counter used as a workbench. | 2 | `loc-vex-apartment.png` — stand-in: `vol1-s07.png` |
| `{{LOC:LAUNDROMAT}}` | A small laundromat with two banks of white front-loading machines facing each other, a wall-mounted bench along the window, a folding counter, worn vinyl floor, fluorescent tubes overhead. | 1 | not required |
| `{{LOC:MAPLE_AND_FOURTH_A}}` | A corner retail unit with cheap flat plastic signage, a grey vinyl awning sagging at one corner, a dark window with an illuminated sign in it. **State A of a single location.** | 1 | `loc-corner-a.png` — stand-in: `vol2-opener.png` |
| `{{LOC:MAPLE_AND_FOURTH_B}}` | The same corner unit, same footprint and same window and door positions, now presenting as a long-established bookshop: navy canvas awning, hand-painted signboard, window display of stacked paperbacks and small hand-lettered cards, a carved wooden sign in the door glass. **State B of the same location, and the framing of any image of it must match state A exactly.** | 1 | `loc-corner-b.png` — stand-in: `vol2-s02.png` |
| `{{LOC:HOLLOW_PINE_INT}}` | The interior of a settled second-hand bookshop, floor-to-ceiling wooden shelving, worn overlapping rugs on board floors, a wooden counter with a low lamp, warm lampshades, a stack of cookbooks with a high shelf above it. | 2 | `loc-hollow-pine-int.png` |
| `{{LOC:HENDERSON_PORCH}}` | The covered front porch of a white clapboard house with green shutters, painted floorboards, a screen door, and a two-seat wooden swing hanging on two chains. | 1 | not required |
| `{{LOC:OLD_SCHOOL}}` | A long low single-storey 1960s school building behind a sagging chain link fence, ground-floor windows boarded with plywood, six acres of dead grass, and a play structure with the swings removed leaving the crossbar and cut chains. | 1 | not required |
| `{{LOC:OLD_SCHOOL_B}}` | The same school six months later, occupied as a military camp: a new nine-foot chain link fence with green privacy slats woven through it, dead straight and taut, with a vehicle gate open at the corner; six sand-coloured cargo trucks on the asphalt apron; one command tent, four squad tents and a generator on the softball field; and at the north side a concrete dumpster pad with two dumpsters and a flush boiler hatch, **with the fence running the OUTER edge of the concrete so the pad is inside it**. **State B of a single location — see the note below.** | 4 | `loc-old-school-camp.png` |

**`OLD_SCHOOL` and `OLD_SCHOOL_B` are a state pair, and only the SUBJECT has to match, not the
framing.** State A is the delivered plate `vol3-s04.png`; state B is the canonical reference
`loc-old-school-camp.png`. The building, the boarded windows and the stripped swing frame carry
across and were checked. The camera does not: `MAPLE_AND_FOURTH` A and B must be framed
identically because there the joke IS the framing, whereas here the joke is what is now inside a
fence you cannot see through, and state A is shot from outside at ground level and can never
show it. So state B is elevated — which is also how the arc discovers the place, from the roof
of the hardware store.

**The fence must look wrong in the right way.** It is not security, it is a copy of a document:
*“Nine feet tall. Privacy slats. Green.”*, and *“Somebody read that page four hours before the
trucks got here.”* So it is newer, straighter and better made than the school or anything else
in frame, with no sag and no gap. Vex’s line depends on it — *“This one isn’t even thinking
about me.”*

**The dumpster pad geometry is load-bearing and the reference holds it.** *“And the property
line runs along the outside of this concrete, so that’s where the fence went.” Vex pointed at
the hatch on the other side of it. “But the boiler hatch is inside.”* Run the fence straight
past the pad in any plate and the entire break-in stops making sense.

**Known gap, recorded rather than regenerated: there is no tarp-covered object.** Owen counts
*“one command tent, four squad tents, a generator, and something under a tarp that isn’t a
generator”*, and he counted twice. The tents, the count and the generator are all correct in the
reference; the tarp is absent. **Any plate showing the tent line must add it** — a low bulky
shape under a fitted tarp, roped down, near the generator, not identifiable as anything. It is a
question the arc asks and does not answer, so it must not resolve into a recognisable object.
| `{{LOC:HOTEL_ROOM}}` | A tidy budget hotel room, one made double bed, a laminate desk, a wall-mounted television, and an open closet alcove with a hanging rail. | 1 | not required |
| `{{LOC:BENNY_GYM}}` | A small old independent boxing gym in one ground-floor room: a glass shopfront door and street window at the near end, a battered wooden desk beside the door in plain view from the street, a filthy rubber entrance mat, a single heavy bag on a chain hanging free with clear floor around it, and a freestanding water cooler about eleven feet away on the same open run of floor. Speed-bag platform, skipping ropes on pegs, a towel bench, a corkboard, a floor fan, a weight rack. No ring. **The bag-to-cooler sightline is load-bearing — see the note below.** | 2 | `loc-benny-gym.png` |
| `{{LOC:WARDROBE_ROOM}}` | The costume store under the auditorium stage of the closed elementary school, down a short flight of concrete steps: a long row of old steamer trunks along the back wall on a low ledge, ONE of them standing open with a folded sheet of tissue paper in it and nothing else; a rack of choir robes on a steel pipe, shelves of hat boxes and hats, shoes lined up in pairs with every toe pointing the same way, a typed inventory sheet in a plastic sleeve on the near wall, bare-footprint scuffs in the dust, and a single pendant lamp. **In the back wall, a small plain door about four and a half feet tall, SHUT.** **State A of a pair — see the note below.** | 6 | `loc-wardrobe-room.png` |

**`WARDROBE_ROOM` exists to plant a door before it matters, and that is its one job.** Volume 3
has Pip hear a hum *“in the room, behind the trunks”*; Volume 4 opens *“a door that didn’t
appear on any drawing in any county file… about four and a half feet tall”*. **If the reference
left it out and a Volume 4 plate added it, the arc’s biggest reveal would arrive from nowhere.**
Same discipline as the empty corner the Warehouse master leaves for Lena’s desk. State A is the
reference, door shut; state B is Volume 4, door open, with a second room beyond it that no
reference shows.

**It is a DOOR, not a hatch, and this was got wrong once.** The first generation drew it as a
panel set high in the wall with its sill about a trunk’s height off the floor — caused by a
prompt that described what was *visible* (*“only the top part shows above the trunks”*) instead
of what was *there*. People walk through this door: Chet steps through it and pulls it shut,
Ottie stands two feet from it, and four people came out of it. **Its threshold is on the floor.**

**The visible trunk count is not the canon count.** Twelve read in the reference; the prose says
thirteen twice, and the row runs off frame past the near corner. Do not "correct" the prose to
the picture here — section 1.1 gives the lineup priority over a written description for
CHARACTERS, and this is a room whose contents the prose counts on purpose.

**No legible text.** The inventory sheet is unreadable in its sleeve and the trunk numbers are
prose only, because the negative block forbids numerals. That costs nothing: **trunk seven
identifies itself by being the only open trunk in the row.**

**`BENNY_GYM` is a state pair, and the reference is state A.** The prose says *“The bag came
off the chain, flew eleven feet and took out the water cooler.”* That sentence is geometry, so
the reference places the bag and the cooler on the same clear run of floor with nothing between
them, and shows both intact. Any plate of the aftermath is state B and must read as the same
room. Same discipline as `MAPLE_AND_FOURTH` A and B.

**The OPEN sign is prose only.** The card in the door glass is blank, because the negative
block forbids signage copy — the same arrangement as Rocco’s GOLDEN GLOVES and Wren’s stencil.

**Stand-in location references, decided 2026-07-29.** Only two purpose-made
establishing shots were generated, `loc-square.png` and `loc-hollow-pine-int.png`.
The rest are not worth a generation each, because the places are already on the page
in delivered scene plates and those plates are what the reader will actually see. A
location cell may therefore name a scene plate as `stand-in:`, and the generator
attaches it with an explicit instruction to take the room from it and nothing else —
not its characters, staging, camera angle or time of day, all of which belong to that
plate's own page.

A stand-in is a fallback and never a peer. If a purpose-made `loc-` file later
appears, `refExists` finds it first and the stand-in is ignored with no edit needed.

| Location | Stand-in | Why this plate |
|---|---|---|
| `WAREHOUSE_PIT` | `loc-warehouse-canonical.png` | See the note below. The master reference shows all three ends of the room in one frame and is canonical, which a scene plate is not. |
| `WAREHOUSE_TERMINALS` | `loc-warehouse-canonical.png` | As above. |
| `WAREHOUSE_SHOP` | `loc-warehouse-canonical.png` | As above. |
| `VEX_APARTMENT` | `vol1-s07.png` | A wide object study with no figure in it, which is as close to a purpose-made establishing shot as the delivered set gets. Bed, milk-crate stools, bare bulb, the counter used as a workbench and the pinned walls are all present. |
| `MAPLE_AND_FOURTH_A` | `vol2-opener.png` | This plate *is* state A. |
| `MAPLE_AND_FOURTH_B` | `vol2-s02.png` | This plate *is* state B, and the pair was already matched by hand in `FIX-corner-pair-match.md`. Generating separate references for these two would risk breaking a match that is currently correct. |

**`MILLBROOK_RESIDENTIAL` closed 2026-07-29 with `vol3-opener.png`.** This was the last
gap. The opener is a full-bleed `2:1` dawn view straight down the street — modest
single-storey houses set back behind short lawns, chain link, cracked sidewalk, power lines,
parked sedans, and Mr Henderson's rolled newspaper on the steps at the left edge. It is a
better record of the street than either spread that uses the token, so no dedicated
`loc-residential.png` is needed at all.

**Warehouse brick resolved 2026-07-29: it is PURPLE.** The mapping exposed a
divergence — purple in `vol2-s06`, warm brown in `vol2-s05`, two ends of one room —
and `loc-warehouse-canonical.png` settles it unambiguously in favour of purple. So
`vol2-s05` is the outlier and `vol2-s06` was right.

**That also replaced all three warehouse stand-ins with the master reference**, which
is the better answer and was available the whole time. `loc-warehouse-canonical.png`
shows the terminal desk, the lounge and the workbench in one frame, so it covers
`WAREHOUSE_PIT`, `WAREHOUSE_TERMINALS` and `WAREHOUSE_SHOP` at once — twelve spreads
between them. It is also *canonical*, where a scene plate is only consistent with
itself, and it cannot pass on a wrong wall colour the way `vol2-s05` would have.

Section 6.1 created the master reference for exactly this and it should have been the
first thing reached for. Using a delivered plate as a stand-in remains right where no
purpose-made reference exists; it is wrong when one does.

**`vol2-s05` is not being regenerated over the brick.** It is one plate, its walls are
warm brown rather than a different building, and no reader compares it to a canonical
sheet. It is logged here so the divergence is a known exception rather than a
precedent, and every future terminals prompt now inherits purple from the reference.

**Location state pattern.** `MAPLE_AND_FOURTH_A` and `B` follow the same discipline Part D3 sets out for damaged wardrobe: B is defined as a change to A rather than as a new place. The point of the volume is that the corner was one thing and is now another, and a reader who flips back two spreads and finds the view unchanged gets that for free. It is the single highest-value image decision in the set and it is worth insisting on.

**Corrected: "framed identically" was impossible as written.** State A is the chapter
opener at `2:1`, because it full-bleeds across both pages of the spread. State B is an
image page at `3:2`. No single crop satisfies both ratios, so an identical frame was
never achievable and chasing one would waste generations.

What actually delivers the effect, and what the two prompts now require:

- **The same camera position, distance and angle.** Standing height, from across the
  intersection, square on to the corner.
- **The same lens character.** Neither wider nor longer than the other.
- **The corner occupying the same position and the same apparent size** within the
  frame, so it reads as the same view rather than the same photograph.
- The 3:2 plate is therefore the 2:1 view **cropped in from the sides and extended
  vertically**, not a different shot of the same building.

**The lighting must NOT match.** State A is first light and cold; state B is mid
morning with warm sun on the awning. Time has passed and the prose says so. Only the
geometry is held; the light is free to move.

---

## 6.1a Warehouse lighting floor

**Standing instruction from the author, 2026-07-29: stop making the warehouse scenes so dark.**
Several delivered plates had to be lightened by hand. The note behind the instruction is worth
keeping, because it is a judgement about the book rather than about realism: *when it is too
dark it is not as fun to read and look at.*

That is correct and it outranks plausibility. A converted warehouse with high dirty windows
genuinely would be gloomy, and the reader did not come here for an accurate exposure reading.
Twelve spreads happen in this building, so a dim default compounds into a book that feels
like one long night.

**The floor, and it applies whatever the hour:**

- **Wall colour reads.** The brick is purple and a reader should be able to see that it is
  purple. If the walls have gone to grey-black, the frame is too dark.
- **Every face in frame reads.** Both eyes, and the expression. Rim light alone is not enough.
- **Furniture keeps its colour.** The couches are brown, olive and purple; they should not
  resolve into three identical dark lumps.
- **No large area of featureless black.** Shadow should stay blue or warm and keep some
  detail in it rather than going to nothing.

**Practical prompt language, reusable.** Night scenes in the warehouse take *two* sources, not
one: an ambient fill that establishes the room, plus a motivated key on the subject. The phrase
that worked on `vol3-s08` is the model —

> Night, but not murky. Cool blue-white moonlight through the clerestory windows gives the
> trusses and the walls a clear rim, and a warm workbench lamp off to the left throws soft
> light across the faces so features read clearly. The lower room falls away into soft blue
> shadow, but nothing is lost to black.

**One named exception, and only one.** `vol1-s03` is Owen alone at three in the morning with
the monitor as the single source and the room black behind him. That is a hard constraint on
that prompt, it is the point of the image, and it was accepted. It stays. Nothing else in the
warehouse gets to be that dark, and any future prompt that wants it must say so in its hard
constraints and give a reason.

**Where this was already wrong and has been fixed:** `vol4-s07` asked for *cold spill from
unseen monitors off to the right, one warm lamp far behind*, which is one and a half sources
for a night interior and would have produced exactly the plate that needed lightening. It was
still unbuilt, so it was rewritten rather than regenerated.

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
| Text spreads | 38 |
| Chapter openers | 4 |
| **Spread images total** | **42** |
| Canonical character references | 13 |
| Canonical location references | 8 |
| **Blocking generations before spread work** | **21** |
| Expected regeneration at 5 to 15 percent | 2 to 6 |
| **Realistic total generations** | **60 to 64** |

This is a comfortable number. Part B5 warns about novel length, where the count runs past three hundred and the forks in Part H become necessary. At 37 spread images none of that applies: the full one-image-per-spread format holds, the object and atmospheric share does not need inflating as a release valve, and no volume needs splitting since the largest is ten spreads against a threshold of one hundred and fifty.

## 8. Shot mix, all four volumes

**Bands re-set 2026-07-29, and these are now the targets.** Part C3's original bands were
a default for a generic illustrated novel, written to prevent the talking-heads failure. This
book has a different problem: thirteen named characters arrive across four short volumes and
several were being met in prose only. Volumes 1, 3 and 4 each traded an unpeopled plate for a
face on the author's instruction, so the honest response is to state what a character-forward
book wants and hold it, rather than log a fourth exception against numbers nobody intends to
meet.

| Type | Target | Actual | Count |
|---|---|---|---|
| Character portrait or close | 30 to 36% | 35.1% | 13 |
| Establishing or location | 17 to 22% | 18.9% | 7 |
| Object or detail | 15 to 20% | 16.2% | 6 |
| Action moment | 15 to 20% | 16.2% | 6 |
| Atmospheric or empty | 12 to 17% | 13.5% | 5 |

All five bands satisfied. No three consecutive spreads share a shot type in any volume.

**What the old bands were protecting, and how it is protected now.** The talking-heads
failure is real, and raising the portrait ceiling does not license it. Three rules carry that
weight instead, and they are the ones to enforce:

- No three consecutive spreads share a shot type. Unchanged, and it is the rule that actually
  prevents a run of faces.
- A portrait must contain a *beat*, not a pose. Every portrait in these four volumes shows
  somebody doing or withholding something — Henderson holding up steady hands, Owen refusing
  to turn round, Pip looking at the floor while Felix celebrates.
- Where a wordless object carries a beat better than a face, keep the object. Volume 4 spread
  7 stays an object study for exactly this reason: *Owen moved his energy drink cans to make
  room* is acceptance without a line of dialogue, and a face would explain it and spoil it.

Atmospheric is the band that gave up the most, and it is worth watching. Volume 1 has none at
all, and the displaced bedroom-ceiling prompt is still written and spoiler-checked if a home
is found for it.
