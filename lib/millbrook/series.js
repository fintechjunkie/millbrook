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
    fontSize: 'clamp(12px, 2.1cqh, 22px)',
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
    // readable 45 to 75 band. Capping at 37em brings it to 76 at every size,
    // because a measure in em is scale-invariant: the character count does not
    // drift as the page grows.
    //
    // Raising the font size looked like the fix and is not. It reduces
    // characters per line but multiplies the height needed, so it loses on both
    // counts: 17.5px at full width is 81 characters AND overflows 14 pages,
    // against 76 characters and 5 for this.
    maxWidth: '37em',
  },
  // The spare width goes to the OUTER margin, not the gutter, which is how a
  // printed book sets a page: outer margin wider than the gutter margin. The
  // prose page is always the left page, so its outer edge is the left one and
  // the text sits toward the gutter.
  flowOffset: { marginLeft: 'auto', marginRight: 0 },
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

// The four volumes. Titles come from the parsed specs; this is only the shelf
// ordering and the cover slug, which is the opener image.
export const VOLUMES = [1, 2, 3, 4].map((n) => ({
  vol: n,
  slug: `vol${n}`,
  cover: `vol${n}-opener`,
}));
