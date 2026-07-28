import Link from 'next/link';
import { allVolumes } from '@/lib/millbrook/data';
import { Banner } from '@/components/millbrook/Banner';
import { Shelf } from '@/components/millbrook/Shelf';
import { ARCS, SITE_IMAGES, color, paper, space, type } from '@/lib/millbrook/series';

export const metadata = {
  title: 'Millbrook — A Digital Slop Story',
  description:
    'Illustrated flipbooks from the town of Millbrook. Something is fixing the '
    + 'place, and nobody asked it to.',
};

export default function Home() {
  const byslug = Object.fromEntries(allVolumes().map((v) => [v.slug, v]));

  return (
    <main style={{ minHeight: '100vh', background: color.bg }}>
      <Banner
        slug={SITE_IMAGES.banner.slug}
        aspect={SITE_IMAGES.banner.aspect}
        kicker="A Digital Slop Story"
        title="Millbrook"
        tagline="A small flat town on a grid of wide streets, with nothing worth photographing. Lately it has started repairing itself, and it is keeping a tally."
      />

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: `${space(12)} ${space(5)} ${space(20)}` }}>
        {ARCS.map((arc) => {
          const vols = arc.volumes.map((v) => byslug[v.slug]).filter(Boolean);
          const words = vols.reduce((a, v) => a + v.words, 0);
          const spreads = vols.reduce((a, v) => a + v.spreadCount, 0);
          const images = vols.reduce((a, v) => a + v.imageCount, 0);

          return (
            <section key={arc.id} style={{ marginBottom: space(16) }}>
              <header
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: space(4),
                  paddingBottom: space(4),
                  marginBottom: space(6),
                  borderBottom: '1px solid rgba(244,239,230,0.14)',
                }}
              >
                <div>
                  <div style={{ ...type.utility, fontSize: 9.5, letterSpacing: '0.24em', color: '#B9A6FF' }}>
                    Arc {arc.number} · {arc.status}
                  </div>
                  <h2
                    style={{
                      fontFamily: type.body.fontFamily,
                      color: paper.stock,
                      fontSize: 30,
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      margin: `${space(2)} 0 0`,
                    }}
                  >
                    {arc.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: type.body.fontFamily,
                      color: '#A29AAC',
                      fontSize: 14.5,
                      lineHeight: 1.6,
                      maxWidth: '62ch',
                      margin: `${space(3)} 0 0`,
                    }}
                  >
                    {arc.blurb}
                  </p>
                </div>

                <Link
                  href={`/${arc.id}`}
                  className="focus-ring"
                  style={{
                    ...type.utility,
                    fontSize: 9,
                    letterSpacing: '0.18em',
                    color: paper.stock,
                    textDecoration: 'none',
                    border: '1px solid rgba(244,239,230,0.28)',
                    padding: `${space(3)} ${space(5)}`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  About this arc →
                </Link>
              </header>

              <Shelf arc={arc} volumes={byslug} />

              <div
                style={{
                  ...type.utility,
                  fontSize: 9,
                  letterSpacing: '0.14em',
                  color: '#7C7488',
                  marginTop: space(5),
                }}
              >
                Four volumes · {spreads} spreads · {images} plates · {words.toLocaleString()} words
              </div>
            </section>
          );
        })}

        <footer
          style={{
            paddingTop: space(5),
            borderTop: '1px solid rgba(244,239,230,0.1)',
            fontFamily: type.body.fontFamily,
            fontSize: 12.5,
            color: '#7C7488',
            lineHeight: 1.7,
          }}
        >
          <div>More arcs to follow. The Digital Slop Squads will return.</div>
          <div style={{ marginTop: space(2) }}>
            <Link href="/checks/overflow" style={{ color: '#9E86F0' }}>Overflow audit</Link>
            {' · build-time check that no page clips its prose.'}
          </div>
        </footer>
      </div>
    </main>
  );
}
