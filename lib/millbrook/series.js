// ============================================================
// Millbrook design constants.
//
// One place for anything reproduced across the four volumes, so a change is
// one edit rather than a search. The equivalent of Unbroke's series.js, with
// the differences noted where they are deliberate.
// ============================================================

/**
 * The shell, and why it is light.
 *
 * This was a dark theme: a near-black plum surround (#201E24) with cream pages
 * floating in it. The reading feedback was that the site felt dark and the earthy
 * tones were too heavy, and both are fair. A dark surround makes a book of
 * illustrated children's-adventure prose read as a cinema rather than as a shelf,
 * and it flattens every warm tone in the artwork by putting it next to black.
 *
 * So the surround inverts. `bg` is a warm off-white a few points DEEPER than the
 * paper, which is the whole trick: the page still reads as an object resting on a
 * surface, but the surface is daylight instead of a dark room. Nothing is pure
 * white anywhere — the warmth is what keeps it from reading as a web app.
 *
 * `bgSunk` is for bands that need to recede from the shell (the reserved arc), and
 * `bgRaise` for anything that should sit slightly above it.
 *
 * `accent` DARKENED rather than brightened, which is the counter-intuitive part.
 * #6B52C8 was chosen to glow against near-black; on a light shell the same violet
 * fails contrast against paper as small text. #5B3FC4 carries 7.1:1 on the shell,
 * so it works as a link colour and a kicker rather than only as a glow.
 */
export const color = {
  bg: '#F7F4EE',
  bgSunk: '#EDE7DB',
  bgRaise: '#FCFAF5',
  ink: '#2A2530',
  inkSoft: '#6A6270',
  accent: '#5B3FC4',
  // The old dark ground, still needed in the two places where a dark field is
  // correct rather than incidental: behind a full-bleed chapter opener, and under
  // a modal scrim. Named so nobody mistakes it for the shell again.
  dark: '#201E24',
};

/**
 * The reader gets its own, deeper ground. The landing page does not.
 *
 * Taking the whole site light was right for the landing page and wrong inside a book. A
 * spread is cream paper at #FBF8F2; the light shell is #F7F4EE. Four points apart, which
 * measures 1.03:1 — no separation at all, so the page had nothing to sit against and the
 * book stopped reading as an object.
 *
 * `bg` here is 1.77:1 against paper, which is a clear surface distinction rather than a
 * dramatic one. The choice of colour is the interesting part: the obvious move is a warm
 * putty, and that is exactly the earthy heaviness the feedback was about in the first
 * place. A desaturated near-neutral grey does the opposite — it makes the cream read
 * WARMER and brighter by contrast, the way a gallery wall does, while itself reading as
 * no colour at all. It is a photographer's grey card, not beige.
 *
 * The muted text steps are darker than the landing page's, and that is required rather
 * than tidy: `ui.textFaint` measures 2.36:1 on this ground and fails. Every value below
 * was checked against #C4BEB3 — ink 7.4, muted 5.1, faint 3.4, accent 3.8.
 *
 * Tune `bg` and the two chrome veils together; they are the same colour by definition.
 */
export const reader = {
  bg: '#C4BEB3',
  chrome: 'rgba(196,190,179,0.94)',
  chromeFade: 'rgba(196,190,179,0)',
  text: '#2A2530',
  textMuted: '#4A4352',
  textFaint: '#635C6E',
  rule: 'rgba(42,37,48,0.18)',
  ruleStrong: 'rgba(42,37,48,0.32)',
};

/**
 * Interface tokens, in one place because they moved together.
 *
 * On a dark shell every rule, border and muted label was some opacity of PAPER
 * over dark. On a light shell every one of them has to be some opacity of INK over
 * light, and there were 59 of them written out by hand across eight files. That is
 * the kind of spread that guarantees three get missed and produce a nearly
 * invisible cream hairline on cream.
 *
 * Opacities are not simply inverted. Ink on light reads considerably stronger than
 * paper on dark at the same alpha, because the eye is more sensitive to a dark mark
 * on a light field, so every value here is lower than the one it replaces.
 */
export const ui = {
  // Text, three steps down from the ink of the prose.
  text: '#2A2530',
  textMuted: '#5E5768',
  textFaint: '#857D91',
  // For muted text on an ARC_BANDS tint rather than on the near-white shell, and it is a
  // separate token because the two grounds genuinely allow different values: textMuted
  // measures 4.61:1 on the sand band, which scrapes past AA at a size where it should not
  // have to, and textFaint measures 2.6:1 and fails outright. Same reason `reader` carries
  // its own darker steps for its own deeper ground.
  textOnTint: '#4A4352',
  // Small uppercase labels that were pale violet on dark.
  kicker: '#5B3FC4',
  // Rules and borders.
  rule: 'rgba(42,37,48,0.13)',
  ruleSoft: 'rgba(42,37,48,0.07)',
  ruleStrong: 'rgba(42,37,48,0.24)',
  // The reader's fixed chrome, which fades to nothing over the shell.
  chrome: 'rgba(247,244,238,0.94)',
  chromeFade: 'rgba(247,244,238,0)',
  // Shadows. Softer and warmer than on dark: a hard black shadow on an off-white
  // ground is the single fastest way to make a light theme look cheap.
  shadow: '0 1px 2px rgba(58,48,38,0.07), 0 10px 30px rgba(58,48,38,0.10)',
  shadowLift: '0 2px 4px rgba(58,48,38,0.10), 0 22px 48px rgba(58,48,38,0.16)',
};

// Paper.
//
// Unlike Unbroke, this value is NOT welded to the artwork. Its plates were
// batch-remapped so their baked-in paper ground met the page with no seam,
// which made the page colour effectively immutable (extraction 6.14).
// Millbrook images are framed rectangles sitting on the page rather than
// compositions bleeding into it, so paper stays a one-line change forever.
//
// Lifted with the shell, but NOT to near-white, and the stopping point is measured
// rather than taste. The plates carry their sandy ground baked in at around
// rgb(238,221,197), and `GraphicPage` letterboxes them against paper, so every point
// paper moves toward white widens a seam that shows on all 33 image pages. Paper was
// 33 points off that ground in blue; #FBF8F2 takes it to 45, which still reads as a
// framed picture on a page. #FDFBF7 would have made it 50 and started to read as a
// picture pasted onto a different stock.
//
// So the brightening the shell needed comes mostly from the shell. Paper only has to
// stop looking beige BESIDE it, and eight points does that.
export const paper = {
  stock: '#FBF8F2',
  stockEdge: '#F2ECE0',
  rule: '#DED5C4',
  ruleSoft: '#EBE4D6',
  gutterShadow: 'rgba(40, 38, 44, 0.16)',
};

// The turn. 520ms, the timing the other project settled on: fast enough to
// feel responsive, slow enough to read as physical.
export const turn = {
  ms: 520,
  ease: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
  reducedMs: 120,
};

/**
 * The shelf-to-book opening, staged.
 *
 * The first version ran the whole thing in 460ms and read as a glitch rather than an
 * effect: too fast to register as motion, so the eye only saw the before and after and
 * assumed something had gone wrong. Opening a book is a deliberate gesture and the
 * animation is allowed to take deliberate time.
 *
 * Staged rather than one long tween, because a single long ease reads as sluggish while
 * the same time split into named beats reads as intent. Lift is the cover coming off the
 * shelf, grow is the book opening, morph is the cover becoming the page, hold is the
 * beat that lets you look at it.
 *
 * **There used to be a fourth beat and removing it was the fix.** An earlier version
 * dissolved the cover into the chapter opener mid-flight, on the theory that landing on
 * an identical image would hide the hand-off. It did, but it bought nothing: the reader
 * shows that same opener with the chapter title set over it, so the sequence became cover
 * to opener to opener-with-text, and the middle state was a step that changed almost
 * nothing. Three visual states where two would do.
 *
 * So the cover stays a cover for the whole flight, gets a long hold because it is the
 * part actually worth looking at, and then leaves by swinging open about its left edge —
 * which is what a cover does, and what the page turn inside the book already does. The
 * reader is behind it before the swing starts, so the swing reveals rather than replaces.
 *
 * Tune here. Nothing else hardcodes these.
 */
export const open = {
  liftMs: 300,   // cover rises off the shelf, everything else dims
  growMs: 980,   // grows to the reader's own 2:1 geometry, tipping about its left edge
  holdMs: 820,   // rests on the cover at full size; this is the part worth looking at
  swingMs: 820,  // the cover swings open about its left edge and is gone
};

// The route changes while the cover still covers everything, so the swing reveals a page
// that is already there rather than one that arrives during it.
open.navMs = open.liftMs + open.growMs + open.holdMs;

// Geometry.
//
// A 2:1 spread of two square pages. It went 4:3 (portrait pages) then 16:9,
// and landed here.
//
// Height is the binding constraint on any laptop, so for a fixed viewport
// height a wider spread buys page area for free: the page gets wider without
// getting shorter. That is what made single-column text at a comfortable size
// possible at all.
//
// The size follows from arithmetic rather than taste. Text height needed is
//
//   h = 0.75 * chars * f^2 / measure
//
// so the largest f at which the densest page still fits is
//
//   f = sqrt(available * measure / 1436)      1436 = 0.75 * 1915 chars
//
// On a square page that resolves to roughly 75 characters a line at every
// viewport, because available height and measure both scale with the page. So
// one coefficient holds everywhere and the measure never drifts.
//
// 2:1 also means the four chapter openers, which full-bleed across both pages
// and must match the spread exactly, sit on a clean 2:1 panorama.
//
// Mobile is untouched by any of this. Below the breakpoint a reader gets one
// page at a time and its shape comes from the phone, around 0.51, not from the
// spread. The spread ratio is a desktop-only concern.
export const geometry = {
  spreadAspect: 2,
  pageAspect: 1,
  // At 1320 the cap, rather than the viewport, became the binding constraint on
  // a large display and shrank the page back down. It happened again at 1680.
  //
  // **This cap, not the type scale, is what was making the prose small.** Body size is
  // 1.95cqh against the page, and the page is half the spread, so a spread capped at 1680
  // caps the page at 840 and the type at 16.4px however large the monitor is. The clamp's
  // 22px ceiling was therefore unreachable and the book stayed the same size on a 27-inch
  // display as on a laptop.
  //
  // Raising it is close to free, which is the surprising part. Fill is scale-invariant
  // while the clamp is not binding, because type and column both scale with the page — and
  // it is actually slightly BETTER on a taller page, since the fixed 30px/16px padding and
  // the folio become a smaller fraction of it. Measured on vol2 spread 4, the tightest page
  // in the arc: 840px page, 15.5px type, 99.7% fill -> 1050px page, 19.6px type, 94.6% fill.
  // Bigger type AND more headroom, from one number.
  //
  // Characters per line does not move either, which is the thing that would have made this
  // a bad trade. The measure is capped in em, so it stays 37em and about 64 characters at
  // every page size; the line just gets physically longer, not longer to read.
  //
  // 2100 rather than unbounded: past roughly this width a spread stops being a book held at
  // reading distance and starts being a wall, and the eye has to travel the full 2100px on
  // every line change.
  maxSpreadWidth: 2100,
  compactMaxWidth: 560,
  // This number is the total vertical space NOT available to the spread, and the book's
  // width is derived from it as (100vh - chromeReserve) * 2. So it must be at least
  // readerPad.top + readerPad.bottom + the turn guide's height, or the spread is sized
  // taller than the room it has and its foot slides under the bottom chrome.
  //
  // 115 = 32 top + 48 bottom + 35 guide. It was 112 = 44 + 64 with 4px spare, and adding
  // the guide naively took it to 146 — which cost the spread 34px of height and, at a
  // 720px viewport, pushed vol2 spread 4 from 114% fill to 122%.
  //
  // **The obvious reasoning about why that was safe is wrong, and it is worth writing down
  // because it is convincing.** Body type is sized in cqh against the page, so type and
  // page scale together and a smaller book should leave every fill percentage untouched.
  // That holds only while the clamp is actually tracking cqh. The body size is
  // clamp(12px, 1.95cqh, 22px), and 1.95cqh of a 574px page is 11.2px — below the floor.
  // Once the floor binds, the type stops shrinking with the page while the column keeps
  // shrinking, so fill gets strictly worse. Below roughly a 790px viewport height the
  // floor is what is setting the type, and in that band the spread cannot afford to give
  // up any height at all.
  //
  // So the guide is paid for out of the padding instead, which is slack that was
  // genuinely there. See readerPad.
  //
  // **chromeReserve is a WIDE-only number.** Compact used it too and that was the bug: the
  // compact bottom bar is taller than the wide one and wraps to two rows on a narrow phone,
  // so `100vh - chromeReserve` sized the book taller than the room it had and the page's
  // last 24px sat under the bottom chrome at a 683px viewport. Below the breakpoint the
  // book is now a flex child that takes whatever `main` has left after its padding, so the
  // height is a consequence of the layout instead of a number kept in agreement with it.
  // There is deliberately no compactChromeReserve to drift.
  chromeReserve: 115,
  breakpoint: 900,
  // The reader's own page padding. Exported because the opening transition has to size
  // its clone with the SAME arithmetic the reader uses, and a 0.92 guess put the clone
  // 54px narrower than the book on a 1280 viewport -- enough that the hand-off shifted
  // the picture as well as replacing it.
  //
  // top and bottom were trimmed from 44 and 64 to pay for the turn guide without taking
  // height off the spread, which it cannot spare at short viewports. Both were generous:
  // the fixed crumb bar measures 29px tall, so 32 clears it with room, and the bottom bar
  // is 40px and auto-hides, so 48 clears that too. Between them that is 28 of the 35 the
  // guide needs, and the last 3 come off the spread.
  //
  // The compact pair are what the book's height is now derived FROM, so they are measured
  // against the chrome they have to clear rather than trimmed for slack. The fixed crumb bar
  // measures 63px on a phone, where the volume title wraps under the breadcrumb, and 30 put
  // the turn guide underneath its gradient. The compact bottom bar is 44px once it stops
  // wrapping, so 54 clears it.
  readerPad: {
    inline: 24, top: 32, bottom: 48,
    compactInline: 10, compactTop: 70, compactBottom: 54,
  },
};

// Type.
//
// Two faces: a system serif for prose, Arial for furniture. See `face` below for
// why, and for the measurement that showed the serif costs nothing in fit.
//
// Body size is expressed in cqh, against the page as a container, not in vh.
// Unbroke sized in vh and section 6.3 calls that a workaround for a missing
// container query: what constrains the text is the height of the PAGE, and
// those only coincide while the book is sized directly from the viewport.
// Sizing against the page means the type fits by construction at any viewport
// and keeps working if a reader is ever embedded in a column or a modal.
//
// Single column. Two columns are gone: they were there to rescue a measure that
// a portrait page made unreadable, and a square page does not need rescuing.
//
// 2.1cqh is measured, not derived. The closed form above under-predicts badly,
// because it counts characters and the real cost is PARAGRAPHS: this prose is
// dialogue-heavy, and a line like "He's a monkey." occupies a whole line while
// using a fifth of it. Volume 1 spread 8 carries 23 paragraphs in 336 words and
// is the page that sets the size for all 33.
//
// At 2.1cqh that page fills its column almost exactly and nothing scrolls at any
// desktop viewport. Because both available height and measure scale with the
// page, one coefficient holds everywhere and the measure never drifts.
//
// Consequence worth knowing: page length runs 123 to 336 words, a 2.7x range.
// With the longest page fitting exactly, a median page fills about three
// quarters of its column and the shortest about a third. That white space is
// inherent to the spread map, not a layout bug, and the specs call several short
// pages deliberate. Text stays top-aligned, as in a printed book, rather than
// being centred to disguise it.
/**
 * Two faces, and the split is the point.
 *
 * `body` is the prose. Serif, because that is what a reading tradition looks
 * like: serifed forms give more distinguishable word shapes at a long measure.
 * The face wants a large x-height and sturdy, unambiguous letterforms, because
 * this page runs at 12.6px on a laptop and every fraction of apparent size is
 * doing work. Arial is a signage grotesque; it is competent and it reads as an
 * interface.
 *
 * `utility` stays a grotesque, and that pairing is deliberate rather than
 * leftover. Serif prose with sans furniture is the standard editorial split, and
 * there is a mechanical reason too: a text serif's numerals tend to be old-style,
 * sitting at x-height rather than cap-height. Beautiful in a paragraph, wrong in a
 * page counter, where 08 / 8 wants to line up.
 *
 * **A correction, because the note that used to sit here is wrong and it was
 * load-bearing.** It said that an `em` cap makes the column 37 ems wide whatever
 * the face, so "character count barely moves" — measured as Arial 76 against
 * Georgia 75. The measurement was real and the generalisation from it is not.
 * An `em` cap fixes the column in ems, not the characters that fit in it; that
 * depends on the face's average advance, which varies a lot. Arial and Georgia
 * happen to sit within a character of each other, which is why the pair looked
 * like a law. Measured at 12.6px in the same 37em column on vol1 spread 1:
 *
 *     Georgia          83 characters a line     29 lines
 *     Charis SIL       82                       30
 *     Literata         78                       31
 *     Source Serif 4   77                       32
 *
 * So the face was quietly setting the measure, and the consequence was that the
 * project shipped two different books. Charter renders on macOS and iOS; Georgia
 * renders everywhere else and is 9% wider. 37em is the 76 characters described
 * below on a Mac and 83 on Windows and Android, and 83 is past the readable
 * 45-75 band. Most readers were getting the long one.
 *
 * `body` is now Literata, vendored as woff2 and loaded by `next/font/local` in
 * `app/layout.js` — see there for why a webfont is allowed after all. It has the
 * largest x-height of the four candidates, 6.39px against Georgia's 6.08px at the
 * same 12.6px, so it reads a size larger than it is. Everything after the variable
 * stays as the fallback for the moment before the file lands.
 *
 * `utility` stays a grotesque and stays a system font. The chrome is 8-11px
 * letterspaced caps, where the face barely reads and a second webfont would be
 * most of the payload for none of the benefit.
 */
export const face = {
  body: 'var(--font-book), Charter, "Iowan Old Style", Georgia, "Times New Roman", serif',
  utility: 'Arial, Helvetica, sans-serif',
};

/**
 * The reader's own type size, as a multiplier on whatever the page arithmetic
 * decides.
 *
 * A reading product that cannot change its type size is unusual, and this one had
 * a specific reason: every page had to FIT, and the page is a fixed square, so the
 * size was derived rather than chosen. That reason is now spent. The short-laptop
 * work already built the whole apparatus for a page taller than its column — the
 * foot fade, the More button, and vertical keys that scroll before they turn — so
 * a page that runs long is a supported state and not a failure. Once that is true,
 * the size can be the reader's.
 *
 * A multiplier rather than a set of sizes, so it composes with the existing rules
 * instead of replacing them. `calc(clamp(...) * s)` is the same as scaling each of
 * the three clamp terms, because clamp is monotonic — but only if the FLOOR scales
 * too. That is the part worth stating: on a 1280x720 laptop the 12px floor is
 * already binding, so a control that scaled only the preferred term would appear to
 * do nothing on exactly the machines whose readers most need it.
 *
 * Stops rather than a slider: five is enough to find a comfortable size and few
 * enough to be a row of buttons, and every stop is a value someone chose.
 */
export const typeScale = {
  cssVar: '--mb-type-scale',
  storageKey: 'mb:type-scale',
  stops: [0.9, 1, 1.15, 1.3, 1.5],
  base: 1,
};

export const type = {
  body: {
    fontFamily: face.body,
    // 1.95cqh, down from 2.1. Half a notch smaller buys a disproportionate
    // amount of room, because line count falls with size AND the wider column
    // below takes more words per line. Together they took scrolling pages from
    // 9 to 1.
    //
    // The multiplier is the reader's own setting; see `typeScale`. It defaults to
    // 1 in the var itself, so this rule is unchanged for anyone who never touches
    // the control and for the first paint before the preference is read.
    fontSize: 'calc(clamp(12px, 1.95cqh, 22px) * var(--mb-type-scale, 1))',
    // 1.45 rather than 1.52. Leading is the cheapest height there is: it costs
    // nothing authorial, where the alternative is re-chunking pages, and each
    // new page needs a new spread and a new image.
    lineHeight: 1.45,
    textAlign: 'left',
    // Hyphenation, which is what print fiction does and what this measure now wants.
    //
    // It is the only lever that buys vertical room without taking anything back.
    // Trimming the page's own padding does NOT work: the page is a
    // `container-type: size` box and body type is `1.95cqh` of it, so every pixel
    // freed at the margin is immediately spent making the type bigger. Measured —
    // 12px of padding reclaimed gave 12px more room, 1.8% larger type, and left the
    // worst page one pixel WORSE. Leading works but costs readability, which is the
    // thing the 34em measure was bought to gain. Hyphenation instead packs the line,
    // so it spends the width rather than compressing the height.
    //
    // **Unverified in the preview pane, and shipped anyway.** `hyphens: auto`
    // computes correctly with `lang="en"` on the html element and has zero effect in
    // this Chromium build even at an 18em measure, which means no hyphenation
    // dictionary is installed. It cannot misbehave — a browser without a dictionary
    // renders exactly what it renders today — so the downside is that it does
    // nothing, not that it does something wrong. Confirm in a real browser before
    // recording any line-count win from it.
    hyphens: 'auto',
    WebkitHyphens: 'auto',
    // Guard against the failure mode that gives hyphenation a bad name at a narrow
    // measure: a word must be at least 6 characters, leaving at least 3 before the
    // break and 3 after. That rules out the mean little two-letter breaks and most
    // of the ladder of consecutive hyphens.
    hyphenateLimitChars: '6 3 3',
    // Let the browser look ahead over the whole paragraph when breaking lines
    // rather than greedily filling each one. It costs nothing, needs no markup,
    // and it is the single cheapest thing available here: it evens out the right
    // rag and, most visibly, stops a paragraph ending on a one-word last line.
    // Unsupported browsers ignore it and get today's greedy wrapping.
    textWrap: 'pretty',
    color: color.ink,
    // The measure, and the thing that actually governs readability here.
    //
    // At full page width a square page runs 96 characters a line, well past the
    // readable 45 to 75 band. A cap in em is scale-invariant, so the character
    // count holds at every viewport instead of drifting as the page grows.
    //
    // Raising the font size looked like the fix and is not. It reduces
    // characters per line but multiplies the height needed, so it loses both
    // ways: 17.5px at full width is 81 characters AND overflows 14 pages.
    //
    // 34em. This has now moved three times and the two goals still pull in
    // opposite directions:
    //
    //   wider column  -> more words per line -> shorter text -> fits, but the
    //                    measure gets long and the page can look under-filled
    //   narrower column -> better measure and a fuller page, but it overflows
    //
    // What changed is that the 37em here was never 76 characters for most
    // readers. It was 76 in Charter on a Mac and 83 in Georgia everywhere else —
    // see the correction on `face` above. The cap was set from the narrow case
    // and delivered to the wide one.
    //
    // Re-derived against Literata over all 84 text pages in the eight volumes,
    // via `/checks/fill`, at a 696px page — what a 1440x900 laptop renders:
    //
    //             characters   pages over 100%   worst page
    //     37em    78            0 of 84           ~92%
    //     35em    73-74         3 of 84           104%
    //     34em    70-72         4 of 84           107%
    //
    // 34em. 35em is the same idea one notch safer and it sits at 74, hard against
    // the top of the readable 45-75 band; 34em lands mid-band for one more page
    // over and three points on the worst one. If that trade ever needs revisiting
    // it is this number and nothing else.
    //
    // It is not free, and the cost is worth stating plainly: four pages now run
    // past their column at 1440x900 where none did, and twelve do at 1280x720
    // where three did. Those pages scroll. That is a deliberate trade rather than
    // an overflow to fix — the fade, the More button and the vertical keys already
    // exist for exactly this — and the alternative was leaving most of the
    // audience on an 83-character line to keep a number under 100.
    //
    // Also worth knowing: leading was already slightly tight for 83 characters,
    // because a long line needs more of it for the eye to find the next one. At
    // 72 the existing 1.45 is correct rather than merely survivable.
    maxWidth: '34em',
  },
  /**
   * The phone body, and why it cannot be the desktop scale.
   *
   * Everything above is built on one guarantee: type is 1.95cqh against a SQUARE page, so
   * type and column scale together, one coefficient holds at every viewport, and the fit is
   * arithmetic rather than luck. A phone page is around 0.51, not 1.0, and 1.95cqh of it
   * lands under the clamp's 12px floor. Once the floor binds the guarantee inverts: type
   * stops shrinking with the page while the column keeps shrinking, so fill gets strictly
   * WORSE as the phone gets smaller. Measured on vol1 spread 1 — 130% at 384x831 and 154%
   * at 384x683, with 16 of the 38 text pages over their column on a phone.
   *
   * So compact stops trying to fit and scrolls instead, which is the honest answer: a phone
   * has no facing page, so there is no spread whose shape has to be preserved, and every
   * reading application on the device scrolls. That frees the size from the fit, and it goes
   * UP rather than down — 12px was never a reading size, it was the floor being hit.
   *
   * Sized in vw rather than cqh on purpose. What constrains a phone is the MEASURE, and the
   * measure comes from the viewport width; height no longer constrains anything because the
   * column is allowed to run past the fold. At 375px this is 15.75px in a 339px column,
   * which is about 41 characters — short of the 65 a desktop page gets, and normal for a
   * phone, where 35 to 45 is the band every e-reader sits in.
   *
   * Leading opens to 1.55. On the desktop page leading was the cheapest height there was and
   * was spent down to 1.45 to save pages from re-chunking. A scrolling column has no such
   * budget, so it buys back the readability instead.
   */
  bodyCompact: {
    // Same reader multiplier as the wide rule. A phone already scrolls, so there is
    // no fit to protect here at all and the control is purely a size preference.
    fontSize: 'calc(clamp(15px, 4.2vw, 18px) * var(--mb-type-scale, 1))',
    lineHeight: 1.55,
    maxWidth: 'none',
  },
  // Centred, not pushed to the gutter.
  //
  // This was wrong before. A printed book does set a wider outer margin than
  // gutter margin, so the column was given `marginLeft: auto` to sit toward the
  // gutter. On screen that reads as a mistake rather than as typography: the
  // left margin looked abandoned while the text ran almost into the gutter
  // shadow. A single page on a screen has no facing page to balance against, so
  // the asymmetry has nothing to justify it. Centred, with the gutter shadow
  // providing the inner edge, reads correctly.
  flowOffset: { marginLeft: 'auto', marginRight: 'auto' },
  // Section headings inside the prose. Larger and bold above the body, per the
  // build brief's house formatting standard.
  heading: {
    fontFamily: face.body,
    fontWeight: 700,
    fontSize: '1.16em',
    lineHeight: 1.2,
    // balance, not pretty. A two or three line heading wants its lines evened
    // out, which is worth the layout cost on a short string and is explicitly
    // not worth it on a paragraph.
    textWrap: 'balance',
  },
  utility: {
    fontFamily: face.utility,
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
  },
  // Paragraph indent, in em so it tracks the body size.
  indent: '1.4em',
};

/**
 * The head margin, shared by both pages of a spread so they start on one line.
 *
 * The two pages used to begin at different heights — prose at 30px, the plate
 * vertically centred in whatever was left — and nothing tied them together across
 * the gutter. Giving them a common horizon is a real book-design detail: it reads
 * as precision even to a reader who could not say what changed.
 *
 * `plateCapNudge` is why this is not simply one number. Aligning the plate's top
 * edge to the top of the text's first LINE BOX leaves the image looking slightly
 * high, because the first line's cap height sits below its line box by the half
 * leading. That gap is (lineHeight - 1em) / 2 = 0.225em, plus roughly 0.06em from
 * the em-box top down to cap height in these serifs, so about 0.29em.
 *
 * Expressed in cqh against the page rather than em, because the plate page has no
 * body font size of its own to resolve an em against. 0.29 x the body's own
 * clamp(12px, 1.95cqh, 22px) is clamp(3.5px, 0.57cqh, 6.4px), rounded.
 */
export const pageInset = {
  // 24px is space(6), written out because `space` is declared below this and
  // calling it here would evaluate inside its temporal dead zone.
  top: { wide: '30px', compact: '24px' },
  plateCapNudge: 'clamp(3px, 0.57cqh, 6px)',
};

// A fine static grain via feTurbulence, tiled as a background image at very
// low opacity. No texture file, no network request, no seam.
//
// Static, never animated: an animated grain is the difference between a page
// that reads as paper and one that reads as a screensaver.
//
// stitchTiles="stitch" so the tile repeats seamlessly. Opacity is on the rect
// rather than the element so the grain does not fade page content. %23 because
// a raw # terminates a data URI.
const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
     <filter id="g">
       <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch"/>
       <feColorMatrix type="saturate" values="0"/>
     </filter>
     <rect width="180" height="180" filter="url(%23g)" opacity="0.05"/>
   </svg>`.replace(/\s+/g, ' '),
)}")`;

export const grainStyle = {
  backgroundImage: GRAIN,
  backgroundRepeat: 'repeat',
  backgroundSize: '180px 180px',
};

export const space = (n) => `${n * 4}px`;

// ============================================================
// Story arcs.
//
// An arc is four volumes. The Patch is arc one; more are planned, so this
// is a list rather than a hardcoded set of four cards. A future arc needs an
// entry here and its specs parsed, and both the landing page and the arc page
// pick it up.
//
// `cover` is the dedicated cover art if it exists. Where it does not, the reader
// falls back to the volume's chapter opener, so nothing is ever blank and real
// covers can be dropped in later with no code change.
// ============================================================

/**
 * The ground an arc's shelf sits on, and why arcs get different ones.
 *
 * The complaint this answers: a card is paper at #FBF8F2 and the shell is #F7F4EE, four
 * points apart, which measures about 1.02:1. The cards had nothing to sit against and the
 * drop shadow was doing all of the work of separating them — the same problem the reader
 * had before it was given `reader.bg`, and the same fix.
 *
 * Chosen at roughly 1.4:1 against paper. That is deliberately short of the reader's 1.77,
 * because the reader is a room you sit in and the landing page is a shelf you scan: it has
 * to stay airy, which was the feedback that took the whole site light in the first place.
 * A tint rather than a grey, so the band reads as a surface with a colour rather than as a
 * grey box — and each arc gets its OWN tint, so scrolling past three arcs reads as three
 * places rather than one long page. The Patch is warm sand, the town's own palette.
 *
 * Add an arc, take the next one. They are ordered so that no two adjacent bands share a
 * temperature.
 *
 * **clay and sage were swapped when The Nightjar was added, and the swap is the point.** The
 * order used to run sand, slate, sage, clay — warm, cool, cool, warm — so following the
 * instruction above literally would have put a green band directly under a blue-grey one and
 * broken the only rule the order exists to enforce. Reordering keeps "take the next one" a
 * true instruction instead of one that needs a caveat. Nothing reads these by position.
 */
export const ARC_BANDS = {
  sand: { bg: '#DDD2BC', rule: 'rgba(42,37,48,0.16)' },
  slate: { bg: '#CFD4DC', rule: 'rgba(30,36,48,0.16)' },
  clay: { bg: '#E0CEC7', rule: 'rgba(56,34,30,0.16)' },
  sage: { bg: '#CFD7C6', rule: 'rgba(32,44,32,0.16)' },
};

export const ARCS = [
  {
    id: 'patch-notes',
    number: 'One',
    title: 'The Patch',
    tagline: 'Millbrook starts fixing itself, and nobody asked it to.',
    blurb:
      'A pothole disappears overnight. A vape store has been a bookstore for six '
      + 'years. An eighty-one-year-old man runs six miles. Five kids, one robot and '
      + 'a monkey work out what the town is paying with.',
    band: 'sand',
    // The route into the arc's own page, as copy rather than as a label.
    //
    // Two rules, both learned by getting it wrong. It must be about the STORY, never about
    // the site: "how the flipbooks work" is a manual, and nobody clicks a manual. And it
    // must say that a page exists for this arc, because that is the thing a reader cannot
    // guess — every arc gets one, and it is where the arc is actually written up rather
    // than summarised in three lines.
    //
    // It must also not say "start". A reader on the shelf has already started; what is
    // being offered is somewhere to go deeper, not a beginning.
    //
    // And it must not promise what the page it sits on already delivers. It used to end on
    // "what everybody in Millbrook already knows", which is the literal title of the primer
    // three sections up the same page — so the one sentence with a reader's attention spent
    // a third of itself offering them something they had just read.
    start: {
      label: 'Explore The Patch',
      hint:
        'Every arc has a page of its own. This one has the town, the people it happens '
        + 'to, and where the story goes.',
    },
    volumes: [1, 2, 3, 4].map((n) => ({
      vol: n,
      slug: `vol${n}`,
      cover: `vol${n}-cover`,
      coverFallback: `vol${n}-opener`,
    })),
  },
  {
    id: 'understudies',
    number: 'Two',
    title: 'The Understudies',
    tagline: 'The Army arrives to fix Millbrook, and the town brings it lemonade.',
    blurb:
      'Six trucks arrive at dawn and the town brings lemonade. A boxer knocks out a '
      + 'soldier and apologizes. A five-ton truck loses a fight with a woman in a suit '
      + 'of armor. Five kids, one robot and a monkey talk a mayor out of a curfew.',
    // Slate, the cool tint next to The Patch’s warm sand, so the two bands read as two
    // places at a glance rather than as one long page.
    band: 'slate',
    start: {
      label: 'Explore The Understudies',
      hint:
        'Every arc has a page of its own. This one has the six acres behind the fence, '
        + 'the people the Army sent, and where the story goes.',
    },
    // u1-u4 rather than vol5-vol8. Every image file is named after its volume slug and they
    // all share one flat directory, so the slug has to name the arc; the number stays the
    // volume’s position WITHIN the arc, because that is what a shelf card shows.
    volumes: [1, 2, 3, 4].map((n) => ({
      vol: n,
      slug: `u${n}`,
      cover: `u${n}-cover`,
      coverFallback: `u${n}-opener`,
    })),
  },
  {
    id: 'nightjar',
    number: 'Three',
    title: 'The Nightjar',
    tagline: 'Ninety-one children get better overnight, and one boy goes missing from memory.',
    blurb:
      'Half the town eats dinner standing up in a gravel lot, and by two in the morning '
      + 'every child in Millbrook is sick. A three-foot robot with a clipboard fixes ninety-one '
      + 'of them before dawn. By breakfast there is a man in a mask on the roof of the hardware '
      + 'store, and only Pip has noticed that the crew is one person short.',
    // Clay, the warm tint after The Understudies' cool slate, so the third band reads as a
    // third place rather than more of the second. See ARC_BANDS.
    band: 'clay',
    start: {
      label: 'Explore The Nightjar',
      hint:
        'Every arc has a page of its own. This one has the night the whole town was ill, the '
        + 'man on the parapet, and where the story goes.',
    },
    // n1-n4. Arc one owns vol1-vol4 and arc two owns u1-u4 in the same flat images
    // directory, so this arc takes a prefix neither of them can collide with.
    volumes: [1, 2, 3, 4].map((n) => ({
      vol: n,
      slug: `n${n}`,
      cover: `n${n}-cover`,
      coverFallback: `n${n}-opener`,
    })),
  },
];

/**
 * Arcs that are announced but not yet written.
 *
 * These render as a band with the same footprint as a real arc, four ghost slots
 * and all. The point is structural rather than promotional: a reader who sees one
 * arc cannot tell whether the project is finished or ongoing, and a visibly
 * reserved second band answers that without a sentence of copy. Each expansion is
 * four volumes, so the space it will occupy is already known and can be shown.
 *
 * Promote one by moving it into ARCS with a real `volumes` array.
 */
/**
 * Arcs that are announced but have no prose yet.
 *
 * Empty, and leaving the machinery in place is the point. The Understudies sat here as four
 * named-but-unwritten volumes until its manuscripts arrived, then moved up into ARCS: delete
 * the entry from here, add a `volumes` array with real slugs there. That is the whole
 * promotion path and the next arc follows it.
 *
 * A reserved arc renders with the same band and the same card footprint as a real one, so it
 * reads as space being held rather than as a gap. See ComingShelf.
 */
export const UPCOMING_ARCS = [];

export const VOLUMES = ARCS.flatMap((a) => a.volumes);

/**
 * The wider fiction this sits inside, and where to go and look at it.
 *
 * Kept as data rather than inlined into the page so the arc pages and any future
 * footer share one source for the URL. An external link that appears in three
 * places and is edited in one is worth the six lines.
 */
export const UNIVERSE = {
  name: 'Digital Slop',
  blurb: 'Millbrook is one town in the Digital Slop universe.',
  collection: {
    label: 'The Digital Slop collection',
    href: 'https://opensea.io/collection/digital-slop',
    host: 'OpenSea',
  },
};

/**
 * Which ornamental frame the character cards wear.
 *
 * Two exist and both are wired, so they can be compared on a real card instead of swapped
 * blind. Change `slug` and `slice` together -- the slice is not a style choice, it is
 * measured off the file.
 *
 *   card-frame    Greek key. Squared spirals, continuous double rules. Reads classical.
 *                 slice 140: ink starts 54px in and the corner spirals reach 134px.
 *   card-frame-b  Mis-registered crop marks. Asymmetric L brackets with a coral ghost
 *                 offset behind them, and a hairline along each edge. Reads modern.
 *                 slice 146: the corner brackets reach 140px.
 *
 * `slice` must clear the largest corner ornament or the corners get cut. `fill` is never
 * used, so the centre of the file is discarded and has to be transparent.
 */
export const cardFrame = {
  slug: 'card-frame-b',
  slice: 146,
  borderPx: 34,
  compactBorderPx: 20,
};

// Site furniture that is art rather than content. Each is a slug in the same
// flat images directory, so the same drop-in rule applies.
export const SITE_IMAGES = {
  banner: { slug: 'site-banner', aspect: '3 / 1' },
  cast: { slug: 'site-cast', aspect: '3 / 1' },
  social: { slug: 'site-social', aspect: '1.91 / 1' },
  arc2: { slug: 'site-arc2', aspect: '3 / 1' },
  mark: { slug: 'brand-slop-mark', aspect: '1 / 1' },
};
