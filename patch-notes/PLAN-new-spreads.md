# Adding spreads: recommendation, font analysis, and prompts

Written 2026-07-29, after measuring all 33 text pages. Nothing here is executed yet — the
re-cut moves page boundaries, which is a spec job that has to be done by hand with each
image's anchor beat re-validated.

---

## 1. The font question, answered first, because it changes the rest

**The type was small for a reason that had nothing to do with the type scale, and it is
already fixed.** Body size is `1.95cqh` against the page; the page is half the spread; the
spread was capped at `maxSpreadWidth: 1680`. So the page was capped at 840px and the type at
16.4px *however large the monitor was*. The clamp's own 22px ceiling was unreachable.

Raising the cap to 2100 was measured across all 33 pages:

| | before | after |
|---|---|---|
| body type | 15.5px | **17.9px** (+16%) |
| median fill | 85.9% | 85.5% |
| pages overflowing | 0 | 0 |
| characters per line | 64 | **64** |

Bigger type, *better* fill, and the same line length to read. Fill is scale-invariant while
the clamp is not binding, because the type and the column both scale with the page — and it
improves slightly on a taller page, since the fixed 30px/16px padding and the folio become a
smaller fraction of it. Characters per line does not move because the measure is capped in
`em`, so the line gets physically longer but no longer to read.

**That was the whole readability win, and it cost one number.**

### What more pages would buy on top of that

The relationship is exact and was verified empirically, not derived:

```
fill_new = fill_old × (coefficient_new / 1.95)
```

Measured at 2.15cqh, every page scaled by ×1.101 to ×1.103 against a predicted ×1.1026, and
characters per line stayed at 64. So to raise the coefficient you must first lower the worst
page, and the only way to lower the worst page is fewer words on it.

| worst page after re-cut | max safe coefficient | type at a 1050px page |
|---|---|---|
| 99.7% (today) | 1.95 | 20.5px |
| 90% | 2.05 | 21.5px |
| 85% | 2.11 | 22.2px (hits the 22px clamp ceiling) |

**So the honest answer: adding spreads buys about +8% more type on top of the +16% already
banked, and it runs into the clamp ceiling shortly after.** Do not add pages for the font.

**Add pages for white space and for new art.** Those are the real returns. Four pages sit at
96–99.7% with no margin for a single added sentence, and the arc gets four or five new plates.

### One thing more pages will NOT fix

At 1280×720 the type is pinned to the **12px clamp floor** and `vol2-s04` renders at 114.7%.
That is a separate problem with its own cause — below roughly a 1900px viewport width the
viewport rather than the cap binds, the page falls to ~605px, and `1.95cqh` of that is 11.8px,
under the floor. Once the floor binds, the column keeps shrinking while the type does not.
Re-cutting helps proportionally but does not remove the effect. This belongs with the mobile
work, not here.

---

## 2. Where the spreads go

Measured content height per page, against 772px available at an 840px page. Existing
per-volume totals are fixed, so the average is arithmetic:

| volume | text pages | total | avg fill | max | verdict |
|---|---|---|---|---|---|
| 1 | 8 | 5582px | 90.4% | **97.5%** | genuinely crowded — five pages ≥94% |
| 2 | 8 | 5368px | 86.9% | **99.7%** | one spike, generally full |
| 3 | 8 | 4835px | 78.3% | 94.6% | comfortable; one outlier |
| 4 | 9 | 5131px | 73.8% | **99.6%** | one spike, lots of slack elsewhere |

**Recommendation: +4 spreads, one per volume.** 37 text pages, 41 plates, 4 new.

Volume 1 is the one that could justify a fifth. It is uniformly full rather than spiky, so a
single new page still leaves it averaging 80%, where the other three land at 66–77%.

### The four splits

**Volume 2 — split `s04` (99.7%, the worst page in the arc).**
The existing plate depicts beats 2–3 (Owen refusing to turn, Felix erupting), which sit in the
first half and stay put. Split after *"Two blocks."*

- `s04` keeps: Owen at the tax records → Felix's triple-take at Pip → Milo comes out → the
  bookstore news → *"Two blocks."* — **378px, 49%**
- new page: Pip walks to Owen's screens → the frequency filter → the whole map argument —
  **379px, 49%**

This is the cleanest split available anywhere in the arc, almost exactly even, and it fixes
the worst page. *(Note: the split point above needs one adjustment in practice — the
"Pip had walked over to Owen's screens" paragraph currently ends `s04`, so the new page opens
on it and the boundary is already a beat break.)*

**Volume 4 — split `s07` (99.6%, second worst).**
The existing plate depicts beat 3 (room made in the corner, Owen's cans moved), in the first
half. Split after *"Okay."* following *"Don't make it weird."*

- `s07` keeps: Crane looking at Pip → the move-in → Cassie going home → Pip telling Milo →
  *"Welcome to the team"* — **445px, 58%**
- new page: the arc closes into a complete circle → *"Tomorrow"* → Lena records The Real Feed
  — **291px, 38%**

The new page runs straight into `s08`, which opens *"She paused. She almost cut the recording.
She didn't."* — so the video beat stops being split across a page turn, which it currently is.

**Volume 1 — split `s08` at the existing `End Of Day One` heading.**
A real section break, so the boundary is free. But `s08`'s first half is only 178px, so this
one needs a **chain shift**: `s08` also takes the tail of `s07`, and `s07` the tail of `s06`.
That is three boundaries moving at once and three image anchors to re-validate — the most work
of the four, and the reason Volume 1 is last in the queue despite being the most crowded.

- new page: Lena's texts with Vex → Owen and Monke at the map → the streetlight

**Volume 3 — split `s01` (83%) after the run.**
Volume 3 does not need a page for fit; this one is for the art, and that is worth saying out
loud. The existing plate depicts Mr. Henderson *stopped* at the end of the block. The six-mile
run itself — the volume's title beat — is never shown.

---

## 3. The four new plates

Chosen against a full inventory of what the existing 37 depict. Every one of these is a
subject the book has never put on a page.

The two rules they are working against are in tension, and it is resolved per plate: the
standing instruction is character-forward, and the request here is to show something new.
Three of the four have faces. The fourth is a deliberate atmospheric exception, noted.

---

### `vol2-s05` (new) — Owen's map

**The strongest of the four.** The arc of dots has been referenced in all four volumes — it is
the plot's central object — and has never been drawn. It also gives the book a visual language
it does not otherwise have: a diagram.

**Watch the lettering rule.** A map wants street names and the negative block forbids
lettering inside an image. This has to read as pure geometry.

```
{{STYLE}}
{{CHAR:OWEN}}
{{WARDROBE:OWEN_A}}
{{CHAR:PIP}}
{{WARDROBE:PIP_A}}
{{CHAR:LENA}}
{{WARDROBE:LENA_B}}
{{CHAR:VEX}}
{{WARDROBE:VEX_A}}
{{LOC:WAREHOUSE_TERMINALS}}
Four figures gathered at a bank of three monitors, all of them looking at the middle one. On that screen is a town map drawn as pure geometry with absolutely no text or labels anywhere: a pale grid of thin streets on a dark field, a scatter of about a dozen small warm glowing dots, and those dots falling along a wide circular arc that is almost but not quite closed, with a clear gap on one side and an empty unmarked rectangle at the centre of the circle. One dot is brighter than the rest. Owen is seated at the keyboard turned half toward the screen, mouth open mid-objection. Pip stands closest to the glass, very upright and still, her head level, one hand raised as though about to point at the arc. Lena leans in from behind Owen's shoulder. Vex stands with arms folded, chin up. All four faces clearly visible and clearly lit. Exactly four figures in frame.
Interior, mid-morning.
Medium group shot from slightly off to one side so the screen and all four faces are visible at once, camera at standing eye level, the arc on the monitor readable as a shape.
Bright and legible. Generous warm fill from the warehouse windows and overhead work lights so faces and clothing read at full colour, with the monitor adding a cool glow on the nearest faces only. Not a dark room, not a screen-lit room.
{{NEGATIVE}}
Aspect ratio: 3:2
```

- **Shot type:** Object or detail (group)
- **Depicts:** the almost-closed arc on Owen's map, with the group seeing the pattern together
  for the first time.
- **Spoiler check:** the gap in the arc and the blank rectangle at the centre are both on the
  page in this scene. The rectangle must stay unlabelled and unrecognisable — it must not read
  as a school. That reveal is Volume 3.

---

### `vol4-s08` (new) — Lena recording The Real Feed

Lena is a broadcaster and the book has never once shown her broadcasting. This is also the
first plate to use a screen as a light source on a single face, and the pig gets a proper
appearance.

```
{{STYLE}}
{{CHAR:LENA}}
{{WARDROBE:LENA_D}}
{{CHAR:PIG}}
{{LOC:WAREHOUSE_PIT}}
A girl sitting cross-legged on a worn couch late at night, talking directly into a phone that is propped up against a coffee mug on a low table in front of her. She is leaning slightly forward, mid-sentence, one hand open in front of her, her expression set and certain rather than nervous. Her clothes are visibly creased and slept in. A small pot-bellied pig is asleep against her hip, fully relaxed. The phone screen throws the main light up onto her face from below. The rest of the warehouse falls away behind her into soft shadow with a few small equipment lights. Exactly one person and one pig in frame. No text or interface visible on the phone screen.
Interior, late night.
Medium shot from just behind and beside the phone, so the viewer sits roughly where her audience does, camera at seated eye level.
Low-key but never murky. The phone is the key light on her face and it is bright enough that her features and clothing colour read fully; a warm secondary source keeps the couch, the pig and the near wall clearly visible. Dark mood, readable image.
{{NEGATIVE}}
Aspect ratio: 3:2
```

- **Shot type:** Character portrait
- **Depicts:** Lena recording the closing video, the pig asleep beside her.
- **Spoiler check:** PASS. Nothing in frame beyond her, the pig and the couch.

---

### `vol3-s02` (new) — Mr. Henderson running

The volume is called *Mr. Henderson's Knee* and the run is its title beat. Every other plate in
the arc is a static scene; this is the only one with real physical motion in it, and an
eighty-one-year-old man running flat out at dawn is the most joyful image available anywhere in
the book.

```
{{STYLE}}
{{CHAR:MR_HENDERSON}}
{{WARDROBE:HENDERSON_A}}
{{LOC:MILLBROOK_RESIDENTIAL}}
An old man running along an empty residential sidewalk at full stride, both feet off the ground, arms working, a folded newspaper still tucked under one arm because he never meant to go anywhere. He is wearing house clothes and slippers rather than anything athletic. His face is the whole point: astonished and delighted at once, mouth open, looking down at his own legs rather than ahead. Sleeping single-storey houses with wide lawns run away behind him and the street is completely empty of other people and cars. Exactly one figure in frame.
Exterior, just after sunrise.
Low three-quarter tracking shot from slightly ahead and below so the stride reads as fast and his face is clearly visible, moderate depth so the row of houses recedes behind him.
Bright, clean, early morning light. Long warm low sun from behind the camera lighting his face and the fronts of the houses directly, long soft shadows, high overall key. A cheerful image.
{{NEGATIVE}}
Aspect ratio: 3:2
```

- **Shot type:** Action moment
- **Depicts:** Beat 1. The six miles, in progress.
- **Spoiler check:** PASS. The run is public knowledge by the second page of the volume.

**Alternative, if you would rather have the inventive one than the joyful one:** Cassie's
hearing made visible — her face in the foreground and the town's sounds rendered as faint
concentric rings passing through the walls behind her. It would be the only subjective image in
the book and the only one that draws something that is not physically there. Higher risk, higher
ceiling. Say the word and I will write it.

---

### `vol1-s09` (new) — the streetlight

**The one deliberate exception to character-forward, and I want to flag it rather than slip it
through.** Across four volumes the reader is told constantly that the town changes and is only
ever shown the aftermath — a filled pothole, a bookstore that was a vape store. This is the
one beat where a patch happens on the page. Putting a face in it would mean a character
witnessing it, and no character does; making one see it would change the beat.

It is also the closing image of Volume 1, which is the right place in a volume to spend an
atmospheric plate.

```
{{STYLE}}
{{LOC:CRESCENT_HOUSE_EXT}}
A quiet suburban street at night seen from across the road, with one streetlight standing dark while the lights further along the street are still lit. In the pool of darkness where its light should be, the scene is subtly and definitely wrong: the shadows of the parked cars fall in a slightly different direction from everywhere else in the frame, the kerb line does not quite continue, and the colours are a shade off true. Everything outside that pool is an ordinary calm night street. No people, no faces, no figures anywhere in frame. A single lit upstairs window in the nearest house.
Exterior, well after midnight.
Wide static shot from across the street at standing eye level, the dark streetlight slightly off centre, deep enough depth that the correctly lit street continues away behind it for contrast.
Two lighting logics in one frame, and this is the whole image. Outside the dark pool: normal warm sodium streetlight, soft and calm, everything legible. Inside it: cool, flat, directionless light with shadows that disagree with the rest of the picture. Never pitch black -- the wrongness has to be visible, so the dark area stays clearly readable.
{{NEGATIVE}}
Aspect ratio: 3:2
```

- **Shot type:** Atmospheric
- **Depicts:** the final beat. The streetlight across from Aunt Carol's house going off for a
  fraction of a second.
- **Spoiler check:** PASS, with one thing to hold. It shows that a patch has a visible moment
  and that the moment looks wrong. It must not show a cause, a mechanism, a source, or anything
  in the walls or wires.

---

## 4. Order of work

1. **Volume 2 `s04`.** Fixes the worst page, the split is nearly even, and the new plate is the
   best of the four. One boundary moves.
2. **Volume 4 `s07`.** Fixes the second worst and un-splits the video beat. One boundary.
3. **Volume 3 `s01`.** No fit pressure, so it can wait for the plate to exist. One boundary.
4. **Volume 1.** Last, because it is the only one needing a chain shift across three
   boundaries and three image anchors.

After each volume: `npm run text`, then `npm run parse`, then re-measure fill. Do not trust
`/checks/overflow` in a non-compositing preview pane — it waits on `requestAnimationFrame`
and silently never measures. See CLAUDE.md.

Once all four land and the worst page is known, decide whether to take the body coefficient
from 1.95 to about 2.05. Not before — the ceiling is set by the single worst page, so the
number is not knowable until the last boundary has moved.
