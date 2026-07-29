'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Plate } from './Plate';
import { CAST } from '@/lib/millbrook/cast';
import { SITE_IMAGES, color, space, type } from '@/lib/millbrook/series';

/**
 * The cast strip, with a hotspot over each figure.
 *
 * Hover or focus names them; click opens a card. Names are typeset over the plate
 * rather than generated into it, the same discipline the banner and the chapter
 * openers follow: lettering inside an image cannot be restyled, translated, selected
 * or read aloud, and the negative block forbids it anyway.
 *
 * The hotspots are real buttons, not a click handler on the image, so the whole strip
 * is reachable by keyboard and each figure announces its own name.
 */
export function CastStrip() {
  const [open, setOpen] = useState(null);
  const [hovered, setHovered] = useState(null);
  const restoreTo = useRef(null);

  const close = useCallback(() => {
    setOpen(null);
    // Send focus back where it came from. Without this a keyboard user who opens a
    // card lands at the top of the document when it closes.
    restoreTo.current?.focus?.();
    restoreTo.current = null;
  }, []);

  const openCard = (member, el) => {
    restoreTo.current = el;
    setOpen(member);
  };

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  return (
    <div style={{ borderBottom: '1px solid rgba(244,239,230,0.1)', background: color.bg }}>
      <div style={{ position: 'relative' }}>
        <Plate
          slug={SITE_IMAGES.cast.slug}
          alt="The cast of The Patch: five teenagers, a robot girl and a small monkey, standing together."
          shotType="Cast strip, the whole ensemble in one frame"
          aspect={SITE_IMAGES.cast.aspect}
          fit="cover"
        />

        {CAST.map((m) => {
          const active = hovered === m.slug;
          return (
            <button
              key={m.slug}
              type="button"
              className="mb-hotspot focus-ring"
              aria-label={`${m.name} — ${m.role}`}
              onMouseEnter={() => setHovered(m.slug)}
              onMouseLeave={() => setHovered((h) => (h === m.slug ? null : h))}
              onFocus={() => setHovered(m.slug)}
              onBlur={() => setHovered((h) => (h === m.slug ? null : h))}
              onClick={(e) => openCard(m, e.currentTarget)}
              style={{ left: `${m.hotspot.left}%`, width: `${m.hotspot.width}%` }}
            >
              <span className="mb-hotspot-name" data-on={active ? 'true' : 'false'}>
                {m.name}
              </span>
            </button>
          );
        })}
      </div>

      {open && <CharacterCard member={open} onClose={close} />}
    </div>
  );
}

/**
 * The card itself.
 *
 * Bordered with the drawn ornament, wired as a border-image in globals.css, so it reads
 * as a printed card laid on the page rather than as a browser dialog. The portrait is the
 * canonical reference sheet, which is the one image of each character guaranteed to be a
 * clean full figure against plain ground.
 *
 * The card is one warm stock throughout rather than paper with a tinted panel: the sheets
 * carry a sandy ground of their own, and a paper body beside it read as a white block with
 * a tan patch in it.
 */
function CharacterCard({ member, onClose }) {
  const panel = useRef(null);

  useEffect(() => { panel.current?.focus(); }, []);

  return (
    <div
      className="mb-card-scrim"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="presentation"
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={`${member.name}, character card`}
        tabIndex={-1}
        className="mb-charcard"
      >
        <button type="button" className="mb-charcard-x focus-ring" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="mb-charcard-art">
          <Plate
            slug={member.portrait}
            alt=""
            aspect="3 / 4"
            fit="contain"
            // The sheets are 3:4 for the six teenagers and 10:9 for Monke, so at least
            // one of them always letterboxes. Handing the plate the panel colour makes
            // that invisible instead of drawing a white band.
            ground="var(--portrait-ground)"
          />
        </div>

        <div className="mb-charcard-body">
          <div
            style={{
              ...type.utility,
              fontSize: 9,
              letterSpacing: '0.22em',
              color: color.accent,
            }}
          >
            The Patch
          </div>

          <h3
            style={{
              fontFamily: type.body.fontFamily,
              fontSize: 27,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: color.ink,
              margin: `${space(2)} 0 0`,
            }}
          >
            {member.name}
          </h3>

          <div
            style={{
              fontFamily: type.body.fontFamily,
              fontSize: 13,
              fontStyle: 'italic',
              color: color.inkSoft,
              margin: `${space(2)} 0 0`,
            }}
          >
            {member.role}
          </div>

          {/* Warm, not paper.rule. A #D8CFBE hairline is a cool grey on a warm sand
              ground and reads as a slightly dirty line rather than a rule. */}
          <hr
            style={{
              border: 0,
              height: 1,
              background: 'rgba(160, 140, 105, 0.4)',
              margin: `${space(4)} 0`,
            }}
          />

          {member.bio.map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: type.body.fontFamily,
                fontSize: 14.5,
                lineHeight: 1.6,
                color: color.ink,
                margin: i === 0 ? 0 : `${space(3)} 0 0`,
                textWrap: 'pretty',
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
