'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Plate } from './Plate';
import { useBookOpen } from './useBookOpen';
import { color, paper, space, type } from '@/lib/millbrook/series';

/**
 * One volume card.
 *
 * Cover art resolves to the volume's dedicated cover if one exists and its
 * chapter opener if not, so the shelf is never blank during production and real
 * covers can be added later by dropping files in.
 */
function VolumeCard({ arc, volume, data }) {
  const sections = (data?.sections ?? []).map((s) => s.title);
  const href = `/patch-notes/${volume.slug}/read`;
  const coverRef = useRef(null);
  const book = useBookOpen();

  return (
    <Link
      href={href}
      className="mb-card focus-ring"
      // Prefetched on hover so the opening animation covers real loading rather than
      // being added to it.
      onMouseEnter={() => book.prefetch(href)}
      onFocus={() => book.prefetch(href)}
      onClick={(e) => book.open(e, href, coverRef.current)}
      style={{
        background: paper.stock,
        border: `1px solid ${paper.rule}`,
        borderTop: `3px solid ${color.accent}`,
        padding: space(3),
        color: color.ink,
        boxShadow: '0 1px 3px rgba(0,0,0,0.22)',
        // Radius is in CSS with the hover rules, since the shell has to clip the accent
        // bar and the cover art to the same curve.
        borderRadius: 12,
      }}
    >
      <div
        ref={coverRef}
        className="mb-card-cover"
        style={{ width: '100%', aspectRatio: '2 / 1', overflow: 'hidden', background: paper.stock }}
      >
        <Plate
          slug={volume.cover}
          fallbackSlug={volume.coverFallback}
          alt=""
          shotType="Cover"
          aspect="2 / 1"
          fit="cover"
        />
      </div>

      <div style={{ ...type.utility, fontSize: 8.5, letterSpacing: '0.2em', color: color.inkSoft, marginTop: 2 }}>
        Volume {volume.vol}
      </div>

      <div
        style={{
          fontFamily: type.body.fontFamily,
          fontSize: 16,
          fontWeight: 700,
          lineHeight: 1.22,
          minHeight: '2.44em',
        }}
      >
        {data?.chapter?.replace(/^Part \w+:\s*/, '') ?? volume.slug}
      </div>

      {sections.length > 0 && (
        <div
          style={{
            fontFamily: type.body.fontFamily,
            fontSize: 11.5,
            color: color.inkSoft,
            lineHeight: 1.45,
            flex: 1,
          }}
        >
          {sections.slice(0, 3).join(' · ')}
          {sections.length > 3 ? ' …' : ''}
        </div>
      )}

      {/* Spread counts used to sit here. They were production bookkeeping shown to
          readers: a number nobody browsing a shelf has any use for, repeated four
          times, drawing the eye to the least interesting fact on the card. */}
      <div
        style={{
          paddingTop: space(2),
          borderTop: `1px solid ${paper.ruleSoft}`,
          ...type.utility,
          fontSize: 8.5,
          letterSpacing: '0.1em',
          color: color.accent,
        }}
      >
        Read <span className="mb-read-arrow" aria-hidden="true">→</span>
      </div>
    </Link>
  );
}

/** The four volumes of an arc, one row on a desktop. */
export function Shelf({ arc, volumes }) {
  return (
    <section aria-label={`${arc.title}, volumes`} className="mb-shelf">
      {arc.volumes.map((v) => (
        <VolumeCard key={v.slug} arc={arc} volume={v} data={volumes[v.slug]} />
      ))}
    </section>
  );
}

/**
 * A reserved shelf for an arc that does not exist yet.
 *
 * Deliberately the same grid and the same card proportions as a real shelf, so it
 * reads as space being held rather than as a gap. Not links, not focusable, and
 * hidden from assistive tech beyond a single label on the section — there is
 * nothing here to navigate to, and four empty tab stops would be a nuisance.
 */
export function ComingShelf({ arc }) {
  return (
    <section aria-label={`${arc.title}, not yet published`} className="mb-shelf">
      {Array.from({ length: arc.volumeCount }, (_, i) => (
        <div key={i} className="mb-card-ghost" aria-hidden="true">
          <div style={{ width: '100%', aspectRatio: '2 / 1' }} />
          <div style={{ ...type.utility, fontSize: 8.5, letterSpacing: '0.2em' }}>
            Volume {i + 1}
          </div>
        </div>
      ))}
    </section>
  );
}
