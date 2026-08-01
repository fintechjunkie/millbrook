'use client';

import { Plate, SIZES } from './Plate';
import { color, paper, type } from '@/lib/millbrook/series';

/**
 * The site banner.
 *
 * Type is set over the art rather than generated into it. Same discipline as the
 * chapter openers: the negative block forbids lettering inside an image, and
 * text baked into a plate cannot be restyled, translated, selected or read by a
 * screen reader.
 *
 * Degrades to a dark ground if the art is absent, so the page is presentable before
 * `site-banner.png` exists. This used to say paper, and it was wrong: every string in
 * here is light, so a paper fallback put a near-white title on near-white paper. The
 * fallback lives in `.mb-banner` in globals.css.
 */
export function Banner({ slug, aspect = '3 / 1', kicker, title, tagline, children }) {
  return (
    <div className="mb-banner">
      <div className="mb-banner-art" aria-hidden="true">
        <Plate slug={slug} alt="" aspect={aspect} fullBleed fit="cover" sizes={SIZES.full} />
      </div>
      <div className="mb-banner-scrim" aria-hidden="true" />

      <div className="mb-banner-type">
        {/* The kicker carries its own ground, and it has to.

            It was pale violet with a soft shadow, which works over anything dark and
            disappears completely over the top-left of the landing banner — the brightest
            part of a sunset sky. Neither colour fixes that on its own: pale violet on pale
            gold has almost no contrast, and white on bright gold has little more. A shadow
            cannot rescue it either, because a shadow spreads and 10px uppercase type at
            0.26em tracking is nearly all edge.

            So it becomes a chip. Its contrast is then a property of the chip rather than a
            bet on the artwork behind it, which is the same conclusion the collection button
            below it reached, and it pairs the two. Warm near-black rather than neutral, so
            it sits in the same family as the art it is laid over. */}
        {kicker && (
          <div style={{ marginBottom: 14 }}>
            <span
              style={{
                ...type.utility,
                display: 'inline-block',
                fontSize: 10,
                letterSpacing: '0.24em',
                color: '#EFE7FF',
                background: 'rgba(28,22,18,0.66)',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: 'rgba(239,231,255,0.28)',
                padding: '6px 11px',
              }}
            >
              {kicker}
            </span>
          </div>
        )}

        <h1
          style={{
            fontFamily: type.body.fontFamily,
            color: paper.stock,
            fontSize: 'clamp(34px, 6.2vw, 68px)',
            lineHeight: 1.02,
            letterSpacing: '-0.02em',
            fontWeight: 700,
            margin: 0,
            textShadow: '0 2px 22px rgba(0,0,0,0.55)',
          }}
        >
          {title}
        </h1>

        {tagline && (
          <p
            style={{
              fontFamily: type.body.fontFamily,
              color: '#E6DFD2',
              fontSize: 'clamp(14px, 1.5vw, 18px)',
              lineHeight: 1.5,
              maxWidth: '46ch',
              margin: '14px 0 0',
              textShadow: '0 1px 14px rgba(0,0,0,0.6)',
            }}
          >
            {tagline}
          </p>
        )}

        {children}
      </div>
    </div>
  );
}
