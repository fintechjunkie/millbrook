import Link from 'next/link';
import { SITE_IMAGES, color, space, type, ui } from '@/lib/millbrook/series';

/**
 * The navigation trail, shared by the arc page and the reader.
 *
 * Replaces a pair of single-step back links that between them left the reader
 * stranded. From inside a volume the only way out was "← The Patch Notes", one
 * level, with no route to the home page at all; and on the arc page "← Millbrook"
 * was 9.5px of low-contrast utility type sitting under a full-bleed banner, which
 * is technically present and practically invisible.
 *
 * A trail fixes both at once, because every ancestor is a target rather than just
 * the parent. Two clicks to get home becomes one, from anywhere.
 *
 * The emblem doubles as the home affordance. A mark in the top left corner is the
 * most universally understood "back to the start" control there is, and it costs
 * nothing here because the file already exists for the footer and the favicon.
 *
 * `trail` is ancestors only, each {label, href}. `current` is plain text, because
 * a link to the page you are already on is a dead control that still looks live.
 */
export function Crumbs({ trail = [], current, align = 'left' }) {
  const link = {
    ...type.utility,
    fontSize: 9.5,
    letterSpacing: '0.18em',
    color: ui.textMuted,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  };

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: space(2),
        flexWrap: 'wrap',
        justifyContent: align === 'left' ? 'flex-start' : align,
        minWidth: 0,
      }}
    >
      <Link
        href="/"
        className="focus-ring"
        aria-label="Millbrook home"
        style={{ display: 'flex', flex: 'none', alignItems: 'center' }}
      >
        <span
          aria-hidden="true"
          className="mb-mark"
          style={{
            width: 20,
            height: 20,
            backgroundImage: `url(/images/${SITE_IMAGES.mark.slug}.png)`,
          }}
        />
      </Link>

      {trail.map((c) => (
        <span key={c.href} style={{ display: 'flex', alignItems: 'center', gap: space(2), minWidth: 0 }}>
          <Link href={c.href} className="focus-ring" style={link}>
            {c.label}
          </Link>
          {/* An alpha of ink rather than a fixed grey, because this component appears on two
              different grounds: the off-white site shell and the reader's deeper one. A grey
              tuned for the lighter of the two measures 2.4:1 on the darker. An alpha tracks
              whatever it is laid on and stays legible on both. */}
          <span aria-hidden="true" style={{ ...link, color: 'rgba(42,37,48,0.45)' }}>
            /
          </span>
        </span>
      ))}

      {current && (
        <span
          aria-current="page"
          style={{ ...link, color: color.ink, whiteSpace: 'normal', minWidth: 0 }}
        >
          {current}
        </span>
      )}
    </nav>
  );
}
