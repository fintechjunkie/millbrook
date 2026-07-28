# Build decisions

Choices made during the build that are not obvious from the code, with the
measurement or reasoning behind each. Deviations from the build brief are
listed last and each one says why.

---

## Typeface: Arial, body set by container query

Arial, per the build brief. The brief said to ask rather than substitute if a
better licensed match for the graphic-novel register existed, so it was
compared rather than accepted on faith.

Method: Volume 1 spread 8 rendered verbatim at true page size. That page is the
densest in the four volumes at 336 words and carries all three type styles, a
`###` section heading, body, and the italic closing line. A face that survives
it survives the other 32.

| Face | Ceiling before the worst page overflows a 900px page |
|---|---|
| Arial | 14.25px |
| Barlow | 14.75px |
| Libre Franklin | 14.0px |

Below 14px all three produced **identical line counts**, so fit was not a
differentiator at all and the choice was purely aesthetic. Arial won on the
brief's own instruction plus the fact that it is a system font: no webfont
ships, no FOUT, and no build-time fetch that a locked-down network could fail.

**Type size here is determined, not chosen.** The prose is verbatim and cannot
be shortened, so the densest page sets the size for all 33. This is the reverse
of the Unbroke project, where copy was written to fit a chosen size.

## Body type is sized against the page, not the viewport

`clamp(12px, 1.58cqh, 16.5px)`, with `container-type: size` on the page.

Extraction 6.3 calls Unbroke's `vh` sizing a workaround for a missing container
query, and it is right: what constrains the prose is the height of the *page*,
and page and viewport only coincide while the book is sized directly from the
viewport. Sizing against the page means type fits by construction and keeps
working if a reader is ever embedded in a column, a modal, or a print preview.

Note that container query units resolve against the container's **content box**,
so page padding is already excluded. On a 990px page that yields 14.76px.

## Text pages scroll rather than clip

`overflow-y: auto` on the prose flow, never `hidden`.

Extraction 6.4 documents silent clipping as the failure mode with no symptom:
no dev warning, no test failure, nothing in the build output. Unbroke survived
it because its copy was written to fit. This prose is verbatim, so losing the
end of a paragraph is not an acceptable failure and scrolling is strictly
better.

Measured threshold, from `/checks/overflow`:

| | |
|---|---|
| Every page fits at viewport height | **≥ 855px** |
| Pages needing more than 768px | 12 of 33 |
| Pages needing more than 900px | 0 of 33 |
| Pages that never fit at any size | 0 |
| Hardest page | vol1 spread 8, needs 855px |
| Easiest page | vol4 spread 9, needs 600px |

So a 1080p or 1600×900 display shows every spread whole. A 1366×768 laptop
scrolls 12 of the 33 text pages. **This is worth an explicit call:** if that
laptop is a supported target, the options are a smaller type floor, a
re-chunking of the longest pages, or accepting the scroll. Re-chunking is an
author decision and changes the spread map, so nothing was done silently.

## Paragraphs are indented with no vertical gap

The fiction idiom rather than the article idiom. On a page carrying twenty-two
paragraphs, as Volume 1 spread 8 does, this is worth roughly 170px of height,
which is the difference between fitting and not.

Single column, not the two balanced columns Unbroke used. Its pages were nearly
square, where a single column would run too wide to read; these pages are 2:3
portrait, which is literally book-shaped, so one column is both correct and
what the format wants.

## The turn is a reducer, and the animation is decoration

Extraction 6.5: Unbroke coordinated one state machine with six mutually-patching
refs, every one of which existed to work around a stale closure, and the bug
that produced was user-visible — two clicks advanced one page.

Here `turning` is derived from `anim`, the queue is one field, and no ref
mirrors state. `pos` moves immediately and the base layer already shows the
destination, so the sheet is decoration flying over a change that has already
happened. Nothing waits on `animationend`, which is the deadlock 6.6 describes:
reduced motion, `display: none`, and background tabs all stop that event firing.
A timer ends the turn; `animationend` also dispatches and the reducer makes it
idempotent, so whichever arrives first wins and neither is required.

Verified: two keypresses 40ms apart advance two spreads, not one.

## No act layer

Extraction 6.13 recommends dropping it where a book has no interstitials. These
volumes have chapter openers, which are spreads in their own right rather than
dividers. One leaf is one spread, which removes the counter/position mismatch
Unbroke carried, where the counter counted spreads while the position indexed
leaves.

## Paper colour is not welded to the artwork

Unbroke batch-remapped 134 plates so their baked-in paper ground met the page
with no seam, which made the page colour effectively immutable and meant any
plate from another source needed processing first (extraction 6.14).

Millbrook images are framed rectangles sitting on the page rather than
compositions bleeding into it, so `paper.stock` stays a one-line change.

## Next.js 14.2.35, not 14.2.0

Unbroke pins 14.2.0, which carries a published security advisory. Same minor
line so every pattern in the extraction doc still applies, minus the
vulnerability.

---

# Deviations from the build brief

**Images live in `public/images/`, not `patch-notes/images/`.** Forced by the
framework: Next.js only serves static assets from `public/`. Everything the
brief actually asked for holds — one flat directory, filenames are slugs, no
subdirectories, and dropping a file in updates the book with no code change and
no build step.

**The readers are routes, not four `.html` files.** The brief's target layout
(`vol1.html` … `vol4.html`, `src/`) describes a static site. The stack decision
was Next.js on Vercel to match the other projects, so the four readers are
`/patch-notes/vol1/read` … `/vol4/read`, each prerendered to static HTML by
`generateStaticParams` and `force-static`. They still open and read
independently, which was the requirement.

**A real stylesheet from the first commit.** Extraction 6.1 is explicit that
inline-styles-only was the wrong constraint and that it leaks: it cannot express
a keyframe, a media query, or a pseudo-class, so the rule produced a CSS file
anyway containing exactly those things, and it forced the JS breakpoint in 6.2.
Adopted the recommendation rather than the practice.

**The JS breakpoint is kept, narrowly.** 6.2 is right that it paints one wrong
frame on a phone. It stays because crossing 900px changes the *object* rather
than reflowing it: a leaf becomes two swipes instead of one, which is
navigation state and not something CSS can express. Everything merely visual is
done in CSS against the page container.

**`?spread=N` deep links flash the opener.** Read on the client after mount to
keep the route static, so a shared link paints spread 0 and then jumps.
Extraction 6.11 notes a route segment would be static *and* correct. Left as
noted rather than fixed.

---

# Still open

Four author decisions in section 1 of the roster block the character lock, and
therefore all 37 spread images:

- **1.1** Vex's design — prose version (white hair, cat-ear aviator cap) or reference sheet version (mint-green buns)
- **1.2** Goggles assigned to Pip only
- **1.3** The single em-dash in Volume 4
- **§2** The style block, currently marked PROPOSED, NOT APPROVED

Not blocking: the readers, which run on labelled placeholders by design.
