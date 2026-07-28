import Link from 'next/link';
import { allVolumes } from '@/lib/millbrook/data';
import { color, paper, space, type } from '@/lib/millbrook/series';

// The site home. A shelf of properties, of which The Patch Notes is the first.
const PROPERTIES = [
  {
    href: '/patch-notes',
    kicker: 'A Digital Slop Story',
    title: 'The Patch Notes',
    blurb: 'Four illustrated flipbook volumes. Millbrook starts fixing itself, and nobody asked it to.',
    status: 'In production',
  },
];

export default function Home() {
  const volumes = allVolumes();
  const words = volumes.reduce((a, v) => a + v.words, 0);

  return (
    <main style={{ minHeight: '100vh', background: color.bg }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: `${space(16)} ${space(5)} ${space(20)}` }}>
        <header style={{ marginBottom: space(12) }}>
          <h1 style={{
            fontFamily: type.body.fontFamily, color: paper.stock, fontSize: 44,
            margin: `0 0 ${space(3)}`, fontWeight: 700, letterSpacing: '-0.015em',
          }}>
            Millbrook
          </h1>
          <p style={{
            fontFamily: type.body.fontFamily, color: '#A29AAC', fontSize: 16,
            lineHeight: 1.6, maxWidth: '58ch', margin: 0,
          }}>
            Digital flipbooks and other assets for the Welcome to Millbrook project.
          </p>
        </header>

        <section aria-label="Properties" style={{ display: 'flex', flexDirection: 'column', gap: space(4) }}>
          {PROPERTIES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="focus-ring"
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: space(2),
                padding: space(6),
                border: '1px solid rgba(244,239,230,0.14)',
                borderLeft: `3px solid ${color.accent}`,
                background: 'rgba(244,239,230,0.035)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: space(4) }}>
                <span style={{ ...type.utility, fontSize: 9.5, letterSpacing: '0.22em', color: '#B9A6FF' }}>
                  {p.kicker}
                </span>
                <span style={{ ...type.utility, fontSize: 8.5, letterSpacing: '0.18em', color: '#7C7488' }}>
                  {p.status}
                </span>
              </div>
              <div style={{ fontFamily: type.body.fontFamily, color: paper.stock, fontSize: 26, fontWeight: 700, lineHeight: 1.2 }}>
                {p.title}
              </div>
              <div style={{ fontFamily: type.body.fontFamily, color: '#A29AAC', fontSize: 14.5, lineHeight: 1.55, maxWidth: '62ch' }}>
                {p.blurb}
              </div>
              <div style={{ ...type.utility, fontSize: 9.5, letterSpacing: '0.12em', color: color.accent, marginTop: space(2) }}>
                Open →
              </div>
            </Link>
          ))}
        </section>

        <footer style={{
          marginTop: space(14), paddingTop: space(4),
          borderTop: '1px solid rgba(244,239,230,0.1)',
          fontFamily: type.body.fontFamily, fontSize: 12.5, color: '#7C7488', lineHeight: 1.6,
        }}>
          33 text spreads · 37 images · {words.toLocaleString()} words of prose.
          {' '}<Link href="/checks/overflow" style={{ color: '#9E86F0' }}>Overflow audit</Link>
          {' '}checks that no page clips its prose.
        </footer>
      </div>
    </main>
  );
}
