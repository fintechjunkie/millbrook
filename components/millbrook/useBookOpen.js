'use client';

import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { open as OPEN } from '@/lib/millbrook/series';

/**
 * The transition from a shelf card into the book.
 *
 * The cover you clicked becomes the spread you land on. It rises off the shelf, grows
 * to the width of the reader, and tips a few degrees about its left edge the way a
 * cover does when a book is opened, while everything else falls away. The reader's
 * first page is a full-bleed 2:1 chapter opener, so the shape the cover grows into is
 * the shape already waiting there.
 *
 * **Staged, and that is the fix for the first version.** It ran the whole move in
 * 460ms and read as a glitch: too fast to register as motion, so the eye saw only the
 * before and after and assumed something had broken. It now runs in three stages with
 * their own durations -- lift, grow, hold -- which is what makes it read as intent
 * rather than as either a cut or a sluggish tween. Timings live in series.js.
 *
 * Built on a FLIP-style clone rather than a route animation, because it has to run
 * before the destination exists and must not depend on the App Router's transition
 * support, which would tie visual polish to a framework version.
 *
 * Three rules it obeys:
 *
 * 1. **Navigation happens whatever the animation does.** Every step is on a timer, not
 *    on transitionend. Reduced motion, a background tab or a display:none ancestor all
 *    stop transitions running and therefore stop their events firing, and a reader
 *    stranded on the shelf because a decorative effect failed is a broken link. The
 *    page turn learned this the hard way; so did the first version of this.
 * 2. **prefers-reduced-motion navigates immediately.** No clone, no scrim.
 * 3. **The route is prefetched on hover**, so the animation covers real loading rather
 *    than adding to it.
 */
export function useBookOpen() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const going = useRef(false);
  const timers = useRef([]);

  const at = (ms, fn) => { timers.current.push(setTimeout(fn, ms)); };

  const openBook = useCallback((event, href, coverEl) => {
    // Let modified clicks do what the browser would do: new tab, new window, download.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    if (going.current) return;
    going.current = true;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const rect = coverEl?.getBoundingClientRect();

    if (reduced || !rect || !coverEl) {
      router.push(href);
      return;
    }

    setBusy(true);
    timers.current.forEach(clearTimeout);
    timers.current = [];

    // A clone, so the card in the grid is untouched and nothing reflows under it.
    const clone = coverEl.cloneNode(true);
    clone.className = 'mb-open-clone';
    clone.style.setProperty('--lift', `${OPEN.liftMs}ms`);
    clone.style.setProperty('--grow', `${OPEN.growMs}ms`);
    clone.style.setProperty('--fade', `${OPEN.fadeMs}ms`);
    Object.assign(clone.style, {
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });

    // The sheen that sweeps the cover as it opens. A child of the clone rather than a
    // background on it, so it can travel independently of the box being resized.
    const sheen = document.createElement('div');
    sheen.className = 'mb-open-sheen';
    sheen.style.setProperty('--grow', `${OPEN.growMs}ms`);
    clone.append(sheen);

    const scrim = document.createElement('div');
    scrim.className = 'mb-open-scrim';
    scrim.style.setProperty('--lift', `${OPEN.liftMs}ms`);

    // Clear anything a previous run left behind before adding more.
    document.querySelectorAll('.mb-open-clone, .mb-open-scrim').forEach((n) => n.remove());
    document.body.append(scrim, clone);

    // Target: the reader's own geometry, centred. Capped so a very wide display does
    // not fling the cover past the width the book will actually occupy.
    const targetW = Math.min(window.innerWidth * 0.92, 1680);
    const targetH = targetW / 2;
    const targetX = (window.innerWidth - targetW) / 2;
    const targetY = (window.innerHeight - targetH) / 2;

    // A forced reflow, NOT requestAnimationFrame, and this is the same trap the page
    // turn already documents. rAF does not fire while the page is not compositing --
    // a background tab, a hidden pane -- so kicking the transition from it means the
    // animation silently never starts. Reading offsetWidth commits the initial styles
    // synchronously, which is all a CSS transition needs, and cannot be throttled.
    void clone.offsetWidth;

    // Stage 1: off the shelf. Short, and it does not move the box at all -- only
    // lifts and brightens it -- so the growth in stage 2 starts from a standstill and
    // reads as a second, separate action.
    clone.dataset.stage = 'lift';
    scrim.dataset.on = 'true';

    // Stage 2: open. The box grows to the reader's geometry and tips about its left
    // edge while the sheen crosses it.
    at(OPEN.liftMs, () => {
      clone.dataset.stage = 'grow';
      Object.assign(clone.style, {
        top: `${targetY}px`,
        left: `${targetX}px`,
        width: `${targetW}px`,
        height: `${targetH}px`,
      });
    });

    // Stage 3: the route changes underneath while the cover is still at full size and
    // still covering everything, so the swap itself is never visible.
    at(OPEN.navMs, () => router.push(href));

    // Stage 4: dissolve, revealing the opener that is now behind it.
    at(OPEN.navMs + 40, () => {
      clone.dataset.stage = 'leaving';
      scrim.dataset.on = 'false';
    });

    at(OPEN.navMs + 40 + OPEN.fadeMs, () => {
      clone.remove();
      scrim.remove();
      going.current = false;
      setBusy(false);
    });
  }, [router]);

  const prefetch = useCallback((href) => { router.prefetch?.(href); }, [router]);

  return { open: openBook, prefetch, busy };
}
