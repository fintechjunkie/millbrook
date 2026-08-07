import { notFound } from 'next/navigation';
import { loadVolume, nextVolume, slugsForArc } from '@/lib/millbrook/data';
import FlipBook from '@/components/millbrook/FlipBook';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return slugsForArc('nightjar').map((vol) => ({ vol }));
}

export function generateMetadata({ params }) {
  const volume = loadVolume(params.vol);
  if (!volume || volume.arc !== 'nightjar') return {};
  return {
    title: `${volume.chapter} · The Nightjar · Millbrook`,
  };
}

// A third near-copy of the arc-one route rather than one dynamic /[arc]/[vol]/read, for the
// reason written out in app/patch-notes/[vol]/read/page.js: a catch-all arc segment would sit
// at the site root, swallow every unknown top-level path, and collide with the static arc
// pages. Three thin files that name their arc explicitly stay cheaper to reason about.
export default function ReadPage({ params }) {
  const volume = loadVolume(params.vol);
  if (!volume || volume.arc !== 'nightjar') notFound();
  return <FlipBook volume={volume} next={nextVolume(params.vol)} />;
}
