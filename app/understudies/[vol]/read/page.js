import { notFound } from 'next/navigation';
import { loadVolume, nextVolume, slugsForArc } from '@/lib/millbrook/data';
import FlipBook from '@/components/millbrook/FlipBook';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return slugsForArc('understudies').map((vol) => ({ vol }));
}

export function generateMetadata({ params }) {
  const volume = loadVolume(params.vol);
  if (!volume || volume.arc !== 'understudies') return {};
  return {
    title: `${volume.chapter} · The Understudies · Millbrook`,
  };
}

// A near-copy of the arc-one route rather than one dynamic /[arc]/[vol]/read, and that is
// deliberate. A catch-all arc segment would sit at the site root and swallow every unknown
// top-level path, so /abut would render a 404 through the reader's own machinery instead of
// the site's; and it would collide with the static /patch-notes and /understudies arc pages.
// Two thin files that name their arc explicitly are cheaper to reason about than one route
// that has to defend itself against every URL on the site.
export default function ReadPage({ params }) {
  const volume = loadVolume(params.vol);
  if (!volume || volume.arc !== 'understudies') notFound();
  return <FlipBook volume={volume} next={nextVolume(params.vol)} />;
}
