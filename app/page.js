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
  ARC_BANDS,
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
function ArcHeader({ arc, action, href = null, rule = ui.rule }) {
  return (
    <header
      style={{
        paddingBottom: space(4),
        marginBottom: space(6),
        borderBottom: `1px solid ${rule}`,
        // No opacity dimming on an unwritten arc any more. It was inherited from the dark
        // theme, where 0.52 quietened light text on a dark band; on a light band ink at
        // reduced opacity goes weak and grey rather than quiet, and an arc with four real
        // titles has earned the same weight as one that is finished. What says it is not
        // out yet is the "coming soon" status and the dashed cards, which is enough.
      }}
    >
      <div>
        {/* "Arc One · in production" said the quiet part to the wrong audience: a reader
            browsing a shelf has no use for a production status, and "in production" reads
            as "not finished yet, come back later" on an arc that is complete and readable
            end to end. `status` survives on an UNPUBLISHED arc, where "coming soon" is the
            entire point of the band, so this prints it only when there is one. */}
        <div
          style={{
            ...type.utility,
            fontSize: 9.5,
            letterSpacing: '0.24em',
            color: ui.kicker,
          }}
        >
          Arc {arc.number}{arc.status ? ` · ${arc.status}` : ''}
        </div>
        {/* The title is the thing a reader reaches for, so it is the link. Leaving it
            as dead text and putting the only route in a small "About this arc" button
            beside it was a click people were already trying and not getting. An arc with
            no page yet passes no href and stays plain text, because a link to a route
            that does not exist is worse than no link. */}
        <h2
          style={{
            fontFamily: type.body.fontFamily,
            color: color.ink,
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: '-0.01em',
            margin: `${space(2)} 0 0`,
          }}
        >
          {href ? (
            <Link href={href} className="focus-ring" style={{ color: 'inherit', textDecoration: 'none' }}>
              {arc.title}
            </Link>
          ) : arc.title}
        </h2>
        <p
          style={{
            fontFamily: type.body.fontFamily,
            color: ui.textOnTint,
            fontSize: 14.5,
            lineHeight: 1.6,
            maxWidth: '62ch',
            margin: `${space(3)} 0 0`,
          }}
        >
          {arc.blurb}
        </p>
        {/* Below the blurb, in the reading path. This used to be right-aligned on the same
            line as the title, which put the one route into the arc page outside the column
            a reader's eye is travelling down. */}
        {action}
      </div>
    </header>
  );
}

/**
 * The invitation into an arc's own page.
 *
 * Replaces a 9px outlined "About this arc →" in the corner of the header. Two things were
 * wrong with it and only one was size: it read as a footnote, and it described a
 * destination instead of offering anything. Readers went straight into a volume, which
 * skips the page that says what the town already knows and how the books work.
 *
 * So it is a filled button now — the only filled control on the page, which is what makes
 * it read as the primary move — and it says "Start here", with the reason beside it rather
 * than inside it. Keeping the promise out of the label lets the label stay short enough to
 * scan while the sentence does the persuading.
 */
function StartHere({ arc }) {
  if (!arc.start) return null;
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: `${space(3)} ${space(5)}`,
        margin: `${space(6)} 0 0`,
      }}
    >
      {/* A pill, not a rectangle with a 3px radius. The square-ish chip read as a form
          control sitting on the page; a fully rounded button with a real edge, a gradient
          and a shadow reads as a finished object, which is what it needs to be when it is
          the only thing on the page asking to be pressed. Colours and the lit top edge are
          in `.mb-start`. */}
      <Link href={`/${arc.id}`} className="mb-start focus-ring">
        {arc.start.label} <span className="mb-start-arrow" aria-hidden="true">→</span>
      </Link>
      <p
        style={{
          fontFamily: type.body.fontFamily,
          color: ui.textOnTint,
          fontSize: 13.5,
          lineHeight: 1.55,
          maxWidth: '46ch',
          margin: 0,
        }}
      >
        {arc.start.hint}
      </p>
    </div>
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
        tagline="A small regular town on a grid of wide streets, with nothing worth photographing. Lately it has started repairing itself, and it’s keeping a tally."
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

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: `${space(12)} ${space(5)} ${space(20)}` }}>
        {/* Between the cast and the shelf. The terms it explains appear on the first text
            page of Volume 1, so a reader needs them before the shelf, not after; and faces
            earn attention while exposition spends it, so the cast goes first.

            INSIDE this wrapper, which is the point. It used to sit above it with a
            maxWidth of its own, so at 1440px it ran 213 to 1213 while every band and the
            footer ran 73 to 1353 — the one block on the page that did not share the
            column, standing 140px inboard of everything after it. Sharing the wrapper
            means it cannot drift again when the wrapper changes. */}
        <Primer />

        {/* Each arc is one band of four volumes. The production totals that used to
            close every band are gone: spreads, plates and word counts are facts about
            making the thing, not reasons to read it, and they undercut a shelf of
            covers by ending it on arithmetic. */}
        {/* Each arc sits on its own tinted band, which is what gives the cards something
            to sit against: paper at #FBF8F2 on a shell at #F7F4EE measured about 1.02:1,
            so the drop shadow was carrying the whole separation on its own. The band also
            does the job the seam rule used to do, and does it better — a change of ground
            reads as a change of place, where a hairline read as a page break. See
            ARC_BANDS. */}
        {ARCS.map((arc) => {
          const band = ARC_BANDS[arc.band] ?? ARC_BANDS.sand;
          return (
            <section key={arc.id} style={{ marginBottom: space(12) }}>
              <div
                className="mb-arc-band"
                style={{ background: band.bg, borderColor: band.rule }}
              >
                <ArcHeader
                  arc={arc}
                  href={`/${arc.id}`}
                  rule={band.rule}
                  action={<StartHere arc={arc} />}
                />
                <Shelf arc={arc} volumes={byslug} />
              </div>
            </section>
          );
        })}

        {/* An unwritten arc is the SAME kind of band as a written one, on its own tint.
            It used to be the odd one out — artwork behind a pale veil, a different radius,
            negative margins, and a header dimmed to 0.78 — which made the next arc read as
            a promotional slot rather than as the next thing in the series. Now the only
            differences are the ones that are true: it says "coming soon", its cards are
            dashed and unlit, and it has no page of its own to link to yet.

            The `site-arc2.png` backdrop is dropped rather than lost. It is still in
            public/images and still declared in SITE_IMAGES, ready to become cover art for
            these four volumes. */}
        {UPCOMING_ARCS.map((arc) => {
          const band = ARC_BANDS[arc.band] ?? ARC_BANDS.slate;
          return (
            <section key={arc.id} style={{ marginBottom: space(12) }}>
              <div
                className="mb-arc-band"
                style={{ background: band.bg, borderColor: band.rule }}
              >
                <ArcHeader arc={arc} rule={band.rule} />
                <ComingShelf arc={arc} />
              </div>
            </section>
          );
        })}

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
