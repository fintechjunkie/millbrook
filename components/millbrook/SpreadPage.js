'use client';

import { Plate } from './Plate';
import { color, grainStyle, paper, space, type } from '@/lib/millbrook/series';

// data-mb-page is a verification hook, not decoration. The overflow check
// needs one stable selector for "a page" to measure against, and screenshots
// do not composite in this environment so every layout claim is a DOM
// measurement. Same reasoning as Unbroke's data-wx-page.
const PAGE_ATTR = { 'data-mb-page': '' };

/**
 * "4:3" or "16:9" from a spec prompt into a CSS aspect-ratio value.
 *
 * Parsed rather than mapped, so changing a ratio in the specs needs no code
 * change here. Falls back to 4:3, the standard image page ratio.
 */
function cssAspect(spec, fallback = '4 / 3') {
  const m = /^\s*(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)\s*$/.exec(spec ?? '');
  return m ? `${m[1]} / ${m[2]}` : fallback;
}

const PAGE = {
  position: 'relative',
  // height 100% is load-bearing rather than tidiness. Without it a page takes
  // only its content height and the site background shows through beneath,
  // which reads as a two-tone page rather than as one sheet.
  height: '100%',
  width: '100%',
  background: paper.stock,
  ...grainStyle,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};

/** The small page number at the foot of a page. */
function Folio({ n, align }) {
  if (!n) return null;
  return (
    <div
      aria-hidden="true"
      style={{
        ...type.utility,
        fontSize: 8.5,
        letterSpacing: '0.18em',
        color: color.inkSoft,
        textAlign: align,
        paddingTop: space(3),
        flex: 'none',
      }}
    >
      {n}
    </div>
  );
}

/**
 * The prose page. Always the LEFT page, never alternating.
 *
 * Fixed placement is the point: alternating looks more dynamic in a mock and
 * costs the reader a moment of orientation on every single turn.
 *
 * Typographic treatment is the fiction idiom rather than the article idiom:
 * paragraphs are indented and carry no vertical gap between them. On a page
 * with twenty-two paragraphs that is worth roughly 170px of height, which on
 * the densest page is the difference between fitting and not.
 *
 * overflowY is auto, never hidden. Unbroke clipped silently, which was
 * survivable because its copy was written to fit. This prose is verbatim and
 * cannot be shortened, so on a viewport too small for it the page must scroll.
 * Losing the end of a paragraph is not an acceptable failure here.
 */
export function TextPage({ spread, compact }) {
  const pad = compact ? space(6) : space(9);
  const pageNumbers = spread.pages ? spread.pages.split(/\s+to\s+/) : [];

  // Track whether we are at the first paragraph of a section, since that one
  // sets flush left and the rest indent.
  let atSectionStart = true;

  return (
    <div
      {...PAGE_ATTR}
      data-mb-kind="text"
      data-mb-spread={spread.n}
      className="mb-page"
      style={{ ...PAGE, padding: `${pad} ${pad} ${space(5)}` }}
    >
      <div
        data-mb-flow
        style={{
          ...type.body,
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {spread.blocks.map((b, i) => {
          if (b.t === 'h') {
            atSectionStart = true;
            return (
              <h3
                key={i}
                data-mb-section={b.v}
                style={{
                  ...type.heading,
                  margin: i === 0 ? `0 0 ${space(2)}` : `1.15em 0 0.5em`,
                }}
              >
                {b.v}
              </h3>
            );
          }

          if (b.t === 'i') {
            atSectionStart = true;
            return (
              <p key={i} style={{ margin: '1.3em 0 0', fontStyle: 'italic', textIndent: 0 }}>
                {b.v}
              </p>
            );
          }

          const indent = atSectionStart ? 0 : type.indent;
          atSectionStart = false;
          return (
            <p key={i} style={{ margin: 0, textIndent: indent }}>
              {b.v}
            </p>
          );
        })}
      </div>

      <Folio n={pageNumbers[0]} align="left" />
    </div>
  );
}

/**
 * The image page. Always the RIGHT page.
 *
 * Alt text comes from the spec and describes what is depicted rather than what
 * it means. That is deliberate, so it is used as given.
 */
export function GraphicPage({ spread, compact }) {
  // A 3:2 plate on a square page can only reach about two thirds of the page
  // height, so padding here is margin the plate cannot afford. Kept tight on
  // both, and tighter still on a phone where the plate is already a band.
  const pad = compact ? space(3) : space(5);
  const g = spread.image;
  const pageNumbers = spread.pages ? spread.pages.split(/\s+to\s+/) : [];
  const aspect = cssAspect(g.aspect);

  return (
    <div
      {...PAGE_ATTR}
      data-mb-kind="graphic"
      data-mb-spread={spread.n}
      className="mb-page"
      style={{ ...PAGE, padding: `${pad} ${pad} ${space(5)}`, justifyContent: 'center' }}
    >
      <figure
        style={{
          margin: 0,
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Plate slug={g.slug} alt={g.alt} shotType={g.shotType} aspect={aspect} />
      </figure>

      <Folio n={pageNumbers[1]} align="right" />
    </div>
  );
}

/**
 * The chapter opener.
 *
 * One full-bleed 4:3 image across both pages with the title block typeset over
 * it. Because a spread is two 2:3 pages, it is exactly 4:3, so the opener
 * fills it with no letterboxing and no crop.
 *
 * Rendered as one composition and clipped to a half, rather than as two
 * separate pages. The inner element is a full spread wide and shifted, so the
 * image and the title text break across the gutter the way they would in
 * print, and the turning sheet can carry a half without any special case.
 */
export function OpenerSpread({ spread, side, compact }) {
  const t = spread.title || {};
  const g = spread.image;

  // side: 'left' | 'right' | null. null renders the whole composition, which
  // is what the compact single-page layout wants.
  const split = side === 'left' || side === 'right';

  const titleBlock = (over) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: space(3),
        textAlign: 'center',
        color: paper.stock,
        fontFamily: type.body.fontFamily,
        ...(over ? { textShadow: '0 1px 14px rgba(0,0,0,0.55)' } : {}),
      }}
    >
      <div style={{ ...type.utility, fontSize: compact ? 15 : 21, letterSpacing: '0.2em', lineHeight: 1.15 }}>
        {t.title}
      </div>
      {t.subtitle && (
        <div style={{ fontStyle: 'italic', fontSize: compact ? 12 : 15, opacity: 0.9 }}>
          {t.subtitle}
        </div>
      )}
      <div
        aria-hidden="true"
        style={{ width: 54, height: 1, background: paper.stock, opacity: 0.6, margin: `${space(1)} 0` }}
      />
      {t.series && (
        <div style={{ ...type.utility, fontSize: compact ? 11 : 14, letterSpacing: '0.16em' }}>
          {t.series}
        </div>
      )}
      {t.part && (
        <div style={{ fontSize: compact ? 12.5 : 16, fontWeight: 700 }}>{t.part}</div>
      )}
    </div>
  );

  // Compact is a genuinely different composition, not a scaled-down one.
  //
  // The opener image is 16:9 because it spans both pages of a 16:9 spread. A
  // phone page is around 0.51, so full-bleeding it there would centre-crop a
  // panorama down to a narrow vertical slice and throw away roughly three
  // quarters of the frame, including whatever the prompt actually composed for.
  // On a phone the image is therefore letterboxed at full width and the title
  // sits beneath it rather than over it.
  if (!split) {
    return (
      <div
        {...PAGE_ATTR}
        data-mb-kind="opener"
        data-mb-spread={spread.n}
        className="mb-page"
        style={{
          ...PAGE,
          background: color.ink,
          justifyContent: 'center',
          gap: space(8),
          padding: `${space(6)} ${space(5)}`,
        }}
      >
        <div style={{ width: '100%', flex: 'none' }}>
          <Plate slug={g.slug} alt={g.alt} shotType={g.shotType} aspect={cssAspect(g.aspect, '16 / 9')} />
        </div>
        {titleBlock(false)}
      </div>
    );
  }

  return (
    <div
      {...PAGE_ATTR}
      data-mb-kind="opener"
      data-mb-spread={spread.n}
      className="mb-page"
      // Both halves render the whole composition and clip to their portion, so
      // the right half is a visual continuation of content already announced by
      // the left. Hiding it from assistive tech stops the title block and the
      // image being read out twice.
      aria-hidden={side === 'right' ? 'true' : undefined}
      style={{ ...PAGE, overflow: 'hidden', background: color.ink }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          // Two pages wide, shifted so this half shows its own portion.
          width: split ? '200%' : '100%',
          left: side === 'right' ? '-100%' : 0,
        }}
      >
        <Plate
          slug={g.slug}
          alt={g.alt}
          shotType={g.shotType}
          aspect={cssAspect(g.aspect, '16 / 9')}
          fullBleed
        />

        {/* Scrim, so the title stays legible over whatever the image turns
            out to be. Weighted to the bottom where the type sits. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(20,18,24,0.10) 0%, rgba(20,18,24,0.05) 45%, rgba(20,18,24,0.72) 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: `${space(12)} ${space(14)}`,
          }}
        >
          {titleBlock(true)}
        </div>
      </div>
    </div>
  );
}

export function BlankPage() {
  return <div {...PAGE_ATTR} className="mb-page" style={PAGE} aria-hidden="true" />;
}
