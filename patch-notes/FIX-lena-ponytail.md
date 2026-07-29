# Fixes for the five new plates

All five are in and wired up: `vol2-s04b`, `vol4-s07b`, `vol3-s01b`, `vol3-s02b`, `vol1-s08b`.
All five are exactly 3:2 at 1536×1024.

**Three are good as they are. Two need Lena's hair fixed.** Nothing here is urgent — the pages
are not blank, so these can be swapped whenever.

---

## MUST FIX — Vex's buns, in one image

`vol2-s04b` (the map) gave Vex a **single** bun. It should be **two messy buns, one high on each
side of her head**, each with a small red tie.

**I got this wrong in the first version of this file and told you the opposite.** The cause was
not the plate — it was this project's own paperwork contradicting itself, and I had put the
contradiction there. The roster's reference-sheet note said "two messy buns high on either side"
and the wardrobe table said "buns", plural, but the **immutable block** — the text pasted
verbatim into every single prompt — had been amended to "one messy high bun at the back left".
That one line is the only one a generator ever sees, so it produced exactly what it was asked
for. Fixed at the source now, so every future prompt carries two.

Included in the Lena edit instruction below, since both are the same image.

---

## MUST FIX — Lena's ponytail, in two images

`vol2-s04b` (the map) and `vol4-s07b` (Lena recording) both gave Lena a **centred, symmetrical
spiky mass of hair with no ponytail at all.**

Her canonical is unambiguous — `char-lena-canonical.png` shows one big off-centre side ponytail
sticking out well past her head, and the roster text says *"that single off-centre ponytail is
her dominant silhouette and it must never be centred or split into a matched pair."*

I checked this the right way round before calling it, because on this project the roster text
has been the wrong one three times and the artwork right. Not this time: the canonical sheet
**and** the delivered `vol2-s01` plate both clearly show the side ponytail. So the two new
images are the outliers.

### Option A — modify the existing images (preferred, keeps the compositions)

Both compositions are good and worth keeping. Attach `char-lena-canonical.png` alongside the
image you are editing, and give it this:

> Change only the orange-haired girl's hair, and change nothing else in the image. Keep her
> face, expression, pose, hands, clothing, the other characters, the background, the lighting
> and the camera exactly as they are. Her hair is currently a centred, symmetrical spiky mass,
> which is wrong. Gather it into ONE large uneven side ponytail high on her LEFT side, held with
> a small band, sticking out clearly past the silhouette of her head, exactly as in the attached
> reference sheet. Leave a loose fringe over her forehead and a few wisps standing up at the
> crown. It must not be centred, must not be symmetrical, and must not be split into two.

**For `vol2-s04b` only, add this to the same instruction** (Vex is the girl in the black leather
jacket with mint-green hair, standing on the right with her arms folded):

> Also change the green-haired girl's hair, and nothing else about her. She currently has a
> single bun. Give her TWO messy buns, one high on each side of her head, each held with a small
> red tie, with loose pointed strands escaping them. Not one bun, not a ponytail.

### Option B — full regeneration

If the edit will not take, the prompts in `prompt-sheet-new-spreads.md` have been regenerated
with this hoisted into a **MUST HOLD** block directly under the style, which is where a model
weights hardest. That mechanism is the one that eventually fixed Owen's eyebrows, so it is the
right lever. Regenerate `vol2-s04b` and `vol4-s07b` from that sheet.

The map's MUST HOLD also now says the streets must read as a **rectangular grid**, not the
radial spider-web it came back with — Millbrook is explicitly "a flat town on a grid of wide
streets", so a web contradicts canon. Minor, but free to fix in the same pass.

---

## OPTIONAL — your call, all three are fine as delivered

**`vol3-s01b`, Mr. Henderson running.** He came back in brown shoes; the prompt asked for
slippers. Slippers were the joke — he only went out for the paper and never meant to run — and
they would have set up the beat in spread 5 where his wife makes him buy proper running shoes
with the price tag still on. If you want it:

> Change only his footwear. Replace the brown shoes with soft tartan house slippers, one of
> them half off his heel mid-stride. Change nothing else.

**`vol1-s08b`, the streetlight.** Genuinely beautiful, and it picked the chipped ceramic frog up
off the `vol1-s01` reference by itself, which is canon and a nice touch. The one thing it did
not deliver is the *wrongness*: it reads as "a streetlight is out" rather than "the world is
subtly wrong in that patch". The two-lighting-logics idea is the whole point of the plate. If
you want to push it:

> Keep the composition, the house, the frog, the cars and the lighting exactly as they are. In
> the dark area beneath the unlit streetlight only, make the world subtly wrong: the shadows of
> the two parked cars must fall in a noticeably different direction from every other shadow in
> the picture, and the kerb line must not quite line up as it crosses that patch. Keep the
> effect quiet and keep the area clearly visible rather than black. Change nothing outside that
> dark patch.

**`vol3-s02b`, Cassie's hearing.** No changes. This is the one I was most worried about —
the rings had to read as *sound* and not as a signal with a source, because a transmission would
have given away a Volume 3 reveal. It reads as sound. Her wardrobe matches `CASSIE_A` exactly,
down to the teal knit cap, the brass buttons and the dead hearing aid in her open palm.

---

## Also fixed at the source — Vex's trousers

The new plate put Vex in black trousers; her canonical and every delivered plate show
**olive-green cargo trousers**. This turned out not to be drift either. `VEX_A` only ever
specified her jacket, top and hair — no trousers, no boots — while `OWEN_A` and `FELIX_A` both
specify a full outfit. With nothing to follow, the generator reasonably improvised from "black
leather jacket... plain black shirt" and made the trousers black too.

`VEX_A` now describes the whole outfit: olive cargo trousers with patches and turn-ups, the
chain at the hip, green socks, black high-tops with pale toe caps. Worth having regardless of
this batch, because it was going to keep happening.

Folded into the `vol2-s04b` edit below if you are touching that image anyway; otherwise it is
subtle enough to leave.

> Also change the green-haired girl's trousers from black to olive-green cargo trousers with
> visible patches and deep turn-ups, with a silver chain looping from her belt at the hip.
> Change nothing else.
