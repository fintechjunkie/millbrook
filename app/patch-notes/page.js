import Link from 'next/link';
import { allVolumes, roster } from '@/lib/millbrook/data';
import { PlatePlaceholder, srcFor } from '@/components/millbrook/Plate';
import { color, grainStyle, paper, space, type } from '@/lib/millbrook/series';

export const metadata = {
  title: 'The Patch Notes · Millbrook',
  description: 'Four illustrated flipbook volumes. A Digital Slop story.',
};

// The shelf. One tile per volume, linking into its reader.
//
// The cover is the volume's chapter opener image. Since none of the 37 images
// exist yet, every tile shows the same labelled placeholder the reader does,
// which is the honest state of the project rather than a broken page.
function Cover({ volume }) {
  const opener = volume.spreads.find((s) => s.kind === 'opener');
  const slug = opener?.image?.slug;

  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '4 / 3',
        border: `1px solid ${paper.ruleSoft}`,
        background: paper.stock,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Server-rendered, so a missing file cannot be caught by onError alone.
          The shelf therefore renders the placeholder directly rather than
          attempting the image and falling back: there is nothing to fall back
          from until the art exists. Swap to <Plate> once images land. */}
      <PlatePlaceholder slug={slug} shotType={opener?.image?.shotType} aspect="4 / 3" />
    </div>
  );
}

export default function PatchNotesShelf() {
  const volumes = allVolumes();
  const totalWords = volumes.reduce((a, v) => a + v.words, 0);
  const totalImages = volumes.reduce((a, v) => a + v.imageCount, 0);
  const totalSpreads = volumes.reduce((a, v) => a + v.spreadCount, 0);
  const open = roster.blockingDecisions.filter((d) => !d.resolved).length;

  return (
    <main style={{ minHeight: '100vh', background: color.bg }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: `${space(12)} ${space(5)} ${space(20)}` }}>
        <Link href="/" className="focus-ring"
          style={{ ...type.utility, fontSize: 9.5, letterSpacing: '0.18em', color: '#A29AAC', textDecoration: 'none' }}>
          ← Millbrook
        </Link>

        <header style={{ margin: `${space(6)} 0 ${space(10)}` }}>
          <div style={{ ...type.utility, fontSize: 10, letterSpacing: '0.24em', color: '#B9A6FF' }}>
            A Digital Slop Story
          </div>
          <h1 style={{ fontFamily: type.body.fontFamily, color: paper.stock, fontSize: 38, margin: `${space(2)} 0 ${space(3)}`, fontWeight: 700, letterSpacing: '-0.01em' }}>
            The Patch Notes
          </h1>
          <p style={{ fontFamily: type.body.fontFamily, color: '#A29AAC', fontSize: 15, lineHeight: 1.6, maxWidth: '62ch', margin: 0 }}>
            Four volumes, {totalSpreads} text spreads, {totalImages} images,
            {' '}{totalWords.toLocaleString()} words. Each volume opens and reads independently.
          </p>

          {open > 0 && (
            <div style={{
              marginTop: space(6),
              padding: `${space(3)} ${space(4)}`,
              border: '1px solid rgba(185,166,255,0.3)',
              background: 'rgba(107,82,200,0.10)',
              fontFamily: type.body.fontFamily,
              fontSize: 13,
              lineHeight: 1.5,
              color: '#CFC8D4',
              maxWidth: '72ch',
            }}>
              <strong style={{ color: paper.stock }}>In production.</strong> No images have been
              generated. {open} author decisions in section 1 of the roster block the character
              lock, and the style block is proposed rather than approved. Every spread reads
              with a labelled placeholder in place of its art.
            </div>
          )}
        </header>

        <section
          aria-label="Volumes"
          style={{ display: 'grid', gap: space(6), gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))' }}
        >
          {volumes.map((v) => (
            <Link
              key={v.slug}
              href={`/patch-notes/${v.slug}/read`}
              className="focus-ring"
              style={{
                textDecoration: 'none',
                background: paper.stock,
                ...grainStyle,
                border: `1px solid ${paper.rule}`,
                borderTop: `3px solid ${color.accent}`,
                padding: space(5),
                display: 'flex',
                flexDirection: 'column',
                gap: space(3),
                color: color.ink,
                boxShadow: '0 1px 2px rgba(0,0,0,0.18)',
              }}
            >
              <Cover volume={v} />

              <div style={{ ...type.utility, fontSize: 9, letterSpacing: '0.2em', color: color.inkSoft }}>
                Volume {v.volume}
              </div>
              <div style={{ fontFamily: type.body.fontFamily, fontSize: 19, fontWeight: 700, lineHeight: 1.2 }}>
                {v.chapter?.replace(/^Part \w+:\s*/, '') ?? v.slug}
              </div>
              {/* The section headings inside the prose, which double as this
                  volume's table of contents. */}
              <div style={{ fontFamily: type.body.fontFamily, fontSize: 12.5, color: color.inkSoft, lineHeight: 1.55, flex: 1 }}>
                {v.sections.map((s) => s.title).join(' · ')}
              </div>

              <div style={{
                paddingTop: space(2),
                borderTop: `1px solid ${paper.ruleSoft}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                ...type.utility,
                fontSize: 9.5,
                letterSpacing: '0.1em',
              }}>
                <span style={{ color: color.accent }}>Read →</span>
                <span style={{ color: color.inkSoft }}>
                  {v.spreadCount} spreads · {v.words.toLocaleString()} words
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
