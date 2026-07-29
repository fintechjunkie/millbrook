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
  readerPad: {
    inline: 24, top: 32, bottom: 48,
    compactInline: 10, compactTop: 30, compactBottom: 48,
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
 * like: serifed forms give more distinguishable word shapes at a long measure,
 * and Georgia specifically was cut by Matthew Carter for screen reading at small
 * sizes, so it has a large x-height and sturdy, unambiguous letterforms. Arial is
 * a signage grotesque; it is competent and it reads as an interface.
 *
 * `utility` stays a grotesque, and that pairing is deliberate rather than
 * leftover. Serif prose with sans furniture is the standard editorial split, and
 * there is a mechanical reason too: Georgia's numerals are old-style, sitting at
 * x-height rather than cap-height. Beautiful in a paragraph, wrong in a page
 * counter, where 08 / 8 wants to line up.
 *
 * **Measured before committing to it, because the obvious worry is fit.** At the
 * same pixel size on vol1 spread 8, Arial gives 76 characters a line and 629px of
 * content; Georgia gives 75 and 629. Identical. The reason is that the measure is
 * capped in `em`, so the column is 37 ems wide whatever the face, and character
 * count barely moves. Georgia therefore looks a notch larger at no cost in
 * height, which is as close to free as a type change gets.
 *
 * Still no webfont, no FOUT and no build-time fetch: every face named here ships
 * with the operating system. Charter and Iowan Old Style are ahead of Georgia for
 * macOS and iOS readers, who get a better cut at no cost to anybody else.
 */
export const face = {
  body: 'Charter, "Iowan Old Style", Georgia, "Times New Roman", serif',
  utility: 'Arial, Helvetica, sans-serif',
};

export const type = {
  body: {
    fontFamily: face.body,
    // 1.95cqh, down from 2.1. Half a notch smaller buys a disproportionate
    // amount of room, because line count falls with size AND the wider column
    // below takes more words per line. Together they took scrolling pages from
    // 9 to 1.
    fontSize: 'clamp(12px, 1.95cqh, 22px)',
    // 1.45 rather than 1.52. Leading is the cheapest height there is: it costs
    // nothing authorial, where the alternative is re-chunking pages, and each
    // new page needs a new spread and a new image.
    lineHeight: 1.45,
    textAlign: 'left',
    hyphens: 'none',
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
    // 37em. This has moved twice and the reasoning is worth keeping, because the
    // two goals pull in opposite directions:
    //
    //   wider column  -> more words per line -> shorter text -> fits, but the
    //                    measure gets long and the page can look under-filled
    //   narrower column -> better measure and a fuller page, but it overflows
    //
    // 34em gave an ideal 70 characters and 92% fill but nine pages scrolled.
    // 37em with the smaller size above gives 76 characters, still inside the
    // readable band, and leaves exactly one page over: vol1-8, by 5%, which is
    // the page already slated for the re-chunk. After that split, nothing
    // scrolls at any desktop viewport.
    maxWidth: '37em',
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
    status: 'in production',
    volumes: [1, 2, 3, 4].map((n) => ({
      vol: n,
      slug: `vol${n}`,
      cover: `vol${n}-cover`,
      coverFallback: `vol${n}-opener`,
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
export const UPCOMING_ARCS = [
  {
    id: 'arc-two',
    number: 'Two',
    title: 'Coming Soon',
    blurb:
      'Four more volumes. The Digital Slop Squads return, and Millbrook is not '
      + 'the only town keeping a tally.',
    status: 'coming soon',
    volumeCount: 4,
  },
];

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
