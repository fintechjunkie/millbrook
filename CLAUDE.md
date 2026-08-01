# Millbrook — working notes for Claude

Loaded at the start of every session in this repo. Standing conventions and decisions
live here so they do not have to be restated.

---

## "Enter edit mode"

When the author asks to **enter edit mode**, or anything that means it — *let me edit the
text*, *I want to fix some wording*, *open the editor* — do all of this without being
asked for the steps:

1. Start the dev server via the preview tooling using the `millbrook` launch config, if
   it is not already running. `npm run dev` is the right script because it also starts
   the spec watcher; `next dev` alone does not.
2. Run `npm run smoke` and confirm all routes return 200 before handing it over. A
   broken server looks identical to a cached page from the author's side, and that
   confusion has cost real time.
3. Open the reader at the volume they named, or Volume 1 if they did not name one:
   `http://localhost:3000/patch-notes/vol1/read`
4. Turn edit mode on for them rather than telling them where the button is.
5. Tell them, in one line: which volume and spread is open, that paragraphs are
   editable, that the fill meter is live, and that blurring a paragraph saves it.

**What edit mode can and cannot do.** It edits existing paragraphs in place. It cannot
add or delete paragraphs, and it cannot move text between pages. Page boundaries stay a
spec-file job, because moving one changes which beat an image is allowed to depict and
the spoiler check has to be re-read by hand.

---

## The prose pipeline

Markdown spec → `volumes/vol*.json` → imported by the reader. Nothing is edited in the
JSON; it is generated and should never be hand-touched.

- `npm run dev` — dev server **plus** the spec watcher. Always prefer this.
- `npm run text` — recount prose and update the declared word counts. Run after editing
  prose by hand outside the watcher.
- `npm run parse` — verify. Fails loudly if a declared count disagrees, which is how a
  mis-sliced page boundary gets caught.
- `npm run smoke` — every route, expecting 200.

**The declared word count is a tripwire, not bookkeeping.** Do not make `parse` repair
it silently. Two commands for two cases is the point.

---

## When a new image lands: `npm run images`

**Every time art is added to `public/images`, run `npm run images` and commit
`public/images/derived` along with the master.** That is the whole obligation. It is
incremental, so one new plate costs one encode and a few seconds, and running it when
nothing has changed is free.

Why it matters: the masters are ~3MB lossless PNGs, which is the wrong container for a
painterly illustration. The script writes WebP siblings at 400/800/1200/1600 (skipping
any rung at or above the source width, plus one at full width) and `Plate` serves them
through `<picture>`. Measured on the delivered arc: the landing page went from 14.6MB
of images to 348KB, and a page turn from 2973KB to 178KB.

- `npm run images` — build what is missing or stale
- `npm run images -- --force` — rebuild everything
- `npm run images:check` — name anything missing or stale, exit 1

**`prebuild` runs `--check`, so a production build FAILS if art was added without
derivatives.** Same discipline as the word count: it refuses rather than silently
repairing itself, because the silent repair would mean shipping 3MB masters to readers.

Three things worth knowing before changing any of it:

- **Forgetting to run it is safe.** `Plate` reads `lib/millbrook/derivatives.json` and
  emits `<picture>` only for slugs listed there, so an unprocessed image renders
  exactly as it did before any of this existed — the PNG, straight from `src`.
  This is not politeness, it is necessary: `<picture>` does not fall back on a 404. It
  picks a `<source>` on type and media alone, so a guessed `.webp` path would turn
  every newly-dropped plate into a broken image until someone remembered the command.
- **`sizes` is load-bearing and belongs to the CALLER.** It is a promise about drawn
  width made before layout exists, and it alone decides which file is fetched. One
  value cannot serve a half-spread plate, a quarter-width shelf card and a full-bleed
  banner: the first attempt used the plate's everywhere and a cover that draws at
  267px cheerfully downloaded the 1600px file. Use the `SIZES` map in `Plate.js`.
- **`sharp` is a devDependency and is only needed to AUTHOR derivatives.** They are
  committed, so building and deploying needs nothing installed and no runtime image
  loader. Do not reach for `next/image` — it would add a runtime loader and mean
  rewriting the broken-image handling in `Plate.js`, which is load-bearing and cost
  real time to get right.

**`/checks/overflow` cannot be trusted in a non-compositing preview pane.** It measures inside
a double `requestAnimationFrame`, which never fires while the page is not painting, so every
row sits at `—` forever and the table looks broken rather than pending. To measure fill without
it, walk `[data-mb-page][data-mb-kind="text"]` and read each `[data-mb-flow]` with `flex`
temporarily set to `none` — a stretching flow box reports `scrollHeight === clientHeight`, so
overflow silently reads as zero otherwise.

**Use `/checks/fill` instead — it answers the same question and works in the pane.** It renders
every text page of every volume into a faithful copy of the page box and measures with
`setTimeout`, at both 604px and 696px. Read the whole-book effect of a type change there, then
load the individual spread for a verdict; it is documented as running a couple of points
optimistic. **Read `clientHeight` AFTER restoring `flex`, never while it is `none`** — a
released box shrink-wraps its own content, so both numbers become the same and every page
reports exactly 100%.

**That recipe depends on the flow being a COLUMN flex item, so never wrap it in a row.**
`flex: none` releases the flow on whichever axis its parent runs. In a column that is the
height, which is the point. In a row it is also the WIDTH, so the column shrink-wraps, the
text reflows narrower and taller, and every page reads about nine points fuller than it is —
vol1 spread 1 measured 100% against a true 91%. A wrapper around the flow is fine; a wrapper
that forgets `flexDirection: 'column'` quietly corrupts every fill number on the project,
including `FillMeter` and `/checks/overflow`.

---

## The reader on a phone

**Below `geometry.breakpoint` the prose page SCROLLS, and that is the design rather than a
failure to fit.** Desktop fit is a guarantee from arithmetic: body type is `1.95cqh` of a
**square** page, so type and column scale together and one coefficient holds at every
viewport. A phone page is about 0.51, that guarantee breaks, and `clamp`'s 12px floor binds —
at which point type stops shrinking while the column keeps shrinking, so fill gets strictly
**worse** as the phone gets smaller. Measured before the change: 130% on vol1 spread 1 at
384×831, 154% at 384×683, and 16 of the 38 text pages over their column.

So compact stops defending a fixed page. `type.bodyCompact` sizes in `vw` against the
measure, not in `cqh` against a height that no longer constrains anything, and the type went
UP — 12px to 15–16.4px, at about 41 characters a line. Every page is now one gentle scroll
(1.0–1.9 screens). Do not "fix" a compact page by shrinking type; there is nothing to fit.

Three things follow, and each was a bug first:

- **`svh`, never `vh` or `dvh`.** `100vh` on iOS is the viewport with the URL bar retracted,
  so it hides the book's own foot behind the bar. `dvh` tracks the bar and would resize the
  book mid-swipe. `svh` is the smallest viewport: stable, and never clipped.
- **The compact book takes its height from the flex line, not from `chromeReserve`.** That
  constant is wide-only. It had to agree with the real height of two chrome bars and a guide,
  and did not — the bottom bar wraps to two rows on a narrow phone and grows again at the end
  of a volume, where a "Part Four →" link replaces the arrow.
- **`readerPad.compact*` are floors, not answers.** The real padding comes from the measured
  bars, because the bottom bar's contents change with the build: the edit button only exists
  where the server permits writes, so a dev bar is one control wider than a production one.

**Known and deliberately not fixed:** at 1280×720 the wide book overlaps its bottom bar by
9px. Pre-existing, verified against a stash, and the same root cause — but `chromeReserve`
sets the desktop type scale through the page height, so moving it changes fill on all 38
pages. Not worth it for 9px behind a translucent bar that auto-hides.

---

## The reader on a short laptop

**A few pages overflow, and they scroll.** It is the same clamp-floor mechanism as the phone —
type stops shrinking at 12px while the page keeps shrinking — but a handful of pages rather
than sixteen, so the page stays fixed and only the affordance changes.

**Those counts went UP deliberately when the measure narrowed to 34em, and pages that scroll
are now a designed state rather than an edge case.** Current, from `/checks/fill` over all 84
text pages: 4 over at 1440×900, 12 over at 1280×720, worst page vol1-3 at about 106%, which is
40px or roughly two lines. Before Literata and 34em it was 0 and 3. The trade bought every
reader a 70-to-72 character line in place of 83, and it was only affordable because the three
affordances below already existed. Do not treat a page over 100% here as a regression to
chase; check it against `/checks/fill` and decide whether it is the one you meant.

Three things say so, and **every one of them is an overlay or a behaviour, never layout**:
a fade at the foot of the column, a `More ↓` button that scrolls one screenful, and vertical
keys (Space, PageDown, ArrowDown) that scroll while anything is unread and turn the page once
it is not. Left and right arrows stay pure page turns.

- **Do not add an always-visible scrollbar.** It is the obvious fix, macOS overlay scrollbars
  are genuinely why the reader could not see the affordance, and it cannot be used: a classic
  scrollbar takes 10px of layout width, which feeds back into the overflow measurement that
  decides whether to show it. The full reasoning and the numbers are in `globals.css` beside
  where it was removed.
- **Do not key page CONTENT on the scroll state** for the same reason. Showing the terminal
  mark because a page scrolls made the page taller, which made it scroll: spread 4 went 98%
  to 102% and a page at 93% held an affordance it had not earned. `hasRoom` is safe to key on
  only because it excludes the mark from its own measurement.
- **The at-the-end tolerance is proportional, not fixed.** A flat 24px is bigger than a small
  overflow, so vol3 spread 4's 7px page was called finished before it started and showed
  nothing while clipping a third of a line. `scrollEdges` in `SpreadPage.js` is the single
  definition; `FlipBook` imports it rather than restating it, because the keys and the button
  disagreeing about whether a page has more text is the exact bug being fixed.

---

## Typography: two decisions that were reversed

Both of these are written down elsewhere in their original form, so a future session that
reads only the old note will helpfully undo them. They were reversed on measurement.

**There is a webfont now, and `docs/DECISIONS.md` says there is not.** The book is set in
Literata, vendored as two woff2 files in `app/fonts` and loaded by `next/font/local`. The
original objection was never to a webfont; it was to `next/font/google` fetching at build
time, which a locked-down network fails (extraction gotcha 7). Local files have no fetch, so
the constraint still holds. What forced it: `Charter, "Iowan Old Style", Georgia, serif`
rendered as Charter on macOS and Georgia everywhere else, and Georgia is 9% wider — the
project was shipping a 76-character line to Macs and an 83-character one to everyone else.

**An `em` measure cap does NOT make character count face-independent, and a comment in
`series.js` used to say it did.** The cap fixes the column in ems; how many characters fit
depends on the face's average advance. Arial and Georgia happen to land a character apart,
which is what made the claim look true and is why the wide-face problem stayed invisible for
four volumes. Measured at 12.6px in the same column: Georgia 83, Charis SIL 82, Literata 78,
Source Serif 4 77. Compare faces in `/checks/type`.

**Apparent size is x-height, not font-size.** Every candidate above renders at the identical
px. Literata was chosen over Source Serif partly because its x-height is 6.39px against 5.98px
at the same size — it reads a size larger while costing less fill.

---

## The reader's type size is the reader's

**`typeScale` in `series.js` is a multiplier the reader sets, and both body rules are
`calc(clamp(...) * var(--mb-type-scale, 1))`.** Five stops, persisted in `localStorage`, behind
the `Aa` control in the bottom bar.

- **The clamp FLOOR has to scale too, not just the preferred term.** At 1280×720 the 12px floor
  is already binding, so a control that scaled only the middle value would do nothing on
  exactly the machines whose readers most want it.
- **Edit mode pins the scale to 1 and hides the control.** `FillMeter` is an authorial
  tripwire and has to mean the same thing every time it is read; a reader's 1.3 would turn
  every page red and invite re-cutting pages that were never over.
- **A change of scale must be a React dependency, never left to the ResizeObserver.**
  `useScrollEdges` and `useHasRoomForTerminal` both take the scale as a `revision` argument for
  this reason alone. Observers do not fire reliably in a non-compositing pane, and a stale
  answer here means a page that scrolls with no fade and no `More ↓`.
- **The boot script in `app/layout.js` applies it before first paint**, which is why `<html>`
  carries `suppressHydrationWarning` — React finds a `style` attribute the server never sent,
  and that mismatch is the feature.

---

## Hard-won rules

**Never take a text file apart and reassemble it to change a few characters.** Splitting
on `\n` and rejoining with the file's own line ending appended a stray carriage return on
every run and corrupted three specs. Use one surgical regex, and guard by refusing to
write if the line count moved.

**"I checked the DOM" is not "the server can render this."** `next lint` does not
evaluate modules, so an import-time `ReferenceError` is invisible to it, and a DOM probe
can pass against a bundle compiled before the edit. Trust `npm run smoke` and served
HTML over the browser console, whose log is a retained buffer and will keep reporting
errors that no longer exist.

**Anything driven by the browser's rendering steps is frozen in a non-compositing pane, and
each one fails as a plausible-looking bug rather than as an error.** `requestAnimationFrame`
is the known case; two more cost real time on the mobile work.

- **A CSS transition never advances.** `getComputedStyle` returns the value it started
  from, so an element with an inline `opacity: 1` and a 200ms transition measures **0**.
  That reads exactly like a broken hook. Clear `transition` before believing the number.
- **A `ResizeObserver` callback is not guaranteed to have fired.** It missed a chrome bar
  growing from 51px to 86px, which put the last page 19px under it. Never let a correctness
  fix depend only on an observer: key the measurement off React state that changes for the
  same reason, and keep the observer as belt and braces.
- **`scroll` events are not delivered either**, including from a programmatic `scrollTop`
  assignment, and `scrollBy({behavior: 'smooth'})` never advances — `scrollTop` stays where
  it started. To exercise scroll-dependent state here, set `scrollTop` and then dispatch a
  `resize`, which does fire; a `setTimeout` also fires where `rAF` does not.

**Measure a page on a clean load, never straight after a page turn.** Walking a volume with
synthesised arrow keys and measuring between turns reports fills that are simply wrong —
vol3 spread 6 read 102% that way and 98% on a direct load of `?spread=6`, and the same sweep
disagreed with itself about which pages overflow. A page mounts while the turning sheet is
still in flight, so anything measured inside about 700ms is measuring a box the reader never
sees. Sweeps are fine for invariants that do not depend on exact height (chrome overlap,
document scroll); for fill, load the spread.

**Never colour-key a background out of a character plate.** The canonical sheets are RGB
with no alpha and a flat sandy ground of `rgb(238,221,197)`. Owen's ivory outfit measures
`rgb(231,212,185)` — a maximum channel difference of **twelve**, so no tolerance separates
them, and a flood fill travels straight through his clothes and punches alpha 0 through
his jacket. Pip's cream overalls and Felix's pale sneakers are the same trap. When a
portrait has to sit on a panel, set the panel to `--portrait-ground` so the image's own
ground and the panel agree, and there is no rectangle left to see.

**Read the alpha channel before believing a preview.** The card frame looked opaque with a
violet glow and a dark centre; decoding it showed alpha 0 across the whole middle. The
viewer was compositing RGB behind an opaque background. `scripts/lib-png.mjs` decodes type
2 and type 6 with no dependency — use it rather than guessing from a thumbnail.

**Check `git status -sb` when the author cannot see a change.** Local commits were once
16 behind the remote for a whole session.

**Verify against the canonical image, not the written description.** The lock file's prose
and its own lineup image disagreed for Owen's eyebrows, all three girls' hair, and
Monke's colour. Section 1 of the lock resolves it: the lineup controls. In every case the
delivered artwork was right and the roster text was wrong.

---

## Prose style

**Writing a new chapter: read `patch-notes/specs/WRITING_GUIDE.md`.** It is the single
forward-looking document — register, the six characters and how each sounds, the measured page
budget, canon, spoiler discipline and a pre-flight checklist. Every number in it is measured
off the delivered arc.

`patch-notes/specs/PROSE_STYLE.md` is the *derivation record* behind that register: how it was
found by diffing the author’s own edits, what was rejected, and what the revision cost. It is
history rather than instruction. All four volumes are already in the register, so do not write
from PROSE_STYLE and do not update it for new work.

The short version: fewer fragments, joined into sentences; adjacent sentences get an explicit
connective; definite articles restored; simpler diction; implied things said out loud; warmer
dialogue. Curly apostrophes in prose, always.

**The one rule to apply with judgement** is "implied things get said". It is the author's
style and it is also the rule most able to cost the book something, because the beats the
original left implied were often its best. Each time, ask whether the gap was a gap or a joke.

## Standing authorial instructions

- **Character-forward.** Prefer a plate with faces doing something over an empty room.
  Volumes 1, 3 and 4 were each rebuilt on this basis. Shot-mix bands were re-set to match
  rather than logging further exceptions.
- **Warehouse scenes must not be too dark.** See roster section 6.1a. Enforced in the
  negative block. One named exception: `vol1-s03`.
- **Green skin means a character is sick.** Never a base tone.
- **Wardrobe may change between arcs.** Identity lives in the immutable block, clothing
  in the wardrobe table. New arc, new wardrobe letters — never rewrite existing ones,
  because delivered plates depend on them. See roster section 5.1.
- **Prompts must attach real reference files.** A prompt claiming a reference that does
  not exist is how Felix drifted for a whole volume.
- **Every arc gets its own tinted band, and a new arc takes the next one from `ARC_BANDS`.**
  A volume card is paper on a near-white shell, which measures 1.02:1 and leaves the cards
  with nothing to sit against. The bands are set at about 1.4:1 against paper — short of the
  reader's 1.77 on purpose, because the landing page has to stay airy. Muted text on a band
  uses `ui.textOnTint`, not `ui.textMuted` or `ui.textFaint`; both were measured and the
  faint step fails outright at 2.6:1.
- **Do not print a production status to readers.** "Arc One · in production" read as "come
  back later" on an arc that is finished. `status` renders only when set, and it is set only
  on an arc that genuinely has not been written.
