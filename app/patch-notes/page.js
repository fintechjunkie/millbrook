import Link from 'next/link';
import { allVolumes } from '@/lib/millbrook/data';
import { Banner } from '@/components/millbrook/Banner';
import { Crumbs } from '@/components/millbrook/Crumbs';
import { Shelf } from '@/components/millbrook/Shelf';
import { ARCS, color, space, type, ui } from '@/lib/millbrook/series';

const ARC = ARCS.find((a) => a.id === 'patch-notes');

export const metadata = {
  title: 'The Patch — Millbrook',
  description: ARC.tagline,
};

export default function PatchNotesArc() {
  const byslug = Object.fromEntries(allVolumes().map((v) => [v.slug, v]));

  return (
    <main style={{ minHeight: '100vh', background: color.bg }}>
      <Banner
        slug={`${ARC.volumes[0].coverFallback}`}
        aspect="2 / 1"
        kicker={`Arc ${ARC.number} · A Digital Slop Story`}
        title={ARC.title}
        tagline={ARC.tagline}
      />

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: `${space(8)} ${space(5)} ${space(20)}` }}>
        {/* Was a bare "← Millbrook" in 9.5px low-contrast utility type under a
            full-bleed banner: present, and invisible. */}
        <Crumbs trail={[{ label: 'Millbrook', href: '/' }]} current={ARC.title} />

        <p
          style={{
            fontFamily: type.body.fontFamily,
            color: color.ink,
            fontSize: 16,
            lineHeight: 1.65,
            maxWidth: '64ch',
            margin: `${space(6)} 0 ${space(4)}`,
          }}
        >
          {ARC.blurb}
        </p>

        {/* The spread, plate and word totals that used to sit here are gone for the
            same reason they went from the landing page: they are facts about making
            the thing, not reasons to read it. What a visitor actually needs from this
            line is permission to start anywhere, so that is all it says now. */}
        <div
          style={{
            ...type.utility,
            fontSize: 9,
            letterSpacing: '0.14em',
            color: ui.textFaint,
            marginBottom: space(9),
          }}
        >
          Four volumes · each one opens and reads independently
        </div>

        <Shelf arc={ARC} volumes={byslug} />

        <section style={{ marginTop: space(14), maxWidth: '68ch' }}>
          <h2
            style={{
              ...type.utility,
              fontSize: 10,
              letterSpacing: '0.22em',
              color: ui.kicker,
              margin: `0 0 ${space(4)}`,
            }}
          >
            How to read it
          </h2>
          <p
            style={{
              fontFamily: type.body.fontFamily,
              color: ui.textMuted,
              fontSize: 14.5,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Each volume opens as a two-page spread: prose on the left, a plate on the
            right, never alternating. Click the right-hand page to go forward and the
            left-hand page to go back, or use the arrow keys, or swipe. Press{' '}
            <strong style={{ color: color.ink }}>C</strong>
            {' '}for contents. On a phone a spread becomes two swipes.
          </p>
        </section>
      </div>
    </main>
  );
}
