'use client';

import Link from 'next/link';
import { Plate } from './Plate';
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

  return (
    <Link
      href={`/patch-notes/${volume.slug}/read`}
      className="mb-card focus-ring"
      style={{
        background: paper.stock,
        border: `1px solid ${paper.rule}`,
        borderTop: `3px solid ${color.accent}`,
        padding: space(3),
        color: color.ink,
        boxShadow: '0 1px 3px rgba(0,0,0,0.22)',
      }}
    >
      <div style={{ width: '100%', aspectRatio: '2 / 1', overflow: 'hidden', background: paper.stock }}>
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

      <div
        style={{
          paddingTop: space(2),
          borderTop: `1px solid ${paper.ruleSoft}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          ...type.utility,
          fontSize: 8.5,
          letterSpacing: '0.1em',
        }}
      >
        <span style={{ color: color.accent }}>Read →</span>
        <span style={{ color: color.inkSoft }}>{data?.spreadCount ?? '—'} spreads</span>
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
