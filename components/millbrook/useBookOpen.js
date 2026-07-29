'use client';

import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { turn } from '@/lib/millbrook/series';

/**
 * The transition from a shelf card into the book.
 *
 * The idea is that the cover you clicked becomes the spread you land on. It lifts off
 * the shelf, grows to the width of the reader, and tips a few degrees about its left
 * edge the way a cover does when a book is opened, while everything else falls away.
 * The reader's first page is a full-bleed 2:1 chapter opener, so the shape the cover
 * grows into is the shape that is already waiting there.
 *
 * Built on a FLIP-style clone rather than a route animation for two reasons: it needs
 * to run before the destination exists, and it must not depend on the App Router's
 * transition support, which would tie a piece of visual polish to a framework version.
 *
 * Three rules it obeys:
 *
 * 1. **Navigation happens whatever the animation does.** The router.push is scheduled
 *    off a timer, not off animationend. Reduced motion, a background tab, or a
 *    display:none ancestor all stop animation events firing, and a reader stranded on
 *    the shelf because a decorative effect failed is a broken link. Same reasoning as
 *    the page turn, which learned it the hard way.
 * 2. **prefers-reduced-motion navigates immediately.** No clone, no scrim.
 * 3. **The route is prefetched on hover**, so the animation covers real loading rather
 *    than adding to it.
 */
export function useBookOpen() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const going = useRef(false);

  const open = useCallback((event, href, coverEl) => {
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

    // A clone, so the card in the grid is untouched and nothing reflows under it.
    const clone = coverEl.cloneNode(true);
    clone.className = 'mb-open-clone';
    Object.assign(clone.style, {
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });

    const scrim = document.createElement('div');
    scrim.className = 'mb-open-scrim';

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

    scrim.dataset.on = 'true';
    Object.assign(clone.style, {
      top: `${targetY}px`,
      left: `${targetX}px`,
      width: `${targetW}px`,
      height: `${targetH}px`,
    });
    clone.dataset.on = 'true';

    // Timers are authoritative for both the navigation and the cleanup, for the same
    // reason: transitionend does not fire if the transition never ran, and a clone left
    // on screen would sit over the book at z-index 91 forever. Slightly shorter than
    // the visual so the route change lands while the cover still fills the screen.
    setTimeout(() => router.push(href), turn.ms - 60);

    setTimeout(() => {
      clone.dataset.leaving = 'true';
      scrim.dataset.on = 'false';
    }, turn.ms + 80);

    setTimeout(() => {
      clone.remove();
      scrim.remove();
      going.current = false;
      setBusy(false);
    }, turn.ms + 460);
  }, [router]);

  const prefetch = useCallback((href) => { router.prefetch?.(href); }, [router]);

  return { open, prefetch, busy };
}
