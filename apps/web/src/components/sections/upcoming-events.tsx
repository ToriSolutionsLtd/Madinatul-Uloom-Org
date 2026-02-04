'use client';

import { Link } from '@/i18n/routing';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  month: string;
  day: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
}

// Mock events - in production, this would come from an API
const events: Event[] = [
  {
    id: '1',
    title: 'Youth Night: Faith & Future',
    category: 'Youth',
    date: '2025-02-24',
    month: 'Feb',
    day: '24',
    time: '7:00 PM',
    location: 'Main Hall',
    description:
      'A special evening for high school and college students to discuss navigating modern challenges with faith.',
    imageUrl:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'New Muslim Class',
    category: 'Education',
    date: '2025-02-25',
    month: 'Feb',
    day: '25',
    time: '10:00 AM',
    location: 'Classroom B',
    description:
      'Foundations of faith covering the basics of prayer, Quran reading, and Islamic history for reverts.',
    imageUrl:
      'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Monthly Family BBQ',
    category: 'Community',
    date: '2025-02-26',
    month: 'Feb',
    day: '26',
    time: '2:00 PM',
    location: 'Courtyard',
    description:
      'Bring your family and friends for an afternoon of delicious food, games, and bonding.',
    imageUrl:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop',
  },
];

export function UpcomingEvents() {
  const t = useTranslations('home.upcomingEvents');

  return (
    <section className="border-border bg-card w-full border-y py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold">{t('title')}</h2>
            <p className="text-muted-foreground">
              Join our community gatherings and educational programs
            </p>
          </div>
          <Link
            href="/events"
            className="text-primary hidden items-center gap-1 font-bold hover:underline sm:flex"
          >
            {t('viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}` as '/'}
              className="bg-background group flex flex-col overflow-hidden rounded-xl"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                {/* Date Badge */}
                <div className="absolute right-4 top-4 z-10 rounded-lg bg-white px-3 py-1 text-center shadow-sm dark:bg-black/80">
                  <span className="text-muted-foreground block text-xs font-bold uppercase">
                    {event.month}
                  </span>
                  <span className="text-primary block text-xl font-black">{event.day}</span>
                </div>
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="text-primary mb-2 text-xs font-medium">{event.category}</div>
                <h3 className="mb-2 text-lg font-bold">{event.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                  {event.description}
                </p>

                {/* Meta Info */}
                <div className="border-border mt-auto flex items-center justify-between border-t pt-4 text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {event.time}
                  </span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/events"
            className="text-primary inline-flex items-center gap-1 font-bold hover:underline"
          >
            {t('viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
