'use client';

import { useEffect, useState } from 'react';

// ============================================================
// Type specimen. A scaffolding page, not part of any reader.
// Delete once the typeface is chosen.
//
// Vol 1 spread 8, verbatim. 336 words, the densest text page in the four
// volumes, and it carries all three type styles: a ### section heading,
// body, and the italic closing line. A face that survives this page
// survives the other 32.
// ============================================================

const BLOCKS = [
  { t: 'p', v: '“It’s getting bigger.”' },
  { t: 'p', v: '“It’s getting bigger.”' },
  { t: 'p', v: '“And nobody’s going to do anything about it.”' },
  { t: 'p', v: '“Nobody’s going to do anything about it.”' },
  { t: 'p', v: 'Vex tapped the laptop. The single dark frame stared back at her. “There’s also a girl. New in town. She has a research folder. I checked her car.”' },
  { t: 'p', v: '“You stole a tourist’s dashcam.”' },
  { t: 'p', v: '“She’s not a tourist.”' },
  { t: 'p', v: 'Pip was quiet for a second, eyes tilted at the ceiling like she was reading something off it. “We’re going to talk about boundaries again.”' },
  { t: 'p', v: '“We really aren’t.”' },
  { t: 'h', v: 'End Of Day One' },
  { t: 'p', v: 'Lena lay on the bed in the back room and stared at the ceiling. Aunt Carol had gone to bed at nine. The house was quiet except for the refrigerator.' },
  { t: 'p', v: 'Her phone buzzed. Unknown number.' },
  { t: 'p', v: 'Sorry about the dashcam. Meet at the laundromat on Crescent tomorrow at nine. Bring coffee. Don’t bring those guys.' },
  { t: 'p', v: 'Lena read it twice. How did you get my number.' },
  { t: 'p', v: 'Reply, four seconds later.' },
  { t: 'p', v: 'Your number was on the dashcam manual you left in your glove box. Bring oat milk if you have it.' },
  { t: 'p', v: 'Across town, Owen was looking at his map again. The arc glowed softly on the middle monitor. He’d added the pothole. The arc was a little more complete now, and the gap in the middle was clearly aiming somewhere.' },
  { t: 'p', v: 'Monke was on the desk, face an inch from the glass.' },
  { t: 'p', v: '“What are you looking at.”' },
  { t: 'p', v: 'Monke pointed. Not at the arc this time. At the empty space inside it. There was a building there. The old elementary school, closed since the Event.' },
  { t: 'p', v: '“Tomorrow,” Owen said. “Tomorrow we’ll look. Get off my desk.”' },
  { t: 'p', v: 'Monke did not get off his desk. He sat down on the keyboard, which made the screen do something unhelpful, and he stayed there for the rest of the night.' },
  { t: 'p', v: 'Outside, somewhere across town, the streetlight across from Aunt Carol’s house went off for one frame, then on again, and nobody saw it.' },
  { t: 'i', v: 'To be continued in Part Two: The Bookstore That Was Always There' },
];

const FACES = [
  {
    key: 'arial',
    name: 'Arial',
    stack: 'Arial, Helvetica, sans-serif',
    note: 'As specified in the build brief. Zero load, universally available. Reads as plain rather than as designed.',
  },
  {
    key: 'libre-franklin',
    name: 'Libre Franklin',
    stack: 'var(--font-libre-franklin), Arial, sans-serif',
    note: 'Franklin Gothic lineage: the American vernacular gothic of newspapers and civic signage. Fits a small flat town treated with slightly more seriousness than it has earned.',
  },
  {
    key: 'barlow',
    name: 'Barlow',
    stack: 'var(--font-barlow), Arial, sans-serif',
    note: 'Slightly condensed low-contrast grotesque. The narrower glyphs fit more words per line, which matters most on exactly this page.',
  },
];

// The real page box. A spread is 4:3 (two 2:3 pages side by side), so on a
// laptop allowing ~900px of height the spread is 1200x900 and one page is
// 600x900. Specimen renders at true size so the fit test is honest.
const PAGE_W = 600;
const PAGE_H = 900;

function TextPage({ face, size, leading, indent }) {
  let seenBody = false;
  return (
    <div
      data-page={face.key}
      style={{
        position: 'relative',
        width: PAGE_W,
        height: PAGE_H,
        background: 'var(--paper-stock)',
        padding: '52px 46px 44px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: face.stack,
        fontSize: size,
        lineHeight: leading,
        color: 'var(--ink)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.18), 0 24px 56px rgba(0,0,0,0.34)',
      }}
    >
      {/* No flex:1 here. A stretching box reports its own clientHeight as
          scrollHeight, so the overflow measurement silently reads zero and
          every page looks like it fits. */}
      <div data-flow>
        {BLOCKS.map((b, i) => {
          if (b.t === 'h') {
            seenBody = false;
            return (
              <h3
                key={i}
                style={{
                  margin: '1.15em 0 0.5em',
                  fontSize: '1.16em',
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {b.v}
              </h3>
            );
          }
          if (b.t === 'i') {
            return (
              <p key={i} style={{ margin: '1.3em 0 0', fontStyle: 'italic', textIndent: 0 }}>
                {b.v}
              </p>
            );
          }
          // Fiction convention: no vertical gap between paragraphs, indent
          // every paragraph after the first of a section. On a page with 22
          // paragraphs this is worth roughly 170px of height, which is the
          // difference between fitting and not.
          const ind = seenBody ? indent : 0;
          seenBody = true;
          return (
            <p key={i} style={{ margin: 0, textIndent: ind }}>
              {b.v}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default function TypeSpecimen() {
  const [size, setSize] = useState(14.25);
  const [leading, setLeading] = useState(1.5);
  const [indent, setIndent] = useState(20);
  const [fit, setFit] = useState({});

  // Measure rather than eyeball. Overflow on a fiction page is silent
  // clipping of prose that is not editable, so it has to be a number.
  useEffect(() => {
    const next = {};
    document.querySelectorAll('[data-page]').forEach((pg) => {
      const flow = pg.querySelector('[data-flow]');
      const avail = pg.clientHeight - 52 - 44;
      const used = flow.getBoundingClientRect().height;
      next[pg.dataset.page] = { used: Math.round(used), avail: Math.round(avail) };
    });
    setFit(next);
  }, [size, leading, indent]);

  return (
    <main style={{ minHeight: '100vh', padding: '32px 28px 80px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 2000, margin: '0 auto' }}>
        <h1 style={{ color: '#F4EFE6', fontSize: 22, margin: '0 0 6px', fontWeight: 700 }}>
          Millbrook · typeface specimen
        </h1>
        <p style={{ color: '#A29AAC', fontSize: 13.5, margin: '0 0 4px', maxWidth: '80ch', lineHeight: 1.5 }}>
          The Patch Notes, Volume 1, spread 8, verbatim. 336 words: the densest text page in
          the four volumes. Single column, indented paragraphs, no inter-paragraph gaps.
          Each page is rendered at its true size of {PAGE_W}&times;{PAGE_H}.
        </p>
        <p style={{ color: '#A29AAC', fontSize: 13.5, margin: '0 0 22px', maxWidth: '80ch', lineHeight: 1.5 }}>
          The number under each page is measured, not estimated. Green fits. Red is prose
          being silently clipped.
        </p>

        <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', alignItems: 'center', marginBottom: 26,
                      padding: '14px 18px', background: '#2A272F', borderRadius: 4 }}>
          {[
            ['Size', size, 12, 18, 0.25, setSize, 'px'],
            ['Leading', leading, 1.3, 1.8, 0.02, setLeading, ''],
            ['Indent', indent, 0, 32, 1, setIndent, 'px'],
          ].map(([label, val, min, max, step, set, unit]) => (
            <label key={label} style={{ color: '#CFC8D4', fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ minWidth: 58 }}>{label}</span>
              <input
                type="range" min={min} max={max} step={step} value={val}
                onChange={(e) => set(Number(e.target.value))}
                style={{ width: 150 }}
              />
              <span style={{ minWidth: 52, fontVariantNumeric: 'tabular-nums', color: '#F4EFE6' }}>
                {val}{unit}
              </span>
            </label>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap' }}>
          {FACES.map((f) => {
            const m = fit[f.key];
            const ok = m ? m.used <= m.avail : true;
            return (
              <div key={f.key} style={{ width: PAGE_W }}>
                <div style={{ color: '#F4EFE6', fontSize: 16, fontWeight: 700, marginBottom: 3 }}>{f.name}</div>
                <div style={{ color: '#A29AAC', fontSize: 12.5, lineHeight: 1.45, marginBottom: 12, minHeight: 54 }}>
                  {f.note}
                </div>
                <TextPage face={f} size={size} leading={leading} indent={indent} />
                <div style={{
                  marginTop: 9, fontSize: 12.5, fontVariantNumeric: 'tabular-nums',
                  color: ok ? '#7FD6A9' : '#F08A72', fontWeight: 600,
                }}>
                  {m ? `${m.used}px used of ${m.avail}px available · ${ok ? `fits, ${m.avail - m.used}px spare` : `OVERFLOWS by ${m.used - m.avail}px`}` : 'measuring'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
