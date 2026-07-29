# Fixes for the five new plates

All five are in and wired up: `vol2-s04b`, `vol4-s07b`, `vol3-s01b`, `vol3-s02b`, `vol1-s08b`.
All five are exactly 3:2 at 1536×1024.

**Three are good as they are. Two need Lena's hair fixed.** Nothing here is urgent — the pages
are not blank, so these can be swapped whenever.

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

## Two observations, no action needed

**Vex's bun.** The new map plate gives her one high bun, which matches her canonical sheet and
the roster text. The delivered `vol2-s01` gives her two side tufts, so those two plates disagree
with each other inside the same volume. The new one is the correct one. Flagging it only because
you may notice it; I have not touched the old plate.

**Vex's trousers.** Her canonical shows olive cargo trousers, the wardrobe table says "plain
black". The new plate follows the table. This is the same text-versus-image conflict section 1
of the lock already resolves in favour of the image, and it is pre-existing across the whole
set rather than anything this batch introduced.
