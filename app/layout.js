import localFont from 'next/font/local';
import { TYPE_SCALE_BOOT } from '@/components/millbrook/useTypeScale';
import './globals.css';

// One webfont, vendored.
//
// This reverses the original "no webfonts" decision, and the reason it can be
// reversed is that the objection was never to a webfont as such. It was to a
// build that fetches one: `next/font/google` downloads at build time, so a
// locked-down network fails the build (extraction gotcha 7). `next/font/local`
// reads two files that live in this repo, so there is no fetch, no runtime
// request, and nothing to fail.
//
// What the system stack actually shipped was two different books. `Charter,
// "Iowan Old Style", Georgia, serif` renders as Charter on macOS and iOS and as
// Georgia everywhere else, and Georgia is 9% wider. The 37em measure that
// `series.js` describes as "76 characters" is 76 characters on a Mac and 83 on
// Windows and Android — past the readable 45-75 band, for most of the audience,
// on a reading product. The face was chosen once and then delivered to nobody
// in particular.
//
// Literata was measured against Charis SIL and Source Serif 4 on the densest
// page in the four volumes at true page size — see `/checks/type`, which is the
// throwaway that made the call. It has the largest x-height of the four at
// 6.39px against Georgia's 6.08px, so it reads a size bigger than it is, and it
// costs the least fill of the two faces that meaningfully shorten the line.
//
// One family, not two. The chrome is 8-11px letterspaced caps where the face
// barely reads, so a second webfont would be most of the payload for none of
// the benefit.
const literata = localFont({
  src: [
    // Both are variable across 400-700; the roman file and the bold file Google
    // serves are byte-identical, so shipping one of each is the whole family.
    { path: './fonts/literata-roman.woff2', weight: '400 700', style: 'normal' },
    { path: './fonts/literata-italic.woff2', weight: '400 700', style: 'italic' },
  ],
  variable: '--font-book',
  display: 'swap',
  // Georgia is the swap target on the platforms that have no Charter, and it is
  // the wider face. Without a metric-matched fallback the first paint would lay
  // out at 83 characters a line and reflow to 72 when the file lands, which on a
  // paginated page is the text visibly re-breaking. Next derives ascent, descent
  // and size-adjust from the real font metrics to hold that still.
  adjustFontFallback: 'Times New Roman',
  fallback: ['Charter', 'Iowan Old Style', 'Georgia', 'Times New Roman', 'serif'],
  preload: true,
});

export const metadata = {
  // metadataBase, because the OG and Twitter image paths on the landing page are
  // root-relative. Without it Next resolves them against localhost and every
  // shared link carries a card that only works on the machine that built it.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Millbrook',
  // Was "Digital flipbooks and other assets for the Welcome to Millbrook
  // project", which describes the repository to its author rather than the book
  // to a reader, and it is what search results and link previews quote.
  description:
    'A small town has started repairing itself, and nobody notices. An illustrated serial in four-volume arcs.',
};

export default function RootLayout({ children }) {
  // suppressHydrationWarning, and only on this element.
  //
  // The boot script below writes `--mb-type-scale` onto <html> before React
  // hydrates, so React finds a `style` attribute the server never sent and warns.
  // That mismatch is the feature rather than a bug to chase: the entire point is
  // that the size lands before React exists. The flag suppresses one level only,
  // so it covers this tag's own attributes and nothing inside it.
  return (
    <html lang="en" className={literata.variable} suppressHydrationWarning>
      <head>
        {/* The reader's type size, applied before first paint.
            A hook cannot do this: React runs after the first frame, so the book
            would render at the default size and reflow to the reader's on the next
            tick — on a full page of prose that is every line moving. Blocking and
            inline is the point. It is three statements and it cannot throw. */}
        <script dangerouslySetInnerHTML={{ __html: TYPE_SCALE_BOOT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
