'use client';

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import Link from 'next/link';
import { Crumbs } from './Crumbs';
import { useTextEditing } from './useTextEditing';
import { useTypeScale } from './useTypeScale';
import {
  BlankPage, GraphicPage, OpenerSpread, TextPage, scrollEdges, scrollOneScreen,
} from './SpreadPage';
import { color, geometry, paper, reader, space, turn as TURN, type, ui } from '@/lib/millbrook/series';

// ============================================================
// Leaves
//
// One leaf is one opening. No act layer: extraction 6.13 recommends dropping
// it where a book has no interstitials, and these volumes have chapter openers
// instead, which are spreads in their own right rather than dividers. That
// removes the counter/position mismatch Unbroke carried, where the counter
// counted spreads while the position indexed leaves.
// ============================================================

function buildLeaves(volume) {
  // The running section, carried forward so a continuation page still knows which
  // section it is in. Only 25 of the 38 spreads open a new one; the plate caption
  // needs an answer for all of them, and "the section this page continues" is the
  // true answer rather than a filler. Falls back to the chapter, which is only
  // reachable if a volume's first spread opens with no heading at all.
  let section = null;
  return volume.spreads.map((s) => {
    const heading = (s.blocks || []).find((b) => b.t === 'h');
    if (heading) section = heading.v;
    return {
      kind: s.kind, // 'opener' | 'spread'
      spread: s,
      section: section ?? volume.chapter,
      key: `${volume.slug}-${s.n}`,
    };
  });
}

/** How many swipes a leaf takes on a single-page layout. */
const halvesFor = (leaf, wide) => (wide || leaf.kind === 'opener' ? 1 : 2);

// ============================================================
// The turn state machine
//
// An explicit reducer. Extraction 6.5: the other project coordinated one state
// machine with six mutually-patching refs (animating, posRef, reduced, safety,
// queue, onAnimEndRef), every one of which existed to work around a stale
// closure, and the bug that produced was user-visible - two clicks advanced
// one page. Here 'turning' is derived from anim, the queue is one field, and
// nothing needs a mirror ref.
//
// The animation is decoration. pos moves immediately and the base layer
// already shows the destination; the sheet just flies over the top. So no
// state transition depends on the animation completing, which is the trap
// 6.6 describes: reduced motion, display:none, or a background tab all stop
// animationend from firing, and anything waiting on it deadlocks.
// ============================================================

const initial = (idx = 0) => ({ pos: { idx, half: 0 }, anim: null, queue: null, seq: 0 });

function nextPos(pos, dir, leaves, wide) {
  const leaf = leaves[pos.idx];
  if (leaf && halvesFor(leaf, wide) === 2) {
    if (dir === 'fwd' && pos.half === 0) return { idx: pos.idx, half: 1 };
    if (dir === 'back' && pos.half === 1) return { idx: pos.idx, half: 0 };
  }
  const ni = dir === 'fwd' ? pos.idx + 1 : pos.idx - 1;
  if (ni < 0 || ni >= leaves.length) return null;
  // Coming backwards into a leaf lands on its last half, which is the page you
  // were just reading the far side of.
  const half = dir === 'back' ? halvesFor(leaves[ni], wide) - 1 : 0;
  return { idx: ni, half };
}

function advance(state, { dir, leaves, wide, reduced }) {
  // Already turning: queue this one. A single slot, so a burst of input
  // neither stacks up into a long animation chain nor gets dropped.
  if (state.anim) return { ...state, queue: dir };

  const target = nextPos(state.pos, dir, leaves, wide);
  if (!target) return state;

  if (reduced) return { ...state, pos: target, queue: null };

  const seq = state.seq + 1;
  return {
    pos: target,
    anim: { dir, from: state.pos, id: `${dir}-${state.pos.idx}-${state.pos.half}-${seq}` },
    queue: null,
    seq,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'go':
      return advance(state, action);

    case 'animEnd': {
      if (!state.anim) return state;
      const cleared = { ...state, anim: null, queue: null };
      // Process the queued turn in the same pass. No setTimeout and no rAF:
      // rAF is paused entirely while the page is not compositing, which
      // silently swallowed every queued turn in the other project.
      if (state.queue) {
        return advance(cleared, { ...action, dir: state.queue });
      }
      return cleared;
    }

    case 'jump':
      if (action.idx === state.pos.idx && (action.half ?? 0) === state.pos.half) return state;
      return { ...state, pos: { idx: action.idx, half: action.half ?? 0 }, anim: null, queue: null };

    default:
      return state;
  }
}

// ============================================================
// Edge stacks
// ============================================================

/**
 * The stack of thin lines suggesting remaining page thickness.
 *
 * The cheapest and most effective cue that this is a book, and it works
 * because it is the only element that changes as you read.
 *
 * Each sliver is 2px and alternates stock/stockEdge so the stack reads as
 * separate sheets, and each is 1.5px shorter than the last so the outer edge
 * is slightly convex the way a real block of paper sits.
 *
 * Capped at 9. Extraction 6.12 flags that as losing information in a long
 * book; these volumes are nine and ten leaves, so the cap is never reached in
 * a way that matters.
 */
function EdgeStack({ side, count }) {
  const n = Math.max(0, Math.min(9, count));
  if (!n) return null;
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 6,
        bottom: 6,
        width: n * 2 + 1,
        [side]: -(n * 2 + 1),
        display: 'flex',
        flexDirection: side === 'right' ? 'row' : 'row-reverse',
        pointerEvents: 'none',
      }}
    >
      {[...Array(n)].map((_, i) => (
        <div
          key={i}
          style={{
            width: 2,
            height: `calc(100% - ${i * 1.5}px)`,
            alignSelf: 'center',
            background: i % 2 ? paper.stockEdge : paper.stock,
            borderRight: side === 'right' ? '0.5px solid rgba(40,38,44,0.14)' : 'none',
            borderLeft: side === 'left' ? '0.5px solid rgba(40,38,44,0.14)' : 'none',
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
// Contents
//
// Rendered as a SIBLING of the book, never a descendant. A CSS 3D transform
// makes an ancestor the containing block even for position: fixed, so a dialog
// inside the book would be dragged along by the curl and clipped at the
// gutter. Extraction 6.7. Keeping it outside avoids needing a portal at all.
// ============================================================

function Contents({ volume, leaves, current, onPick, onClose }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Contents"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        // The reader's own ground, so opening the contents does not change the colour of the
        // room. It is a full-screen table of contents rather than a dialog over content you
        // still want to see, which is why it is opaque.
        background: reader.bg,
        overflowY: 'auto',
        padding: `${space(10)} ${space(5)} ${space(16)}`,
      }}
    >
      <div style={{ maxWidth: 940, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: space(4),
            marginBottom: space(7),
            paddingBottom: space(3),
            borderBottom: `1px solid ${reader.rule}`,
          }}
        >
          <div>
            <div style={{ ...type.utility, fontSize: 10, letterSpacing: '0.22em', color: color.accent }}>
              Contents
            </div>
            <div style={{ color: color.ink, fontSize: 19, fontWeight: 700, marginTop: 4,
                          fontFamily: type.body.fontFamily }}>
              {volume.chapter}
            </div>
          </div>
          <button className="focus-ring" onClick={onClose}
            style={{ ...type.utility, fontSize: 10, letterSpacing: '0.18em', background: color.bgRaise,
                     border: `1px solid ${reader.ruleStrong}`, color: reader.textMuted,
                     padding: `${space(2)} ${space(4)}`, cursor: 'pointer' }}>
            Close
          </button>
        </div>

        <div style={{ display: 'grid', gap: space(3), gridTemplateColumns: 'repeat(auto-fill, minmax(216px, 1fr))' }}>
          {leaves.map((l, i) => {
            const s = l.spread;
            const here = i === current;
            const sections = (s.blocks || []).filter((b) => b.t === 'h').map((b) => b.v);
            return (
              <button
                key={l.key}
                className="focus-ring"
                onClick={() => onPick(i)}
                style={{
                  textAlign: 'left',
                  cursor: 'pointer',
                  background: here ? 'rgba(91,63,196,0.09)' : paper.stock,
                  // Longhand, not `border` + `borderTop`: React warns on that pair, and this
                  // one rerenders on every pick, which is exactly when the hazard bites.
                  borderWidth: '3px 1px 1px',
                  borderStyle: 'solid',
                  borderColor: here
                    ? color.accent
                    : `${reader.ruleStrong} ${reader.rule} ${reader.rule}`,
                  borderRadius: 6,
                  padding: space(4),
                  display: 'flex',
                  flexDirection: 'column',
                  gap: space(2),
                  color: color.ink,
                  fontFamily: type.body.fontFamily,
                }}
              >
                <span style={{ ...type.utility, fontSize: 9, letterSpacing: '0.16em', color: here ? color.accent : reader.textFaint }}>
                  {l.kind === 'opener' ? 'Opener' : `Spread ${String(s.n).padStart(2, '0')}`}
                </span>
                <span style={{ fontSize: 14.5, fontWeight: 700, lineHeight: 1.25 }}>
                  {l.kind === 'opener'
                    ? s.title?.part || 'Chapter opener'
                    : sections[0] || `Pages ${s.pages}`}
                </span>
                {l.kind === 'spread' && (
                  <span style={{ fontSize: 11.5, color: reader.textMuted, lineHeight: 1.4 }}>
                    {sections.length > 1 ? sections.slice(1).join(' · ') + ' · ' : ''}
                    {s.words} words
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// The reader
// ============================================================

/**
 * What the reader is offered on the last page.
 *
 * Deliberately a link and not an automatic advance. Turning past the last page
 * into the next volume would mean one more click of the same gesture silently
 * changed which book you were in, and a mis-click at the end of a chapter is the
 * worst possible place to lose your position. So the forward controls stay dead at
 * the end and this appears instead, in the slot they occupied.
 *
 * `next` is null on the final volume, which is the cue to send the reader back to
 * the shelf rather than onward.
 */
function EndOfVolume({ next, wide }) {
  const base = {
    ...type.utility,
    fontSize: 9,
    letterSpacing: '0.18em',
    textDecoration: 'none',
    padding: `${space(2)} ${space(4)}`,
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    alignItems: 'center',
    gap: space(2),
  };

  // The bottom bar also carries the counter and Contents, and at 375px the full
  // labels push it past the viewport. aria-label keeps the long form for screen
  // readers, where there is no width to run out of.
  if (!next) {
    return (
      <Link
        href="/"
        className="focus-ring"
        aria-label="Arc complete. Back to Millbrook."
        // Ink, not paper. This used to be a paper-coloured button with shell-coloured text,
        // which worked when the shell was near-black and became invisible the moment it went
        // off-white — light type on a light button on a light bar.
        style={{
          ...base,
          color: paper.stock,
          background: color.ink,
          border: `1px solid ${color.ink}`,
        }}
      >
        {wide ? 'Arc complete · back to Millbrook →' : 'Millbrook →'}
      </Link>
    );
  }

  return (
    <Link
      href={next.href}
      className="focus-ring"
      aria-label={`Read ${next.part}: ${next.title}`}
      style={{
        ...base,
        color: paper.stock,
        background: color.accent,
        border: `1px solid ${color.accent}`,
      }}
    >
      {wide ? `Read ${next.part} →` : `${next.part} →`}
    </Link>
  );
}

/**
 * The turn guide: the bar above the book that says which side does what.
 *
 * The reported problem was that readers did not know clicking the right-hand page
 * advances and the left-hand page goes back. That is a fair complaint, because until
 * now the ONLY hint was the mouse cursor changing to `e-resize` over the right half
 * and `w-resize` over the left. A cursor is the weakest affordance available: it is
 * invisible until the pointer is already inside the region, invisible on any touch
 * device, invisible in a screenshot, and even when seen, a resize cursor says "drag
 * this edge" rather than "click to turn the page".
 *
 * **The fix is spatial rather than verbal, and that is the whole design.** A legend
 * that says "click right to go forward" makes the reader hold a sentence in their head
 * and map it onto the layout themselves. Two halves sitting directly above the two
 * halves they describe, each the exact width of the page below it, means there is
 * nothing to map: the label is already over the thing it labels. The centre divider
 * lines up with the gutter for the same reason.
 *
 * They are real buttons, not a caption. A reader who reaches for the label instead of
 * the page gets what they wanted rather than discovering the sign is not a control —
 * and it makes the reader keyboard-operable from the top of the document instead of
 * only from the auto-hiding bar at the bottom.
 *
 * Deliberately NOT auto-hiding, unlike the bottom chrome. This exists for somebody who
 * has not worked out the interaction yet, and a control that vanishes after three
 * seconds is no use to exactly that person.
 *
 * On the compact layout the two halves become one row of two buttons, because there is
 * no left and right page to sit above — a spread is two swipes there, so the spatial
 * argument does not apply and the plain controls are the honest presentation.
 */
function TurnGuide({ wide, atStart, atEnd, onBack, onForward }) {
  const label = {
    ...type.utility,
    fontSize: 8.5,
    letterSpacing: '0.16em',
    display: 'inline-flex',
    alignItems: 'center',
    gap: space(2),
    whiteSpace: 'nowrap',
  };

  const half = (dir, dead) => ({
    flex: 1,
    minWidth: 0,
    display: 'flex',
    // Each label sits toward the OUTER edge of its half, over the part of the page a
    // reader's hand actually goes to. Centred in the half, both labels would crowd the
    // gutter and point at the one place clicking does the least obvious thing.
    justifyContent: dir === 'back' ? 'flex-start' : 'flex-end',
    alignItems: 'center',
    background: 'none',
    border: 0,
    borderBottom: `2px solid ${dead ? 'transparent' : reader.rule}`,
    padding: `${space(1)} ${space(3)} ${space(2)}`,
    cursor: dead ? 'default' : 'pointer',
    color: dead ? reader.textFaint : reader.textMuted,
    opacity: dead ? 0.45 : 1,
    transition: 'color 160ms ease, border-color 160ms ease',
  });

  if (!wide) {
    return (
      <div
        className="mb-turnguide"
        style={{
          width: `min(${geometry.compactMaxWidth}px, 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: space(3),
          marginBottom: space(2),
          flex: 'none',
        }}
      >
        <button type="button" className="focus-ring" onClick={onBack} disabled={atStart}
          style={{ ...half('back', atStart), flex: 'none' }}>
          <span style={label}>← Back</span>
        </button>
        <span style={{ ...label, color: reader.textFaint, fontSize: 8 }}>Swipe or tap</span>
        <button type="button" className="focus-ring" onClick={onForward} disabled={atEnd}
          style={{ ...half('fwd', atEnd), flex: 'none' }}>
          <span style={label}>Next →</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className="mb-turnguide"
      // Exactly the book's own width arithmetic, so the divider below lands on the
      // gutter and each half measures the page beneath it. Duplicating the expression
      // is the cost of the alignment; getting it from geometry keeps the two in step.
      style={{
        width: `min(${geometry.maxSpreadWidth}px, 100%, calc((100svh - ${geometry.chromeReserve}px) * ${geometry.spreadAspect}))`,
        display: 'flex',
        alignItems: 'stretch',
        marginBottom: space(2),
        flex: 'none',
      }}
    >
      <button type="button" className="focus-ring" onClick={onBack} disabled={atStart}
        aria-label="Go back one page" style={half('back', atStart)}>
        <span style={label} aria-hidden="true">
          ← Click this side to go back
        </span>
      </button>

      {/* Aligns with the gutter, which is what ties the two halves to the two pages. */}
      <span aria-hidden="true" style={{ width: 1, background: reader.rule, flex: 'none' }} />

      <button type="button" className="focus-ring" onClick={onForward} disabled={atEnd}
        aria-label="Go forward one page" style={half('fwd', atEnd)}>
        <span style={label} aria-hidden="true">
          {atEnd ? 'End of this part' : 'Click this side to go forward'} →
        </span>
      </button>
    </div>
  );
}

/**
 * The reader's type-size control: one "Aa" button, and a row of stops above it.
 *
 * A popover rather than a pair of A- / A+ buttons sitting in the bar, and the reason
 * is the bar itself. It wraps rather than overflows, its height is what
 * `readerPad.compactBottom` is measured against, and at 375px the wide spacing
 * already needed 386px for its controls. One control is affordable there; two are
 * how the bar goes to a second row and the foot of the page ends up underneath it.
 *
 * Measured at 375px after adding this one, because that is the failure the note
 * above is warning about: the production bar stays one row at 52px, and the DEV bar
 * wraps to two at 88px, because it also carries Edit. That is tolerable rather than
 * ideal — the reader's bottom padding comes from the measured bar rather than from
 * `readerPad.compactBottom`, so the page moves out of the way — and it is the same
 * "a dev bar is one control wider" case the reader notes already describe. Shaving
 * the 10px that would avoid it was tried on paper and rejected: it leaves a 2px
 * margin, which is not a fix, it is the next control's problem.
 *
 * A radiogroup, because that is what this is: one of five, always exactly one
 * chosen. The arrow keys are handled here rather than left to the book, which is
 * also why `FlipBook` stops feeding its own key handler while this is open —
 * otherwise pressing Right to reach the next size would turn the page underneath.
 */
function TypeSizer({ scale, stops, choose, open, setOpen, wide }) {
  const panelRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const opener = btnRef.current;
    // Focus the current stop, so the group opens where the reader already is.
    panelRef.current?.querySelector('[aria-checked="true"]')?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        opener?.focus();
        return;
      }
      const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1
        : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1
        : 0;
      if (!dir) return;
      e.preventDefault();
      const i = stops.indexOf(scale);
      const next = stops[Math.min(stops.length - 1, Math.max(0, (i < 0 ? 1 : i) + dir))];
      choose(next);
      // The group re-renders with a new checked stop; move focus to follow it.
      setTimeout(() => panelRef.current?.querySelector('[aria-checked="true"]')?.focus(), 0);
    };

    const onDown = (e) => {
      if (panelRef.current?.contains(e.target) || opener?.contains(e.target)) return;
      setOpen(false);
    };

    // Capture, so this runs before the book's own key handler whatever the order
    // the listeners were added in.
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('pointerdown', onDown, true);
    return () => {
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('pointerdown', onDown, true);
    };
  }, [open, setOpen, stops, scale, choose]);

  const chip = {
    ...type.utility,
    fontSize: 9,
    letterSpacing: '0.18em',
    background: 'none',
    border: `1px solid ${reader.ruleStrong}`,
    color: reader.textMuted,
    padding: `${space(2)} ${space(3)}`,
    cursor: 'pointer',
    marginLeft: space(2),
  };

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        ref={btnRef}
        className="focus-ring"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        title="Text size"
        style={{
          ...chip,
          background: open ? color.accent : 'none',
          borderColor: open ? color.accent : reader.ruleStrong,
          color: open ? paper.stock : reader.textMuted,
        }}
      >
        Aa
      </button>

      {open && (
        <div
          ref={panelRef}
          role="radiogroup"
          aria-label="Text size"
          style={{
            position: 'absolute',
            bottom: '100%',
            right: 0,
            marginBottom: space(2),
            display: 'flex',
            alignItems: 'baseline',
            gap: space(1),
            padding: `${space(2)} ${space(2)}`,
            background: paper.stock,
            border: `1px solid ${reader.ruleStrong}`,
            boxShadow: ui.shadow,
            whiteSpace: 'nowrap',
          }}
        >
          {stops.map((s) => {
            const on = s === scale;
            return (
              <button
                key={s}
                className="focus-ring"
                role="radio"
                aria-checked={on}
                // Roving tabindex: the group is one tab stop and the arrows move
                // within it, which is what a radiogroup is supposed to do.
                tabIndex={on ? 0 : -1}
                onClick={() => choose(s)}
                aria-label={`Text size ${Math.round(s * 100)} percent`}
                style={{
                  fontFamily: type.body.fontFamily,
                  // Scaled against the base so the buttons themselves show the
                  // difference they make.
                  fontSize: `${Math.round(10 * s * (wide ? 1.15 : 1))}px`,
                  lineHeight: 1,
                  background: on ? color.accent : 'none',
                  color: on ? paper.stock : reader.textMuted,
                  border: 'none',
                  borderRadius: 2,
                  cursor: 'pointer',
                  // Thumb-sized on a phone. These were 23x17 at first, which is a
                  // third of the ~44px a touch target wants and is the harder miss
                  // to recover from: the stops sit 4px apart, so a near miss is the
                  // wrong size rather than nothing. Inside a panel the room is free.
                  //
                  // The "Aa" chip that opens this panel is deliberately NOT enlarged
                  // to match. It sits in a row with Edit and Contents at 27px, and
                  // one tall control among short ones reads as a mistake. Growing
                  // that row is its own change, for all three at once.
                  padding: wide ? `${space(1)} ${space(2)}` : `${space(2)} ${space(3)}`,
                  minWidth: wide ? 22 : 40,
                  minHeight: wide ? 0 : 40,
                }}
              >
                A
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * Live fill readout for the page being edited.
 *
 * Polls rather than observing, because the text is edited by the browser's own
 * contenteditable machinery and there is no React state change to hang off. 250ms is
 * below the threshold at which a number feels laggy and far above the cost of one
 * scrollHeight read.
 *
 * Measures with flex temporarily off, for the reason that cost real time three
 * separate occasions on this project: a stretching flow box reports scrollHeight
 * equal to clientHeight, so overflow silently reads as zero.
 */
function FillMeter({ status }) {
  const [fill, setFill] = useState(null);

  useEffect(() => {
    const read = () => {
      const flow = document.querySelector('[data-mb-kind="text"] [data-mb-flow]');
      if (!flow) { setFill(null); return; }
      const prev = flow.style.flex;
      flow.style.flex = 'none';
      const content = flow.scrollHeight;
      flow.style.flex = prev;
      const avail = flow.clientHeight;
      setFill(avail ? Math.round((content / avail) * 100) : null);
    };
    read();
    const id = setInterval(read, 250);
    return () => clearInterval(id);
  }, []);

  const over = fill != null && fill > 100;
  const tight = fill != null && fill > 94 && !over;
  const tone = over ? '#E0704F' : tight ? '#D8B24A' : '#8FB98A';

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: 62,
        left: 0,
        right: 0,
        zIndex: 31,
        display: 'flex',
        justifyContent: 'center',
        gap: space(3),
        pointerEvents: 'none',
        ...type.utility,
        fontSize: 9,
        letterSpacing: '0.16em',
      }}
    >
      <span
        style={{
          background: 'rgba(32,30,36,0.94)',
          border: `1px solid ${tone}`,
          color: tone,
          padding: `${space(2)} ${space(3)}`,
          borderRadius: 2,
        }}
      >
        {fill == null ? 'page —' : `page ${fill}%${over ? ' · OVER' : ''}`}
      </span>

      {status && (
        <span
          style={{
            background: 'rgba(32,30,36,0.94)',
            border: `1px solid ${status.kind === 'error' ? '#E0704F' : 'rgba(244,239,230,0.24)'}`,
            color: status.kind === 'error' ? '#E0704F' : '#A29AAC',
            padding: `${space(2)} ${space(3)}`,
            borderRadius: 2,
            maxWidth: '60ch',
            whiteSpace: 'normal',
            textTransform: 'none',
            letterSpacing: '0.04em',
          }}
        >
          {status.text}
        </span>
      )}
    </div>
  );
}

export default function FlipBook({ volume, next = null }) {
  const leaves = useMemo(() => buildLeaves(volume), [volume]);

  const [state, dispatch] = useReducer(reducer, undefined, () => initial(0));
  const { pos, anim } = state;

  const edit = useTextEditing();
  const [wide, setWide] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [contents, setContents] = useState(false);
  const [chromeHidden, setChromeHidden] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);

  // Pinned to the base size while editing. `FillMeter` answers "does this page
  // fit", which is a tripwire the prose is written against, and it has to mean the
  // same thing every time it is read — a reader's 1.3 would turn every page red and
  // an author would re-cut pages that were never over.
  const typeSize = useTypeScale(edit.editing);

  const bookRef = useRef(null);
  const down = useRef(null);
  const touch = useRef(null);
  const topBarRef = useRef(null);
  const botBarRef = useRef(null);

  /**
   * The real heights of the two fixed chrome bars.
   *
   * Constants were tried first and are not enough, because neither bar has a height this
   * file controls. The bottom bar's contents change with the BUILD — the edit button only
   * exists where the server says writes are possible — and both bars wrap on a narrow
   * phone, which is not a small difference: at 320px the bottom bar goes to 86px against a
   * one-row 44px, and the page's foot went under it by 32px. `readerPad.compactBottom` is
   * therefore a floor rather than the answer.
   *
   * No feedback loop to worry about. Both bars are position: fixed, so main's padding
   * cannot change their height, and their height is what sets main's padding.
   */
  const [bars, setBars] = useState({ top: 0, bottom: 0 });

  // Extraction 6.2 is right that a JS breakpoint is the wrong tool and that
  // the desktop default paints one wrong frame on a phone. Kept here because
  // crossing this breakpoint changes the OBJECT rather than reflowing it: a
  // leaf becomes two swipes instead of one, which is navigation state and not
  // something CSS can express. Everything that is merely visual is done in CSS
  // against the page container instead.
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${geometry.breakpoint}px)`);
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const go = useCallback(
    (dir) => dispatch({ type: 'go', dir, leaves, wide, reduced }),
    [leaves, wide, reduced],
  );
  const animEnd = useCallback(
    () => dispatch({ type: 'animEnd', leaves, wide, reduced }),
    [leaves, wide, reduced],
  );
  const jumpTo = useCallback((idx, half = 0) => dispatch({ type: 'jump', idx, half }), []);

  /**
   * Scroll the live prose column one screenful, and report whether it actually moved.
   *
   * The return value is the whole contract: the caller turns the page only when this says
   * there was nothing left to read. Queried from the DOM rather than held in state, the
   * same way FillMeter reads it — the page that is on screen is the authority, and there
   * is exactly one text flow mounted at a time outside a turn.
   *
   * The edge test comes from SpreadPage's own `scrollEdges` rather than being restated
   * here, because a second copy of that arithmetic is a second chance to disagree with the
   * "More" button about whether a page has anything left in it.
   */
  const scrollProse = useCallback((dir) => {
    const el = document.querySelector('[data-mb-kind="text"] [data-mb-flow]');
    const { scrollable, atEnd, atTop } = scrollEdges(el);
    if (!scrollable) return false;
    if (dir === 'fwd' ? atEnd : atTop) return false;
    scrollOneScreen(el, dir);
    return true;
  }, []);

  // The timer, not the animation event, is what ends a turn. animationend also
  // dispatches animEnd and the reducer makes that idempotent, so whichever
  // arrives first wins and neither is required.
  useEffect(() => {
    if (!anim) return undefined;
    const t = setTimeout(animEnd, TURN.ms + 40);
    return () => clearTimeout(t);
  }, [anim, animEnd]);

  // Deep link. Read on the client after mount so the route stays static.
  // Extraction 6.11: this paints the opener first and then jumps. A route
  // segment would be static and correct; noted rather than fixed.
  useEffect(() => {
    const n = new URLSearchParams(window.location.search).get('spread');
    if (n == null) return;
    const i = leaves.findIndex((l) => String(l.spread.n) === n);
    if (i > 0) jumpTo(i);
  }, [leaves, jumpTo]);

  useEffect(() => {
    const onKey = (e) => {
      if (contents) {
        if (e.key === 'Escape') setContents(false);
        return;
      }
      // The size popover owns the arrows while it is open — it is a radiogroup and
      // they move between stops. Without this, reaching for the next size turns the
      // page behind the panel.
      if (sizeOpen) return;
      if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      // Space, arrows and C are all letters somebody is trying to type.
      if (e.target && e.target.isContentEditable) return;
      if (e.key === 'e' || e.key === 'E') {
        if (edit.available) { e.preventDefault(); edit.toggle(); }
        return;
      }
      // Vertical keys read the PAGE, horizontal keys turn it. On a page too tall for a
      // short laptop, Space used to turn straight past the last two lines — the reader
      // pressed the most natural key for "carry on" and silently lost text. So the
      // vertical set scrolls while there is anything left and turns once there is not,
      // which is what Space does in every other reader. Left and right stay pure page
      // turns, so there is always a key that means only "next page".
      if (e.key === 'PageDown' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (!scrollProse('fwd')) go('fwd');
      } else if (e.key === 'PageUp' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!scrollProse('back')) go('back');
      } else if (e.key === 'ArrowRight') { e.preventDefault(); go('fwd'); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go('back'); }
      else if (e.key === 'Home') { e.preventDefault(); jumpTo(0); }
      else if (e.key === 'End') { e.preventDefault(); jumpTo(leaves.length - 1); }
      else if (e.key === 'c' || e.key === 'C') { setContents(true); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, jumpTo, leaves.length, contents, edit, scrollProse, sizeOpen]);

  // Bottom chrome only. The top bar never hides, so the way out is always on
  // screen.
  useEffect(() => {
    // The size popover lives inside this bar, so letting the bar fade would take the
    // open panel with it — the reader would be mid-choice and watch the control
    // dissolve. Hold the bar awake for as long as it is open.
    if (sizeOpen) {
      setChromeHidden(false);
      return undefined;
    }
    let t;
    const wake = () => {
      setChromeHidden(false);
      clearTimeout(t);
      t = setTimeout(() => setChromeHidden(true), 3200);
    };
    wake();
    const evs = ['pointermove', 'pointerdown', 'keydown', 'touchstart', 'wheel'];
    evs.forEach((e) => window.addEventListener(e, wake, { passive: true }));
    return () => {
      clearTimeout(t);
      evs.forEach((e) => window.removeEventListener(e, wake));
    };
  }, [sizeOpen]);

  const onTouchStart = (e) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    // Mostly-vertical gestures are left alone so a text page can still scroll.
    if (Math.abs(dx) < 46 || Math.abs(dx) < Math.abs(dy)) return;
    go(dx < 0 ? 'fwd' : 'back');
  };

  const onPointerDown = (e) => { down.current = { x: e.clientX, y: e.clientY }; };

  // One handler on the container rather than two overlay hit zones: overlays
  // sit above the prose and would swallow every link and selection on it.
  const onBookClick = (e) => {
    if (e.target.closest && e.target.closest('button, a, input, textarea, select, [role="dialog"]')) return;
    // In edit mode a click on the prose places a cursor. Turning the page out from
    // under someone mid-sentence is the one thing this feature must never do.
    if (edit.editing && e.target.closest && e.target.closest('[data-mb-editable], [data-mb-flow]')) return;
    const d = down.current;
    down.current = null;
    // A drag is a selection gesture, not a page turn.
    if (d && (Math.abs(e.clientX - d.x) > 6 || Math.abs(e.clientY - d.y) > 6)) return;
    if (typeof window.getSelection === 'function' && String(window.getSelection()).trim()) return;
    const r = bookRef.current?.getBoundingClientRect();
    if (!r) return;
    const boundary = wide ? r.left + r.width / 2 : r.left + r.width * 0.28;
    go(e.clientX < boundary ? 'back' : 'fwd');
  };

  // ---- rendering -------------------------------------------------------

  const leaf = leaves[pos.idx];

  /**
   * Persist an edited paragraph, and roll the DOM back if the server refuses.
   *
   * Rolling back matters: without it a rejected save leaves the page showing text
   * that is not in the file, which is the most dangerous state this feature could
   * produce -- it looks saved.
   */
  const onEditParagraph = async (el, before) => {
    const after = el.textContent.replace(/\s+/g, ' ').trim();
    if (!after) { el.textContent = before; return; }
    if (after === before) return;

    const ok = await edit.save({
      vol: volume.slug,
      spread: Number(el.closest('[data-mb-spread]')?.dataset.mbSpread),
      before,
      after,
    });
    if (!ok) el.textContent = before;
  };

  const renderLeft = (l) => {
    if (!l) return <BlankPage />;
    if (l.kind === 'opener') return <OpenerSpread spread={l.spread} side="left" />;
    // onAdvance is withheld on the last leaf, so the foot-of-column control stays
    // "More ↓" and never offers a Next that goes nowhere.
    return <TextPage spread={l.spread} compact={false} editing={edit.editing} onEditParagraph={onEditParagraph} typeScale={typeSize.scale} onAdvance={atEnd ? undefined : () => go('fwd')} />;
  };
  const renderRight = (l) => {
    if (!l) return <BlankPage />;
    if (l.kind === 'opener') return <OpenerSpread spread={l.spread} side="right" />;
    return <GraphicPage spread={l.spread} compact={false} section={l.section} />;
  };
  // On a single-page layout a spread is split across two swipes, and an opener
  // shows as one whole composition.
  const renderHalf = (p) => {
    const l = leaves[p.idx];
    if (!l) return <BlankPage />;
    if (l.kind === 'opener') return <OpenerSpread spread={l.spread} side={null} compact />;
    return p.half === 0
      ? <TextPage spread={l.spread} compact editing={edit.editing} onEditParagraph={onEditParagraph} typeScale={typeSize.scale} onAdvance={atEnd ? undefined : () => go('fwd')} />
      : <GraphicPage spread={l.spread} compact section={l.section} />;
  };

  // Which leaf each half of the base layer shows during a turn.
  //
  // The half the sheet is NOT covering keeps the page you are leaving until
  // the sheet lands. Forward: the right page lifts, so the LEFT half must hold
  // the old left page. Back: the left page lifts, so the RIGHT half holds the
  // old right page. Getting this wrong is the difference between paper and a
  // slideshow - the destination appears before the sheet has flipped onto it.
  const fromLeaf = anim ? leaves[anim.from.idx] : null;
  const baseLeftLeaf = anim && anim.dir === 'fwd' ? fromLeaf : leaf;
  const baseRightLeaf = anim && anim.dir === 'back' ? fromLeaf : leaf;

  const sheetShade = (
    <div
      className="mb-shade"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'linear-gradient(90deg, rgba(40,38,44,0.55) 0%, rgba(40,38,44,0) 62%)',
        animation: `mb-turn-self ${TURN.ms}ms ${TURN.ease} forwards`,
      }}
    />
  );

  const gutter = (side) => (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        [side]: 0,
        width: 34,
        pointerEvents: 'none',
        background: `linear-gradient(${side === 'right' ? '90deg' : '270deg'}, rgba(40,38,44,0) 0%, ${paper.gutterShadow} 100%)`,
      }}
    />
  );

  const total = volume.spreadCount;
  const spreadNo = leaf?.kind === 'spread' ? String(leaf.spread.n).padStart(2, '0') : null;
  const ariaLabel = leaf?.kind === 'spread'
    ? `Spread ${leaf.spread.n} of ${total}`
    : `Chapter opener: ${leaf?.spread?.title?.part ?? ''}`;

  const atStart = pos.idx === 0 && pos.half === 0;
  const atEnd = pos.idx === leaves.length - 1 && pos.half === halvesFor(leaf, wide) - 1;

  /**
   * Re-read the bars whenever anything that changes their height changes.
   *
   * Deliberately keyed on React state rather than left to a ResizeObserver alone. RO
   * callbacks are delivered as part of the rendering steps, which do not run while the page
   * is not compositing — the same trap as requestAnimationFrame — so an observer is the one
   * mechanism that cannot be trusted to have fired when a measurement is taken. It missed
   * exactly the case that matters: at the end of a volume the forward arrow is replaced by
   * a "Part Four →" link, the bar wraps to two rows and grows from 51px to 86px, and the
   * foot of the last page went 19px under it.
   *
   * `atEnd` is why this effect lives down here instead of beside the state.
   */
  useEffect(() => {
    const read = () => setBars({
      top: topBarRef.current?.offsetHeight ?? 0,
      bottom: botBarRef.current?.offsetHeight ?? 0,
    });
    read();
    // Belt and braces: RO catches a reflow no state change announces (a font finishing
    // loading), and resize catches a rotation.
    const ro = new ResizeObserver(read);
    [topBarRef.current, botBarRef.current].filter(Boolean).forEach((el) => ro.observe(el));
    window.addEventListener('resize', read);
    return () => { ro.disconnect(); window.removeEventListener('resize', read); };
  }, [wide, atEnd, edit.available, next]);

  return (
    <main
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        // svh, not vh, and not dvh either. `100vh` on iOS is the viewport with the URL bar
        // RETRACTED, so a fixed-height reader sized from it puts its own foot behind the bar
        // — which is the mobile complaint about the book being cut off. `dvh` tracks the bar
        // and would be correct for a scrolling document, but here it would resize the book
        // mid-swipe every time the bar moved. `svh` is the SMALLEST viewport, so it is stable
        // and nothing can ever hide under the bar. On desktop it equals vh.
        //
        // Compact takes an exact height rather than a minimum, because below the breakpoint
        // the book's height is derived from what is left of this box. A minimum would let the
        // flex line grow past the screen instead of handing the book the remainder.
        ...(wide ? { minHeight: '100svh' } : { height: '100svh', overflow: 'hidden' }),
        // The reader's own ground, deeper than the site shell. A cream page on an off-white
        // shell measured 1.03:1 and had nothing to sit against; this is 1.77:1. See `reader`.
        background: reader.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // Inline padding comes from geometry so the opening transition can size its
        // clone with the same arithmetic. Hardcoding it here once let the two drift.
        // Compact pays the measured chrome, with the constants as floors. See `bars`.
        padding: wide
          ? `${geometry.readerPad.top}px ${geometry.readerPad.inline}px ${geometry.readerPad.bottom}px`
          : `${Math.max(geometry.readerPad.compactTop, bars.top + 8)}px `
            + `${geometry.readerPad.compactInline}px `
            + `${Math.max(geometry.readerPad.compactBottom, bars.bottom + 8)}px`,
      }}
    >
      {/* Top chrome. Never auto-hides. */}
      <div
        ref={topBarRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          // flex-start now the trail is one element rather than a link and a title
          // pushed to opposite ends. space-between with a single child would strand
          // it left anyway, but stating it stops the next edit being surprised.
          justifyContent: 'flex-start',
          gap: space(4),
          padding: `${space(3)} ${space(5)}`,
          background: `linear-gradient(to bottom, ${reader.chrome}, ${reader.chromeFade})`,
        }}
      >
        {/* Was a single "← The Patch Notes" and, on the right, the volume title as
            dead text. That left a reader inside a book with no route to the home page
            at all: one level up, then hunt for a second link. The trail makes every
            ancestor a target and puts the volume title where it already was, so the
            chrome gains a destination without gaining a row. */}
        <Crumbs
          trail={[
            { label: 'Millbrook', href: '/' },
            { label: 'The Patch', href: '/patch-notes' },
          ]}
          // "Part Two: The Bookstore That Was Always There" wraps to two lines at
          // 375px and pushes the fixed chrome to 74px, which is a lot of a phone
          // screen spent on a title the browser tab already carries. The part number
          // alone is enough to say where you are, and the counter below gives the rest.
          current={wide ? volume.chapter : (volume.chapter.match(/^Part\s+\w+/i)?.[0] ?? volume.chapter)}
        />
      </div>

      {/* Guide and book travel together in one auto-margined column.
          The book used to carry `margin: auto` itself; with a sibling above it, those auto
          margins would have opened a gap between the guide and the spread it labels and
          broken the one thing the guide depends on — sitting directly over the pages. */}
      <div
        // width: 100% is load-bearing, not tidiness. Without it this wrapper is a flex item
        // in a column with align-items: center, so it shrink-wraps its contents -- and the
        // book sizes itself with `min(..., 100%, ...)`, which then resolves against the
        // wrapper the book is defining. That circularity collapsed the spread from 1148px to
        // 423px. Before the wrapper existed, the book was a direct child of main and its 100%
        // resolved against main's content box, which is what this restores.
        style={{
          // Wide centres in whatever room is left. Compact instead CLAIMS the room, so the
          // guide and the book divide it between them and the book can take the remainder.
          ...(wide ? { margin: 'auto' } : { flex: 1, minHeight: 0 }),
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: 0,
        }}
      >
      <TurnGuide
        wide={wide}
        atStart={atStart}
        atEnd={atEnd}
        onBack={() => go('back')}
        onForward={() => go('fwd')}
      />

      {/* The book. */}
      <section
        ref={bookRef}
        aria-label={ariaLabel}
        aria-live="polite"
        onPointerDown={onPointerDown}
        onClick={onBookClick}
        style={{
          position: 'relative',
          // Drive the WIDTH from the height the viewport allows, then let
          // aspectRatio set the height. Setting width 100% and capping
          // maxHeight looks like it works and silently breaks the ratio.
          width: wide
            ? `min(${geometry.maxSpreadWidth}px, 100%, calc((100svh - ${geometry.chromeReserve}px) * ${geometry.spreadAspect}))`
            : `min(${geometry.compactMaxWidth}px, 100%)`,
          // Wide derives height from the 2:1 ratio, because a spread is a fixed object.
          // Compact takes the remainder of the flex line instead of computing
          // `100vh - chromeReserve`, which had to be kept in agreement with the real height
          // of two chrome bars and a guide, and was not: it left the page's last 24px under
          // the bottom bar on a 683px viewport. Nothing to keep in agreement now.
          ...(wide
            ? { aspectRatio: `${geometry.spreadAspect}` }
            : { flex: 1, minHeight: 0 }),
          // On the container, not the sheet. Without a perspective on an
          // ancestor the rotation is an affine squash with no depth.
          perspective: 2400,
          // Warm and softer. The book is cream on an off-white shell, so the shadow is
          // what separates them, and a neutral-black shadow on a warm ground goes grey.
          boxShadow: '0 3px 8px rgba(58,48,38,0.13), 0 26px 60px rgba(58,48,38,0.20)',
        }}
      >
        <EdgeStack side="left" count={pos.idx} />
        <EdgeStack side="right" count={leaves.length - 1 - pos.idx} />

        {/* Base layer. Already shows the destination; the sheet flies over it. */}
        <div
          className="mb-crossfade"
          key={`base-${pos.idx}-${pos.half}`}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: wide ? '1fr 1fr' : '1fr',
          }}
        >
          {wide ? (
            <>
              {/* The cursor is the affordance: west on the left page, east on
                  the right, so where a click leads is visible beforehand. */}
              <div style={{ position: 'relative', overflow: 'hidden', cursor: atStart ? 'default' : 'w-resize' }}>
                {renderLeft(baseLeftLeaf)}
                {gutter('right')}
              </div>
              <div style={{ position: 'relative', overflow: 'hidden', cursor: atEnd ? 'default' : 'e-resize' }}>
                {renderRight(baseRightLeaf)}
                {gutter('left')}
              </div>
            </>
          ) : (
            <div style={{ position: 'relative', overflow: 'hidden' }}>{renderHalf(pos)}</div>
          )}
        </div>

        {/* Shadow cast on the page beneath. */}
        {anim && (
          <div
            key={`shade-${anim.id}`}
            className="mb-shade"
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 3,
              background: anim.dir === 'fwd'
                ? 'linear-gradient(90deg, rgba(40,38,44,0.5) 0%, rgba(40,38,44,0) 55%)'
                : 'linear-gradient(270deg, rgba(40,38,44,0.5) 0%, rgba(40,38,44,0) 55%)',
              animation: `mb-turn-shade ${TURN.ms}ms ${TURN.ease} forwards`,
            }}
          />
        )}

        {/* The turning sheet. Two faces on one element, preserve-3d, back face
            pre-rotated so it reads correctly when the sheet lands. */}
        {anim && (
          <div
            key={anim.id}
            className="mb-sheet"
            aria-hidden="true"
            onAnimationEnd={animEnd}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              zIndex: 4,
              ...(wide
                ? (anim.dir === 'fwd'
                  ? { left: '50%', width: '50%', transformOrigin: 'left center' }
                  : { left: 0, width: '50%', transformOrigin: 'right center' })
                : { left: 0, width: '100%', transformOrigin: anim.dir === 'fwd' ? 'left center' : 'right center' }),
              transformStyle: 'preserve-3d',
              animation: `${
                wide
                  ? (anim.dir === 'fwd' ? 'mb-turn-fwd' : 'mb-turn-back')
                  : (anim.dir === 'fwd' ? 'mb-turn-fwd-single' : 'mb-turn-back-single')
              } ${TURN.ms}ms ${TURN.ease} forwards`,
            }}
          >
            <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', overflow: 'hidden' }}>
              {wide
                ? (anim.dir === 'fwd' ? renderRight(fromLeaf) : renderLeft(fromLeaf))
                : renderHalf(anim.from)}
              {sheetShade}
            </div>
            <div style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              overflow: 'hidden',
            }}>
              {wide
                ? (anim.dir === 'fwd' ? renderLeft(leaf) : renderRight(leaf))
                : renderHalf(pos)}
            </div>
          </div>
        )}
      </section>
      </div>

      {/* Bottom chrome. */}
      <div
        ref={botBarRef}
        className="mb-chrome"
        data-hidden={chromeHidden ? 'true' : 'false'}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Wrap rather than overflow. The end-of-volume link is the widest thing
          // that ever lands in this bar, and a bottom bar that scrolls sideways is
          // a bar the reader cannot finish reaching.
          flexWrap: 'wrap',
          // Compact runs tighter so the bar stays ONE row. At 375px the wide spacing
          // needed 386px for its controls and wrapped to two, which took the bar to 94px
          // and pushed the foot of the page underneath it. The bar's height is now what
          // readerPad.compactBottom is set against, so it has to be predictable.
          gap: wide ? `${space(2)} ${space(5)}` : `${space(2)} ${space(3)}`,
          padding: wide ? `${space(4)} ${space(4)}` : `${space(3)} ${space(2)}`,
          background: `linear-gradient(to top, ${reader.chrome}, ${reader.chromeFade})`,
        }}
      >
        {/* The page is clickable, but that is a mouse affordance. These are
            what keyboard and screen-reader users reach for. */}
        <button className="focus-ring" aria-label="Previous page" onClick={() => go('back')} disabled={atStart}
          style={{ background: 'none', border: 'none', fontSize: 17, lineHeight: 1, padding: `0 ${space(1)}`,
                   cursor: atStart ? 'default' : 'pointer', color: atStart ? 'rgba(42,37,48,0.22)' : reader.textMuted }}>
          ‹
        </button>

        <div style={{ ...type.utility, fontSize: 10, letterSpacing: '0.16em', color: reader.textFaint,
                      display: 'flex', alignItems: 'center', gap: space(2),
                      minWidth: wide ? 128 : 92, justifyContent: 'center' }}>
          {spreadNo ? (
            <>
              <span style={{ color: color.ink }}>{spreadNo}</span>
              <span>/ {total}</span>
              {!wide && (
                <span aria-hidden="true" style={{ display: 'inline-flex', gap: 3, marginLeft: 3 }}>
                  <i style={{ width: 5, height: 5, borderRadius: 5, background: color.accent, opacity: pos.half === 0 ? 1 : 0.32 }} />
                  <i style={{ width: 5, height: 5, borderRadius: 5, background: color.accent, opacity: pos.half === 1 ? 1 : 0.32 }} />
                </span>
              )}
            </>
          ) : (
            <span style={{ color: color.accent }}>Opener</span>
          )}
        </div>

        {/* At the end, the dead forward arrow is replaced rather than sat beside.
            A greyed-out control next to a live one asks the reader to work out
            which of two adjacent things to press; swapping it means the slot they
            were already aiming at is the thing that carries them on. */}
        {atEnd ? (
          <EndOfVolume next={next} wide={wide} />
        ) : (
          <button className="focus-ring" aria-label="Next page" onClick={() => go('fwd')}
            style={{ background: 'none', border: 'none', fontSize: 17, lineHeight: 1, padding: `0 ${space(1)}`,
                     cursor: 'pointer', color: reader.textMuted }}>
            ›
          </button>
        )}

        {/* Discoverable, not a secret shortcut: the button is how you find edit mode
            and E is how you stop reaching for the button. Rendered only when the
            server says writes are possible, so a production build never shows an
            affordance that cannot work. */}
        {edit.available && (
          <button
            className="focus-ring"
            onClick={edit.toggle}
            aria-pressed={edit.editing}
            title="Edit the prose in place (E)"
            style={{
              ...type.utility,
              fontSize: 9,
              letterSpacing: '0.18em',
              background: edit.editing ? color.accent : 'none',
              border: `1px solid ${edit.editing ? color.accent : reader.ruleStrong}`,
              color: edit.editing ? paper.stock : reader.textMuted,
              padding: `${space(2)} ${space(3)}`,
              cursor: 'pointer',
              marginLeft: space(2),
            }}
          >
            {edit.editing ? 'Editing' : 'Edit'}
          </button>
        )}

        {/* Hidden while editing rather than shown disabled. The size is pinned to
            the base then anyway, so the control has nothing to offer — and edit mode
            is exactly when the bar is at its widest, carrying one button the
            production bar never has. */}
        {!edit.editing && (
          <TypeSizer
            scale={typeSize.scale}
            stops={typeSize.stops}
            choose={typeSize.choose}
            open={sizeOpen}
            setOpen={setSizeOpen}
            wide={wide}
          />
        )}

        <button className="focus-ring" onClick={() => setContents(true)}
          style={{ ...type.utility, fontSize: 9, letterSpacing: '0.18em', background: 'none',
                   border: `1px solid ${reader.ruleStrong}`, color: reader.textMuted,
                   padding: `${space(2)} ${space(3)}`, cursor: 'pointer', marginLeft: space(2) }}>
          Contents
        </button>
      </div>

      {/* The reason to edit here rather than in a text editor: the constraint on this
          prose is page FIT, and fit is only visible on the page. This reports the
          measured fill of the live text page and turns red the moment a sentence
          pushes it past its column, which no editor can tell you. */}
      {edit.editing && <FillMeter status={edit.status} />}

      {contents && (
        <Contents
          volume={volume}
          leaves={leaves}
          current={pos.idx}
          onPick={(i) => { jumpTo(i); setContents(false); }}
          onClose={() => setContents(false)}
        />
      )}
    </main>
  );
}
