'use client';

import { useCallback, useEffect, useState } from 'react';
import { allVolumes } from '@/lib/millbrook/data';
import { TextPage } from '@/components/millbrook/SpreadPage';
import { color, geometry, paper, space, type, ui } from '@/lib/millbrook/series';

// ============================================================
// Overflow audit. A build-time page, not part of any reader.
//
// This exists because of extraction 6.4, which is the failure mode with no
// symptom: text that does not fit is silently clipped, with no warning in dev,
// no test failure, and nothing in the build output. In the other project that
// was survivable because copy was written to fit a chosen size. Here the prose
// is verbatim and cannot be shortened, so the page must adapt to it.
//
// This reader scrolls rather than clips, so nothing is ever lost. But scrolling
// a page breaks the spread illusion, so it is worth knowing exactly which pages
// need it and at what size. That is what this measures.
//
// Every one of the 33 text pages is rendered at a given page height and its
// content height compared against the space available. The sweep then finds,
// per page, the smallest page height at which it still fits without scrolling.
// ============================================================

// Page height for a given viewport height, mirroring the reader's own geometry.
function pageHeightFor(viewportH) {
  const byHeight = (viewportH - geometry.chromeReserve) * geometry.spreadAspect;
  const spreadW = Math.min(geometry.maxSpreadWidth, byHeight);
  return spreadW / geometry.spreadAspect;
}

const PRESETS = [
  { label: '1920 × 1080', vh: 1080 },
  { label: '1600 × 900', vh: 900 },
  { label: '1440 × 900 (MacBook Air)', vh: 900 },
  { label: '1366 × 768', vh: 768 },
  { label: '1280 × 720', vh: 720 },
];

export default function OverflowCheck() {
  const volumes = allVolumes();
  const pages = volumes.flatMap((v) =>
    v.spreads
      .filter((s) => s.kind === 'spread')
      .map((s) => ({ key: `${v.slug}-${s.n}`, vol: v.volume, spread: s })),
  );

  const [vh, setVh] = useState(1080);
  const [rows, setRows] = useState([]);
  const [sweep, setSweep] = useState(null);

  const pageH = pageHeightFor(vh);
  const pageW = pageH * geometry.pageAspect;

  const measure = useCallback(() => {
    const out = [];
    document.querySelectorAll('[data-audit]').forEach((box) => {
      const flow = box.querySelector('[data-mb-flow]');
      if (!flow) return;
      out.push({
        key: box.dataset.audit,
        bodyPx: parseFloat(getComputedStyle(flow).fontSize),
        content: Math.round(flow.scrollHeight),
        visible: Math.round(flow.clientHeight),
        over: flow.scrollHeight - flow.clientHeight,
      });
    });
    setRows(out);
  }, []);

  useEffect(() => {
    // Two frames, so fonts and the container query have settled.
    const id = requestAnimationFrame(() => requestAnimationFrame(measure));
    return () => cancelAnimationFrame(id);
  }, [vh, measure]);

  // Per page, the smallest viewport height at which it still does not scroll.
  const runSweep = useCallback(() => {
    const boxes = [...document.querySelectorAll('[data-audit]')];
    const result = {};
    const originals = boxes.map((b) => [b.style.height, b.style.width]);

    for (let v = 1400; v >= 600; v -= 10) {
      const h = pageHeightFor(v);
      const w = h * geometry.pageAspect;
      for (const b of boxes) {
        b.style.height = `${h}px`;
        b.style.width = `${w}px`;
      }
      // Force layout once for the whole batch.
      void document.body.offsetHeight;
      for (const b of boxes) {
        const flow = b.querySelector('[data-mb-flow]');
        if (!flow) continue;
        if (flow.scrollHeight <= flow.clientHeight) result[b.dataset.audit] = v;
      }
    }

    boxes.forEach((b, i) => { [b.style.height, b.style.width] = originals[i]; });
    setSweep(result);
    requestAnimationFrame(() => requestAnimationFrame(measure));
  }, [measure]);

  const byKey = Object.fromEntries(rows.map((r) => [r.key, r]));
  const failing = rows.filter((r) => r.over > 0);
  const worst = rows.length ? rows.reduce((a, b) => (b.over > a.over ? b : a)) : null;

  return (
    <main style={{ minHeight: '100vh', background: color.bg, padding: `${space(8)} ${space(6)} ${space(20)}`,
                   fontFamily: type.body.fontFamily }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ color: color.ink, fontSize: 24, margin: `0 0 ${space(2)}`, fontWeight: 700 }}>
          Overflow audit
        </h1>
        <p style={{ color: ui.textMuted, fontSize: 13.5, lineHeight: 1.55, maxWidth: '76ch', margin: `0 0 ${space(6)}` }}>
          All {pages.length} text pages, measured at the page size the reader would use for a
          given viewport. The reader scrolls rather than clips, so a page over its height loses
          nothing, but it stops being a spread. Body type is set by a container query against
          the page, with a {String(type.body.fontSize).match(/clamp\(([^,]+)/)?.[1]} floor.
        </p>

        <div style={{ display: 'flex', gap: space(3), flexWrap: 'wrap', alignItems: 'center',
                      marginBottom: space(5), padding: `${space(3)} ${space(4)}`,
                      background: paper.stock, border: `1px solid ${ui.rule}` }}>
          {PRESETS.map((p) => (
            <button key={p.label} className="focus-ring" onClick={() => setVh(p.vh)}
              style={{ ...type.utility, fontSize: 9, letterSpacing: '0.12em', cursor: 'pointer',
                       padding: `${space(2)} ${space(3)}`,
                       background: vh === p.vh ? color.accent : 'none',
                       border: `1px solid ${vh === p.vh ? color.accent : ui.ruleStrong}`,
                       color: vh === p.vh ? paper.stock : ui.textMuted }}>
              {p.label}
            </button>
          ))}
          <button className="focus-ring" onClick={runSweep}
            style={{ ...type.utility, fontSize: 9, letterSpacing: '0.12em', cursor: 'pointer',
                     padding: `${space(2)} ${space(3)}`, background: 'none',
                     border: `1px solid ${color.accent}`, color: color.accent, marginLeft: 'auto' }}>
            Find threshold per page
          </button>
        </div>

        <div style={{ color: color.ink, fontSize: 14, marginBottom: space(5), lineHeight: 1.6 }}>
          Viewport height <strong>{vh}px</strong> → page {Math.round(pageW)} × {Math.round(pageH)},
          body {byKey[pages[0]?.key]?.bodyPx ?? '?'}px.{' '}
          {rows.length === 0 ? 'Measuring…' : failing.length === 0 ? (
            <span style={{ color: '#1F7A4D', fontWeight: 700 }}>
              All {rows.length} pages fit. No page scrolls.
            </span>
          ) : (
            <span style={{ color: '#B03A1A', fontWeight: 700 }}>
              {failing.length} of {rows.length} pages scroll. Worst: {worst.key} by {worst.over}px.
            </span>
          )}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, color: ui.text }}>
          <thead>
            <tr style={{ ...type.utility, fontSize: 8.5, letterSpacing: '0.14em', color: ui.textFaint }}>
              {['Page', 'Words', 'Body', 'Content', 'Available', 'Overflow', 'Fits above'].map((h) => (
                <th key={h} style={{ textAlign: h === 'Page' ? 'left' : 'right', padding: `${space(2)} ${space(2)}`,
                                     borderBottom: `1px solid ${ui.ruleStrong}` }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ fontVariantNumeric: 'tabular-nums' }}>
            {pages.map((p) => {
              const r = byKey[p.key];
              const bad = r && r.over > 0;
              return (
                <tr key={p.key} style={{ background: bad ? 'rgba(176,58,26,0.08)' : 'transparent' }}>
                  <td style={{ padding: `${space(2)} ${space(2)}`, borderBottom: `1px solid ${ui.ruleSoft}` }}>
                    <span style={{ color: color.ink, fontWeight: 700 }}>vol{p.vol}</span>
                    {' '}spread {String(p.spread.n).padStart(2, '0')}
                  </td>
                  {[
                    p.spread.words,
                    r ? r.bodyPx.toFixed(1) : '—',
                    r ? r.content : '—',
                    r ? r.visible : '—',
                    r ? (r.over > 0 ? `+${r.over}` : '0') : '—',
                    sweep ? (sweep[p.key] ? `${sweep[p.key]}px` : 'never') : '—',
                  ].map((v, i) => (
                    <td key={i} style={{
                      textAlign: 'right', padding: `${space(2)} ${space(2)}`,
                      borderBottom: `1px solid ${ui.ruleSoft}`,
                      color: i === 4 && bad ? '#B03A1A' : undefined,
                      fontWeight: i === 4 && bad ? 700 : undefined,
                    }}>
                      {v}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* The pages themselves, rendered at the target size so the container
          query resolves exactly as it would in the reader. Positioned off to
          the side rather than display:none, because a hidden element has no
          layout and cannot be measured. */}
      <div aria-hidden="true" style={{ position: 'fixed', top: 0, left: -100000 }}>
        {pages.map((p) => (
          <div
            key={p.key}
            data-audit={p.key}
            style={{ width: pageW, height: pageH, position: 'relative' }}
          >
            <TextPage spread={p.spread} compact={false} />
          </div>
        ))}
      </div>
    </main>
  );
}
