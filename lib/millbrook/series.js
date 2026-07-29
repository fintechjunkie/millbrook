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
// Arial throughout, per the build brief.
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
export const face = {
  body: 'Arial, Helvetica, sans-serif',
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
  },
  utility: {
    fontFamily: face.body,
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
  },
  // Paragraph indent, in em so it tracks the body size.
  indent: '1.4em',
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
