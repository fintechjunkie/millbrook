'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Edit mode for the reader. Development only.
 *
 * `available` is asked of the server rather than assumed from the bundle, because
 * that is the same guard the write route enforces. If the route says no, the button
 * never appears, so a production build cannot show an affordance that cannot work.
 *
 * The state is deliberately not persisted between visits. Edit mode changes what a click
 * does -- place a cursor instead of turn a page -- and a mode that survives a reload is a
 * mode you forget you are in.
 *
 * But it IS addressable by URL, with `?edit=1`, and that is what makes the "enter edit mode"
 * request in CLAUDE.md actually deliverable. Without it the mode could only be switched on
 * in whichever browser did the clicking, so telling the author it was on for them was
 * either untrue or depended on them using the same window. A link works anywhere.
 *
 * Read on the client, like `?spread=`, so the route stays static.
 */
export function useTextEditing() {
  const [available, setAvailable] = useState(false);
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState(null);
  const timer = useRef(null);

  useEffect(() => {
    let live = true;
    fetch('/api/text')
      .then((r) => r.json())
      .then((d) => { if (live) setAvailable(Boolean(d?.editing)); })
      .catch(() => {});
    return () => { live = false; };
  }, []);

  useEffect(() => {
    if (!available) { setEditing(false); return; }
    // Only honour the parameter once the server has confirmed writes are possible, so a
    // production URL carrying ?edit=1 cannot put a reader into a mode that cannot save.
    const wanted = new URLSearchParams(window.location.search).get('edit');
    if (wanted === '1' || wanted === 'true') setEditing(true);
  }, [available]);

  const flash = useCallback((next) => {
    setStatus(next);
    clearTimeout(timer.current);
    if (next?.kind !== 'error') {
      timer.current = setTimeout(() => setStatus(null), 2400);
    }
  }, []);

  /**
   * Persist one paragraph.
   *
   * Content-addressed: the previous text goes up with the new text so the server can
   * refuse rather than guess if the file has moved on. Returns true on success so the
   * caller can decide whether to keep the edited DOM or roll it back.
   */
  const save = useCallback(async ({ vol, spread, before, after }) => {
    if (after.trim() === before.trim()) return true;

    flash({ kind: 'saving', text: 'Saving…' });
    try {
      const res = await fetch('/api/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vol, spread, before, after }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        flash({ kind: 'error', text: data.error ?? `Save failed (${res.status}).` });
        return false;
      }
      flash({ kind: 'saved', text: 'Saved to the spec' });
      return true;
    } catch (err) {
      flash({ kind: 'error', text: err.message ?? 'Save failed.' });
      return false;
    }
  }, [flash]);

  return {
    available,
    editing,
    setEditing,
    toggle: () => setEditing((v) => !v),
    status,
    clearStatus: () => setStatus(null),
    save,
  };
}
