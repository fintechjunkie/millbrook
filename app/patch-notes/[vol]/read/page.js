import { notFound } from 'next/navigation';
import { loadVolume, nextVolume, slugsForArc } from '@/lib/millbrook/data';
import FlipBook from '@/components/millbrook/FlipBook';

export const dynamic = 'force-static';

// Scoped to THIS arc's volumes, not to every volume in the registry. It used to map
// VOLUME_SLUGS, which was the whole set — with a second arc that would prerender
// /patch-notes/u1/read, a real page at a URL that says the wrong story.
export function generateStaticParams() {
  return slugsForArc('patch-notes').map((vol) => ({ vol }));
}

export function generateMetadata({ params }) {
  const volume = loadVolume(params.vol);
  if (!volume || volume.arc !== 'patch-notes') return {};
  return {
    title: `${volume.chapter} · The Patch · Millbrook`,
  };
}

// The ?spread= deep link is read on the CLIENT, inside FlipBook, rather than
// from searchParams here. Touching searchParams opts a page out of static
// rendering, and this is a static reading product: there is no reason for the
// server to re-render nine spreads of fixed prose because a query param moved.
export default function ReadPage({ params }) {
  const volume = loadVolume(params.vol);
  // The arc check is what stops /patch-notes/u1/read rendering The Understudies under
  // The Patch's URL and breadcrumb.
  if (!volume || volume.arc !== 'patch-notes') notFound();
  return <FlipBook volume={volume} next={nextVolume(params.vol)} />;
}
