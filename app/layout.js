import { Libre_Franklin, Barlow } from 'next/font/google';
import './globals.css';

// Self-hosted at build time by next/font. No runtime request to Google, no
// FOUT beyond display: swap.
//
// Both candidates load regular and bold, upright and italic, because a text
// page needs all four: body regular, section heading bold, the closing
// "To be continued" line italic.

const libreFranklin = Libre_Franklin({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre-franklin',
  display: 'swap',
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-barlow',
  display: 'swap',
});

export const metadata = {
  title: 'Millbrook',
  description: 'Digital flipbooks and other assets for the Welcome to Millbrook project.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${libreFranklin.variable} ${barlow.variable}`}>
      <body>{children}</body>
    </html>
  );
}
