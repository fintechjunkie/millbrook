'use client';

/**
 * Book-face specimen. A dev surface, like /checks/overflow, and throwaway once a
 * face is chosen.
 *
 * The point is to choose a face the way a book designer would: real prose, at true
 * page size, in the real type tokens, side by side. A face named in a sentence tells
 * you nothing about how 350 words of it sit on a square page.
 *
 * Every column below is the SAME page rendered with only `fontFamily` swapped. The
 * size rule, leading, measure, indent and heading treatment are the live tokens from
 * `series.js`, so a difference you see is a difference the face is responsible for.
 *
 * Two numbers under each column are the ones that decide it rather than taste:
 *
 *   fill  — column height as a percentage of the page. Over 100 and the page
 *           scrolls. Charter today is the baseline every face is judged against,
 *           because the four volumes were paginated under it.
 *   c/l   — characters a line, which wants to land in the readable 45-75 band. The
 *           measure is capped in `em`, so this barely moves between faces; it is
 *           here to prove that rather than to be tuned.
 *
 * Measurement follows the recipe in CLAUDE.md: walk the flow with `flex` temporarily
 * set to `none`, because a stretching flex child reports `scrollHeight === clientHeight`
 * and every fill silently reads as zero. The flow is a COLUMN flex item — never wrap it
 * in a row, or the column shrink-wraps and every number reads about nine points high.
 *
 * `setTimeout` rather than `requestAnimationFrame`, also per CLAUDE.md: rAF never fires
 * in a non-compositing preview pane, so an rAF-gated measurement sits at "—" forever and
 * looks broken rather than pending.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import vol1 from '@/patch-notes/volumes/vol1.json';
import { color, paper, type as typeTokens, face } from '@/lib/millbrook/series';

/** The candidates, plus the status quo. Order is the order they are argued for. */
const FACES = [
  {
    // Spelled out rather than read from `face.body`, which is how this column was
    // written and it stopped being the baseline the moment the decision landed:
    // `face.body` is now Literata, so the page was comparing the winner against
    // itself and reporting a dead heat.
    id: 'georgia',
    name: 'Georgia',
    note: 'The old stack, as Windows and Android received it. The baseline this replaced.',
    stack: 'Georgia, "Times New Roman", serif',
    baseline: true,
  },
  {
    id: 'literata',
    name: 'Literata · SHIPPED',
    note: 'Drawn for Google Play Books. Largest x-height of the four. Now the book face.',
    stack: face.body,
  },
  {
    id: 'charis',
    name: 'Charis SIL',
    note: 'The open Charter. Makes every platform see what macOS already sees.',
    stack: '"Charis Spec", Georgia, serif',
  },
  {
    id: 'source-serif',
    name: 'Source Serif 4',
    note: 'Adobe. Cleaner and more contemporary — a modern trade paperback.',
    stack: '"Source Serif Spec", Georgia, serif',
  },
];

/** Local @font-face for the candidates. Throwaway alongside this route. */
const FONT_CSS = `
@font-face { font-family: "Literata Spec"; src: url("/fonts/literata-roman-400.woff2") format("woff2"); font-weight: 400; font-style: normal; font-display: block; }
@font-face { font-family: "Literata Spec"; src: url("/fonts/literata-roman-700.woff2") format("woff2"); font-weight: 700; font-style: normal; font-display: block; }
@font-face { font-family: "Literata Spec"; src: url("/fonts/literata-italic-400.woff2") format("woff2"); font-weight: 400; font-style: italic; font-display: block; }
@font-face { font-family: "Charis Spec"; src: url("/fonts/charis-roman-400.woff2") format("woff2"); font-weight: 400; font-style: normal; font-display: block; }
@font-face { font-family: "Charis Spec"; src: url("/fonts/charis-roman-700.woff2") format("woff2"); font-weight: 700; font-style: normal; font-display: block; }
@font-face { font-family: "Charis Spec"; src: url("/fonts/charis-italic-400.woff2") format("woff2"); font-weight: 400; font-style: italic; font-display: block; }
@font-face { font-family: "Source Serif Spec"; src: url("/fonts/source-serif-roman-400.woff2") format("woff2"); font-weight: 400; font-style: normal; font-display: block; }
@font-face { font-family: "Source Serif Spec"; src: url("/fonts/source-serif-roman-700.woff2") format("woff2"); font-weight: 700; font-style: normal; font-display: block; }
@font-face { font-family: "Source Serif Spec"; src: url("/fonts/source-serif-italic-400.woff2") format("woff2"); font-weight: 400; font-style: italic; font-display: block; }
`;

const SPREADS = vol1.spreads.filter((s) => s.kind === 'spread');

/** Prose rather than a pangram, so the character mix is the book's own. */
const CPL_SAMPLE =
  'Aunt Carol’s house was on Crescent Street. It was the same yellow siding, the same chain link fence and the same ceramic frog by the front steps that she remembered.';

/**
 * True page size.
 *
 * The reader's page is half a 2:1 spread inside `min(2100px, 100%, (100svh - 115px) * 2)`,
 * so on a 1440x900 laptop it measures 696px square and on a 1280x720 one, 605px. 696 is the
 * default because it is the roomier of the two common laptops, and it is held FIXED across
 * the columns on purpose: `1.95cqh` means page size sets type size, so columns of different
 * sizes would be comparing sizes rather than faces. The slider walks the real range — note
 * that below about 680px the clamp's 12px floor binds and every face pins to 12px.
 */
const PAGE = 696;

function Page({ stack, spread, pageSize, onMeasure }) {
  const flowRef = useRef(null);

  useEffect(() => {
    let alive = true;
    // Two passes. The first lands before the webfont has decoded and would measure
    // Georgia wearing the candidate's name; 600ms is well past `font-display: block`
    // on a local file. Both are reported, so a number that moves is visible.
    const measure = () => {
      const el = flowRef.current;
      if (!el || !alive) return;
      // Order matters and is the whole recipe. `scrollHeight` is read while the flow
      // is released, so it reports what the text actually wants; `clientHeight` is
      // read after it is put back, so it reports the room the page gives it. Read
      // both in the released state and every face measures exactly 100%, because a
      // shrink-wrapped box is by definition full of itself.
      const prev = el.style.flex;
      el.style.flex = 'none';
      const used = el.scrollHeight;
      el.style.flex = prev;
      const room = el.clientHeight;

      const ps = [...el.querySelectorAll('p')];
      const cs = ps[0] ? getComputedStyle(ps[0]) : null;

      // Characters a line, counted rather than estimated.
      //
      // This was `clientWidth / (fontSize * 0.5)` and that is not a measurement —
      // the column is capped in `em` and every face renders at the same px, so the
      // formula returned the SAME number for all four faces by construction and
      // hid the one difference that matters. Georgia really runs 83 to Source
      // Serif's 77, and 0.5 called both of them 74.
      //
      // Divide total characters by total line boxes instead. Line boxes are
      // `height / lineHeight`, which is exact because the leading is unitless.
      const lh = cs ? parseFloat(cs.lineHeight) : 0;
      let lines = 0;
      if (lh > 0) for (const p of ps) lines += Math.round(p.getBoundingClientRect().height / lh);

      // Characters a line = column width / average character advance, measured by
      // laying a real prose sample out unwrapped in this face at this size.
      //
      // Counting characters per line box is the obvious approach and both ways of
      // doing it are wrong: this book is a third dialogue, so dividing by every
      // line box lets "Lena hit record." drag the average down to 66, and skipping
      // the last line of each paragraph instead counts that line's characters
      // against one fewer line and pushes it up to 96. The advance is not an
      // average of anything ragged, so it does not have the problem.
      let cpl = null;
      if (ps[0] && cs) {
        const probe = document.createElement('span');
        probe.style.cssText = 'white-space:nowrap;position:absolute;visibility:hidden;left:-9999px';
        probe.textContent = CPL_SAMPLE;
        ps[0].appendChild(probe);
        const advance = probe.getBoundingClientRect().width / CPL_SAMPLE.length;
        probe.remove();
        if (advance > 0) cpl = Math.round(ps[0].clientWidth / advance);
      }

      // Apparent size, which is x-height and not font-size. `1ex` resolves against
      // the real face at the real size, so it respects a variable font's optical
      // size axis; a canvas `measureText` probe does not and reported Source Serif
      // 9% narrower than it actually renders here.
      let xh = null;
      if (ps[0]) {
        const probe = document.createElement('div');
        probe.style.cssText = 'height:1ex;width:0;visibility:hidden';
        ps[0].appendChild(probe);
        xh = Math.round(probe.getBoundingClientRect().height * 100) / 100;
        probe.remove();
      }

      onMeasure({
        fill: room > 0 ? Math.round((used / room) * 100) : null,
        px: cs ? Math.round(parseFloat(cs.fontSize) * 10) / 10 : null,
        cpl,
        lines: lines || null,
        xh,
      });
    };
    const a = setTimeout(measure, 120);
    const b = setTimeout(measure, 600);
    return () => {
      alive = false;
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [stack, spread, pageSize, onMeasure]);

  return (
    <div
      style={{
        width: pageSize,
        height: pageSize,
        containerType: 'size',
        background: paper.stock,
        border: `1px solid ${paper.stockEdge ?? 'rgba(0,0,0,0.10)'}`,
        padding: '30px 30px 16px',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Mirrors SpreadPage: a positioned COLUMN box, with the flow as its flex child.
          A row here would collapse the flow's width too and read ~9 points fuller. */}
      <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div
        ref={flowRef}
        style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden' }}
      >
        {spread.blocks.map((b, i) =>
          b.t === 'h' ? (
            <h3
              key={i}
              style={{
                ...typeTokens.body,
                fontFamily: stack,
                fontSize: '1.16em',
                fontWeight: 700,
                textWrap: 'balance',
                margin: '0 0 0.5em',
              }}
            >
              {b.v}
            </h3>
          ) : (
            <p
              key={i}
              style={{
                ...typeTokens.body,
                fontFamily: stack,
                margin: 0,
                textIndent: i > 1 ? '1.4em' : 0,
              }}
            >
              {b.v}
            </p>
          )
        )}
      </div>
      </div>
    </div>
  );
}

export default function TypeSpecimen() {
  const [spreadIdx, setSpreadIdx] = useState(0);
  const [pageSize, setPageSize] = useState(PAGE);
  const [stats, setStats] = useState({});
  const spread = SPREADS[spreadIdx];

  // One stable callback per face, or Page re-measures forever.
  const sinks = useMemo(() => {
    const out = {};
    for (const f of FACES) out[f.id] = (m) => setStats((s) => ({ ...s, [f.id]: m }));
    return out;
  }, []);

  const baseFill = stats.charter?.fill ?? null;

  const label = {
    fontFamily: face.utility,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    fontSize: 10,
  };

  return (
    <main style={{ background: color.bg ?? '#F7F4EE', minHeight: '100vh', padding: '28px 24px 60px' }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />

      <div style={{ maxWidth: 1320, margin: '0 auto 22px' }}>
        <div style={{ ...label, color: color.inkSoft ?? '#6A6270', marginBottom: 6 }}>
          Checks · Book face
        </div>
        <h1 style={{ fontFamily: face.body, fontSize: 27, margin: '0 0 10px', color: color.ink }}>
          Which face should the book be set in?
        </h1>
        <p
          style={{
            fontFamily: face.body,
            fontSize: 15,
            lineHeight: 1.6,
            maxWidth: '62ch',
            color: color.inkSoft ?? '#6A6270',
            margin: '0 0 18px',
          }}
        >
          The same page, at the same size, in the same type rules — only the face changes.
          Volume 1 spread 1 is the densest page in the four volumes at 350 words, so it is
          the one that decides fit. <strong>Fill over 100% means that page would scroll.</strong>{' '}
          The current stack is the baseline the volumes were paginated under.
        </p>

        <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{ ...label, color: color.ink, display: 'flex', gap: 8, alignItems: 'center' }}>
            Page
            <select
              value={spreadIdx}
              onChange={(e) => setSpreadIdx(Number(e.target.value))}
              style={{ font: 'inherit', letterSpacing: 0, padding: '4px 6px' }}
            >
              {SPREADS.map((s, i) => (
                <option key={s.n} value={i}>
                  Spread {s.n} — {s.words} words
                </option>
              ))}
            </select>
          </label>

          <label style={{ ...label, color: color.ink, display: 'flex', gap: 8, alignItems: 'center' }}>
            Page size {pageSize}px
            <input
              type="range"
              min={520}
              max={820}
              step={4}
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            />
          </label>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 26,
          overflowX: 'auto',
          paddingBottom: 18,
          maxWidth: 1320,
          margin: '0 auto',
        }}
      >
        {FACES.map((f) => {
          const st = stats[f.id] ?? {};
          const over = st.fill != null && st.fill > 100;
          const delta = baseFill != null && st.fill != null && !f.baseline ? st.fill - baseFill : null;
          return (
            <div key={f.id} style={{ flex: '0 0 auto' }}>
              <div style={{ marginBottom: 10, width: pageSize }}>
                <div style={{ ...label, color: color.ink, fontSize: 11 }}>
                  {f.name}
                  {f.baseline ? ' · baseline' : ''}
                </div>
                <div
                  style={{
                    fontFamily: face.body,
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: color.inkSoft ?? '#6A6270',
                    margin: '3px 0 6px',
                  }}
                >
                  {f.note}
                </div>
                <div style={{ ...label, fontSize: 10, color: over ? '#C2553A' : color.inkSoft }}>
                  fill {st.fill != null ? `${st.fill}%` : '—'}
                  {delta != null ? ` (${delta >= 0 ? '+' : ''}${delta})` : ''}
                  {over ? '  ·  SCROLLS' : ''}
                </div>
                {/* Characters a line is the readability number, and the band is 45-75.
                    x-height is apparent size — the thing the eye reads as "bigger",
                    which font-size is not, since every column here is the same px. */}
                <div style={{ ...label, fontSize: 10, color: color.inkSoft, marginTop: 2 }}>
                  {st.cpl != null ? `${st.cpl} c/l` : '—'}
                  {st.cpl != null && st.cpl > 75 ? ' ·  LONG' : ''}
                  {'  ·  '}
                  {st.lines != null ? `${st.lines} lines` : '—'}
                  {'  ·  '}
                  {st.xh != null ? `x-ht ${st.xh}px` : '—'}
                  {'  ·  '}
                  {st.px != null ? `${st.px}px` : '—'}
                </div>
              </div>
              <Page stack={f.stack} spread={spread} pageSize={pageSize} onMeasure={sinks[f.id]} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
