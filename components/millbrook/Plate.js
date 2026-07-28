'use client';

import { useEffect, useRef, useState } from 'react';
import { color, paper, space, type } from '@/lib/millbrook/series';

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
  // An optional second slug to try before giving up. Used for covers: a volume
  // shows its dedicated cover art if one exists and its chapter opener if not,
  // so the shelf is never empty and dedicated covers can be added later without
  // a code change.
  fallbackSlug,
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

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={active}
      ref={useFallback ? undefined : ref}
      src={srcFor(active)}
      alt={alt || ''}
      onError={useFallback ? () => setFellBack(true) : markFailed}
      style={{
        display: 'block',
        width: '100%',
        ...(fullBleed
          ? { height: '100%', objectFit: 'cover' }
          : { aspectRatio: aspect, objectFit: fit ?? 'contain' }),
        background: paper.stock,
      }}
    />
  );
}
