import { PRIMER } from '@/lib/millbrook/lore';
import { color, paper, space, type, ui } from '@/lib/millbrook/series';

/**
 * The reader's primer, between the cast and the shelf.
 *
 * Placed there on purpose. Above the shelf, because the terms it explains appear on the
 * first text page of Volume 1 and a reader who meets "the Great Event" cold has no way
 * to tell whether they have missed something. Below the cast, because faces earn
 * attention and exposition spends it, so the order matters.
 *
 * It is in-world throughout: no "in this story", no "the reader will discover". A town
 * noticeboard, not a synopsis.
 *
 * **It is a BAND, like every arc below it, and it used to be a card.** That was the whole
 * of a complaint that it felt out of place, and the mismatch was measurable rather than a
 * matter of taste. At 1440px it ran 213 to 1213 while every arc band and the footer ran
 * 73 to 1353, so it was the one block on the page that did not sit on the shared column —
 * its left edge stood 140px inboard of everything after it. It carried a 3px accent top
 * border, which is byte-identical to a VolumeCard's, so it read as one enormous volume
 * card above a shelf of small ones. And it floated on a drop shadow where the bands are
 * set into the page with an inset highlight: opposite lighting, two rows apart.
 *
 * Underneath all of that it was also the last survivor of the design the bands replaced.
 * The note beside ARC_BANDS says they exist because "paper at #FBF8F2 on a shell at
 * #F7F4EE measured about 1.02:1, so the drop shadow was doing all of the work" — and this
 * block was still in exactly that state, measured at 1.04:1.
 *
 * **Still paper, though, and that is the one deliberate difference.** The intent is a page
 * from the book laid on the site, and staying lighter than every arc is what marks this as
 * the preface rather than as Arc Zero. It does not take a tint from ARC_BANDS because
 * there are four, one per arc, and sage and clay are already spoken for by arcs three and
 * four — spending one here would steal a future arc's ground.
 *
 * What replaces the missing ground contrast is a real edge. `paper.rule` at #DED5C4
 * measures 1.33:1 against the shell, so a 1px line does as much separating on its own as
 * the sand band's entire ground does at 1.36:1.
 */
export function Primer() {
  return (
    // marginBottom matches an arc <section>, so the rhythm down the column is one
    // interval rather than two. The outer wrapper in app/page.js now supplies the
    // ground and the inline padding this used to carry itself, which is what puts the
    // block on the same 1280px column as the bands.
    <section aria-labelledby="mb-primer-title" style={{ marginBottom: space(12) }}>
      <div className="mb-arc-band" style={{ background: paper.stock, borderColor: paper.rule }}>
        {/* Same anatomy as ArcHeader: kicker, title, one paragraph, then a rule closing
            the header block. Matched on its numbers too — 9.5px rather than 9 on the
            kicker, 30 rather than 27 on the title, 14.5/1.6 at 62ch rather than 15/1.6
            at 68ch — because a header that is nearly the same reads as a near miss.

            The kicker colour was already right and is worth saying so: `ui.kicker` and
            `color.accent` are both #5B3FC4, so this is the same violet ArcHeader uses.
            The accent that was actually out of place was the 3px top border, and that
            is gone. */}
        <header
          style={{
            paddingBottom: space(4),
            marginBottom: space(6),
            borderBottom: `1px solid ${paper.rule}`,
          }}
        >
          <div style={{ ...type.utility, fontSize: 9.5, letterSpacing: '0.24em', color: ui.kicker }}>
            {PRIMER.kicker}
          </div>

          <h2
            id="mb-primer-title"
            style={{
              fontFamily: type.body.fontFamily,
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              color: color.ink,
              margin: `${space(2)} 0 0`,
            }}
          >
            {PRIMER.title}
          </h2>

          <p
            style={{
              fontFamily: type.body.fontFamily,
              fontSize: 14.5,
              lineHeight: 1.6,
              color: color.inkSoft,
              maxWidth: '62ch',
              margin: `${space(3)} 0 0`,
              textWrap: 'pretty',
            }}
          >
            {PRIMER.intro}
          </p>
        </header>

        <div className="mb-primer-grid">
          {PRIMER.entries.map((e, n) => (
            <div key={e.term} className="mb-primer-entry">
              {/* A numeral rather than a bullet or an icon. Three unnumbered headings in three
                  columns read as a list whose order does not matter; these are ordered — the
                  Event causes the patches and the patches are what nobody notices — and
                  numbering them says so without a sentence spent on it. */}
              <div className="mb-primer-num" aria-hidden="true">
                {String(n + 1).padStart(2, '0')}
              </div>
              <h3
                style={{
                  fontFamily: type.body.fontFamily,
                  fontSize: 16.5,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: color.ink,
                  margin: 0,
                }}
              >
                {e.term}
              </h3>
              {/* Split on the blank line rather than storing an array, so the copy in
                  lore.js reads as prose to whoever edits it next. */}
              {e.body.split('\n\n').map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: type.body.fontFamily,
                    fontSize: 14,
                    lineHeight: 1.62,
                    color: color.ink,
                    margin: `${space(i === 0 ? 3 : 2)} 0 0`,
                    textWrap: 'pretty',
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>

        <p
          style={{
            fontFamily: type.body.fontFamily,
            fontSize: 13.5,
            fontStyle: 'italic',
            lineHeight: 1.6,
            color: color.inkSoft,
            maxWidth: '72ch',
            margin: `${space(7)} 0 0`,
            paddingTop: space(5),
            borderTop: `1px solid ${paper.ruleSoft}`,
            textWrap: 'pretty',
          }}
        >
          {PRIMER.footer}
        </p>
      </div>
    </section>
  );
}
