'use client';

/**
 * Every text page in every volume, measured against the shipped type tokens.
 *
 * `/checks/overflow` measures the real reader, which is the right thing to do and
 * makes it useless in a non-compositing preview pane: it waits on a double
 * `requestAnimationFrame` that never fires there, so every row sits at "—" forever
 * and the table reads as broken rather than pending. This route answers the same
 * question with `setTimeout`, which does fire, by rendering each page's blocks into
 * a faithful copy of the page box instead of driving the reader.
 *
 * It is a model, so it is worth saying what it does and does not share with the real
 * thing. Same type tokens, same square page, same padding, same column-flex flow,
 * same folio stealing height off the column, same measurement recipe. What it does
 * NOT reproduce is the reader's chrome arithmetic — the real page size comes from
 * `min(2100px, 100%, (100svh - 115px) * 2)` and here it is a number you set — nor the
 * terminal mark, which is deliberately excluded from its own measurement in the reader
 * too.
 *
 * Calibrated against clean loads at 1440x900, which is a 696px page:
 *
 *     vol1 spread 3    reader 106%    this route 107%
 *     vol1 spread 1    reader 104%    this route 101%
 *
 * So it runs a couple of points optimistic on some pages and should be read as "this
 * page is near the line", not as the third significant figure. Load the spread before
 * acting on a number within about three points of 100.
 *
 * Use it for "did a type change break a page anywhere", which is a sweep over 40-odd
 * pages that no one will do by hand. Use the real reader for a verdict on one page.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import vol1 from '@/patch-notes/volumes/vol1.json';
import vol2 from '@/patch-notes/volumes/vol2.json';
import vol3 from '@/patch-notes/volumes/vol3.json';
import vol4 from '@/patch-notes/volumes/vol4.json';
import u1 from '@/patch-notes/volumes/u1.json';
import u2 from '@/patch-notes/volumes/u2.json';
import u3 from '@/patch-notes/volumes/u3.json';
import u4 from '@/patch-notes/volumes/u4.json';
import n1 from '@/patch-notes/volumes/n1.json';
import n2 from '@/patch-notes/volumes/n2.json';
import n3 from '@/patch-notes/volumes/n3.json';
import n4 from '@/patch-notes/volumes/n4.json';
import { color, paper, type as typeTokens, face, space } from '@/lib/millbrook/series';

const VOLUMES = [vol1, vol2, vol3, vol4, u1, u2, u3, u4, n1, n2, n3, n4];

/** The two laptops that matter. 604 is 1280x720, 696 is 1440x900. */
const SIZES = [604, 696];

const CPL_SAMPLE =
  'Aunt Carol’s house was on Crescent Street. It was the same yellow siding, the same chain link fence and the same ceramic frog by the front steps that she remembered.';

/**
 * One page, rendered off-screen and measured, then thrown away.
 *
 * Rendering all 40-odd pages at once and measuring them together would be faster and
 * is wrong: `cqh` resolves against each page's own container, so they all have to be
 * the real size at the same time, and forty 696px squares is a 28,000px document that
 * the browser is entitled to not lay out fully.
 */
function measurePage({ blocks, pageSize, host }) {
  const page = document.createElement('div');
  Object.assign(page.style, {
    width: `${pageSize}px`,
    height: `${pageSize}px`,
    containerType: 'size',
    padding: '30px 30px 16px',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    overflow: 'hidden',
  });

  const positioner = document.createElement('div');
  Object.assign(positioner.style, {
    position: 'relative',
    flex: '1',
    minHeight: '0',
    display: 'flex',
    flexDirection: 'column',
  });

  const flow = document.createElement('div');
  Object.assign(flow.style, { flex: '1', minHeight: '0', overflowY: 'auto', overflowX: 'hidden' });

  const asCss = (o) =>
    Object.entries(o)
      .map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}:${typeof v === 'number' && k !== 'lineHeight' ? v + 'px' : v}`)
      .join(';');

  const bodyCss = asCss(typeTokens.body);
  let first = true;
  for (const b of blocks) {
    const el = document.createElement(b.t === 'h' ? 'h3' : 'p');
    el.textContent = b.v;
    if (b.t === 'h') {
      el.style.cssText = `${bodyCss};${asCss(typeTokens.heading)};margin:${first ? '0 0 8px' : '1.15em 0 0.5em'}`;
    } else {
      el.style.cssText = `${bodyCss};margin:0;text-indent:${first ? 0 : '1.4em'}`;
    }
    flow.appendChild(el);
    first = false;
  }

  positioner.appendChild(flow);
  page.appendChild(positioner);

  // The folio, which is not decoration here — it is a `flex: none` sibling of the
  // flow, so it takes its height off the column before the prose gets any. Leaving
  // it out gave the flow 650px where the reader gives it 628, and every page read
  // about three and a half points emptier than it is: vol1-3 modelled at 104%
  // against the reader's real 106%.
  const folio = document.createElement('div');
  Object.assign(folio.style, {
    fontFamily: face.utility,
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: '8.5px',
    letterSpacing: '0.18em',
    paddingTop: space(3),
    flex: 'none',
  });
  folio.textContent = '00';
  page.appendChild(folio);

  host.appendChild(page);

  const prev = flow.style.flex;
  flow.style.flex = 'none';
  const used = flow.scrollHeight;
  flow.style.flex = prev;
  const room = flow.clientHeight;

  let cpl = null;
  const p = flow.querySelector('p');
  if (p) {
    const probe = document.createElement('span');
    probe.style.cssText = 'white-space:nowrap;position:absolute;visibility:hidden;left:-9999px';
    probe.textContent = CPL_SAMPLE;
    p.appendChild(probe);
    const adv = probe.getBoundingClientRect().width / CPL_SAMPLE.length;
    probe.remove();
    if (adv > 0) cpl = Math.round(p.clientWidth / adv);
  }

  page.remove();
  return { fill: room > 0 ? Math.round((used / room) * 100) : null, cpl };
}

export default function FillCheck() {
  const [rows, setRows] = useState(null);
  const [busy, setBusy] = useState(true);
  const hostRef = useRef(null);

  useEffect(() => {
    // One tick, so the webfont is decoded. Measuring the metric-matched fallback
    // instead of Literata would report numbers for a font nobody sees.
    let alive = true;
    const run = async () => {
      await document.fonts.ready;
      if (!alive) return;
      const host = hostRef.current;
      const out = [];
      for (const v of VOLUMES) {
        for (const s of v.spreads) {
          if (s.kind !== 'spread') continue;
          const per = {};
          for (const size of SIZES) per[size] = measurePage({ blocks: s.blocks, pageSize: size, host });
          out.push({
            vol: v.slug ?? v.volume,
            arc: v.arc,
            n: s.n,
            words: s.words,
            per,
          });
        }
      }
      if (alive) {
        setRows(out);
        setBusy(false);
      }
    };
    const t = setTimeout(run, 60);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, []);

  const summary = useMemo(() => {
    if (!rows) return null;
    const over = {};
    for (const size of SIZES) over[size] = rows.filter((r) => (r.per[size].fill ?? 0) > 100);
    return over;
  }, [rows]);

  const label = {
    fontFamily: face.utility,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    fontSize: 10,
  };

  return (
    <main style={{ background: color.bg ?? '#F7F4EE', minHeight: '100vh', padding: '28px 24px 60px' }}>
      {/* The measuring room. Off-screen but genuinely laid out — `display:none` or
          `visibility:hidden` would skip layout and every number would come back 0. */}
      <div
        ref={hostRef}
        aria-hidden="true"
        style={{ position: 'absolute', left: -99999, top: 0, background: paper.stock }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ ...label, color: color.inkSoft ?? '#6A6270', marginBottom: 6 }}>Checks · Fill</div>
        <h1 style={{ fontFamily: face.body, fontSize: 27, margin: '0 0 10px', color: color.ink }}>
          Every text page, against the shipped type tokens
        </h1>
        <p
          style={{
            fontFamily: face.body,
            fontSize: 15,
            lineHeight: 1.6,
            maxWidth: '62ch',
            color: color.inkSoft ?? '#6A6270',
            margin: '0 0 20px',
          }}
        >
          Over 100% means the page runs past its column and scrolls, which is a supported
          state rather than a bug — but it should be a page you meant. 604px is a 1280×720
          laptop and 696px is 1440×900.
        </p>

        {busy && <div style={{ ...label, color: color.ink }}>Measuring…</div>}

        {summary && (
          <div style={{ marginBottom: 22 }}>
            {SIZES.map((size) => (
              <div key={size} style={{ ...label, color: summary[size].length ? '#C2553A' : '#3F7A46', marginBottom: 4 }}>
                {size}px page — {summary[size].length} of {rows.length} pages over
                {summary[size].length
                  ? `: ${summary[size].map((r) => `${r.vol}-${r.n} (${r.per[size].fill}%)`).join(', ')}`
                  : ''}
              </div>
            ))}
          </div>
        )}

        {rows && (
          <table style={{ borderCollapse: 'collapse', fontFamily: face.utility, fontSize: 12, width: '100%' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: `1px solid ${color.ink}` }}>
                {['Volume', 'Spread', 'Words', '604px', '696px', 'c/l'].map((h) => (
                  <th key={h} style={{ ...label, fontSize: 9, padding: '6px 10px 6px 0', color: color.ink }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={`${r.vol}-${r.n}`} style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                  <td style={{ padding: '5px 10px 5px 0', color: color.inkSoft }}>{r.vol}</td>
                  <td style={{ padding: '5px 10px 5px 0', color: color.inkSoft }}>{r.n}</td>
                  <td style={{ padding: '5px 10px 5px 0', color: color.inkSoft }}>{r.words}</td>
                  {SIZES.map((size) => {
                    const f = r.per[size].fill;
                    const over = f > 100;
                    return (
                      <td
                        key={size}
                        style={{
                          padding: '5px 10px 5px 0',
                          color: over ? '#C2553A' : f > 94 ? '#9A7B1F' : color.ink,
                          fontWeight: over ? 700 : 400,
                        }}
                      >
                        {f}%
                      </td>
                    );
                  })}
                  <td style={{ padding: '5px 10px 5px 0', color: r.per[696].cpl > 75 ? '#C2553A' : color.inkSoft }}>
                    {r.per[696].cpl ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
