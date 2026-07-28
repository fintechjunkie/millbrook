import './globals.css';

// No webfonts.
//
// The build brief specifies Arial, which is a system font, so nothing is
// loaded: no next/font, no self-hosted woff2, no FOUT, and no build-time fetch
// to Google that a locked-down network could fail on (extraction gotcha 7).
//
// The choice was measured rather than assumed. Arial was compared against
// Libre Franklin and Barlow on the densest page in the four volumes, Volume 1
// spread 8 at 336 words, at true page size. Below 14px all three produced
// identical line counts, so fit was not a differentiator; above it Arial sat
// between the two. See docs/DECISIONS.md.

export const metadata = {
  title: 'Millbrook',
  description: 'Digital flipbooks and other assets for the Welcome to Millbrook project.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
