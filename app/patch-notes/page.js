import Link from 'next/link';
import { allVolumes } from '@/lib/millbrook/data';
import { Banner } from '@/components/millbrook/Banner';
import { Shelf } from '@/components/millbrook/Shelf';
import { ARCS, color, paper, space, type } from '@/lib/millbrook/series';

const ARC = ARCS.find((a) => a.id === 'patch-notes');

export const metadata = {
  title: 'The Patch Notes — Millbrook',
  description: ARC.tagline,
};

export default function PatchNotesArc() {
  const byslug = Object.fromEntries(allVolumes().map((v) => [v.slug, v]));
  const vols = ARC.volumes.map((v) => byslug[v.slug]).filter(Boolean);
  const words = vols.reduce((a, v) => a + v.words, 0);
  const spreads = vols.reduce((a, v) => a + v.spreadCount, 0);
  const images = vols.reduce((a, v) => a + v.imageCount, 0);

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
        <Link
          href="/"
          className="focus-ring"
          style={{
            ...type.utility,
            fontSize: 9.5,
            letterSpacing: '0.18em',
            color: '#A29AAC',
            textDecoration: 'none',
          }}
        >
          ← Millbrook
        </Link>

        <p
          style={{
            fontFamily: type.body.fontFamily,
            color: '#CFC8D4',
            fontSize: 16,
            lineHeight: 1.65,
            maxWidth: '64ch',
            margin: `${space(6)} 0 ${space(4)}`,
          }}
        >
          {ARC.blurb}
        </p>

        <div
          style={{
            ...type.utility,
            fontSize: 9,
            letterSpacing: '0.14em',
            color: '#7C7488',
            marginBottom: space(9),
          }}
        >
          Four volumes · {spreads} spreads · {images} plates · {words.toLocaleString()} words ·
          {' '}each volume opens and reads independently
        </div>

        <Shelf arc={ARC} volumes={byslug} />

        <section style={{ marginTop: space(14), maxWidth: '68ch' }}>
          <h2
            style={{
              ...type.utility,
              fontSize: 10,
              letterSpacing: '0.22em',
              color: '#B9A6FF',
              margin: `0 0 ${space(4)}`,
            }}
          >
            How to read it
          </h2>
          <p
            style={{
              fontFamily: type.body.fontFamily,
              color: '#A29AAC',
              fontSize: 14.5,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Each volume opens as a two-page spread: prose on the left, a plate on the
            right, never alternating. Turn with the arrow keys, by clicking either
            page, or by swiping. Press <strong style={{ color: paper.stock }}>C</strong>
            {' '}for contents. On a phone a spread becomes two swipes.
          </p>
        </section>
      </div>
    </main>
  );
}
