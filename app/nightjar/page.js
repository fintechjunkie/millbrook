import { allVolumes } from '@/lib/millbrook/data';
import { Banner } from '@/components/millbrook/Banner';
import { Crumbs } from '@/components/millbrook/Crumbs';
import { Shelf } from '@/components/millbrook/Shelf';
import { ARCS, ARC_BANDS, color, space, type, ui } from '@/lib/millbrook/series';

const ARC = ARCS.find((a) => a.id === 'nightjar');
const band = ARC_BANDS[ARC.band] ?? ARC_BANDS.clay;

export const metadata = {
  title: 'The Nightjar — Millbrook',
  description: ARC.tagline,
};

export default function NightjarArc() {
  const byslug = Object.fromEntries(allVolumes().map((v) => [v.slug, v]));

  return (
    <main style={{ minHeight: '100vh', background: color.bg }}>
      {/* No art exists for this arc yet, so the masthead falls back to the chapter opener
          and the opener is not drawn either. That is the drop-in rule working rather than a
          gap: put n1-opener.png in public/images and this fills itself in with no code
          change. See Plate's broken-image handling for what shows meanwhile. */}
      <Banner
        slug={ARC.volumes[0].coverFallback}
        aspect="2 / 1"
        kicker={`Arc ${ARC.number} · A Digital Slop Story`}
        title={ARC.title}
        tagline={ARC.tagline}
      />

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: `${space(8)} ${space(5)} ${space(20)}` }}>
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

        <div
          className="mb-arc-band"
          style={{ background: band.bg, borderColor: band.rule, marginTop: space(8) }}
        >
          <div
            style={{
              ...type.utility,
              fontSize: 9,
              letterSpacing: '0.14em',
              color: ui.textOnTint,
              marginBottom: space(6),
            }}
          >
            Four volumes · each one opens and reads independently
          </div>

          <Shelf arc={ARC} volumes={byslug} />
        </div>

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
