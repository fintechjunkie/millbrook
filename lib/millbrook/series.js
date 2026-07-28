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
// A text page and an image page are both 2:3 portrait, so a two-page spread is
// 4:3. The chapter openers are specified as 4:3 full bleed across both pages,
// which means they fill the spread exactly with no letterboxing and no crop.
// That is a property of the specs rather than something arranged here.
export const geometry = {
  spreadAspect: 4 / 3,
  pageAspect: 2 / 3,
  maxSpreadWidth: 1320,
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
// 1.58cqh resolves to about 14.2px on a 900px-tall page, which is the largest
// size at which the densest page in the four volumes (Volume 1 spread 8, 336
// words) fits with headroom. That page sets the size for all 33.
export const face = {
  body: 'Arial, Helvetica, sans-serif',
};

export const type = {
  body: {
    fontFamily: face.body,
    fontSize: 'clamp(12px, 1.58cqh, 16.5px)',
    lineHeight: 1.5,
    textAlign: 'left',
    hyphens: 'none',
    color: color.ink,
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
