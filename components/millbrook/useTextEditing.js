'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Edit mode for the reader. Development only.
 *
 * `available` is asked of the server rather than assumed from the bundle, because
 * that is the same guard the write route enforces. If the route says no, the button
 * never appears, so a production build cannot show an affordance that cannot work.
 *
 * The state is deliberately not persisted. Edit mode changes what a click does --
 * place a cursor instead of turn a page -- and a mode that survives a reload is a
 * mode you forget you are in.
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
    if (!available) setEditing(false);
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
