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
 * Set on paper rather than on the dark ground, so it reads as a page from the book laid
 * on the site rather than as site furniture. It is in-world throughout: no "in this
 * story", no "the reader will discover". A town noticeboard, not a synopsis.
 */
export function Primer() {
  return (
    <section
      aria-labelledby="mb-primer-title"
      style={{ background: color.bg, padding: `${space(14)} ${space(5)} ${space(4)}` }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          background: paper.stock,
          // Longhand throughout: mixing `border` with a `borderTop` override makes React
          // warn about removing a shorthand during rerender while the longhand is still set.
          borderWidth: '3px 1px 1px',
          borderStyle: 'solid',
          borderColor: `${color.accent} ${paper.rule} ${paper.rule}`,
          borderRadius: 10,
          padding: `${space(8)} ${space(7)} ${space(7)}`,
          boxShadow: ui.shadowLift,
        }}
      >
        <div style={{ ...type.utility, fontSize: 9, letterSpacing: '0.24em', color: color.accent }}>
          {PRIMER.kicker}
        </div>

        <h2
          id="mb-primer-title"
          style={{
            fontFamily: type.body.fontFamily,
            fontSize: 27,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            color: color.ink,
            margin: `${space(3)} 0 0`,
          }}
        >
          {PRIMER.title}
        </h2>

        <p
          style={{
            fontFamily: type.body.fontFamily,
            fontSize: 15,
            lineHeight: 1.6,
            color: color.inkSoft,
            maxWidth: '68ch',
            margin: `${space(3)} 0 0`,
            textWrap: 'pretty',
          }}
        >
          {PRIMER.intro}
        </p>

        <hr
          style={{ border: 0, height: 1, background: paper.rule, margin: `${space(6)} 0 0` }}
        />

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
