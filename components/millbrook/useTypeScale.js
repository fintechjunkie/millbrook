'use client';

/**
 * The reader's type-size preference.
 *
 * Three things own a piece of this and they have to agree:
 *
 *   1. The inline script in `app/layout.js` writes the stored value onto
 *      `documentElement` BEFORE first paint, so the book never renders at one size
 *      and jumps to another. It is duplicated logic on purpose — a hook cannot run
 *      early enough, and a flash of the wrong size on a page of prose is the whole
 *      thing reflowing.
 *   2. This hook owns the value afterwards and is the only writer once React is up.
 *   3. `type.body` and `type.bodyCompact` read the var. Nothing else should.
 *
 * The var lives on `documentElement` rather than on the book, because the inline
 * script has no other element to write to that early.
 */

import { useCallback, useEffect, useState } from 'react';
import { typeScale } from '@/lib/millbrook/series';

const { cssVar, storageKey, stops, base } = typeScale;

/** Nearest legal stop, so a hand-edited or stale stored value cannot wedge the reader. */
function nearestStop(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return base;
  return stops.reduce((best, s) => (Math.abs(s - n) < Math.abs(best - n) ? s : best), stops[0]);
}

function readStored() {
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw == null ? base : nearestStop(raw);
  } catch {
    // Private mode, blocked storage, or a locked-down embed. The preference is a
    // nicety; losing it must never stop the book rendering.
    return base;
  }
}

/**
 * @param {boolean} pinned  Force the base size regardless of preference, and refuse
 *   writes. Edit mode passes this: `FillMeter` reports whether a page fits, that
 *   number is an authorial tripwire, and it has to mean the same thing every time
 *   it is read. A reader's 1.3 would quietly turn every page red.
 */
export function useTypeScale(pinned = false) {
  // `base` on the server and on first client render, so hydration matches. The real
  // value is already on the element by then — the inline script put it there — so
  // there is nothing to correct visually, only state to catch up.
  const [scale, setScale] = useState(base);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setScale(readStored());
    setReady(true);
  }, []);

  const effective = pinned ? base : scale;

  useEffect(() => {
    document.documentElement.style.setProperty(cssVar, String(effective));
  }, [effective]);

  const choose = useCallback(
    (next) => {
      if (pinned) return;
      const s = nearestStop(next);
      setScale(s);
      try {
        window.localStorage.setItem(storageKey, String(s));
      } catch {
        // Same as reading: the setting still applies for this session.
      }
    },
    [pinned]
  );

  return { scale: effective, stored: scale, stops, base, choose, pinned, ready };
}

/**
 * The inline script's source, kept here so the two implementations sit in one file
 * and cannot drift apart unnoticed.
 *
 * Deliberately tiny and total: any throw here happens before the app renders, so it
 * would be a blank page rather than a missing preference.
 */
export const TYPE_SCALE_BOOT = `(function(){try{var v=localStorage.getItem(${JSON.stringify(
  storageKey
)});if(v)document.documentElement.style.setProperty(${JSON.stringify(cssVar)},v)}catch(e){}})()`;
