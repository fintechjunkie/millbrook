import { closeSync, existsSync, openSync, readSync } from 'node:fs';
import { join } from 'node:path';
import Link from 'next/link';
import { allVolumes } from '@/lib/millbrook/data';
import { Banner } from '@/components/millbrook/Banner';
import { Plate } from '@/components/millbrook/Plate';
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
        borderBottom: '1px solid rgba(244,239,230,0.14)',
        opacity: dim ? 0.52 : 1,
      }}
    >
      <div>
        <div
          style={{
            ...type.utility,
            fontSize: 9.5,
            letterSpacing: '0.24em',
            color: dim ? '#7C7488' : '#B9A6FF',
          }}
        >
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
            border: '1px solid rgba(244,239,230,0.4)',
            background: 'rgba(20,18,24,0.34)',
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
      <div style={{ borderBottom: '1px solid rgba(244,239,230,0.1)', background: color.bg }}>
        <Plate
          slug={SITE_IMAGES.cast.slug}
          alt="The cast of The Patch Notes: five teenagers, a robot girl and a small monkey, standing together on cracked concrete with the town behind them."
          shotType="Cast strip, the whole ensemble in one frame"
          aspect={SITE_IMAGES.cast.aspect}
          fit="cover"
        />
      </div>

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
                    color: paper.stock,
                    textDecoration: 'none',
                    border: '1px solid rgba(244,239,230,0.28)',
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
              <div
                aria-hidden="true"
                style={{ position: 'absolute', inset: 0, background: 'rgba(20,18,24,0.84)', borderRadius: 3 }}
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
            borderTop: '1px solid rgba(244,239,230,0.1)',
            fontFamily: type.body.fontFamily,
            fontSize: 13,
            color: '#8E8699',
            lineHeight: 1.75,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: space(3) }}>
            {/* Background image again rather than an <img>, for the same reason: the
                mark is decoration and its absence should be invisible, not a broken
                glyph next to the wordmark it is supposed to accompany. */}
            <span
              aria-hidden="true"
              style={{
                width: 34,
                height: 34,
                flex: 'none',
                borderRadius: '50%',
                backgroundImage: `url(/images/${SITE_IMAGES.mark.slug}.png)`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div style={{ ...type.utility, fontSize: 9.5, letterSpacing: '0.24em', color: '#B9A6FF' }}>
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
              style={{ color: '#B9A6FF', textDecoration: 'none', borderBottom: '1px solid rgba(185,166,255,0.4)' }}
            >
              {`${UNIVERSE.collection.label} on ${UNIVERSE.collection.host} ↗`}
            </a>
          </p>
          <p style={{ marginTop: space(5), fontSize: 12, color: '#6E6779' }}>
            <Link href="/checks/overflow" style={{ color: '#6E6779' }}>Overflow audit</Link>
            {' · build-time check that no page clips its prose.'}
          </p>
        </footer>
      </div>
    </main>
  );
}
