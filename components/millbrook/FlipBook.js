'use client';

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import Link from 'next/link';
import { Crumbs } from './Crumbs';
import { useTextEditing } from './useTextEditing';
import { BlankPage, GraphicPage, OpenerSpread, TextPage } from './SpreadPage';
import { color, geometry, paper, space, turn as TURN, type } from '@/lib/millbrook/series';

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
  return volume.spreads.map((s) => ({
    kind: s.kind, // 'opener' | 'spread'
    spread: s,
    key: `${volume.slug}-${s.n}`,
  }));
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
        background: 'rgba(24,22,28,0.97)',
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
            borderBottom: '1px solid rgba(244,239,230,0.18)',
          }}
        >
          <div>
            <div style={{ ...type.utility, fontSize: 10, letterSpacing: '0.22em', color: '#A29AAC' }}>
              Contents
            </div>
            <div style={{ color: paper.stock, fontSize: 19, fontWeight: 700, marginTop: 4 }}>
              {volume.chapter}
            </div>
          </div>
          <button className="focus-ring" onClick={onClose}
            style={{ ...type.utility, fontSize: 10, letterSpacing: '0.18em', background: 'none',
                     border: '1px solid rgba(244,239,230,0.3)', color: paper.stock,
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
                  background: here ? 'rgba(107,82,200,0.16)' : 'rgba(244,239,230,0.045)',
                  border: `1px solid ${here ? color.accent : 'rgba(244,239,230,0.14)'}`,
                  borderTop: `3px solid ${here ? color.accent : 'rgba(244,239,230,0.22)'}`,
                  padding: space(4),
                  display: 'flex',
                  flexDirection: 'column',
                  gap: space(2),
                  color: paper.stock,
                }}
              >
                <span style={{ ...type.utility, fontSize: 9, letterSpacing: '0.16em', color: here ? '#B9A6FF' : '#A29AAC' }}>
                  {l.kind === 'opener' ? 'Opener' : `Spread ${String(s.n).padStart(2, '0')}`}
                </span>
                <span style={{ fontSize: 14.5, fontWeight: 700, lineHeight: 1.25 }}>
                  {l.kind === 'opener'
                    ? s.title?.part || 'Chapter opener'
                    : sections[0] || `Pages ${s.pages}`}
                </span>
                {l.kind === 'spread' && (
                  <span style={{ fontSize: 11.5, color: '#A29AAC', lineHeight: 1.4 }}>
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
        style={{
          ...base,
          color: color.bg,
          background: paper.stock,
          border: `1px solid ${paper.stock}`,
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
        color: color.bg,
        background: color.accent,
        border: `1px solid ${color.accent}`,
      }}
    >
      {wide ? `Read ${next.part} →` : `${next.part} →`}
    </Link>
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

  const bookRef = useRef(null);
  const down = useRef(null);
  const touch = useRef(null);

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
      if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      // Space, arrows and C are all letters somebody is trying to type.
      if (e.target && e.target.isContentEditable) return;
      if (e.key === 'e' || e.key === 'E') {
        if (edit.available) { e.preventDefault(); edit.toggle(); }
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); go('fwd'); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go('back'); }
      else if (e.key === 'Home') { e.preventDefault(); jumpTo(0); }
      else if (e.key === 'End') { e.preventDefault(); jumpTo(leaves.length - 1); }
      else if (e.key === 'c' || e.key === 'C') { setContents(true); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, jumpTo, leaves.length, contents, edit]);

  // Bottom chrome only. The top bar never hides, so the way out is always on
  // screen.
  useEffect(() => {
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
  }, []);

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
    return <TextPage spread={l.spread} compact={false} editing={edit.editing} onEditParagraph={onEditParagraph} />;
  };
  const renderRight = (l) => {
    if (!l) return <BlankPage />;
    if (l.kind === 'opener') return <OpenerSpread spread={l.spread} side="right" />;
    return <GraphicPage spread={l.spread} compact={false} />;
  };
  // On a single-page layout a spread is split across two swipes, and an opener
  // shows as one whole composition.
  const renderHalf = (p) => {
    const l = leaves[p.idx];
    if (!l) return <BlankPage />;
    if (l.kind === 'opener') return <OpenerSpread spread={l.spread} side={null} compact />;
    return p.half === 0
      ? <TextPage spread={l.spread} compact editing={edit.editing} onEditParagraph={onEditParagraph} />
      : <GraphicPage spread={l.spread} compact />;
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

  return (
    <main
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        minHeight: '100vh',
        background: color.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // Inline padding comes from geometry so the opening transition can size its
        // clone with the same arithmetic. Hardcoding it here once let the two drift.
        padding: wide
          ? `${geometry.readerPad.top}px ${geometry.readerPad.inline}px ${geometry.readerPad.bottom}px`
          : `${geometry.readerPad.compactTop}px ${geometry.readerPad.compactInline}px ${geometry.readerPad.compactBottom}px`,
      }}
    >
      {/* Top chrome. Never auto-hides. */}
      <div
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
          background: 'linear-gradient(to bottom, rgba(32,30,36,0.96), rgba(32,30,36,0))',
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
            { label: 'The Patch Notes', href: '/patch-notes' },
          ]}
          // "Part Two: The Bookstore That Was Always There" wraps to two lines at
          // 375px and pushes the fixed chrome to 74px, which is a lot of a phone
          // screen spent on a title the browser tab already carries. The part number
          // alone is enough to say where you are, and the counter below gives the rest.
          current={wide ? volume.chapter : (volume.chapter.match(/^Part\s+\w+/i)?.[0] ?? volume.chapter)}
        />
      </div>

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
            ? `min(${geometry.maxSpreadWidth}px, 100%, calc((100vh - ${geometry.chromeReserve}px) * ${geometry.spreadAspect}))`
            : `min(${geometry.compactMaxWidth}px, 100%)`,
          ...(wide
            ? { aspectRatio: `${geometry.spreadAspect}` }
            : { height: `calc(100vh - ${geometry.chromeReserve + 8}px)` }),
          // On the container, not the sheet. Without a perspective on an
          // ancestor the rotation is an affine squash with no depth.
          perspective: 2400,
          boxShadow: '0 2px 6px rgba(0,0,0,0.22), 0 30px 70px rgba(0,0,0,0.42)',
          margin: 'auto',
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

      {/* Bottom chrome. */}
      <div
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
          gap: `${space(2)} ${space(5)}`,
          padding: `${space(4)} ${space(4)}`,
          background: 'linear-gradient(to top, rgba(32,30,36,0.96), rgba(32,30,36,0))',
        }}
      >
        {/* The page is clickable, but that is a mouse affordance. These are
            what keyboard and screen-reader users reach for. */}
        <button className="focus-ring" aria-label="Previous page" onClick={() => go('back')} disabled={atStart}
          style={{ background: 'none', border: 'none', fontSize: 17, lineHeight: 1, padding: `0 ${space(1)}`,
                   cursor: atStart ? 'default' : 'pointer', color: atStart ? '#4A4550' : '#A29AAC' }}>
          ‹
        </button>

        <div style={{ ...type.utility, fontSize: 10, letterSpacing: '0.16em', color: '#A29AAC',
                      display: 'flex', alignItems: 'center', gap: space(2), minWidth: 128, justifyContent: 'center' }}>
          {spreadNo ? (
            <>
              <span style={{ color: paper.stock }}>{spreadNo}</span>
              <span>/ {total}</span>
              {!wide && (
                <span aria-hidden="true" style={{ display: 'inline-flex', gap: 3, marginLeft: 3 }}>
                  <i style={{ width: 5, height: 5, borderRadius: 5, background: color.accent, opacity: pos.half === 0 ? 1 : 0.32 }} />
                  <i style={{ width: 5, height: 5, borderRadius: 5, background: color.accent, opacity: pos.half === 1 ? 1 : 0.32 }} />
                </span>
              )}
            </>
          ) : (
            <span style={{ color: '#B9A6FF' }}>Opener</span>
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
                     cursor: 'pointer', color: '#A29AAC' }}>
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
              border: `1px solid ${edit.editing ? color.accent : 'rgba(244,239,230,0.24)'}`,
              color: edit.editing ? paper.stock : '#A29AAC',
              padding: `${space(2)} ${space(3)}`,
              cursor: 'pointer',
              marginLeft: space(2),
            }}
          >
            {edit.editing ? 'Editing' : 'Edit'}
          </button>
        )}

        <button className="focus-ring" onClick={() => setContents(true)}
          style={{ ...type.utility, fontSize: 9, letterSpacing: '0.18em', background: 'none',
                   border: '1px solid rgba(244,239,230,0.24)', color: '#A29AAC',
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
