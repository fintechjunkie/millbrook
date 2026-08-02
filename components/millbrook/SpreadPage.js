'use client';

import { useEffect, useRef, useState } from 'react';
import { Plate } from './Plate';
import { color, grainStyle, pageInset, paper, reader, space, type } from '@/lib/millbrook/series';

// data-mb-page is a verification hook, not decoration. The overflow check
// needs one stable selector for "a page" to measure against, and screenshots
// do not composite in this environment so every layout claim is a DOM
// measurement. Same reasoning as Unbroke's data-wx-page.
const PAGE_ATTR = { 'data-mb-page': '' };

/**
 * "4:3" or "16:9" from a spec prompt into a CSS aspect-ratio value.
 *
 * Parsed rather than mapped, so changing a ratio in the specs needs no code
 * change here. Falls back to 4:3, the standard image page ratio.
 */
function cssAspect(spec, fallback = '4 / 3') {
  const m = /^\s*(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)\s*$/.exec(spec ?? '');
  return m ? `${m[1]} / ${m[2]}` : fallback;
}

const PAGE = {
  position: 'relative',
  // height 100% is load-bearing rather than tidiness. Without it a page takes
  // only its content height and the site background shows through beneath,
  // which reads as a two-tone page rather than as one sheet.
  height: '100%',
  width: '100%',
  background: paper.stock,
  ...grainStyle,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};

/**
 * The small page number at the foot of a page.
 *
 * `compact` is only ever passed by the image page, which on a phone has no paper under it
 * and no inline padding to sit inside: inkSoft on the reader's grey ground measures 2.9:1,
 * and flush to the edge the number would touch the screen.
 */
function Folio({ n, align, compact = false }) {
  if (!n) return null;
  return (
    <div
      aria-hidden="true"
      style={{
        ...type.utility,
        fontSize: 8.5,
        letterSpacing: '0.18em',
        color: compact ? reader.textMuted : color.inkSoft,
        textAlign: align,
        paddingTop: space(3),
        ...(compact ? { paddingLeft: space(4), paddingRight: space(4) } : null),
        flex: 'none',
      }}
    >
      {n}
    </div>
  );
}

/**
 * The mark that closes a text page.
 *
 * Page length runs 123 to 330 words, so a median page fills about four fifths of
 * its column and the shortest a little over two fifths. That white space is
 * inherent to the spread map rather than a layout fault, and several short pages
 * are called deliberate in the specs.
 *
 * Vertically centring the text to disguise it would be the wrong fix. In a printed
 * book every page starts at the same head margin, and that constancy is much of
 * what makes a book feel like one; centring would start consecutive pages at
 * different heights, so every turn would shift the first line.
 *
 * So the text stays top-aligned and this closes it instead. A half-full page with a
 * terminal mark reads as finished; the same page without one reads as cut off. It
 * is the cheapest available answer to the actual complaint.
 *
 * Suppressed in two cases.
 *
 * After an italic block, which is how the volume closers are set: those pages already
 * end on a deliberate sign-off line and do not want a second one.
 *
 * And on any page without the room for it, which is measured rather than guessed. The
 * first pass rendered it unconditionally and cost every page 1.8em, which pushed three
 * pages that had been at 96.9, 99.6 and 99.7 per cent straight over their column. That
 * is the mark defeating itself: it exists to resolve leftover white space, so a page
 * with none neither needs it nor can afford it, and on a page that scrolls it would sit
 * below the fold where nobody would ever see it.
 */
function Terminal({ suppressed }) {
  if (suppressed) return null;
  return (
    <div
      aria-hidden="true"
      data-mb-terminal=""
      style={{
        flex: 'none',
        marginTop: '1.6em',
        display: 'flex',
        justifyContent: 'center',
        // Three small lozenges rather than one glyph. A single character would be
        // set in whatever the body face is and would read as punctuation the reader
        // has to parse; geometry reads as an ornament and cannot be misread.
        gap: '0.62em',
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: '0.22em',
            height: '0.22em',
            borderRadius: '50%',
            background: color.inkSoft,
            // The middle one carries; the outer two are a shade lighter so the
            // group has a centre instead of reading as a row of three equal dots.
            opacity: i === 1 ? 0.62 : 0.34,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Whether the page has spare height for a terminal mark, measured.
 *
 * Measures the gap between the bottom of the last block of prose and the bottom of
 * the flow's content box. The mark is excluded from that measurement by reading the
 * last PROSE child rather than the flow's scrollHeight, so the answer does not
 * depend on whether the mark is currently rendered and cannot oscillate.
 *
 * Re-measures on resize, because the page is sized from the viewport and a window
 * drag changes the answer.
 *
 * `revision` is any value that changes when the column's contents change size for a
 * reason the observer cannot be trusted to report — today, the reader's type scale.
 * The ResizeObserver above looks like it covers that and does not: its callbacks are
 * delivered with the rendering steps, which do not run while the page is not
 * painting, and the project rule is that a correctness fix never depends on an
 * observer alone. Passing the scale in makes the re-measure a React dependency,
 * which fires regardless.
 */
function useHasRoomForTerminal(ref, threshold = 2, revision = 0) {
  const [room, setRoom] = useState(false);

  useEffect(() => {
    const flow = ref.current;
    if (!flow) return undefined;

    const measure = () => {
      const prose = [...flow.children].filter((el) => !el.hasAttribute('data-mb-terminal'));
      const last = prose[prose.length - 1];
      if (!last) return setRoom(false);
      const em = parseFloat(getComputedStyle(flow).fontSize) || 16;
      // offsetTop is relative to the nearest positioned ancestor, which is the page,
      // so both values are read in the same coordinate space via getBoundingClientRect
      // and the flow's own scroll offset cancels out.
      const used = last.getBoundingClientRect().bottom - flow.getBoundingClientRect().top + flow.scrollTop;
      return setRoom(flow.clientHeight - used >= threshold * em);
    };

    measure();
    // A tick after, for the same reason the scroll-edge hook keeps timers: the first
    // pass can run before the type scale has actually been applied to the column.
    const t = setTimeout(measure, 0);
    const ro = new ResizeObserver(measure);
    ro.observe(flow);
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [ref, threshold, revision]);

  return room;
}

/**
 * Whether a scroll container has more below, and whether it can scroll at all.
 *
 * This is the whole of the mobile complaint. The flow has always been `overflow-y: auto`,
 * so the text a phone could not fit was reachable — by scrolling a box with no scrollbar,
 * no fade and no reason to think it moved. A page ended mid-sentence and read as broken
 * rather than as continuing, which is the worst of the three possible outcomes: clipping
 * at least looks like clipping.
 *
 * Listens to scroll AND resizes the content, because the answer changes when the page
 * turns (a new page may not overflow at all) and when the phone rotates.
 */
/**
 * One screenful, in whichever direction, on the element given.
 *
 * Shared by the "More" button and the reader's vertical keys so the two cannot disagree
 * about how far a screenful is. 0.82 rather than 1.0 leaves a couple of lines of overlap,
 * which is what stops a reader losing their place across the jump.
 *
 * Smooth unless the reader has asked for less motion, read at call time rather than
 * captured, so a preference changed mid-session is honoured.
 */
export function scrollOneScreen(el, dir = 'fwd') {
  if (!el) return;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollBy({
    top: (dir === 'fwd' ? 1 : -1) * Math.max(120, el.clientHeight * 0.82),
    behavior: reduce ? 'auto' : 'smooth',
  });
}

/**
 * How far a scroll container can still go, and whether it is there yet.
 *
 * Exported so the "More" control and the reader's vertical keys share one definition. They
 * MUST agree: if the keys think a page has more to read while the button thinks it does
 * not, the reader gets a page with unread text and nothing on screen admitting it.
 *
 * **The tolerance is proportional, and a fixed one was a bug.** Some tolerance is required,
 * because fractional scroll offsets mean a container scrolled fully to the bottom routinely
 * reports a pixel short of it, which would strand the fade over the last line forever. But
 * 24px flat is larger than a small overflow: Volume 3 spread 4 overflows by 7px at
 * 1280x720, so `remaining <= 24` called it finished before it had started and the page
 * showed no affordance at all while clipping a third of a line. Scaling with the slack
 * keeps the guard where it is needed — a page with 800px to go on a phone — without letting
 * it swallow a page whose whole overflow is smaller than the guard.
 */
export function scrollEdges(el) {
  if (!el) return { slack: 0, scrollable: false, atEnd: true, atTop: true };
  const slack = el.scrollHeight - el.clientHeight;
  const remaining = slack - el.scrollTop;
  return {
    slack,
    scrollable: slack > 4,
    atEnd: remaining <= Math.max(2, slack * 0.04),
    atTop: el.scrollTop <= 4,
  };
}

function useScrollEdges(ref, revision = 0) {
  const [state, setState] = useState({ scrollable: false, atEnd: true });

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const measure = () => {
      const { scrollable, atEnd } = scrollEdges(el);
      setState({ scrollable, atEnd });
    };

    measure();
    el.addEventListener('scroll', measure, { passive: true });

    // Measured again on a timer, and this is a correctness fix rather than caution.
    //
    // The first measurement runs before the browser has necessarily finished with the
    // column: a web-safe serif can still be swapped, and the terminal mark is added by a
    // sibling effect that has not run yet. Both change the answer. A ResizeObserver is the
    // obvious way to catch that and cannot be relied on alone, because its callbacks are
    // delivered with the rendering steps and those do not run while the page is not
    // painting — the same reason requestAnimationFrame is banned in this file's
    // neighbourhood. A timeout fires regardless, so this is the path that always works.
    // 700ms is past the end of a page turn, and that one matters most. A page mounts while
    // the turning sheet is still in flight, so the first two measurements can both read a
    // box that is not yet the box the reader will get — and with scroll and observer
    // callbacks both unreliable, a wrong answer taken then was never corrected. It latched
    // a scroll affordance onto a page that fits.
    const timers = [setTimeout(measure, 0), setTimeout(measure, 300), setTimeout(measure, 700)];
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // The content grows independently of the box in edit mode, where a paragraph the
    // author is typing into is what changes size.
    [...el.children].forEach((c) => ro.observe(c));
    // A window resize changes the column and, on a short laptop, whether the page
    // overflows at all — which is the case this whole hook exists for.
    window.addEventListener('resize', measure);
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});

    return () => {
      el.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
      timers.forEach(clearTimeout);
      ro.disconnect();
    };
    // `revision` carries the reader's type scale. Changing it changes how much text
    // is in the column and therefore whether the page scrolls at all, which is the
    // exact question this hook answers — and the observer that would otherwise catch
    // it is the one that cannot be relied on here.
  }, [ref, revision]);

  return state;
}

/**
 * The prose page. Always the LEFT page, never alternating.
 *
 * Fixed placement is the point: alternating looks more dynamic in a mock and
 * costs the reader a moment of orientation on every single turn.
 *
 * Typographic treatment is the fiction idiom rather than the article idiom:
 * paragraphs are indented and carry no vertical gap between them. On a page
 * with twenty-two paragraphs that is worth roughly 170px of height, which on
 * the densest page is the difference between fitting and not.
 *
 * overflowY is auto, never hidden. Unbroke clipped silently, which was
 * survivable because its copy was written to fit. This prose is verbatim and
 * cannot be shortened, so on a viewport too small for it the page must scroll.
 * Losing the end of a paragraph is not an acceptable failure here.
 *
 * **On a phone that scroll is the design rather than the fallback, and the type is bigger
 * because of it.** Desktop fit is guaranteed by arithmetic: type is 1.95cqh of a square
 * page, so type and column scale together. A phone page is 0.51, that arithmetic breaks,
 * and the clamp floor pinned the type at 12px while 16 of the 38 pages ran past their
 * column anyway. A phone has no facing page and therefore no spread whose shape must be
 * preserved, so compact stops defending a fixed page and scrolls a proper reading column
 * instead. See `type.bodyCompact`.
 */
export function TextPage({ spread, compact, editing = false, onEditParagraph, typeScale = 1, onAdvance }) {
  // 30px rather than 36. Same reasoning as the leading: page height reclaimed
  // from margin costs nothing, where reclaiming it from the spread map costs a
  // new spread and a new image.
  //
  // Compact trims to 16 from 24, which is measure rather than tidiness: 16px of gutter
  // buys 16px of column, and at this size that is two more characters a line on a page
  // that only gets about 41.
  const pad = compact ? space(4) : '30px';
  const top = compact ? pageInset.top.compact : pageInset.top.wide;
  const pageNumbers = spread.pages ? spread.pages.split(/\s+to\s+/) : [];
  const flowRef = useRef(null);
  // `typeScale` is passed to both hooks only as a re-measure trigger — the size
  // itself is applied in CSS, through the var that `type.body` multiplies by.
  const hasRoom = useHasRoomForTerminal(flowRef, 2, typeScale);
  const { scrollable, atEnd } = useScrollEdges(flowRef, typeScale);

  // Track whether we are at the first paragraph of a section, since that one sets flush
  // left and the rest indent.
  //
  // FALSE to start, and that is the fix for a real bug rather than a preference. It used
  // to start true, which meant EVERY page opened flush left -- but only 13 of the 33 pages
  // begin a new section. The other 20 open mid-scene, continuing the page before, and a
  // flush first line there tells the reader a new section has started when it has not.
  //
  // An indent's job is to say "new paragraph". At the top of a section there is nothing
  // above to separate from, so it is suppressed; on a continuation page there very much is.
  // Print does exactly this, which is why a page opening mid-scene looks wrong without it.
  //
  // No special case is needed for pages that DO open with a heading: the heading branch
  // below sets the flag before the first paragraph renders.
  let atSectionStart = false;

  return (
    <div
      {...PAGE_ATTR}
      data-mb-kind="text"
      data-mb-spread={spread.n}
      className="mb-page"
      style={{ ...PAGE, padding: `${top} ${pad} ${compact ? space(5) : '16px'}` }}
    >
      {/* A positioned box around the flow, so the "continues below" fade can sit over the
          foot of the column without scrolling away with the text it is describing.
          flexDirection column is NOT cosmetic. Every fill measurement on this project —
          FillMeter, /checks/overflow, and the recipe written into CLAUDE.md — reads
          scrollHeight with the flow's `flex` forced to none. In a ROW container that
          also collapses the flow's WIDTH to shrink-to-fit, so the column narrows, the
          text reflows taller, and every page reads about 9 points fuller than it is. It
          measured vol1 spread 1 at 100% against a true 91%. */}
      <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div
        data-mb-flow
        ref={flowRef}
        style={{
          ...type.body,
          // On a phone the page is already narrower than the measure cap, so the
          // cap does nothing and the offset would only strand the text.
          ...(compact ? type.bodyCompact : type.flowOffset),
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          // Keep a phone's scroll inside the column. Without this, reaching the end of the
          // prose hands the gesture to the page behind it and the whole reader rubber-bands,
          // which on iOS looks like the book coming loose.
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {spread.blocks.map((b, i) => {
          if (b.t === 'h') {
            atSectionStart = true;
            return (
              <h3
                key={i}
                data-mb-section={b.v}
                style={{
                  ...type.heading,
                  margin: i === 0 ? `0 0 ${space(2)}` : `1.15em 0 0.5em`,
                }}
              >
                {b.v}
              </h3>
            );
          }

          if (b.t === 'i') {
            atSectionStart = true;
            return (
              <p key={i} style={{ margin: '1.3em 0 0', fontStyle: 'italic', textIndent: 0 }}>
                {b.v}
              </p>
            );
          }

          const indent = atSectionStart ? 0 : type.indent;
          atSectionStart = false;

          if (!editing) {
            return (
              <p key={i} style={{ margin: 0, textIndent: indent }}>
                {b.v}
              </p>
            );
          }

          // suppressContentEditableWarning because React is right in general and wrong
          // here: the DOM being edited out from under it is the entire feature.
          //
          // The original text is carried on the node rather than in React state so the
          // save is content-addressed from what was actually on screen. onBlur, not
          // onInput: saving per keystroke would write the file dozens of times a
          // sentence and fight the watcher rebuilding the JSON underneath.
          return (
            <p
              key={i}
              data-mb-editable=""
              data-mb-before={b.v}
              contentEditable
              suppressContentEditableWarning
              spellCheck
              onBlur={(e) => onEditParagraph?.(e.currentTarget, b.v)}
              onKeyDown={(e) => {
                // Enter would insert a <br> and a paragraph cannot contain one; the
                // spec's page boundaries are the only thing allowed to add lines.
                if (e.key === 'Enter') { e.preventDefault(); e.currentTarget.blur(); }
                if (e.key === 'Escape') { e.currentTarget.textContent = b.v; e.currentTarget.blur(); }
              }}
              style={{ margin: 0, textIndent: indent, outline: 'none', borderRadius: 2 }}
            >
              {b.v}
            </p>
          );
        })}

        {/* Inside the flow, not pinned to the foot of the page. The mark belongs to
            the prose it closes, so it sits directly under the last line wherever
            that falls. Pinned to the bottom it would read as a rule, and on the
            pages that scroll it would never be reached. */}
        {/* hasRoom is a wide-only test. It exists because on a fixed page the mark costs
            1.8em that three pages could not spare, and because on a page that clipped it
            would sit where nobody could reach it. Neither applies to a scrolling column:
            the height is free, and the reader arrives at the foot of the page by
            scrolling — which is precisely where a mark saying "this page is finished, now
            swipe" does its most useful work. */}
        {/* Deliberately NOT keyed on `scrollable`, though showing the mark at the foot of a
            scrolled page is tempting and was briefly done. The mark is 1.6em of CONTENT, so
            "show it because the page scrolls" makes the page taller, which makes it scroll —
            a latch. It measured Volume 1 spread 4 at 1280x720 from 98% to 102% and left
            spread 2 holding a scroll affordance at 93% fill. `hasRoom` is safe to key on
            because it explicitly excludes the mark from its own measurement; `compact` is
            safe because it is constant. */}
        <Terminal
          suppressed={
            (!compact && !hasRoom) || spread.blocks[spread.blocks.length - 1]?.t === 'i'
          }
        />
      </div>

      {/* Shown only while there is more below. A fade is the whole affordance: it says the
          text continues without spending a line saying so, and it disappears at the end so
          it never sits over the last sentence. Wide keeps it too — a laptop short enough to
          overflow has exactly the same problem. */}
      <div
        aria-hidden="true"
        // Reading this element's opacity in a non-compositing preview pane returns the
        // START of the transition, not the end, because no frames are produced and the
        // interpolation never advances. It measured 0 with an inline opacity of 1 and looked
        // exactly like a broken hook. Clear `transition` before believing the number.
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: compact ? 46 : 34,
          pointerEvents: 'none',
          opacity: scrollable && !atEnd ? 1 : 0,
          transition: 'opacity 200ms ease',
          background: `linear-gradient(to top, ${paper.stock} 12%, rgba(251,248,242,0) 100%)`,
        }}
      />

      {/* A fade says "there is more". This says "here is how to get it", and pressing it
          does the thing — which is the difference between a hint and an affordance. The
          reader who found the reported problem worked the scrolling out eventually and
          called it intuitive afterwards, so what was missing was only the first step.

          A real <button>, which matters for two reasons beyond semantics: the book's
          click-to-turn handler already skips anything inside a button, so pressing this
          cannot turn the page out from under the sentence it is offering; and it puts the
          same action on the keyboard for a reader who never touches a mouse.

          **It becomes "Next" at the foot of the column rather than disappearing, and that
          is a bug fix rather than a flourish.** It used to unmount on the last press. The
          reader's cursor was then resting on the LEFT page with nothing under it, and the
          left page means "go back" — so the click that felt like carrying on threw them a
          spread backwards. The control vanished at the exact moment it had trained them
          to press it again.

          This is the same answer the bottom bar already gives at the end of a volume: the
          dead control is replaced rather than sat beside, so the slot the reader is
          already aiming at is the thing that carries them on. One element throughout, so
          nothing is ever pulled out from under the pointer — only its label and its job
          change.

          Safe against the "never key page CONTENT on the scroll state" rule, because this
          is an absolutely positioned overlay: it takes no space in the column and so
          cannot feed back into the measurement that decides whether it shows.

          Sits clear of the scrollbar rather than over it. */}
      {(scrollable && (!atEnd || onAdvance)) && (
        <button
          type="button"
          className="focus-ring"
          aria-label={atEnd ? 'Next page' : 'Scroll down for the rest of this page'}
          onClick={() => (atEnd ? onAdvance() : scrollOneScreen(flowRef.current, 'fwd'))}
          style={{
            position: 'absolute',
            bottom: compact ? 2 : 0,
            right: 16,
            display: 'flex',
            alignItems: 'center',
            gap: space(1),
            ...type.utility,
            fontSize: compact ? 9 : 8.5,
            letterSpacing: '0.14em',
            color: color.inkSoft,
            background: paper.stock,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: paper.rule,
            borderRadius: 2,
            // Compact is padded to a thumb rather than to the text. 19px tall was the
            // right size for the label and well under the 44px a touch target needs.
            padding: compact ? `${space(3)} ${space(4)}` : `${space(1)} ${space(2)}`,
            cursor: 'pointer',
            // Above the fade it sits on, or the gradient washes it out.
            zIndex: 1,
          }}
        >
          {atEnd ? 'Next' : 'More'} <span aria-hidden="true">{atEnd ? '→' : '↓'}</span>
        </button>
      )}
      </div>

      <Folio n={pageNumbers[0]} align="left" />
    </div>
  );
}

/**
 * The image page. Always the RIGHT page.
 *
 * Alt text comes from the spec and describes what is depicted rather than what
 * it means. That is deliberate, so it is used as given.
 *
 * **The caption is what the empty third of this page is for.** Every delivered
 * plate is 3:2 and every page is 1:1, so the plate is width-limited and always
 * stops about 224px short of the foot — a third of the page, on all 38 of them.
 * Nothing removes that but cropping the art or reshaping the page. It only became
 * conspicuous when the measure narrowed to 34em and the facing prose started
 * running to the bottom of its own page: full text on the left against a picture
 * ending two thirds down on the right.
 *
 * So the space gets a job instead of a fix. A caption directly under the plate is
 * what an illustrated book does with exactly this proportion.
 *
 * `caption` names the MOMENT, not the room. It was the running section heading
 * first, which was free and consistent and only half a caption: it repeated a line
 * already set on the facing page and told the reader nothing the picture had not.
 * The authored lines live in `patch-notes/plate-captions.json`, keyed by image
 * slug, with the running section still behind them as the fallback so a plate with
 * no line written yet is never bare.
 *
 * Spoiler-safe by inheritance rather than by review: a caption describes the beat
 * its own plate already depicts, and that plate has been cleared for this spread.
 * A caption that needs to reach further than the picture is the wrong caption.
 *
 * No frame added on desktop, deliberately. The compact plate is framed because it
 * floats on grey with no page edge to sit against; on paper the page edge already
 * says "object resting on a surface", and the note on the frame below says so.
 */
export function GraphicPage({ spread, compact, caption }) {
  // A 3:2 plate on a square page can only reach about two thirds of the page
  // height, so padding here is margin the plate cannot afford. Kept tight on
  // both, and zero on a phone, where every pixel of gutter is a pixel off the
  // width of a picture that is already width-limited.
  const pad = compact ? '0px' : space(5);
  // The plate's top edge now meets the first line of prose across the gutter,
  // instead of the plate floating in the middle of its own page while the text
  // started near the top. Two columns sharing one horizon is the whole gain.
  const top = `calc(${compact ? pageInset.top.compact : pageInset.top.wide} + ${pageInset.plateCapNudge})`;
  const g = spread.image;
  const pageNumbers = spread.pages ? spread.pages.split(/\s+to\s+/) : [];
  const aspect = cssAspect(g.aspect);

  return (
    <div
      {...PAGE_ATTR}
      data-mb-kind="graphic"
      data-mb-spread={spread.n}
      className="mb-page"
      style={{
        ...PAGE,
        padding: compact ? `${space(3)} 0 ${space(3)}` : `${top} ${pad} ${space(5)}`,
        justifyContent: 'flex-start',
        // On a phone the plate does not sit on a sheet of paper, and that is the fix for
        // the emptiest screen in the reader.
        //
        // A 3:2 plate on a 0.65 page is WIDTH-limited, so it can only reach about 237 of
        // the page's 544px however the page is padded — measured at 62% of the page left
        // over. Nothing can make the picture much bigger without cropping the composition
        // the prompt specified. What CAN change is what the leftover is: 340px of blank
        // cream reads as a page that failed to load, while the same space in the reader's
        // own ground reads as the surround a framed picture is resting on. Which is exactly
        // what a desktop reader already sees — a plate on paper, on grey — only here the
        // grey has to do the job on its own, because there is no facing page.
        //
        // Grey, not the dark ground the compact opener uses. A lightbox would make the art
        // pop harder, and it would also mean every single swipe on a phone alternated a
        // cream screen with a near-black one.
        ...(compact
          ? { background: reader.bg, backgroundImage: 'none' }
          : null),
      }}
    >
      <figure
        style={{
          margin: 0,
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          // flex-start, not center — on the SPREAD. Centring is what put the plate's top
          // edge at an arbitrary height; the slack collects below it, where the prose page
          // has its own slack too, so the spread reads as one object.
          //
          // Compact centres, because there is no facing page for the top edge to agree
          // with, and a picture pinned to the top of a phone screen with 300px of ground
          // beneath it reads as having fallen to the top.
          justifyContent: compact ? 'center' : 'flex-start',
        }}
      >
        {/* The frame is what stops a full-width plate on grey reading as a gap in the page.
            A hairline plus a soft drop shadow is enough to say "object resting on a
            surface"; on paper the page edge already said it. */}
        <div
          style={
            compact
              ? {
                borderTop: `1px solid ${reader.rule}`,
                borderBottom: `1px solid ${reader.rule}`,
                boxShadow: '0 2px 10px rgba(58,48,38,0.16), 0 10px 30px rgba(58,48,38,0.13)',
              }
              : undefined
          }
        >
          <Plate slug={g.slug} alt={g.alt} shotType={g.shotType} aspect={aspect} />
        </div>

        {/* Left-aligned under the plate, against the right-aligned folio at the page
            corner. Caption belongs to the picture, folio belongs to the page, and
            putting them on opposite edges says which is which without a rule.

            **Italic serif, not the letterspaced caps the rest of the furniture
            wears, and that is a deliberate break from the house rule.** Caps at 8.5px
            were right while the line was a section heading — a label, two or three
            words, read at a glance. An authored caption is a phrase, and uppercase
            letterspacing is the worst possible setting for one: it removes the word
            shapes a reader uses to take in running text, and "Pip goes still on the
            milk crate" becomes something to decode rather than read. Italic serif at
            this size is what a plate caption is set in, in more or less every
            illustrated book, for exactly that reason.

            It also draws the right line. A caption is editorial content ABOUT the
            picture; the folio and the counter are interface. Setting them apart says
            which is which. The `utility` face keeps every other piece of furniture
            on the page.

            inkSoft on the reader's grey ground measures 2.9:1, so compact takes the
            lighter step, exactly as the Folio does. */}
        {caption && (
          <figcaption
            style={{
              fontFamily: type.body.fontFamily,
              fontStyle: 'italic',
              // 14, up from 11.5 and from 8.5 before that. A third of this page is
              // empty by construction — a 3:2 plate in a 1:1 page — so the caption is
              // not competing for room with anything, and at 11.5 it read as a
              // footnote to a picture rather than as part of the page.
              //
              // Larger than the 12.7px body type, which would be wrong in a column
              // and is right here: there is no prose on this page for it to be
              // subordinate to, and it is the only text a reader's eye has to land on.
              //
              // Scales with the reader's setting, unlike the folio. That is the line
              // between the two — a folio is interface and stays put, a caption is
              // reading matter and should grow with the prose it sits beside.
              fontSize: 'calc(14px * var(--mb-type-scale, 1))',
              lineHeight: 1.4,
              color: compact ? reader.textMuted : color.inkSoft,
              marginTop: space(3),
              // Never wider than the measure, so a long caption breaks like prose
              // rather than running the full width of the plate.
              maxWidth: '30em',
              ...(compact ? { paddingLeft: space(4), paddingRight: space(4) } : null),
            }}
          >
            {caption}
          </figcaption>
        )}
      </figure>

      <Folio n={pageNumbers[1]} align="right" compact={compact} />
    </div>
  );
}

/**
 * The chapter opener.
 *
 * One full-bleed 4:3 image across both pages with the title block typeset over
 * it. Because a spread is two 2:3 pages, it is exactly 4:3, so the opener
 * fills it with no letterboxing and no crop.
 *
 * Rendered as one composition and clipped to a half, rather than as two
 * separate pages. The inner element is a full spread wide and shifted, so the
 * image and the title text break across the gutter the way they would in
 * print, and the turning sheet can carry a half without any special case.
 */
export function OpenerSpread({ spread, side, compact }) {
  const t = spread.title || {};
  const g = spread.image;

  // side: 'left' | 'right' | null. null renders the whole composition, which
  // is what the compact single-page layout wants.
  const split = side === 'left' || side === 'right';

  const titleBlock = (over) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: space(3),
        textAlign: 'center',
        color: paper.stock,
        fontFamily: type.body.fontFamily,
        ...(over ? { textShadow: '0 1px 14px rgba(0,0,0,0.55)' } : {}),
      }}
    >
      <div style={{ ...type.utility, fontSize: compact ? 15 : 21, letterSpacing: '0.2em', lineHeight: 1.15 }}>
        {t.title}
      </div>
      {t.subtitle && (
        <div style={{ fontStyle: 'italic', fontSize: compact ? 12 : 15, opacity: 0.9 }}>
          {t.subtitle}
        </div>
      )}
      <div
        aria-hidden="true"
        style={{ width: 54, height: 1, background: paper.stock, opacity: 0.6, margin: `${space(1)} 0` }}
      />
      {t.series && (
        <div style={{ ...type.utility, fontSize: compact ? 11 : 14, letterSpacing: '0.16em' }}>
          {t.series}
        </div>
      )}
      {t.part && (
        <div style={{ fontSize: compact ? 12.5 : 16, fontWeight: 700 }}>{t.part}</div>
      )}
    </div>
  );

  // Compact is a genuinely different composition, not a scaled-down one.
  //
  // The opener image is 16:9 because it spans both pages of a 16:9 spread. A
  // phone page is around 0.51, so full-bleeding it there would centre-crop a
  // panorama down to a narrow vertical slice and throw away roughly three
  // quarters of the frame, including whatever the prompt actually composed for.
  // On a phone the image is therefore letterboxed at full width and the title
  // sits beneath it rather than over it.
  if (!split) {
    return (
      <div
        {...PAGE_ATTR}
        data-mb-kind="opener"
        data-mb-spread={spread.n}
        className="mb-page"
        style={{
          ...PAGE,
          background: color.ink,
          justifyContent: 'center',
          gap: space(8),
          padding: `${space(6)} ${space(5)}`,
        }}
      >
        <div style={{ width: '100%', flex: 'none' }}>
          <Plate slug={g.slug} alt={g.alt} shotType={g.shotType} aspect={cssAspect(g.aspect, '16 / 9')} />
        </div>
        {titleBlock(false)}
      </div>
    );
  }

  return (
    <div
      {...PAGE_ATTR}
      data-mb-kind="opener"
      data-mb-spread={spread.n}
      className="mb-page"
      // Both halves render the whole composition and clip to their portion, so
      // the right half is a visual continuation of content already announced by
      // the left. Hiding it from assistive tech stops the title block and the
      // image being read out twice.
      aria-hidden={side === 'right' ? 'true' : undefined}
      style={{ ...PAGE, overflow: 'hidden', background: color.ink }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          // Two pages wide, shifted so this half shows its own portion.
          width: split ? '200%' : '100%',
          left: side === 'right' ? '-100%' : 0,
        }}
      >
        <Plate
          slug={g.slug}
          alt={g.alt}
          shotType={g.shotType}
          aspect={cssAspect(g.aspect, '16 / 9')}
          fullBleed
        />

        {/* Scrim, so the title stays legible over whatever the image turns
            out to be. Weighted to the bottom where the type sits. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(20,18,24,0.10) 0%, rgba(20,18,24,0.05) 45%, rgba(20,18,24,0.72) 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: `${space(12)} ${space(14)}`,
          }}
        >
          {titleBlock(true)}
        </div>
      </div>
    </div>
  );
}

export function BlankPage() {
  return <div {...PAGE_ATTR} className="mb-page" style={PAGE} aria-hidden="true" />;
}
