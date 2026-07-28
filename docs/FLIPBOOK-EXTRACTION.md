# Flipbook reader: technical extraction for a rebuild in another repo

Reference implementation: **"Why Have Things Become So Expensive?"** in the Unbroke
repo (Next.js 14.2 App Router, React 18). Twelve topics, 15 spreads each, 120
engraved plates, 50 code-drawn charts, live in production.

You have no access to that codebase. Everything below is pasted from it verbatim
unless a line says otherwise. Where I have cut, I say what I cut and why.

**The stack assumption:** Next.js App Router, React 18, **inline styles only, no CSS
framework, no styled-components, no Tailwind.** That single decision explains most of
the odd shapes in this document, and section 6 is largely about what it cost.

---

## 1. FILE MAP

### The reader and the index

| File | Job |
|---|---|
| `app/why-expensive/page.js` | The index. Lists every topic as a tile, routes to the topic page. Client component. |
| `app/why-expensive/[topic]/page.js` | Topic hero: cover plate, standfirst, scorecard, link into the reader. Not required for a minimal rebuild. |
| `app/why-expensive/[topic]/read/page.js` | The reader route. `force-static`. Loads data, flattens tokens in alt text, renders `<FlipBook>`. |
| `app/why-expensive/[topic]/briefing/page.js` | Long-form scroll page plus a generated fact sheet. Orthogonal to the reader. |
| `components/whyExpensive/FlipBook.js` | **The reader.** Leaf model, page-curl, edge stacks, keyboard, swipe, click-to-turn, counter, act rail, contents, share, chrome auto-hide. 783 lines. |
| `components/whyExpensive/SpreadPage.js` | The four page kinds: `GraphicPage`, `TextPage`, `ActCard`, `BlankPage`. This is the DOM of a spread. 387 lines. |
| `components/whyExpensive/Plate.js` | Paper grain constant, `Art`, `CoverArt`, `EngravedPlate` fallback, and the broken-image hook. 175 lines. |
| `components/whyExpensive/Figure.js` | `ResolvedText`: renders `{{TOKEN}}` as a tappable source chip. Portals out of the 3D transform. |
| `components/whyExpensive/Chart.js` | 50 hand-built SVG chart components and a registry switch. 243 KB. See section 6. |
| `components/whyExpensive/TextOnly.js` | No-JS / print / accessibility fallback: the whole book as one scroll document. |
| `components/whyExpensive/Glyph.js` | Small mechanism icons. Series-specific, skip. |

### Data and styling

| File | Job |
|---|---|
| `lib/whyExpensive/data.js` | Static-import registry. `loadTopic(slug)` returns the single object the reader consumes. |
| `lib/whyExpensive/series.js` | Design constants: act inks, paper colours, turn timing, type scale. |
| `lib/whyExpensive/figures.js` | Token resolver. `resolveTokens` for rendering, `resolveToString` for alt text. |
| `lib/design/tokens.js` | Repo-wide palette, spacing, radius, shadow, motion. |
| `app/globals.css` | **The only real CSS file.** All `@keyframes`, the reduced-motion overrides, focus rings, and the two rules that need media queries. |
| `app/layout.js` | Font loading via `next/font/google`. |
| `data/why-expensive/topics.json` | The index manifest. |
| `data/why-expensive/<slug>/spreads.json` | Acts plus every spread for one topic. |
| `data/why-expensive/<slug>/figures.json` | Every number, keyed by token. |
| `data/why-expensive/<slug>/charts/*.json` | One series file per chart. |
| `public/assets/why-expensive/*.jpg` | Every plate. Flat directory, no subfolders. |

---

## 2. THE INDEX PAGE

### How an entry knows its cover, title and target URL

**It is a manifest, not hardcoded.** `data/why-expensive/topics.json` holds a
`topics` array. Every tile field comes from that entry; the target URL is derived
from `slug` by string interpolation at the click site, not stored.

Real entry, verbatim (I have cut only the `_`-prefixed provenance notes, which are
long editorial justifications and are not read by any code):

```json
{
  "slug": "prescription-drugs",
  "title": "Prescription Drugs",
  "hook": "The price is a secret, and the rebate is the reason.",
  "status": "live",
  "machine": ["price-signal", "permission-layer", "payment-disguise"],
  "cover": "px-00-cover",
  "spreadCount": 15,
  "readingTime": "about ten minutes"
}
```

Four things to note, because each is a decision you inherit or reject:

- **`cover` is a bare asset name, not a path.** `Plate.js` turns it into
  `/assets/why-expensive/${cover}.jpg`. Directory and extension are hardcoded in the
  component. See section 4.
- **`status` gates interactivity.** Anything not `"live"` renders a disabled tile
  reading "Not yet printed", so a half-built chapter can sit in the manifest safely.
- **`spreadCount` is duplicated here** for the tile, and computed again in
  `loadTopic` as `spreads.length`. Two sources of truth for one number. Section 6.
- **`machine` and the primer `role` are series-specific.** Strip them.

The registry that turns files into a topic object, from `lib/whyExpensive/data.js`:

```js
// Static imports rather than fs reads, so the whole series is validated at
// build time and works identically in a server component, a client component,
// and an @vercel/og route. Only one topic is live, so a hand-written registry
// beats a dynamic glob: an unknown slug is a 404, not a runtime surprise.

import topicsIndex from '@/data/why-expensive/topics.json';
import pxTopic from '@/data/why-expensive/prescription-drugs/topic.json';
import pxSpreads from '@/data/why-expensive/prescription-drugs/spreads.json';
import pxFigures from '@/data/why-expensive/prescription-drugs/figures.json';
import pxVolumeSpend from '@/data/why-expensive/prescription-drugs/charts/volume-vs-spend.json';
// ...one block like this per topic, twelve times

const REGISTRY = {
  'prescription-drugs': {
    topic: pxTopic,
    spreads: pxSpreads,
    figures: pxFigures,
    charts: { 'volume-vs-spend': pxVolumeSpend /* ... */ },
  },
  // ...
};

export const TOPICS = topicsIndex.topics;

export function topicMeta(slug) {
  return TOPICS.find((t) => t.slug === slug) || null;
}

// Returns null for a slug that is real but dormant, and for a slug that does
// not exist. The route decides which of those is a 404 and which is a
// coming-soon page.
export function loadTopic(slug) {
  const entry = REGISTRY[slug];
  if (!entry) return null;
  const meta = topicMeta(slug);
  const spreads = entry.spreads.spreads;
  return {
    slug,
    meta,
    topic: entry.topic,
    figures: entry.figures,
    chartSeries: entry.charts || {},
    acts: entry.spreads.acts,
    spreads,
    spreadCount: spreads.length,
  };
}
```

### The tile, verbatim

```jsx
function Tile({ topic, onClick }) {
  const live = topic.status === 'live';
  return (
    <button
      onClick={live ? onClick : undefined}
      disabled={!live}
      aria-disabled={!live}
      tabIndex={live ? 0 : -1}
      className="wx-focus"
      style={{
        textAlign: 'left', cursor: live ? 'pointer' : 'default',
        background: paper.stock, ...grainStyle,
        border: `1px solid ${paper.rule}`,
        borderTop: `3px solid ${live ? color.primary : paper.rule}`,
        borderRadius: 2,
        padding: space(5),
        display: 'flex', flexDirection: 'column', gap: space(3),
        opacity: live ? 1 : 0.55,
        transition: `transform ${motion.quick}, box-shadow ${motion.quick}`,
        boxShadow: live ? '0 1px 2px rgba(42,37,48,0.05)' : 'none',
      }}
      onMouseEnter={live ? (e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 10px 26px rgba(42,37,48,0.14)';
      } : undefined}
      onMouseLeave={live ? (e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = '0 1px 2px rgba(42,37,48,0.05)';
      } : undefined}
    >
      <div style={{
        width: '100%', aspectRatio: '3 / 2', border: `1px solid ${paper.ruleSoft}`,
        background: paper.stock, overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {live ? (
          <CoverArt cover={topic.cover} />
        ) : (
          <div aria-hidden="true" style={{ ...utility, fontSize: 9, color: color.inkSoft, letterSpacing: '0.24em' }}>
            Not yet printed
          </div>
        )}
      </div>

      <div style={{
        fontFamily: face.display, fontStyle: 'italic', fontSize: 21, lineHeight: 1.14, color: color.ink,
      }}>
        {topic.title}
      </div>
      <div style={{ fontFamily: face.body, fontSize: 13.5, lineHeight: 1.5, color: color.inkSoft, flex: 1 }}>
        {topic.hook}
      </div>

      <div style={{
        paddingTop: space(2), borderTop: `1px solid ${paper.ruleSoft}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        ...utility, fontSize: 9.5,
      }}>
        {live ? (
          <>
            <span style={{ color: color.primary }}>Read →</span>
            <span style={{ color: color.inkSoft, letterSpacing: '0.1em' }}>
              {topic.spreadCount} spreads
            </span>
          </>
        ) : (
          <span style={{ color: color.inkSoft, letterSpacing: '0.22em' }}>Soon</span>
        )}
      </div>
    </button>
  );
}
```

The grid and the routing:

```jsx
export default function SeriesIndex() {
  const router = useRouter();
  const grid = TOPICS.filter((t) => t.role !== 'primer');

  return (
    <main style={{ minHeight: '100vh', background: paper.stock }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: `${space(8)} ${space(5)} ${space(20)}` }}>
        {/* hero omitted: a type specimen, series-specific */}
        <section
          aria-label="Topics"
          style={{ display: 'grid', gap: space(5), gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))' }}
        >
          {grid.map((t) => (
            <Tile
              key={t.slug}
              topic={t}
              onClick={() => router.push(`/why-expensive/${t.slug}`)}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
```

**`repeat(auto-fill, minmax(272px, 1fr))` is the entire responsive story for the
index.** No breakpoints, no media queries. It goes 1-up on a phone and 3-up at
1080px by arithmetic.

### `aspectRatio: '3 / 2'` with `objectFit: 'contain'`, and why

Every cover is a whole composition with an ornamental border and a deliberate margin
of bare paper outside it. A 3:2 plate in a 4:3 box under `cover` scaled to fill the
height and **cropped the border off both sides**, which is the one asset whose frame
is the design. The box now matches the plate's own ratio, and `contain` means a
future off-ratio plate letterboxes onto paper stock instead of losing its edges.
Letterboxing is invisible because the box background and the plate ground are the
same value.

---

## 3. THE READER

### 3a. The reader route

```jsx
import { notFound } from 'next/navigation';
import { loadTopic, TOPICS } from '@/lib/whyExpensive/data';
import { resolveToString } from '@/lib/whyExpensive/figures';
import FlipBook from '@/components/whyExpensive/FlipBook';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return TOPICS.filter((t) => t.status === 'live').map((t) => ({ topic: t.slug }));
}

export function generateMetadata({ params }) {
  const topic = loadTopic(params.topic);
  if (!topic) return {};
  return {
    title: `${topic.meta.title} · Why Have Things Become So Expensive?`,
    description: topic.meta.hook,
  };
}

// The ?spread= deep link is read on the CLIENT, inside FlipBook, rather than
// from searchParams here. Touching searchParams in a page opts it out of static
// rendering, and this is a static reading product: there is no reason for the
// server to re-render fifteen spreads of fixed copy because a query param
// changed.
export default function ReadPage({ params }) {
  const topic = loadTopic(params.topic);
  if (!topic) notFound();

  // Alt text and captions can carry figure tokens, and a screen reader must
  // never hear a raw {{TOKEN}}. Flatten them to strings on the server so the
  // resolved text is in the markup rather than resolved after hydration.
  const flattened = {
    ...topic,
    spreads: topic.spreads.map((s) => ({
      ...s,
      graphic: { ...s.graphic, alt: resolveToString(s.graphic.alt, topic.figures) },
    })),
  };

  return <FlipBook topic={flattened} />;
}
```

### 3b. The leaf model

One leaf is one opening. Act interstitials are leaves too: they occupy a turn but are
not counted in the spread counter.

```js
function buildLeaves(topic) {
  const out = [];
  for (const act of topic.acts) {
    out.push({ kind: 'act', act, key: `act-${act.numeral}` });
    for (const n of act.spreads) {
      const s = topic.spreads.find((x) => x.n === n);
      if (s) out.push({ kind: 'spread', spread: s, act, key: `s-${n}` });
    }
  }
  return out;
}
```

**Reading order comes from `act.spreads`, not from array order and not from `n`.**
`n` is a lookup key and a printed page number. The number of acts is data; nothing
requires five. For a 17-chapter book you can give each chapter one act and use it as
a section divider, or none.

Position is `{ idx, half }`. `idx` indexes leaves. `half` is only used on narrow
screens, where one leaf becomes two swipes.

### 3c. The page-curl animation, complete

**CSS**, from `app/globals.css`, verbatim and complete:

```css
/* ============================================================
   Why Have Things Become So Expensive? — the page turn
   A curl, not a slide and not a 3D card flip: the sheet rotates about the
   gutter and casts a moving shadow on the page beneath. 520ms.
   ============================================================ */

/* Forward: the right page lifts and rotates left about the gutter. */
@keyframes wx-turn-fwd {
  0%   { transform: rotateY(0deg); }
  100% { transform: rotateY(-180deg); }
}
/* Back: the left page lifts and rotates right. */
@keyframes wx-turn-back {
  0%   { transform: rotateY(0deg); }
  100% { transform: rotateY(180deg); }
}
/* Mobile portrait turns a single full-width page about its inner edge. */
@keyframes wx-turn-fwd-single {
  0%   { transform: rotateY(0deg); }
  100% { transform: rotateY(-170deg); }
}
@keyframes wx-turn-back-single {
  0%   { transform: rotateY(0deg); }
  100% { transform: rotateY(170deg); }
}

/* The shadow the lifting sheet casts on the page beneath. Rises as the sheet
   passes overhead, falls away as it lands. */
@keyframes wx-turn-shade {
  0%   { opacity: 0; }
  38%  { opacity: 0.42; }
  70%  { opacity: 0.18; }
  100% { opacity: 0; }
}

/* The sheet's own face darkens as it tips away from the light. */
@keyframes wx-turn-self {
  0%   { opacity: 0; }
  50%  { opacity: 0.30; }
  100% { opacity: 0; }
}

@keyframes wx-crossfade {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}

/* Chrome auto-hides after 3s and returns on any input. */
.wx-chrome { transition: opacity 260ms cubic-bezier(0.22, 0.61, 0.36, 1); }
.wx-chrome[data-hidden='true'] { opacity: 0; pointer-events: none; }

/* Focus rings are never suppressed without replacement. */
.wx-focus:focus-visible {
  outline: 2px solid #6B52C8;
  outline-offset: 3px;
  border-radius: 3px;
}

/* prefers-reduced-motion: replace the curl with a 120ms crossfade.
   The global reduce block zeroes every animation with !important on the
   universal selector; a class selector outranks `*` on specificity, so the
   crossfade survives while the curl does not. */
@media (prefers-reduced-motion: reduce) {
  .wx-sheet { display: none !important; }
  .wx-shade { display: none !important; }
  .wx-crossfade {
    animation: wx-crossfade 120ms linear !important;
    animation-duration: 120ms !important;
  }
}
```

That global reduce block it refers to, which appears earlier in the same file:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

**Timing constants**, from `lib/whyExpensive/series.js`:

```js
// The turn. 520ms is fast enough to feel responsive and slow enough to read as
// physical. prefers-reduced-motion drops to a 120ms crossfade, which is
// non-negotiable, so it is enforced in CSS rather than left to a JS branch.
export const turn = {
  ms: 520,
  ease: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
  reducedMs: 120,
};
```

**JS: the turn state machine.** Every ref here exists because of a bug. Read the
comments.

```jsx
const [pos, setPos] = useState({ idx: 0, half: 0 });
const [anim, setAnim] = useState(null);   // { dir, from, id }
const queue = useRef(null);               // single slot: a second input queues, it does not stack

const nextPos = useCallback((p, dir) => {
  const l = leaves[p.idx];
  if (!wide && l?.kind === 'spread') {
    if (dir === 'fwd' && p.half === 0) return { idx: p.idx, half: 1 };
    if (dir === 'back' && p.half === 1) return { idx: p.idx, half: 0 };
  }
  const ni = dir === 'fwd' ? p.idx + 1 : p.idx - 1;
  if (ni < 0 || ni >= leaves.length) return null;
  // Coming backwards into a spread on mobile lands on its text page, which is
  // the page you were just reading the far side of.
  const nl = leaves[ni];
  const half = !wide && dir === 'back' && nl.kind === 'spread' ? 1 : 0;
  return { idx: ni, half };
}, [leaves, wide]);

// The turning flag and the position both live in refs, not just in state.
//
// They have to. onAnimEnd closes over go, which closed over `anim` from the
// render where anim was still set, so a queued turn would see a stale truthy
// anim, re-queue itself, and be dropped: two clicks advanced one page. Reading
// live values from refs makes go stable and makes the queue actually fire.
const animating = useRef(false);
const posRef = useRef(pos);
const reduced = useRef(false);
const safety = useRef(null);
useEffect(() => { posRef.current = pos; }, [pos]);

useEffect(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  const on = () => { reduced.current = mq.matches; };
  on();
  mq.addEventListener('change', on);
  return () => mq.removeEventListener('change', on);
}, []);

const go = useCallback((dir) => {
  if (animating.current) { queue.current = dir; return; }   // queue, never stack, never drop
  const from = posRef.current;
  const target = nextPos(from, dir);
  if (!target) return;
  posRef.current = target;

  // Reduced motion mounts no sheet at all. It has to be handled here and not
  // only in CSS: the stylesheet sets .wx-sheet to display:none, which means
  // animationend never fires, which would latch the turning flag true forever
  // and freeze navigation after one turn. The 120ms crossfade on the base
  // layer is what the reader gets instead, and that is pure CSS.
  if (reduced.current) { setPos(target); return; }

  animating.current = true;
  clearTimeout(safety.current);
  // If animationend is ever missed, unstick rather than deadlock.
  safety.current = setTimeout(() => { if (animating.current) onAnimEndRef.current(); }, TURN.ms + 260);
  setAnim({ dir, from, id: `${dir}-${from.idx}-${from.half}-${performance.now()}` });
  setPos(target);
}, [nextPos]);

const jumpTo = useCallback((idx, half = 0) => {
  if (idx === posRef.current.idx && half === posRef.current.half) return;
  animating.current = false;
  queue.current = null;
  setAnim(null);
  posRef.current = { idx, half };
  setPos({ idx, half });
}, []);

const onAnimEnd = useCallback(() => {
  animating.current = false;
  clearTimeout(safety.current);
  setAnim(null);
  const q = queue.current;
  queue.current = null;
  if (q) {
    // A timer, not requestAnimationFrame. rAF is paused entirely while the
    // page is not compositing (a background tab, or a hidden pane), which
    // silently swallowed every queued turn. A 0ms timeout still lets the sheet
    // unmount first, so the new turn starts from a clean transform, and it
    // survives the reader switching tabs mid-turn.
    setTimeout(() => go(q), 0);
  }
}, [go]);

// The safety timeout is armed inside go, which is defined before onAnimEnd, so
// it reaches it through a ref rather than a forward reference.
const onAnimEndRef = useRef(onAnimEnd);
useEffect(() => { onAnimEndRef.current = onAnimEnd; }, [onAnimEnd]);
useEffect(() => () => clearTimeout(safety.current), []);
```

**Which leaf each half of the base layer shows during a turn.** This is subtle and
it is the difference between feeling like paper and feeling like a slideshow:

```jsx
// The bug: the base layer rendered the destination for both halves the instant a
// turn started, so on a forward turn the new left page appeared immediately and
// only then did the sheet flip over onto it. Real book physics: the half the
// sheet is NOT covering keeps the page you are leaving until the sheet lands.
//
//   forward  the right page lifts, so the LEFT half must hold the old left
//            page; the right half shows the new one, revealed as the sheet
//            lifts away.
//   back     the left page lifts, so the RIGHT half holds the old right page.
const fromLeaf = anim ? leaves[anim.from.idx] : null;
const baseLeftLeaf = anim && anim.dir === 'fwd' ? fromLeaf : leaf;
const baseRightLeaf = anim && anim.dir === 'back' ? fromLeaf : leaf;
```

**The turning sheet.** Two faces on one element, `preserve-3d`, back face
pre-rotated 180deg so it reads correctly when the sheet lands:

```jsx
{anim && (
  <div
    key={anim.id}
    className="wx-sheet"
    aria-hidden="true"
    onAnimationEnd={onAnimEnd}
    style={{
      position: 'absolute', top: 0, bottom: 0, zIndex: 4,
      ...(wide
        ? (anim.dir === 'fwd'
          ? { left: '50%', width: '50%', transformOrigin: 'left center' }
          : { left: 0, width: '50%', transformOrigin: 'right center' })
        : { left: 0, width: '100%', transformOrigin: anim.dir === 'fwd' ? 'left center' : 'right center' }),
      transformStyle: 'preserve-3d',
      animation: `${wide
        ? (anim.dir === 'fwd' ? 'wx-turn-fwd' : 'wx-turn-back')
        : (anim.dir === 'fwd' ? 'wx-turn-fwd-single' : 'wx-turn-back-single')
        } ${TURN.ms}ms ${TURN.ease} forwards`,
    }}
  >
    <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', overflow: 'hidden' }}>
      {wide
        ? (anim.dir === 'fwd' ? renderRight(leaves[anim.from.idx], false) : renderLeft(leaves[anim.from.idx], false))
        : renderHalf(anim.from)}
      {sheetShade}
    </div>
    <div style={{
      position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
      transform: 'rotateY(180deg)', overflow: 'hidden',
    }}>
      {wide
        ? (anim.dir === 'fwd' ? renderLeft(leaf, false) : renderRight(leaf, false))
        : renderHalf(pos)}
    </div>
  </div>
)}
```

The two shadow layers. `sheetShade` rides on the sheet's own front face; the other
is cast on the page beneath:

```jsx
const sheetShade = (
  <div
    className="wx-shade"
    aria-hidden="true"
    style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: 'linear-gradient(90deg, rgba(42,37,48,0.55) 0%, rgba(42,37,48,0) 62%)',
      animation: `wx-turn-self ${TURN.ms}ms ${TURN.ease} forwards`,
    }}
  />
);

{anim && (
  <div
    key={`shade-${anim.id}`}
    className="wx-shade"
    aria-hidden="true"
    style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3,
      background: anim.dir === 'fwd'
        ? 'linear-gradient(90deg, rgba(42,37,48,0.5) 0%, rgba(42,37,48,0) 55%)'
        : 'linear-gradient(270deg, rgba(42,37,48,0.5) 0%, rgba(42,37,48,0) 55%)',
      animation: `wx-turn-shade ${TURN.ms}ms ${TURN.ease} forwards`,
    }}
  />
)}
```

`perspective: 2400` is set on the book container, not on the sheet. Without a
perspective on the ancestor the rotation is an affine squash with no depth.

### 3d. Paper grain

**An inline SVG `feTurbulence`, encoded as a data URI and tiled as a background
image.** No texture file, no external asset, no network request.

```js
// A fine static grain via feTurbulence, tiled as a background image at very low
// opacity. Static, never animated: animating the grain is the difference
// between a page that reads as paper and a page that reads as a screensaver.
const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
     <filter id="g">
       <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch"/>
       <feColorMatrix type="saturate" values="0"/>
     </filter>
     <rect width="180" height="180" filter="url(%23g)" opacity="0.055"/>
   </svg>`.replace(/\s+/g, ' '),
)}")`;

export const grainStyle = {
  backgroundImage: GRAIN,
  backgroundRepeat: 'repeat',
  backgroundSize: '180px 180px',
};
```

Three details that matter: `stitchTiles="stitch"` so the 180px tile repeats without
a visible seam; `opacity="0.055"` on the rect rather than on the element, so the
grain does not fade the page content; `%23g` because a raw `#` breaks a data URI.

### 3e. The visible edge stacks

```jsx
// The stack of thin lines suggesting remaining page thickness. This is the
// single best cheap cue that this is a book, and it is: it is the only element
// that changes as you read.
function EdgeStack({ side, count }) {
  const n = Math.max(0, Math.min(9, count));
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', top: 6, bottom: 6, width: n * 2 + 1,
        [side]: -(n * 2 + 1),
        display: 'flex', flexDirection: side === 'right' ? 'row' : 'row-reverse',
        pointerEvents: 'none',
      }}
    >
      {[...Array(n)].map((_, i) => (
        <div
          key={i}
          style={{
            width: 2, height: `calc(100% - ${i * 1.5}px)`, alignSelf: 'center',
            background: i % 2 ? paper.stockEdge : paper.stock,
            borderRight: side === 'right' ? `0.5px solid rgba(42,37,48,0.14)` : 'none',
            borderLeft: side === 'left' ? `0.5px solid rgba(42,37,48,0.14)` : 'none',
          }}
        />
      ))}
    </div>
  );
}
```

Called with the counts that redistribute as you read, which is the whole trick:

```jsx
<EdgeStack side="left" count={pos.idx} />
<EdgeStack side="right" count={leaves.length - 1 - pos.idx} />
```

Mechanics: each sliver is 2px wide, alternating `stock` and `stockEdge` so the stack
reads as separate sheets. Each is `1.5px` shorter than the last so the outer edge is
slightly convex, the way a real block of paper sits. The stack is positioned
*outside* the book by a negative offset equal to its own width. **Capped at 9,** so
it stops carrying information past nine leaves in either direction.

### 3f. The DOM of a single two-page spread

The book container:

```jsx
<section
  ref={bookRef}
  aria-label={ariaLabel}
  aria-live="polite"
  onPointerDown={onPointerDown}
  onClick={onBookClick}
  style={{
    position: 'relative',
    // Drive the WIDTH from the height the viewport actually allows, then
    // let aspectRatio set the height. Setting width: 100% and capping
    // maxHeight looks like it works and silently breaks the ratio: the box
    // came out 1120x530, a 2.1:1 letterbox instead of a 3:2 book.
    // A landscape coffee-table book, 1.9:1.
    width: wide ? 'min(1300px, 100%, calc((100vh - 108px) * 1.9))' : 'min(560px, 100%)',
    ...(wide ? { aspectRatio: '1.9 / 1' } : { height: 'calc(100vh - 116px)' }),
    perspective: 2400,
    boxShadow: '0 2px 6px rgba(42,37,48,0.10), 0 30px 70px rgba(42,37,48,0.26)',
  }}
>
  <EdgeStack side="left" count={pos.idx} />
  <EdgeStack side="right" count={leaves.length - 1 - pos.idx} />

  {/* The base layer already shows the destination. The turning sheet flies
      over the top of it. */}
  <div
    className="wx-crossfade"
    key={`base-${pos.idx}-${pos.half}`}
    style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: wide ? '1fr 1fr' : '1fr' }}
  >
    {wide ? (
      <>
        {/* The cursor is the affordance: west on the left page, east on the
            right, so where a click will take you is visible before you make it. */}
        <div style={{ position: 'relative', overflow: 'hidden', cursor: pos.idx === 0 ? 'default' : 'w-resize' }}>
          {renderLeft(baseLeftLeaf, false)}
          {/* gutter shadow, inside edge */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: 34, pointerEvents: 'none',
            background: `linear-gradient(90deg, rgba(42,37,48,0) 0%, ${paper.gutterShadow} 100%)`,
          }} />
        </div>
        <div style={{ position: 'relative', overflow: 'hidden', cursor: 'e-resize' }}>
          {renderRight(baseRightLeaf, false)}
          <div aria-hidden="true" style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: 34, pointerEvents: 'none',
            background: `linear-gradient(270deg, rgba(42,37,48,0) 0%, ${paper.gutterShadow} 100%)`,
          }} />
        </div>
      </>
    ) : (
      <div style={{ position: 'relative', overflow: 'hidden' }}>{renderHalf(pos)}</div>
    )}
  </div>

  {/* shade layer, then sheet layer, as pasted in 3c */}
</section>
```

The dispatch:

```jsx
const renderLeft = (l, compact) => {
  if (!l) return <BlankPage />;
  if (l.kind === 'act') return <ActCard act={l.act} compact={compact} />;
  return <GraphicPage spread={l.spread} topic={topic} actInk={l.act.ink} compact={compact} />;
};
const renderRight = (l, compact) => {
  if (!l) return <BlankPage />;
  if (l.kind === 'act') return <BlankPage />;
  return <TextPage spread={l.spread} topic={topic} act={l.act} actInk={l.act.ink} compact={compact} />;
};
// On mobile a leaf is split across two swipes, so a "page" is one half.
const renderHalf = (p, compact = true) => {
  const l = leaves[p.idx];
  if (!l) return <BlankPage />;
  if (l.kind === 'act') return <ActCard act={l.act} compact={compact} />;
  return p.half === 0 ? renderLeft(l, compact) : renderRight(l, compact);
};
```

**Left page is always the graphic. Right page is always the text.** An act card
occupies the left and leaves the right blank paper, so it costs exactly one turn.

The shared page shell, from `SpreadPage.js`:

```js
// data-wx-page is a verification hook, not decoration. Screenshots have never
// worked in this environment, so every layout claim about this book is a DOM
// measurement, and the standing sweep needs one stable selector for "a page" to
// assert scrollHeight against.
const PAGE_ATTR = { 'data-wx-page': '' };

const PAGE = {
  position: 'relative',
  // height 100% is load-bearing, not tidiness. Without it a page only took its
  // CONTENT height, so the act card covered the top two-thirds of its page and
  // the site background showed through underneath. That was the two-tone split:
  // not two colours by design, but one page failing to fill its own sheet.
  height: '100%',
  width: '100%',
  background: paper.stock,
  ...grainStyle,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};
```

`TextPage`, complete, because it is the page that carries the prose:

```jsx
export function TextPage({ spread, topic, act, actInk, compact }) {
  const c = ink(actInk);
  const pad = compact ? space(5) : space(7);
  const ctx = { topic: topic.slug, spread: spread.n };
  const hasQuote = Boolean(spread.pullQuote) && !compact;

  return (
    <div {...PAGE_ATTR} style={{
      ...PAGE,
      padding: pad,
      // A pull quote sets in the outer margin, so that page reserves the room
      // rather than letting the quote land on top of the second column.
      paddingRight: hasQuote ? space(11) : pad,
      gap: compact ? space(3) : space(2),
      // On a phone the page is the screen and the body genuinely cannot fit, so
      // the text page scrolls there. Horizontal swipe still turns the page,
      // because the swipe handler ignores gestures that are mostly vertical.
      overflowY: compact ? 'auto' : 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: space(3), minHeight: 22 }}>
        <div style={{ ...utility, fontSize: 10.5, color: c, letterSpacing: '0.2em' }}>
          {spread.kicker}
        </div>
      </div>

      {/* Headline: display face, two lines max at the largest spread size. If it
          wraps to three the copy is too long and gets flagged rather than shrunk. */}
      <h2 style={{
        margin: 0, fontFamily: face.display, fontStyle: 'italic', fontWeight: 400,
        fontSize: compact ? 'clamp(22px, 6vw, 28px)' : 'clamp(20px, 3.4vh, 29px)',
        lineHeight: 1.1, color: color.ink, letterSpacing: '-0.005em',
      }}>
        {spread.headline}
      </h2>

      <div style={{ width: 42, height: 2, background: c, margin: `${space(1)} 0` }} />

      {/* Two balanced columns on the wide book, the coffee-table idiom, and the
          thing that actually made the copy fit without shrinking it to nothing.
          One column on a phone, where there is no width to divide. */}
      <ResolvedText
        as="div"
        text={spread.body}
        figures={topic.figures}
        context={ctx}
        style={{
          ...bodyType,
          margin: 0,
          ...(compact ? {} : { columnCount: 2, columnGap: space(6), columnFill: 'balance' }),
        }}
      />

      {/* The anchor number: the largest element on the page, bottom-left, label
          beside it. One per spread. */}
      <div style={{
        marginTop: 'auto', paddingTop: space(3), display: 'flex', alignItems: 'flex-end', gap: space(3),
        borderTop: `1px solid ${paper.ruleSoft}`,
      }}>
        <ResolvedText
          text={spread.anchor.value}
          figures={topic.figures}
          context={ctx}
          style={{
            fontFamily: face.display, fontStyle: 'italic', fontWeight: 400,
            fontSize: compact ? 'clamp(36px, 11vw, 52px)' : 'clamp(30px, 5.4vh, 50px)',
            lineHeight: 0.9, color: c, whiteSpace: 'nowrap',
          }}
        />
        <div style={{
          ...utility, fontSize: 9, letterSpacing: '0.14em', color: color.inkSoft,
          lineHeight: 1.45, maxWidth: '24ch', paddingBottom: 5,
        }}>
          <ResolvedText text={spread.anchor.label} figures={topic.figures} context={ctx} />
        </div>
      </div>

      {/* Pull quote, set in the outer margin, rotated. Hidden on compact, where
          there is no outer margin to set it in. */}
      {spread.pullQuote && !compact && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', right: 10, top: '12%', height: '76%',
            writingMode: 'vertical-rl', transform: 'rotate(180deg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderTop: `1px solid ${c}66`, borderBottom: `1px solid ${c}66`,
            padding: `${space(4)} 0`,
            ...utility, fontSize: 10, letterSpacing: '0.14em', color: c,
            textTransform: 'none', fontWeight: 700, maxHeight: '76%', overflow: 'hidden',
          }}
        >
          {spread.pullQuote}
        </div>
      )}
    </div>
  );
}
```

`GraphicPage`, with the series-specific device branch cut:

```jsx
export function GraphicPage({ spread, topic, actInk, compact }) {
  const g = spread.graphic;
  const pad = compact ? space(6) : space(8);

  const art = g.type === 'chart'
    ? <Chart asset={g.asset} figures={topic.figures} actInk={actInk} series={topic.chartSeries?.[g.asset]} alt={g.alt} />
    : <Art asset={g.asset} alt={g.alt} actInk={actInk} />;

  return (
    <div {...PAGE_ATTR} style={{ ...PAGE, padding: pad, justifyContent: 'center', gap: space(3) }}>
      <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: space(2), minHeight: 0 }}>
        {art}
        <figcaption style={{
          fontFamily: face.body, fontSize: 11, lineHeight: 1.45, color: color.inkSoft,
          borderTop: `1px solid ${paper.rule}`, paddingTop: space(2),
        }}>
          <ResolvedText text={g.caption} figures={topic.figures} context={{ topic: topic.slug, spread: spread.n }} />
        </figcaption>
      </figure>
    </div>
  );
}
```

`ActCard` and `BlankPage`:

```jsx
export function ActCard({ act, compact }) {
  const c = ink(act.ink);
  return (
    <div {...PAGE_ATTR} style={{ ...PAGE, padding: compact ? space(7) : space(10), justifyContent: 'center', gap: space(5) }}>
      <div style={{
        fontFamily: face.display, fontStyle: 'italic', fontSize: compact ? 76 : 104,
        lineHeight: 0.85, color: c,
      }}>
        {act.numeral}
      </div>
      <div style={{ width: 64, height: 2, background: c }} />
      <div style={{
        fontFamily: face.display, fontStyle: 'italic',
        fontSize: compact ? 'clamp(26px, 7vw, 34px)' : 'clamp(28px, 3vw, 42px)',
        lineHeight: 1.12, color: color.ink,
      }}>
        {act.title}
      </div>
      <div style={{ ...utility, fontSize: 11, letterSpacing: '0.22em', color: color.inkSoft }}>
        {act.years}
      </div>
    </div>
  );
}

export function BlankPage() {
  return <div {...PAGE_ATTR} style={{ ...PAGE }} aria-hidden="true" />;
}
```

### 3g. Navigation

**Breakpoint, in JS** (see section 6, I would not do this again):

```jsx
function useIsWide(px = 900) {
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${px}px)`);
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [px]);
  return wide;
}
```

**Keyboard:**

```jsx
useEffect(() => {
  const onKey = (e) => {
    if (contents && e.key === 'Escape') { setContents(false); return; }
    if (e.target && ['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); go('fwd'); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go('back'); }
    else if (e.key === 'Home') { e.preventDefault(); jumpTo(0); }
    else if (e.key === 'End') { e.preventDefault(); jumpTo(leaves.length - 1); }
    else if (e.key === 'Escape') { router.push(`/why-expensive/${topic.slug}`); }
  };
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}, [go, jumpTo, leaves.length, router, topic.slug, contents]);
```

**Swipe:**

```jsx
const touch = useRef(null);
const onTouchStart = (e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
const onTouchEnd = (e) => {
  if (!touch.current) return;
  const dx = e.changedTouches[0].clientX - touch.current.x;
  const dy = e.changedTouches[0].clientY - touch.current.y;
  touch.current = null;
  // Mostly-vertical gestures are left alone so the text page can still scroll
  // on a phone.
  if (Math.abs(dx) < 46 || Math.abs(dx) < Math.abs(dy)) return;
  go(dx < 0 ? 'fwd' : 'back');
};
```

Bound on the outer `<main>`, not the book, so a swipe starting off the page still
registers.

**Click anywhere on a page to turn it:**

```jsx
// The whole right page goes forward and the whole left page goes back, which is
// what a book does. This is one handler on the container rather than two
// overlay buttons, because overlays sat above the prose and would have
// swallowed every source chip and link on the page.
const bookRef = useRef(null);
const down = useRef(null);

const onPointerDown = (e) => { down.current = { x: e.clientX, y: e.clientY }; };

const onBookClick = (e) => {
  // Anything interactive keeps its own click: source chips, the handoff link.
  if (e.target.closest && e.target.closest('button, a, input, textarea, select, [role="dialog"]')) return;
  const d = down.current;
  down.current = null;
  // A drag is a selection gesture, not a page turn.
  if (d && (Math.abs(e.clientX - d.x) > 6 || Math.abs(e.clientY - d.y) > 6)) return;
  if (typeof window.getSelection === 'function' && String(window.getSelection()).trim()) return;
  const r = bookRef.current?.getBoundingClientRect();
  if (!r) return;
  // Wide: split at the gutter. Compact: one page, so a narrow left strip goes
  // back and the rest goes forward.
  const boundary = wide ? r.left + r.width / 2 : r.left + r.width * 0.28;
  go(e.clientX < boundary ? 'back' : 'fwd');
};
```

**Spread counter, prev/next, and the act rail:**

```jsx
<div style={{ display: 'flex', alignItems: 'center', gap: space(3), ...utility, fontSize: 10.5, color: color.inkSoft }}>
  {/* The real Previous/Next controls. The page itself is clickable, but that is
      a mouse affordance; these are what keyboard and screen-reader users reach. */}
  <button className="wx-focus" aria-label="Previous page" onClick={() => go('back')}
    disabled={pos.idx === 0 && pos.half === 0}
    style={{ background: 'none', border: 'none', cursor: pos.idx === 0 ? 'default' : 'pointer',
             padding: `0 ${space(1)}`, fontSize: 15, lineHeight: 1,
             color: pos.idx === 0 ? color.line : color.inkSoft }}>‹</button>

  {spreadNo ? (
    <>
      <span style={{ color: color.ink }}>{spreadNo}</span>
      <span>/ {total}</span>
      {/* The half-step on mobile: a spread is two swipes, and the counter still
          counts spreads. */}
      {!wide && (
        <span aria-hidden="true" style={{ display: 'inline-flex', gap: 3, marginLeft: 4 }}>
          <i style={{ width: 5, height: 5, borderRadius: 5, background: actInk, opacity: pos.half === 0 ? 1 : 0.3 }} />
          <i style={{ width: 5, height: 5, borderRadius: 5, background: actInk, opacity: pos.half === 1 ? 1 : 0.3 }} />
        </span>
      )}
    </>
  ) : (
    <span style={{ color: actInk }}>Act {leaf?.act?.numeral}</span>
  )}

  <button className="wx-focus" aria-label="Next page" onClick={() => go('fwd')}
    disabled={pos.idx === leaves.length - 1 && (wide || pos.half === 1)}
    style={{ background: 'none', border: 'none',
             cursor: pos.idx === leaves.length - 1 ? 'default' : 'pointer',
             padding: `0 ${space(1)}`, fontSize: 15, lineHeight: 1,
             color: pos.idx === leaves.length - 1 ? color.line : color.inkSoft }}>›</button>
</div>

{/* The act rail: a segmented progress bar that is also a jump control. Each
    segment is sized proportionally to the spreads in its act. */}
<div role="tablist" aria-label="Acts" style={{ display: 'flex', gap: 3, width: '100%' }}>
  {topic.acts.map((a) => {
    const here = leaf?.act?.numeral === a.numeral;
    const i = leaves.findIndex((l) => l.kind === 'act' && l.act.numeral === a.numeral);
    return (
      <button key={a.numeral} role="tab" aria-selected={here} className="wx-focus"
        onClick={() => jumpTo(i)} title={`Act ${a.numeral}. ${a.title}, ${a.years}`}
        style={{
          flex: a.spreads.length,
          height: 5, border: 'none', padding: 0, cursor: 'pointer',
          background: here ? ink(a.ink) : `${ink(a.ink)}3D`,
          borderRadius: 2,
        }}>
        <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
          Act {a.numeral}, {a.title}
        </span>
      </button>
    );
  })}
</div>
```

`spreadNo` and the accessible label:

```jsx
const total = topic.spreadCount;
const spreadNo = leaf?.kind === 'spread' ? String(leaf.spread.n).padStart(2, '0') : null;
const ariaLabel = leaf?.kind === 'spread'
  ? `Spread ${leaf.spread.n} of ${total}: ${leaf.spread.headline}`
  : `Act ${leaf?.act?.numeral}: ${leaf?.act?.title}, ${leaf?.act?.years}`;
```

**Chapter jump: the Contents dialog.** Grouped by act, every spread a card, current
one outlined in the act ink:

```jsx
function Contents({ topic, leaves, current, onPick, onTextOnly, onClose }) {
  return (
    <div role="dialog" aria-modal="true" aria-label="Contents"
      style={{
        position: 'fixed', inset: 0, zIndex: 40, background: `${color.bg}F5`,
        overflowY: 'auto', padding: `${space(10)} ${space(5)} ${space(16)}`,
      }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* header with Text only + Close omitted for length */}
        {topic.acts.map((a) => (
          <div key={a.numeral} style={{ marginBottom: space(8) }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: space(3), marginBottom: space(3) }}>
              <span style={{ fontFamily: face.display, fontStyle: 'italic', fontSize: 26, color: ink(a.ink) }}>{a.numeral}</span>
              <span style={{ ...utility, fontSize: 11, color: color.ink, letterSpacing: '0.16em' }}>{a.title}</span>
              <span style={{ ...utility, fontSize: 9.5, color: color.inkSoft }}>{a.years}</span>
            </div>
            <div style={{ display: 'grid', gap: space(3), gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
              {a.spreads.map((n) => {
                const i = leaves.findIndex((l) => l.kind === 'spread' && l.spread.n === n);
                const s = leaves[i]?.spread;
                if (!s) return null;
                return (
                  <button key={n} className="wx-focus" onClick={() => onPick(i)}
                    style={{
                      textAlign: 'left', cursor: 'pointer', background: paper.stock,
                      border: `1px solid ${i === current ? ink(a.ink) : paper.rule}`,
                      borderTop: `3px solid ${ink(a.ink)}`,
                      padding: space(4), display: 'flex', flexDirection: 'column', gap: space(2),
                    }}>
                    <span style={{ ...utility, fontSize: 9, color: ink(a.ink) }}>
                      {String(n).padStart(2, '0')} · {s.kicker}
                    </span>
                    <span style={{ fontFamily: face.display, fontStyle: 'italic', fontSize: 16, lineHeight: 1.15, color: color.ink }}>
                      {s.headline}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Deep link, read on the client after mount:**

```jsx
useEffect(() => {
  const n = new URLSearchParams(window.location.search).get('spread');
  if (!n) return;
  const i = leaves.findIndex((l) => l.kind === 'spread' && l.spread.n === Number(n));
  if (i > 0) setPos({ idx: i, half: 0 });
}, [leaves]);
```

**Chrome auto-hide.** Only the bottom chrome hides. The top chrome never does,
because auto-hiding the exit meant that three seconds into the book there was no way
out on screen and no sign there had ever been one:

```jsx
useEffect(() => {
  let t;
  const wake = () => {
    setChromeHidden(false);
    clearTimeout(t);
    t = setTimeout(() => setChromeHidden(true), 3000);
  };
  wake();
  const evs = ['pointermove', 'pointerdown', 'keydown', 'touchstart', 'wheel'];
  evs.forEach((e) => window.addEventListener(e, wake, { passive: true }));
  return () => {
    clearTimeout(t);
    evs.forEach((e) => window.removeEventListener(e, wake));
  };
}, []);
```

---

## 4. CONTENT PIPELINE

### Markdown is not parsed. Anywhere. At any time.

There is **no markdown dependency in `package.json`** and no runtime parser. Content
is **hand-authored JSON**, statically imported, validated at build time by the
bundler. Prose reaches a page as a plain string on a spread record, rendered through
one component that expands `{{TOKEN}}` references.

That is the single biggest thing to decide differently if your content starts as
markdown. My recommendation, stated plainly: **write a build-time converter that
emits this exact JSON shape** rather than adding a runtime parser or changing the
reader's input. The reader then stays byte-for-byte the proven thing, and your
authoring format is free to be whatever you like.

### One real content record, verbatim

`data/why-expensive/prescription-drugs/spreads.json`, spread 3:

```json
{
  "n": 3,
  "act": "I",
  "kicker": "The success",
  "headline": "The most successful cost control nobody credits",
  "body": "The generic half worked spectacularly. Unbranded generics now account for {{GENERIC_VOLUME}} of American prescription volume, against {{GENERIC_VOLUME_OECD}} in comparison countries, while making up only {{GENERIC_SPEND}} of American drug spending. The remainder of the volume is branded generics, a small third category at {{BRANDED_GENERIC_VOLUME}}. And American generic prices are not merely competitive, they are lower: {{GENERIC_MULTIPLE}} for every dollar paid in thirty-three comparison countries, on the same study and the same basis as every brand figure in this piece. Prices fall about {{GENERIC_DROP_3}} once three competitors enter and {{GENERIC_DROP_10}} within three years once ten are supplying. Nine of every ten prescriptions filled in this country are filled at some of the cheapest prices on earth. That is a genuine policy triumph, and it is almost never mentioned in an argument about drug costs.",
  "anchor": {
    "value": "{{GENERIC_VOLUME}}",
    "label": "Of American prescriptions, filled at some of the lowest prices in the world"
  },
  "graphic": {
    "type": "chart",
    "asset": "volume-vs-spend",
    "alt": "Paired bars for three categories on a shared scale, each showing its share of American prescriptions and then its share of prescription dollars. Unbranded generics are 90 percent of prescriptions and 8 percent of dollars; brand-name originators are 7 percent of prescriptions and 87 percent of dollars.",
    "caption": "Each category drawn twice. The long bar changes ends."
  },
  "pullQuote": "Nine of every ten prescriptions in this country are filled at some of the cheapest prices on earth.",
  "machine": []
}
```

The `acts` array from the same file:

```json
[
  {
    "numeral": "I",
    "title": "The Grand Bargain",
    "years": "1984",
    "ink": "sky",
    "spreads": [1, 2, 3]
  },
  {
    "numeral": "II",
    "title": "The Other Half of the Bargain",
    "years": "1984 to today",
    "ink": "mint",
    "spreads": [4, 5, 6, 7]
  }
]
```

Body copy is **one string, no newlines, no inline markup.** Measured across one
topic: 667 to 961 characters after token expansion. That range is not a style
guide, it is what fits the two-column page at the given type scale without
overflowing, and overflow is silently clipped on desktop.

### Figures and the token resolver

`figures.json` is a flat map. A real entry:

```json
"GENERIC_MULTIPLE": {
  "value": "67 cents",
  "raw": 0.67,
  "source": "RAND for ASPE: American unbranded generic prices are 67 percent of prices in 33 comparison countries",
  "sourceUrl": "https://www.rand.org/pubs/research_reports/RRA788-3.html",
  "asOf": "2022 data",
  "status": "verified"
}
```

```js
export const SEG = { TEXT: 'text', FIGURE: 'figure', PENDING: 'pending', MISSING: 'missing' };

// 'pending' means the token exists but is not verified yet: we know what we do
// not know. 'missing' means the copy references a token that figures.json has
// never heard of, which is an authoring error and a louder failure.
export function resolveTokens(text, figures) {
  if (!text) return [];
  const out = [];
  let last = 0;
  let m;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(text)) !== null) {
    if (m.index > last) out.push({ type: SEG.TEXT, value: text.slice(last, m.index) });
    const token = m[1];
    const entry = figures?.[token];
    if (!entry) {
      out.push({ type: SEG.MISSING, token });
    } else if (entry.status !== 'verified') {
      out.push({ type: SEG.PENDING, token, entry });
    } else {
      out.push({ type: SEG.FIGURE, token, entry });
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ type: SEG.TEXT, value: text.slice(last) });
  return out;
}

// Plain-string resolution, for places that cannot render segments: alt text,
// share-card canvas, page <title>, the visually-hidden chart data tables.
// Unverified and unknown tokens degrade to a readable marker rather than
// leaking a raw {{TOKEN}} into a screen reader.
export function resolveToString(text, figures) {
  return resolveTokens(text, figures)
    .map((s) => {
      if (s.type === SEG.TEXT) return s.value;
      if (s.type === SEG.FIGURE) return s.entry.value;
      if (s.type === SEG.PENDING) return 'a figure still being verified';
      return 'a missing figure';
    })
    .join('');
}
```

`TOKEN_RE` is `/\{\{([A-Z0-9_]+)\}\}/g`, so tokens are **uppercase, digits and
underscore only**: a lowercase `{{token}}` is not matched and passes through as
literal text. A verified figure renders as a tappable chip
showing source and date; an unverified one renders a visible "FIGURE PENDING"
marker. **A number is never allowed to be silently wrong or silently absent.** Drop
this whole system if your chapters carry no numbers, but keep the idea if they do.

### How images are resolved: filename convention, hardcoded directory

The content record holds a **bare asset name**. The component builds the path:

```jsx
export function Art({ asset, alt, actInk = 'primary', aspect = '1 / 1' }) {
  const [ref, failed, markFailed] = useBrokenImage();
  const src = `/assets/why-expensive/${asset}.jpg`;

  if (!asset || failed) {
    return <EngravedPlate actInk={actInk} label={`${asset}.jpg`}
      note="Drop the plate into public/assets/why-expensive/ and it appears here." aspect={aspect} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      onError={markFailed}
      style={{
        display: 'block', width: '100%', aspectRatio: aspect, objectFit: 'contain',
        background: paper.stock,
      }}
    />
  );
}
```

So: **one flat directory, one extension, both hardcoded.** You cannot place an image
elsewhere or use another format without editing the component. That was a fine trade
for 134 plates of one kind; name it a decision rather than inheriting it by accident.

JPEG, not PNG or WebP, for a measured reason: these are opaque engravings on a paper
ground so there is no transparency to keep, and the fine cross-hatching plus paper
grain is high-entropy enough that a 160-colour quantised PNG came out **three times
larger** and WebP came out the **same size**, which makes a second format pure
complexity.

**The broken-image hook, which is subtler than it looks and cost real time:**

```jsx
// onError is not enough on its own, and this is why both fallbacks need a ref
// as well as a handler.
//
// A server-rendered <img> whose file is missing fires its error event during the
// browser's own parse, BEFORE React hydrates and attaches any listener, so
// onError never runs and the broken-image glyph stays on screen forever. That is
// exactly the case on the series index and the topic hero, both of which render
// on the server. It works by accident for spread illustrations because those
// mount client-side inside the flip book, which is why Art looked correct for
// nine topics while carrying the same latent hole.
//
// A decoded image always reports complete with a non-zero naturalWidth, so a
// single check on mount catches whatever the event missed. Both paths are kept:
// the ref covers the pre-hydration failure and the handler covers a later one.
function useBrokenImage() {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  return [ref, failed, () => setFailed(true)];
}
```

---

## 5. TYPOGRAPHY AND LAYOUT

### Fonts, and where they load from

`next/font/google`, self-hosted at build time. No runtime request to Google, no FOUT
beyond `display: swap`.

```jsx
// app/layout.js
import { Nunito, DM_Serif_Display } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-dm-serif',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${nunito.variable} ${dmSerif.variable}`}>
      <body style={{ fontFamily: 'var(--font-nunito), system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
```

**Two faces, and only two.** DM Serif Display is loaded *italic only, weight 400*,
because it is never used upright anywhere in the book.

### The type scale

```js
export const face = {
  display: 'var(--font-dm-serif), Georgia, serif',
  body: 'var(--font-nunito), system-ui, sans-serif',
};

// The "utility face" for kickers, spread counters, source chips and resolved
// figures is Nunito at heavy weight with wide tracking and caps. A third webfont
// would buy very little here and cost a real amount of load on a reading
// product, and letterspaced caps already reads as utility across the rest of the
// site.
export const utility = {
  fontFamily: face.body,
  fontWeight: 800,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
};

// Body type. Ragged right, hyphenation off, never justified.
//
// Sized in vh, not px, and that is deliberate. The book is height-constrained on
// any laptop, so the amount of room the body actually has is a function of
// viewport HEIGHT. A fixed 17px fits a 900px-tall window and overflows a 720px
// one, which is exactly what happened. Scaling with vh makes the page fit by
// construction instead of by luck, and the clamp keeps it readable at both ends.
export const bodyType = {
  fontFamily: face.body,
  fontSize: 'clamp(13.5px, 2.05vh, 16.5px)',
  lineHeight: 1.52,
  textAlign: 'left',
  hyphens: 'none',
  color: color.ink,
};

// Long-form surfaces (briefing, text-only) are scroll documents, not fixed
// pages, so they keep a generous single-column measure and a fixed size.
export const proseType = {
  fontFamily: face.body,
  fontSize: 'clamp(16px, 1.15vw, 18px)',
  lineHeight: 1.62,
  maxWidth: '68ch',
  textAlign: 'left',
  hyphens: 'none',
  color: color.ink,
};
```

The hierarchy on a spread, top to bottom:

| Element | Face | Size | Notes |
|---|---|---|---|
| Kicker | utility (Nunito 800 caps, 0.2em) | 10.5px | Act ink |
| Headline | DM Serif italic 400 | `clamp(20px, 3.4vh, 29px)` wide · `clamp(22px, 6vw, 28px)` compact | Two lines max; three means the copy is too long |
| Rule | none | 42×2px | Act ink |
| Body | Nunito 400 | `clamp(13.5px, 2.05vh, 16.5px)` / 1.52 | Two balanced columns wide, one compact |
| Anchor value | DM Serif italic 400 | `clamp(30px, 5.4vh, 50px)` | Largest thing on the page, act ink, `lineHeight: 0.9` |
| Anchor label | utility | 9px, `maxWidth: '24ch'` | |
| Caption | Nunito 400 | 11px / 1.45 | Above a hairline rule |
| Pull quote | utility, `textTransform: none`, 700 | 10px | Vertical, outer margin, wide only |
| Act numeral | DM Serif italic | 104px wide · 76px compact | `lineHeight: 0.85` |

**Everything vertical is in `vh`; everything horizontal is in `ch` or `%`.** That is
the whole responsive strategy inside a page.

### Colour

```js
// lib/design/tokens.js
bg:      '#F7F3EF'   // site ground
ink:     '#2A2530'   // near-black body
inkSoft: '#6A6270'   // secondary
primary: '#6B52C8'   // violet
gold:    '#C7A252'
line:    '#E4DDD4'
swan: { stable: '#7FA9D6', durable: '#6FB79A', crisis: '#E5735B' }

export const space = (n) => `${n * 4}px`;
```

```js
// lib/whyExpensive/series.js
export const ACT_INK = {
  sky: color.swan.stable,      // #7FA9D6
  mint: color.swan.durable,    // #6FB79A
  gold: color.gold,            // #C7A252
  coral: color.swan.crisis,    // #E5735B
  primary: color.primary,      // #6B52C8
};

export function ink(name) {
  return ACT_INK[name] || color.primary;
}

// stock is EXACTLY the paper ground baked into the plates. The plates arrived in
// two clusters, warmer at ~#F3E7D1 and lighter at ~#FBF3E8, so no single page
// colour could meet all of them and every illustration showed a visible
// rectangle. All were remapped to this one value instead, so image ground meets
// page stock with no seam. Change this and you have to re-normalise the plates:
// they are a matched pair.
export const PAPER_GROUND = '#F7EFE0';

export const paper = {
  stock: PAPER_GROUND,
  stockEdge: '#EFE5D2',      // the sliver visible in the edge stack
  gutterShadow: 'rgba(42,37,48,0.20)',
  rule: '#DCD0BA',           // hairline rules printed on the stock
  ruleSoft: '#E8DEC9',
};
```

**Act ink is never the only carrier of meaning.** The numeral and label ride with it
everywhere, so the book works in greyscale and for colourblind readers.

### Spread dimensions

```js
width: wide ? 'min(1300px, 100%, calc((100vh - 108px) * 1.9))' : 'min(560px, 100%)'
...(wide ? { aspectRatio: '1.9 / 1' } : { height: 'calc(100vh - 116px)' })
```

**1.9:1, a landscape coffee-table book, not the 3:2 it started as.** Height is the
binding constraint on any laptop, so for a fixed height a *wider* spread buys more
page area, and the plates are square so the graphic page needs only about its own
height in width. That combination is why the copy did not fit before and does now.

The `min()` with a `calc()` term is the important part. Setting `width: 100%` and
capping `maxHeight` **looks** like it works and silently breaks the ratio: the box
came out 1120×530, a 2.1:1 letterbox instead of the book. Drive the width from the
height the viewport allows, then let `aspectRatio` set the height.

Outer padding: `wide ? '44px 24px 64px' : '38px 10px 58px'`. Trimmed hard, because
the chrome is `position: fixed` and already overlays, so any padding reserved for it
came straight off the page the copy has to fit in.

### Mobile

The breakpoint is **900px**, and crossing it changes the object rather than
reflowing it:

| | Wide (≥900px) | Compact (<900px) |
|---|---|---|
| Book | 1.9:1, two pages | `calc(100vh - 116px)`, one page |
| A leaf | one turn | **two swipes** (`half: 0` graphic, `half: 1` text) |
| Body | two balanced columns | one column |
| Text page overflow | `hidden` | `auto`, it scrolls |
| Pull quote | vertical, outer margin | not rendered |
| Turn axis | about the gutter, ±180deg | about the inner edge, ±170deg |
| Click boundary | 50% | 28% |
| Counter | `03 / 15` | `03 / 15` plus two half-step dots |

`gridTemplateColumns: wide ? '1fr 1fr' : '1fr'` is the only structural difference in
the base layer.

---

## 6. WHAT I WOULD DO DIFFERENTLY

The most useful section, as you said. Ordered by how much I would change it.

### 6.1 Inline styles only was the wrong constraint, and it leaks

Inline styles cannot express a media query, a pseudo-class, or a keyframe. So the
"no CSS file" rule produced a CSS file anyway, containing exactly the things that
could not be inlined: every keyframe, `.wx-focus:focus-visible`, `.wx-chrome`, the
reduced-motion overrides, and one grid rule with a comment admitting defeat:

```css
/* Inline styles cannot carry a media query, and this project is inline-styles
   only, so the one rule that genuinely needs a breakpoint lives here. */
```

Worse, it forced the **JS breakpoint** in 6.2. **Use CSS modules or a small
stylesheet from the first commit.** Keep the design tokens as JS objects for
computed values, but let CSS do the things CSS does. This one decision is upstream
of most of the other items in this section.

### 6.2 `useIsWide` should be a media query, not React state

```jsx
const [wide, setWide] = useState(true);   // ← defaults to desktop
```

That default is a guess made before the browser is measured, and it is wrong on
every phone. `matchMedia` is only read in an effect, i.e. after mount, so a phone
renders the **two-page desktop layout for one frame** and then snaps to one page. It
also means the server output is always the desktop layout, so the markup a crawler
sees is not what a phone gets.

Rebuild: render both arrangements and let a CSS media query or a container query
choose, or accept a layout shift only where it is genuinely unavoidable. The whole
`compact` prop threaded through every page component exists to serve this and would
mostly evaporate.

### 6.3 Sizing body copy in `vh` is a clever workaround for a missing container query

`clamp(13.5px, 2.05vh, 16.5px)` ties type size to *viewport* height, but what
actually constrains the text is the *page* height. Those coincide only because the
book is sized from the viewport. The moment you embed a reader in a column, a modal,
or a two-up print preview, the coupling is wrong. **Use container queries and size
against the page element.** They are well supported now and were the right tool the
whole time.

### 6.4 Text overflow is silently clipped, with no build-time guard

`overflowY: 'hidden'` on the wide text page. If body copy runs long, **the end of
the paragraph simply is not there**, with no warning in dev, no test failure, and
nothing in the build output. The only reason this never shipped broken is a manual
DOM sweep asserting `scrollHeight <= clientHeight` on `[data-wx-page]`, which is
also the reason that attribute exists:

```js
// data-wx-page is a verification hook, not decoration. Screenshots have never
// worked in this environment, so every layout claim about this book is a DOM
// measurement, and the standing sweep needs one stable selector for "a page".
const PAGE_ATTR = { 'data-wx-page': '' };
```

Rebuild: make it a **real automated check.** Render every spread in a headless
browser during CI and fail the build on overflow. Manual vigilance is not a
mechanism, and one distracted afternoon is all it takes.

### 6.5 The turn state machine wants a reducer

Six refs (`animating`, `posRef`, `reduced`, `safety`, `queue`, `onAnimEndRef`)
coordinate one state machine, and every one exists to work around a stale closure.
The single-slot queue, the safety timeout, the `onAnimEndRef` forward reference, and
the `posRef` shadow of `pos` are all symptoms of the same problem. The bug this
produced was real and user-visible: **two clicks advanced one page.**

Rebuild as an explicit reducer with states `idle | turning`, and let the animation's
end dispatch a transition. Then `queue` is one field, `animating` is derived, and
nothing needs a mirror ref.

### 6.6 Reduced motion needed a JS branch to avoid a deadlock, which is a smell

```jsx
// Reduced motion mounts no sheet at all. It has to be handled here and not
// only in CSS: the stylesheet sets .wx-sheet to display:none, which means
// animationend never fires, which would latch the turning flag true forever
// and freeze navigation after one turn.
if (reduced.current) { setPos(target); return; }
```

Any design where "animation completed" is the only path out of a state will deadlock
the moment the animation does not run: reduced motion, `display: none`, a background
tab, a hidden pane. Related, and worth knowing on its own:

```jsx
// A timer, not requestAnimationFrame. rAF is paused entirely while the page is
// not compositing (a background tab, or a hidden pane), which silently
// swallowed every queued turn.
```

Rebuild: **never make an animation event the sole state transition.** Drive it with
a timer you own, or treat the animation as decoration over a state change that has
already happened.

### 6.7 A 3D transform breaks `position: fixed` for every descendant

This one is a genuine trap and I would warn anyone building a curl:

```jsx
// The chip renders through a PORTAL. The book page sits inside a CSS 3D
// transform, and a transformed ancestor becomes the containing block even for
// position: fixed, so a chip rendered in place would be dragged along by the
// page curl and clipped by the gutter. Portalling to the body sidesteps all of
// that, at the cost of having to measure the anchor ourselves.
```

Any tooltip, popover, dropdown or dialog inside the book must portal to `document.body`
and be positioned by hand from a measured `getBoundingClientRect`. Budget for that.
Better: keep the 3D transform on a wrapper that contains *only* the animating
sheets, never the live page content.

### 6.8 `Chart.js` is 243 KB in one module and all of it ships

Fifty chart components in a single file behind a `switch`, imported by
`SpreadPage.js`, which the reader always loads. **Every reader downloads every chart
in the series** to render the four in front of them.

Rebuild: one module per chart plus `next/dynamic`, or a registry of lazy imports.
This is the single largest performance win available and it was pure inertia.

### 6.9 The static-import registry does not scale

`lib/whyExpensive/data.js` is ~100 lines of hand-written imports, four per topic plus
one per chart. Twelve topics made it tedious; seventeen chapters with several charts
each will make it a liability, and every new file is a chance to forget a line and
silently drop a chart.

The build-time-validation benefit is real and worth keeping. **Generate the registry**
with a script that walks the data directory, and commit the generated file so the
bundler still sees static imports.

### 6.10 `spreadCount` has two sources of truth

`topics.json` carries `spreadCount` for the tile; `loadTopic` computes
`spreads.length` for the reader. Nothing checks they agree. Delete the manifest field
and derive it, or assert equality in the lint gate.

### 6.11 The deep link flashes spread 1

`?spread=N` is parsed in an effect after mount, so a shared link paints spread 1,
then jumps. Justified at the time to keep the route static, and the trade is
defensible, but a route segment (`/read/3`) would be static *and* correct, with the
spread in the URL path where it can be prerendered.

### 6.12 The edge stack caps at nine

`Math.min(9, count)` means the stack stops carrying information past nine leaves, so
in a 31-leaf book it reads "lots" for the middle two thirds. Fine for a 15-spread
topic and worth revisiting for a longer book: scale the sliver width down as the
count grows, or map count to a non-linear width.

### 6.13 The counter counts spreads while the position counts leaves

`total = topic.spreadCount` excludes act cards, but `pos.idx` indexes leaves
including them. So on an act card the counter shows "Act II" instead of a number,
and `pos.idx` never equals the displayed spread number. Deliberate, and it made both
the "which page am I on" logic and the contents lookup fiddlier than they needed to
be. If your chapters do not need interstitials, **drop the act layer entirely** and
let one leaf be one spread. Most of `buildLeaves`, the act rail and the counter
branching disappear with it.

### 6.14 One paper colour is welded to every image on disk

```js
// Change this and you have to re-normalise the plates: they are a matched pair.
export const PAPER_GROUND = '#F7EFE0';
```

134 images were batch-remapped so their paper ground matches the page exactly. It
looks superb and there is no seam anywhere. It also means the page colour is now
effectively immutable, and a plate from any other source needs processing before it
can be used.

If your art has a transparent background, use PNG or SVG and let the page colour
show through. Then paper colour is a one-line change forever. I would take that
trade in a new build.

### 6.15 What I would keep without changing a line

- **The edge stack.** Cheapest, most effective cue in the whole thing. It works
  because it *changes as you read*, which no static skeuomorphism does.
- **The two shadow layers**, one on the sheet's own face and one cast on the page
  beneath. This is what stops the curl reading as a card flip.
- **`feTurbulence` grain as a data URI.** No asset, no request, no seam.
- **Click-to-turn on the container with a `closest()` guard**, rather than overlay
  hit zones. Overlays would have swallowed every link and chip on the page.
- **Ignoring mostly-vertical swipes** so a scrolling text page still works on a phone.
- **The token/figures system.** If your content has numbers in it, this is the part
  worth stealing wholesale. A number that cannot be sourced renders as a visible
  admission rather than as a confident wrong answer.
- **The top chrome never auto-hiding.** The exit must always be on screen.
- **`data-wx-page`** as a stable measurement hook.

---

## 7. HOSTING AND BUILD

### Commands

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "node --test \"__tests__/**/*.test.mjs\""
}
```

Dependencies, complete:

```json
"dependencies": {
  "@anthropic-ai/sdk": "^0.82.0",
  "next": "14.2.0",
  "react": "^18",
  "react-dom": "^18",
  "sharp": "^0.35.3"
},
"devDependencies": {
  "eslint": "^8",
  "eslint-config-next": "14.2.0"
}
```

**The reader itself needs only `next`, `react`, `react-dom`.** The SDK is for
unrelated AI routes elsewhere in the app; `sharp` is for image processing. Tests are
the Node built-in runner, no framework.

### Output and host

- **Host: Vercel.** Not a static export: `output: 'export'` is not set, so the build
  produces `.next/` and Vercel serves it. The reader route is `force-static` with
  `generateStaticParams`, so every chapter is prerendered to static HTML anyway.
- **Output directory: `.next`.** Default, not configured.
- **No `vercel.json`.** No rewrites, no headers, no redirects, no function config.
- Deploys on push to `main`, no CI config file.

`next.config.js`, complete:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Client-side source maps in prod: worth the deploy size during active
  // build-out; flip off when freezing.
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
```

Note `productionBrowserSourceMaps: true` ships source maps publicly. Fine for this
project; turn it off if that matters to you.

### Route table from a real build

```
○ /why-expensive                          5.12 kB    318 kB
ƒ /why-expensive/[topic]                  3.01 kB    319 kB
ƒ /why-expensive/[topic]/briefing         2.87 kB    346 kB
● /why-expensive/[topic]/read             8.97 kB    352 kB
  ├ /why-expensive/higher-education/read
  ├ /why-expensive/housing/read
  └ [+10 more paths]
+ First Load JS shared by all             87.1 kB
```

**352 kB first load on the reader** is the number to beat, and section 6.8 is where
most of it is.

### Deploy gotchas, each of which cost real time

1. **Never run `next build` and `next dev` against the same checkout without
   clearing between.** A production `.next` left behind makes `dev` fail with
   `MODULE_NOT_FOUND` on `.next/server/webpack-runtime.js`, which looks like a code
   error and is not. Fix: `rm -rf .next`.
2. **A crashed dev server keeps its port.** `EADDRINUSE` on the next start. On
   Windows: `Get-NetTCPConnection -LocalPort <port> -State Listen` then
   `Stop-Process -Id <OwningProcess> -Force`.
3. **Vercel intermittently misses a push.** Always confirm the live site changed
   rather than assuming. Re-trigger with an empty commit or a dashboard redeploy.
4. **Verifying a deploy by checking an asset returns 200 is worthless if that
   filename already existed.** I did exactly this and it passed while production was
   still serving the old build. Grep the live HTML for a string only the new build
   can contain.
5. **The RSC payload embedded in the page includes every field of every imported
   JSON**, including comment-style keys. If you grep live HTML for a stale string,
   you will hit documentation that legitimately quotes the old wording. Check what
   matched before concluding anything.
6. **First hit on a route compiles it** and can take 30 seconds in dev. Warm every
   route before showing anyone.
7. **Fonts are self-hosted by `next/font`**, so a locked-down network at build time
   will fail the build when it tries to fetch them. Cache or vendor them if that is
   your situation.

---

## Minimum viable rebuild, in order

1. `layout.js` with the two fonts and one `globals.css` holding the keyframes.
2. `series.js` equivalent: inks, paper, turn timing, type scale.
3. One `spreads.json` with `acts` and two spreads, shaped exactly as section 4.
4. `SpreadPage.js`: `TextPage`, `GraphicPage`, `ActCard`, `BlankPage`, the shared
   `PAGE` object.
5. `FlipBook.js`: `buildLeaves`, position state, `go`, the base layer, `EdgeStack`,
   the sheet. Keyboard first, swipe and click after.
6. The index page and its manifest.
7. Then the extras, in the order they earn their keep: contents, deep links, share,
   chrome auto-hide, text-only fallback.

Steps 1 to 5 are a working reader. Everything after is polish.
