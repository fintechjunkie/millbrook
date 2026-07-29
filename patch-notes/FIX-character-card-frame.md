# Character card frame

One image. It becomes the border around every character card on the landing page.

Save as: **`card-frame.png`** in `public/images/`

---

## Why it is built this way, because the geometry is not negotiable

CSS draws this with `border-image`, which slices the PNG into nine pieces: four corners
that stay fixed, four edges that stretch or repeat, and a centre that is thrown away. That
only works if the file is built to those rules, so three things matter more than anything
decorative:

1. **Square canvas, 1024 x 1024.**
2. **The frame occupies exactly the outer 20 per cent on every side.** So the ornament
   lives in a 205px band around the edge, and the middle 60 per cent — a 614px square in
   the centre — is **completely empty and fully transparent**. That centre is discarded,
   so anything drawn there is wasted.
3. **The four edge runs must be uniform along their length**, because they get stretched
   to fit cards of different heights. A pattern that repeats or is plain will survive
   being stretched. A single motif centred on one edge will be smeared.

Transparent PNG. No background colour, no paper, no drop shadow behind the frame.

---

## The prompt

```
A decorative rectangular border frame, drawn as a single flat ornament on a fully
transparent background, in the style of a printed collector card or a cigarette card from
the 1930s.

STYLE: Matte, slightly fibrous paper-cut finish with clean cut edges, matching a layered
paper-theatre aesthetic. Hand-drawn rather than mechanically perfect: the line weight
varies very slightly, the way a woodblock or letterpress rule does. No gloss, no gradient,
no bevel, no 3D shading, no drop shadow.

COLOUR: Exactly two colours. A deep violet-indigo (#6B52C8) for the main rule work, and a
warm off-white paper tone (#F4EFE6) for the thin inner hairline only. Nothing else.

COMPOSITION, and this part is a technical requirement rather than an aesthetic one:
- Square canvas.
- The ornament occupies ONLY the outer 20 per cent of the canvas on all four sides,
  forming a band around the edge.
- The centre 60 per cent of the canvas is COMPLETELY EMPTY and fully transparent. No
  ornament, no wash, no texture, no faint pattern. Nothing at all.
- The frame is a closed rectangle: all four sides present, all four corners joined.

THE CORNERS: each of the four corners carries a small ornamental flourish — a simple
squared spiral or a stepped geometric corner block, sized to sit inside its own corner
square and not to creep along the sides. The four corners are identical, mirrored so the
ornament always turns inward.

THE FOUR EDGE RUNS, between the corners: a plain double rule — one thicker outer line and
one much thinner inner line with a small gap between them. The run must be UNIFORM and
CONTINUOUS along its whole length, with no motif, no centrepiece, no cartouche, no crest
and no break in the middle of any side. This is deliberate: the edges are stretched to fit
different card sizes and any single feature placed mid-edge will be distorted.

MUST HOLD, these override anything above that appears to contradict them:
- The centre 60 per cent of the image is entirely transparent and entirely empty.
- No lettering, numerals, words or symbols anywhere in the image.
- No motif, emblem, crest or ornament at the midpoint of any of the four sides. Corners
  only.
- All four sides are present and the rectangle is closed.
- Exactly two colours, flat, with no gradient or shading.
- Transparent background, not white.
- No characters, no figures, no scenery, no objects.
- No outer drop shadow and no glow.

Aspect ratio: 1:1
```

---

## What to check before accepting it

Hold it to these four and it will drop straight in:

- **Is the middle actually empty and actually transparent?** Open it and look. A white
  centre instead of a transparent one is the most common failure and it will paint a white
  block over every card.
- **Is each side plain along its whole run?** Anything decorative in the middle of a side
  will stretch into a smear.
- **Are all four corners there and joined up?** An open rectangle reads as a mistake.
- **Any lettering at all?** If so, reject it. Every other prompt on the project forbids
  lettering and this one is no exception; the card sets its own type.

Drop it in `public/images/` under that exact filename and tell me — I will wire the
`border-image` slice, keep the current double rule as the fallback until it exists, and
check it against a short bio and a long one so the stretch is tested at both extremes.

## If the frame comes back good but too heavy

Say so rather than regenerating. The frame's weight and inset are CSS numbers once it is
in, so it can be thinned, pulled further out from the text, or lightened in opacity
without another generation.
