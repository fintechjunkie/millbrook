# Character card frame, modern alternative

The first frame is a Greek key — squared spirals, continuous double rules. That vocabulary is
classical whatever colour it is drawn in, and the note was fair.

Save as: **`card-frame-b.png`** in `public/images/`

Both files can live side by side. Swapping is one line in `globals.css`, so this can be
compared against the existing frame rather than replacing it blind.

---

## The idea

**Printer's crop marks, deliberately mis-registered.**

Corner brackets instead of a continuous border, drawn the way a print production sheet marks
where a page will be trimmed — and printed twice, the second colour offset by a millimetre, as
though the press was very slightly out of alignment.

Two reasons this beats another ornament:

**It reads modern because it is production furniture, not decoration.** Crop marks, registration
targets and trim ticks are the visual language of contemporary editorial and record-sleeve
design. They say *manufactured object* rather than *antique*.

**The mis-registration is the story.** This is a book about a town that keeps being quietly
corrected, in a style built from layered paper. A frame that looks a hair out of register is the
same joke the Paper-Theater style already makes with its uneven cut edges and its one wrong
fountain tile. The existing style block calls that imperfection load-bearing.

**And it is technically safer than the first frame.** Corner-only marks mean the four edge runs
can be almost empty, and stretching empty space cannot distort. The Greek key's continuous rules
had to be uniform along their length or they would smear; this has nothing on the edges to smear.

---

## The geometry, which is not negotiable

CSS draws this with `border-image`, which cuts the file into nine pieces: four corners that hold
their shape, four edges that stretch, and a centre that is **thrown away**.

1. **Square canvas, 1024 x 1024.**
2. **Marks live entirely within the outer 20 per cent** — a 205px band around the edge.
3. **The middle 60 per cent is completely empty and fully transparent.** It is discarded, so
   anything drawn there is wasted.
4. **Whatever sits on the four edge runs must be uniform along its length**, because those get
   stretched to fit cards of different heights.
5. **Transparent PNG.** No background colour, no paper, no drop shadow behind the marks.

---

## The prompt

```
A minimal modern corner-mark frame, drawn as flat graphic marks on a fully transparent
background. The visual language is printer's crop marks and registration marks on a production
proof, not a decorative border.

STYLE: Flat, hard-edged, graphic. Matte paper-cut finish with clean edges, sitting alongside a
layered paper-theatre aesthetic without being ornamental. Precise and mechanical rather than
hand-drawn. No gloss, no gradient, no bevel, no 3D shading, no drop shadow, no glow.

COLOUR: Exactly two colours, both flat. A deep violet-indigo (#6B52C8) as the primary, and a
warm coral-orange (#E4572E) as the second colour used ONLY for the offset ghost described below.

COMPOSITION, and this part is a technical requirement rather than an aesthetic one:
- Square canvas.
- All marks sit ONLY in the outer 20 per cent of the canvas, forming a band around the edge.
- The centre 60 per cent is COMPLETELY EMPTY and fully transparent. No marks, no wash, no
  texture, no faint pattern, nothing.

THE FOUR CORNERS carry the marks. Each corner is an L-shaped bracket of two straight bars
meeting at a right angle, with a deliberate ASYMMETRY: one leg is roughly twice the length of
the other, and the long leg runs along the horizontal edge. The bars are solid, of even
thickness, with squared ends and no taper, no serif and no curl. The four brackets are mirrored
so each one hugs its own corner and opens inward.

The bars STOP SHORT of the actual corner point, leaving a small clean gap where the two would
have met, the way a crop mark does not touch the trim corner.

THE MIS-REGISTRATION, which is the point of the design: every bracket is drawn TWICE. The
primary indigo bracket sits in position, and a second identical bracket in coral-orange sits
underneath it offset by a small consistent amount — roughly 1.5 per cent of the canvas — down
and to the right. The offset is the same distance and the same direction for all four corners,
so it reads as one plate printed slightly out of register rather than as four random errors. The
coral shows only where it protrudes past the indigo.

THE FOUR EDGE RUNS between the corners are EMPTY except for one thing: a single hairline of
indigo, very thin, running continuously along each edge at a constant distance from the canvas
edge. It must be perfectly uniform along its whole length. Nothing else on the edges: no
pattern, no repeated motif, no centrepiece, no ticks, no dashes.

MUST HOLD, these override anything above that appears to contradict them:
- The centre 60 per cent of the image is entirely transparent and entirely empty.
- No lettering, numerals, words or symbols anywhere in the image.
- Nothing at the midpoint of any side except the continuous hairline. No motif, emblem, crest,
  cartouche or tick mark mid-edge.
- The edge hairline is uniform along its entire length.
- Corner brackets are asymmetric L shapes with squared ends, and they do not touch the corner
  point.
- The coral-orange appears ONLY as the offset ghost behind the indigo brackets, nowhere else,
  and never on the edge hairline.
- The offset is identical in distance and direction at all four corners.
- Exactly two colours, flat, with no gradient or shading.
- Transparent background, not white.
- No characters, no figures, no scenery, no objects, no textures.
- No outer drop shadow and no glow.

Aspect ratio: 1:1
```

---

## What to check before accepting it

- **Is the middle transparent and empty?** Open it and confirm. Note that a preview will often
  composite the transparent area against white or dark and look wrong when the file is fine —
  that happened with the first frame and I misread it. `node -e` with `scripts/lib-png.mjs` reads
  the actual alpha if in doubt.
- **Is the offset the same at all four corners?** Four different offsets reads as sloppiness
  rather than as a print effect. This is the detail the whole idea rests on.
- **Is the edge hairline dead uniform?** Anything that varies along a side will smear when
  stretched.
- **Do the brackets stop short of the corner point?** Touching corners lose the crop-mark
  reference and it becomes an ordinary box.
- **Any lettering?** Reject. Every other prompt on the project forbids it and the card sets its
  own type.

Drop it in as `card-frame-b.png` and tell me. I will wire it behind a one-line switch so both
frames can be seen on a real card and picked side by side, and re-measure the slice — the
brackets will almost certainly want a different value from the Greek key's 140.

## If you would rather go a different direction entirely

Two other modern options, if crop marks are not it:

- **Swiss rule frame.** No corners at all: one thick bar across the top edge only, one hairline
  along the bottom, nothing on the sides. Extremely modern, very quiet, and the easiest of all
  to stretch because three of the four edges are empty.
- **Notched capsule.** A single continuous rounded-rectangle rule with a squared notch cut out
  of the top-left corner, like a punch card or a ticket. Reads contemporary and slightly
  technical, and the notch gives it one memorable detail without needing ornament.

Say which and I will write it.
