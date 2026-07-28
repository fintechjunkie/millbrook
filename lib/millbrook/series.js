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
// A 16:9 spread of two 8:9 pages. It began as 4:3 of two 2:3 portrait pages,
// and moved for a measured reason: height is the binding constraint on any
// laptop, so for a fixed viewport height a WIDER spread buys page area for
// free. The page does not get shorter, it gets wider. Measured effect on the
// densest page, Volume 1 spread 8 at 336 words:
//
//   4:3, one column     12 of 33 pages scroll at 1366x768, worst by 233px
//   16:9, two columns   0 of 33 scroll at 1920x1080, 1600x900 or 1366x768
//
// 16:9 rather than 1.9:1 so the four chapter openers, which run full bleed
// across both pages and therefore have to match the spread exactly, sit on a
// native image generation ratio and need no crop.
//
// Mobile is untouched by any of this. Below the breakpoint a reader gets one
// page at a time and its shape comes from the phone, around 0.51, not from the
// spread. The spread ratio is a desktop-only concern.
export const geometry = {
  spreadAspect: 16 / 9,
  pageAspect: 8 / 9,
  // Raised with the aspect. At 1320 the cap, rather than the viewport, became
  // the binding constraint on a large display and shrank the page back down.
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
// With two columns on a 16:9 spread the densest page fits with a great deal of
// room to spare, so fit stops being what sets the size and MEASURE takes over.
// 1.85cqh puts a column at roughly 41 to 53 characters across desktop sizes,
// inside the readable 45 to 75 band, where one column on the old portrait page
// ran 58 to 80 and needed 10px to fit a 1366x768 laptop at all.
export const face = {
  body: 'Arial, Helvetica, sans-serif',
};

export const type = {
  body: {
    fontFamily: face.body,
    fontSize: 'clamp(12px, 1.85cqh, 17px)',
    lineHeight: 1.5,
    textAlign: 'left',
    hyphens: 'none',
    color: color.ink,
  },
  // Two balanced columns on the wide spread, one on a phone.
  //
  // The columns are not decoration: a single column on an 8:9 page runs 92 to
  // 117 characters, which is far outside readable. They are also impossible on
  // a phone, where two columns of a 370px page would be 24 characters each, so
  // the compact layout stays single column and simply scrolls.
  columns: {
    columnCount: 2,
    columnGap: '2.1em',
    columnFill: 'balance',
  },
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
