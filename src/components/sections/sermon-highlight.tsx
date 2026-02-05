'use client';

import { Link } from '@/i18n/routing';
import { Play, Podcast } from 'lucide-react';
import Image from 'next/image';

interface LatestSermon {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  videoUrl?: string;
}

const latestSermon: LatestSermon = {
  title: 'Purifying the Heart: The Path to Inner Peace',
  description:
    'In this powerful sermon, we explore the spiritual diseases of the heart and the Quranic remedies to cleanse our souls and improve our character.',
  date: 'Last Friday',
  imageUrl:
    'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=800&auto=format&fit=crop',
  videoUrl: '/sermons/latest',
};

export function SermonHighlight() {
  return (
    <Link
      href={latestSermon.videoUrl as '/'}
      className="border-border bg-card group flex flex-1 cursor-pointer flex-col overflow-hidden rounded-xl border shadow-sm"
    >
      {/* Video Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={latestSermon.imageUrl}
          alt={latestSermon.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="text-primary flex h-12 w-12 scale-90 transform items-center justify-center rounded-full bg-white shadow-lg transition-transform group-hover:scale-100">
            <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
          </div>
        </div>

        {/* Date Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="rounded bg-black/60 px-2 py-1 text-xs font-bold text-white">
            {latestSermon.date}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="text-primary mb-2 flex items-center gap-2 text-sm font-semibold">
          <Podcast className="h-4 w-4" />
          <span>Latest Khutbah</span>
        </div>
        <h3 className="group-hover:text-primary mb-2 text-xl font-bold transition-colors">
          {latestSermon.title}
        </h3>
        <p className="text-muted-foreground line-clamp-2">{latestSermon.description}</p>
      </div>
    </Link>
  );
}
