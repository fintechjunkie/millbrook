// ============================================================
// Millbrook design constants.
//
// One place for anything reproduced across the four volumes, so a change is
// one edit rather than a search. The equivalent of Unbroke's series.js, with
// the differences noted where they are deliberate.
// ============================================================

export const color = {
  bg: '#201E24',
  ink: '#2A2530',
  inkSoft: '#6A6270',
  accent: '#6B52C8',
};

// Paper.
//
// Unlike Unbroke, this value is NOT welded to the artwork. Its plates were
// batch-remapped so their baked-in paper ground met the page with no seam,
// which made the page colour effectively immutable (extraction 6.14).
// Millbrook images are framed rectangles sitting on the page rather than
// compositions bleeding into it, so paper stays a one-line change forever.
export const paper = {
  stock: '#F4EFE6',
  stockEdge: '#EAE3D6',
  rule: '#D8CFBE',
  ruleSoft: '#E5DDCD',
  gutterShadow: 'rgba(40, 38, 44, 0.20)',
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
 * Staged rather than one long tween, because a single 1.2s ease reads as sluggish while
 * the same time split into lift, grow and hold reads as intent. The lift is the cover
 * coming off the shelf, the grow is the book opening, the hold is the beat before the
 * page arrives.
 *
 * Tune here. Nothing else hardcodes these.
 */
export const open = {
  liftMs: 300,   // cover rises off the shelf, everything else dims
  growMs: 820,   // grows to the reader's 2:1 and tips about its left edge
  holdMs: 200,   // beat at full size, so the shape registers before the route changes
  fadeMs: 460,   // clone dissolves once the reader is underneath
};

// Total before navigation: lift + grow + hold.
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
  // a large display and shrank the page back down.
  maxSpreadWidth: 1680,
  compactMaxWidth: 560,
  chromeReserve: 112,
  breakpoint: 900,
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
// An arc is four volumes. The Patch Notes is arc one; more are planned, so this
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
    title: 'The Patch Notes',
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
    title: 'Untitled',
    blurb:
      'Four more volumes. The Digital Slop Squads return, and Millbrook is not '
      + 'the only town keeping a tally.',
    status: 'in development',
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
  blurb:
    'Millbrook is one town in the Digital Slop universe, an ongoing body of '
    + 'illustrated fiction and collected art about places and people the internet '
    + 'built and then left running.',
  collection: {
    label: 'The Digital Slop collection',
    href: 'https://opensea.io/collection/digital-slop',
    host: 'OpenSea',
  },
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
