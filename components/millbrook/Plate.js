'use client';

import { useEffect, useRef, useState } from 'react';
import { color, paper, space, type } from '@/lib/millbrook/series';
import DERIVATIVES from '@/lib/millbrook/derivatives.json';

// Images resolve by slug from one flat directory at runtime. No manifest of
// paths, no imports, no build step. Dropping vol3-s04.png into
// public/images/ gives Volume 3 spread 4 a picture.
//
// Directory and extension are hardcoded here, which is the same trade Unbroke
// made. Naming it as a decision: to use a different location or format you
// edit this constant, not the data.
const DIR = '/images';
const EXT = 'png';

export const srcFor = (slug) => `${DIR}/${slug}.${EXT}`;

/**
 * The WebP srcset for a slug, or null when there is not one.
 *
 * **Null is the important case, and it is why this reads a manifest instead of
 * assuming a naming convention.** `<picture>` does not fall back on a network
 * failure — it chooses a `<source>` on type and media alone, and if that URL 404s
 * the image is simply broken. So emitting a guessed `.webp` path would turn every
 * newly-dropped plate into a broken picture until someone remembered to run the
 * build. Art lands in this directory continuously while an arc is being generated,
 * so that window is the normal state of the project, not an edge case.
 *
 * Reading the generated manifest means an unprocessed image renders exactly as it
 * did before this existed: the PNG, straight from `src`. Running `npm run images`
 * is then an optimisation rather than a repair.
 */
export function webpSrcSet(slug) {
  const widths = DERIVATIVES[`${slug}.${EXT}`];
  if (!widths?.length) return null;
  return widths.map((w) => `${DIR}/derived/${slug}-${w}.webp ${w}w`).join(', ');
}

/**
 * How wide this image will actually be drawn, per breakpoint.
 *
 * `sizes` is a promise made to the browser BEFORE layout exists, and it is the only
 * thing that decides which entry in the srcset gets fetched. Getting it wrong is
 * invisible in the DOM and expensive on the wire: the first version of this used the
 * plate's own value everywhere, and a volume cover that draws at 267px happily
 * downloaded the 1600px file. One `sizes` cannot serve a half-spread plate, a
 * quarter-width shelf card and a full-bleed banner — only the caller knows its own
 * layout, so the caller has to say.
 *
 * Over-estimating costs a larger file. Under-estimating costs a soft one. Prefer to
 * over-estimate at the boundary and get the breakpoints right.
 */
export const SIZES = {
  // Right page of a two-page spread above `geometry.breakpoint` (900), full column
  // below it.
  plate: '(max-width: 900px) 100vw, 50vw',
  // `.mb-shelf` is 1 column, 2 at 620px, 4 at 1080px, inside a 1320px max width.
  cover: '(max-width: 620px) 100vw, (max-width: 1080px) 50vw, 320px',
  // Banner and cast strip run the full width of the viewport.
  full: '100vw',
  // A cast portrait sits in a small fixed panel.
  portrait: '220px',
};

/**
 * onError alone is not enough, and this is why the fallback needs a ref as
 * well as a handler.
 *
 * A server-rendered <img> whose file is missing fires its error event during
 * the browser's own parse, BEFORE React hydrates and attaches any listener, so
 * onError never runs and the broken-image glyph stays on screen forever. A
 * decoded image always reports complete with a non-zero naturalWidth, so one
 * check on mount catches whatever the event missed.
 *
 * Both paths are kept: the ref covers the pre-hydration failure, the handler
 * covers a later one. Taken from extraction section 4, where it cost real time
 * to find.
 */
function useBrokenImage(slug) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);

  // Reset when the slug changes, or a page that once failed stays failed
  // after the reader turns to a spread whose image does exist.
  useEffect(() => { setFailed(false); }, [slug]);

  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, [slug]);

  return [ref, failed, () => setFailed(true)];
}

/**
 * The labelled placeholder shown wherever an image file is absent.
 *
 * This is not an error state. All 37 images are missing at the start of
 * production and the build brief requires all four books to be readable
 * throughout, so this is the normal appearance of an unfinished spread. It
 * prints the slug and the shot type, which is exactly what somebody needs in
 * order to go and generate the missing file.
 *
 * Deliberately not a loading state: nothing blocks on the image.
 */
export function PlatePlaceholder({ slug, shotType, aspect = '2 / 3', fullBleed = false }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder for ${slug}. Image not yet generated.`}
      style={{
        width: '100%',
        ...(fullBleed ? { height: '100%' } : { aspectRatio: aspect }),
        border: `1px solid ${paper.rule}`,
        background: `repeating-linear-gradient(
          45deg,
          ${paper.stock} 0px,
          ${paper.stock} 9px,
          ${paper.stockEdge} 9px,
          ${paper.stockEdge} 18px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: space(2),
        padding: space(5),
        textAlign: 'center',
      }}
    >
      <div style={{ ...type.utility, fontSize: 9, letterSpacing: '0.22em', color: color.inkSoft }}>
        Not yet generated
      </div>
      <div
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: 13,
          fontWeight: 700,
          color: color.ink,
          background: paper.stock,
          padding: `${space(1)} ${space(2)}`,
          border: `1px solid ${paper.rule}`,
        }}
      >
        {slug}.{EXT}
      </div>
      {shotType && (
        <div style={{ fontFamily: type.body.fontFamily, fontSize: 11.5, color: color.inkSoft, maxWidth: '30ch', lineHeight: 1.4 }}>
          {shotType}
        </div>
      )}
    </div>
  );
}

/**
 * A spread image. Falls back to the labelled placeholder when the file is
 * absent, which during production is most of the time.
 *
 * objectFit contain rather than cover: these are whole compositions and
 * cropping one to fill a box would cut the framing the prompt specified.
 */
export function Plate({
  slug,
  alt,
  shotType,
  aspect = '2 / 3',
  fullBleed = false,
  fit,
  // What shows in the letterbox when objectFit is contain and the plate's own aspect
  // does not match the box.
  //
  // Paper is right for a book page and wrong on a character card. The canonical sheets
  // carry a flat sandy ground of their own, so a paper letterbox drew a white band above
  // and below the figure and left the panel's matching colour visible only where the
  // image pixels actually were -- which is exactly the "white background" that survived
  // the first attempt at this fix. Making it a prop turns the letterbox colour into a
  // decision instead of an inherited default.
  ground = paper.stock,
  // An optional second slug to try before giving up. Used for covers: a volume
  // shows its dedicated cover art if one exists and its chapter opener if not,
  // so the shelf is never empty and dedicated covers can be added later without
  // a code change.
  fallbackSlug,
  // Which entry of the srcset the browser should fetch. See SIZES above — this is
  // load-bearing, not decoration, and the default is the commonest case rather than
  // a safe one.
  sizes = SIZES.plate,
}) {
  const [ref, failed, markFailed] = useBrokenImage(slug);
  const [fellBack, setFellBack] = useState(false);

  useEffect(() => { setFellBack(false); }, [slug]);

  const primaryGone = !slug || failed;
  const useFallback = primaryGone && fallbackSlug && !fellBack;
  const active = useFallback ? fallbackSlug : slug;

  if (primaryGone && !useFallback) {
    return <PlatePlaceholder slug={slug} shotType={shotType} aspect={aspect} fullBleed={fullBleed} />;
  }

  const srcSet = webpSrcSet(active);

  // The <img> keeps every behaviour it had: the ref, the error handler, the key, the
  // PNG in `src`. The <picture> only ever ADDS a cheaper option the browser may take.
  // Written this way round on purpose — the broken-image handling below cost real
  // time to get right, and none of it should depend on the derivative pipeline
  // having been run.
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={active}
      ref={useFallback ? undefined : ref}
      src={srcFor(active)}
      alt={alt || ''}
      onError={useFallback ? () => setFellBack(true) : markFailed}
      // Lazy everywhere except the plate the reader is looking at would be the
      // careful version; the reader only mounts the current spread and its
      // neighbours anyway, so `async` decoding is the part that actually helps —
      // it keeps a 1600px decode off the main thread during a page turn.
      decoding="async"
      style={{
        display: 'block',
        width: '100%',
        ...(fullBleed
          ? { height: '100%', objectFit: 'cover' }
          : { aspectRatio: aspect, objectFit: fit ?? 'contain' }),
        background: ground,
      }}
    />
  );

  if (!srcSet) return img;

  return (
    <picture key={active}>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      {img}
    </picture>
  );
}
