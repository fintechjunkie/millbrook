'use client';

import { Plate } from './Plate';
import { color, paper, type } from '@/lib/millbrook/series';

/**
 * The site banner.
 *
 * Type is set over the art rather than generated into it. Same discipline as the
 * chapter openers: the negative block forbids lettering inside an image, and
 * text baked into a plate cannot be restyled, translated, selected or read by a
 * screen reader.
 *
 * Degrades to the paper ground with the type still legible if the art is absent,
 * so the page is presentable before `site-banner.png` exists.
 */
export function Banner({ slug, aspect = '3 / 1', kicker, title, tagline, children }) {
  return (
    <div className="mb-banner">
      <div className="mb-banner-art" aria-hidden="true">
        <Plate slug={slug} alt="" aspect={aspect} fullBleed fit="cover" />
      </div>
      <div className="mb-banner-scrim" aria-hidden="true" />

      <div className="mb-banner-type">
        {kicker && (
          <div
            style={{
              ...type.utility,
              fontSize: 10,
              letterSpacing: '0.26em',
              color: '#D8CBFF',
              marginBottom: 10,
              textShadow: '0 1px 12px rgba(0,0,0,0.6)',
            }}
          >
            {kicker}
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
