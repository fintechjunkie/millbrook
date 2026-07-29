import { closeSync, existsSync, openSync, readSync } from 'node:fs';
import { join } from 'node:path';
import Link from 'next/link';
import { allVolumes } from '@/lib/millbrook/data';
import { Banner } from '@/components/millbrook/Banner';
import { CastStrip } from '@/components/millbrook/CastStrip';
import { Primer } from '@/components/millbrook/Primer';
import { ComingShelf, Shelf } from '@/components/millbrook/Shelf';
import {
  ARCS,
  SITE_IMAGES,
  UNIVERSE,
  UPCOMING_ARCS,
  color,
  paper,
  space,
  type,
  ui,
} from '@/lib/millbrook/series';

/**
 * The label that opens an arc band.
 *
 * Shared by published and unpublished arcs so the two are unmistakably the same
 * kind of thing, which is the whole point of showing the empty one.
 */
function ArcHeader({ arc, action, dim = false }) {
  return (
    <header
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: space(4),
        paddingBottom: space(4),
        marginBottom: space(6),
        borderBottom: `1px solid ${ui.rule}`,
        // 0.52 was dimming light text against a dark band. Ink at 0.52 on a light band
        // goes weak and grey rather than quiet, so the reserved arc holds more of its
        // opacity and gets its recessive quality from muted colour instead.
        opacity: dim ? 0.78 : 1,
      }}
    >
      <div>
        <div
          style={{
            ...type.utility,
            fontSize: 9.5,
            letterSpacing: '0.24em',
            color: dim ? ui.textFaint : ui.kicker,
          }}
        >
          Arc {arc.number} · {arc.status}
        </div>
        {/* The title is the thing a reader reaches for, so it is the link. Leaving it
            as dead text and putting the only route in a small "About this arc" button
            beside it was a click people were already trying and not getting. An
            unpublished arc has no href and stays plain text. */}
        <h2
          style={{
            fontFamily: type.body.fontFamily,
            color: dim ? ui.textMuted : color.ink,
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: '-0.01em',
            margin: `${space(2)} 0 0`,
          }}
        >
          {dim ? arc.title : (
            <Link href={`/${arc.id}`} className="focus-ring" style={{ color: 'inherit', textDecoration: 'none' }}>
              {arc.title}
            </Link>
          )}
        </h2>
        <p
          style={{
            fontFamily: type.body.fontFamily,
            color: ui.textMuted,
            fontSize: 14.5,
            lineHeight: 1.6,
            maxWidth: '62ch',
            margin: `${space(3)} 0 0`,
          }}
        >
          {arc.blurb}
        </p>
      </div>
      {action}
    </header>
  );
}

const DESCRIPTION =
  'Illustrated flipbooks from the town of Millbrook. Something is fixing the '
  + 'place, and nobody asked it to.';

/**
 * Prefer the purpose-made share card, fall back to the landing banner.
 *
 * Resolved at build time rather than hardcoded so that dropping site-social.png
 * into public/images/ switches it over with no code change, and so that a missing
 * file can never produce a share card that 404s. Same drop-in rule the plates
 * follow, applied to metadata.
 *
 * Dimensions are read out of the PNG header rather than written down. Declaring a
 * size that does not match the file is worse than declaring none — some scrapers
 * reserve the wrong box and letterbox the card — and a hardcoded pair silently
 * goes stale the first time an image is regenerated at a different size.
 */
function pngSize(file) {
  // IHDR width and height are two big-endian uint32s at bytes 16 and 20 of every
  // PNG, so 24 bytes is always enough and no image library is needed.
  const fd = openSync(file, 'r');
  try {
    const head = Buffer.alloc(24);
    readSync(fd, head, 0, 24, 0);
    return { width: head.readUInt32BE(16), height: head.readUInt32BE(20) };
  } finally {
    closeSync(fd);
  }
}

const shareSlug = existsSync(
  join(process.cwd(), 'public', 'images', `${SITE_IMAGES.social.slug}.png`),
)
  ? SITE_IMAGES.social.slug
  : SITE_IMAGES.banner.slug;

const shareImage = {
  url: `/images/${shareSlug}.png`,
  ...pngSize(join(process.cwd(), 'public', 'images', `${shareSlug}.png`)),
};

export const metadata = {
  title: 'Millbrook — A Digital Slop Story',
  description: DESCRIPTION,
  // Share cards. Without these a pasted link renders as a bare URL, which is the
  // cheapest way for a project to look unfinished.
  openGraph: {
    title: 'Millbrook — A Digital Slop Story',
    description: DESCRIPTION,
    type: 'website',
    images: [shareImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Millbrook — A Digital Slop Story',
    description: DESCRIPTION,
    images: [shareImage.url],
  },
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
      >
        <a
          href={UNIVERSE.collection.href}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring"
          style={{
            ...type.utility,
            fontSize: 9,
            letterSpacing: '0.18em',
            color: paper.stock,
            textDecoration: 'none',
            border: '1px solid rgba(244,239,230,0.55)',
            // 0.34 left this 9px label depending on the artwork behind it to carry its
            // contrast, which measured 2.19 against a light patch. A chip needs its own
            // ground rather than borrowing one it cannot predict.
            background: 'rgba(28,22,18,0.62)',
            padding: `${space(3)} ${space(5)}`,
            alignSelf: 'flex-start',
            marginTop: space(6),
            whiteSpace: 'nowrap',
          }}
        >
          {`View the ${UNIVERSE.name} collection ↗`}
        </a>
      </Banner>

      {/* The cast band. A visitor who scrolls past the banner otherwise meets five
          empty town landscapes before a single face, and the characters are the
          reason to read. Full width and flush under the banner so it reads as part
          of the masthead rather than as the first content section. Plate shows its
          labelled placeholder until site-cast.png exists. */}
      <CastStrip />

      {/* Between the cast and the shelf. The terms it explains appear on the first text
          page of Volume 1, so a reader needs them before the shelf, not after; and faces
          earn attention while exposition spends it, so the cast goes first. */}
      <Primer />

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: `${space(12)} ${space(5)} ${space(20)}` }}>
        {/* Each arc is one band of four volumes. The production totals that used to
            close every band are gone: spreads, plates and word counts are facts about
            making the thing, not reasons to read it, and they undercut a shelf of
            covers by ending it on arithmetic. */}
        {ARCS.map((arc, i) => (
          <section key={arc.id} style={{ marginBottom: space(14) }}>
            {i > 0 && <hr className="mb-arc-seam" style={{ marginBottom: space(14) }} />}
            <ArcHeader
              arc={arc}
              action={(
                <Link
                  href={`/${arc.id}`}
                  className="focus-ring"
                  style={{
                    ...type.utility,
                    fontSize: 9,
                    letterSpacing: '0.18em',
                    color: color.accent,
                    textDecoration: 'none',
                    border: `1px solid ${ui.ruleStrong}`,
                    background: color.bgRaise,
                    padding: `${space(3)} ${space(5)}`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  About this arc →
                </Link>
              )}
            />
            <Shelf arc={arc} volumes={byslug} />
          </section>
        ))}

        {UPCOMING_ARCS.map((arc) => (
          <section key={arc.id} style={{ marginBottom: space(14) }}>
            <hr className="mb-arc-seam" style={{ marginBottom: space(14) }} />
            {/* The backdrop is a CSS background rather than a Plate on purpose: a
                missing background-image renders as nothing at all, whereas a missing
                Plate renders its "not yet generated" panel. That panel is right on a
                spread, where it tells you which file to make, and wrong behind four
                dashed cards, where it would just look broken. */}
            <div
              style={{
                position: 'relative',
                backgroundImage: `url(/images/${SITE_IMAGES.arc2.slug}.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 3,
                padding: space(6),
                margin: `0 -${space(6)}`,
              }}
            >
              {/* The veil over the arc-two artwork inverted with the shell, and it had
                  to: everything inside this band — the header, the four ghost slots — is
                  now ink on light, so a 0.84 black overlay would have put dark text on a
                  dark field. A pale veil keeps the art as a ghost of itself, which is the
                  point, and lets the band recede by going FLATTER than the shell rather
                  than darker. */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(237,231,219,0.90)',
                  borderRadius: 3,
                }}
              />
              <div style={{ position: 'relative' }}>
                <ArcHeader arc={arc} dim />
                <ComingShelf arc={arc} />
              </div>
            </div>
          </section>
        ))}

        <footer
          style={{
            paddingTop: space(6),
            borderTop: `1px solid ${ui.rule}`,
            fontFamily: type.body.fontFamily,
            fontSize: 13,
            color: ui.textMuted,
            lineHeight: 1.75,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: space(3) }}>
            {/* Background image again rather than an <img>, for the same reason: the
                mark is decoration and its absence should be invisible, not a broken
                glyph next to the wordmark it is supposed to accompany. */}
            <span
              aria-hidden="true"
              className="mb-mark"
              style={{
                width: 34,
                height: 34,
                backgroundImage: `url(/images/${SITE_IMAGES.mark.slug}.png)`,
              }}
            />
            <div style={{ ...type.utility, fontSize: 9.5, letterSpacing: '0.24em', color: ui.kicker }}>
              {UNIVERSE.name}
            </div>
          </div>
          <p style={{ maxWidth: '68ch', margin: `${space(3)} 0 0` }}>{UNIVERSE.blurb}</p>
          <p style={{ margin: `${space(4)} 0 0` }}>
            <a
              href={UNIVERSE.collection.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring"
              style={{ color: color.accent, textDecoration: 'none', borderBottom: `1px solid ${color.accent}55` }}
            >
              {`${UNIVERSE.collection.label} on ${UNIVERSE.collection.host} ↗`}
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
