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
 */
function useHasRoomForTerminal(ref, threshold = 2) {
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
    const ro = new ResizeObserver(measure);
    ro.observe(flow);
    return () => ro.disconnect();
  }, [ref, threshold]);

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
function useScrollEdges(ref) {
  const [state, setState] = useState({ scrollable: false, atEnd: true });

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const measure = () => {
      const slack = el.scrollHeight - el.clientHeight;
      setState({
        scrollable: slack > 4,
        // 24px of tolerance rather than exact equality. Fractional scroll offsets mean
        // a container scrolled to the bottom frequently reports a pixel short of it,
        // which would leave the fade showing over the last line forever.
        atEnd: slack - el.scrollTop <= 24,
      });
    };

    measure();
    el.addEventListener('scroll', measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // The content grows independently of the box in edit mode, where a paragraph the
    // author is typing into is what changes size.
    [...el.children].forEach((c) => ro.observe(c));
    return () => { el.removeEventListener('scroll', measure); ro.disconnect(); };
  }, [ref]);

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
export function TextPage({ spread, compact, editing = false, onEditParagraph }) {
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
  const hasRoom = useHasRoomForTerminal(flowRef);
  const { scrollable, atEnd } = useScrollEdges(flowRef);

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
 */
export function GraphicPage({ spread, compact }) {
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
