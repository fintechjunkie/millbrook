import { notFound } from 'next/navigation';
import { loadVolume, nextVolume, VOLUME_SLUGS } from '@/lib/millbrook/data';
import FlipBook from '@/components/millbrook/FlipBook';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return VOLUME_SLUGS.map((vol) => ({ vol }));
}

export function generateMetadata({ params }) {
  const volume = loadVolume(params.vol);
  if (!volume) return {};
  return {
    title: `${volume.chapter} · The Patch Notes · Millbrook`,
  };
}

// The ?spread= deep link is read on the CLIENT, inside FlipBook, rather than
// from searchParams here. Touching searchParams opts a page out of static
// rendering, and this is a static reading product: there is no reason for the
// server to re-render nine spreads of fixed prose because a query param moved.
export default function ReadPage({ params }) {
  const volume = loadVolume(params.vol);
  if (!volume) notFound();
  return <FlipBook volume={volume} next={nextVolume(params.vol)} />;
}
