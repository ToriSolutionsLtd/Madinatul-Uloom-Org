'use client';

import { Link } from '@/i18n/routing';
import { BookOpen, Building2, GraduationCap, HandHeart, Play } from 'lucide-react';
import Image from 'next/image';

interface Program {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  href: string;
  backgroundImage: string;
}

const programs: Program[] = [
  {
    icon: <BookOpen className="dark:text-primary h-7 w-7 text-teal-700" />,
    title: 'Madrasa',
    description: "Qur'an, Tajweed, and foundational Islamic studies for all ages.",
    linkText: 'Enroll Now',
    href: '/services/madrasa',
    backgroundImage: '/images/cards/madrasa-bg.jpg',
  },
  {
    icon: <Building2 className="dark:text-primary h-7 w-7 text-teal-700" />,
    title: 'Masjid',
    description: 'Prayer times, khutbah updates, and community announcements.',
    linkText: 'View Schedule',
    href: '/services/masjid',
    backgroundImage: '/images/cards/masjid-bg.jpg',
  },
  {
    icon: <GraduationCap className="dark:text-primary h-7 w-7 text-teal-700" />,
    title: 'Islamic School',
    description: 'Structured education combining academics with Islamic values.',
    linkText: 'Learn More',
    href: '/services/islamic-school',
    backgroundImage: '/images/cards/islamic-school-bg.jpg',
  },
  {
    icon: <HandHeart className="dark:text-primary h-7 w-7 text-teal-700" />,
    title: 'Social Work',
    description: 'Zakat support, food drives, and local community outreach initiatives.',
    linkText: 'Get Involved',
    href: '/services/social-work',
    backgroundImage: '/images/cards/social-work-bg.jpg',
  },
];

interface LatestKhutbah {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  videoUrl?: string;
}

const latestKhutbah: LatestKhutbah = {
  title: 'Purifying the Heart: The Path to Inner Peace',
  description:
    'In this powerful sermon, we explore the spiritual diseases of the heart and the Quranic remedies to cleanse our souls and improve our connection with Allah.',
  date: 'Last Friday',
  imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80',
  videoUrl: '/sermons/latest',
};

export function FeaturedPrograms() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Featured Services (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-foreground text-2xl font-bold">Featured Services</h2>
              <Link
                href="/services"
                className="dark:text-primary text-sm font-medium text-teal-700 hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {programs.map((program, index) => (
                <div
                  key={index}
                  className="hover:border-primary/50 relative overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors dark:border-slate-700 dark:bg-slate-800"
                >
                  {/* Background Image Layer */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                      src={program.backgroundImage}
                      alt=""
                      fill
                      className="-rotate-6 scale-110 object-cover opacity-[0.06]"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    {/* Overlay for better contrast */}
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  {/* Content Layer */}
                  <div className="relative z-10 flex gap-4 p-4">
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-900/30">
                      {program.icon}
                    </div>
                    <div>
                      <h3 className="text-foreground text-lg font-bold">{program.title}</h3>
                      <p className="text-muted-foreground mb-3 text-sm">{program.description}</p>
                      <Link
                        href={program.href as '/'}
                        className="dark:text-primary text-sm font-bold text-teal-700 hover:underline"
                      >
                        {program.linkText}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Khutbah (1/3 width) */}
          <div className="lg:col-span-1">
            <h2 className="text-foreground mb-6 text-2xl font-bold">Latest Khutbah</h2>
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md dark:border-slate-700 dark:bg-slate-800">
              {/* Video Thumbnail */}
              <div className="group relative h-48 cursor-pointer bg-slate-200">
                <Image
                  src={latestKhutbah.imageUrl}
                  alt="Khutbah thumbnail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors group-hover:bg-black/50">
                  <div className="bg-primary flex size-14 transform items-center justify-center rounded-full pl-1 text-white transition-transform group-hover:scale-110">
                    <Play className="h-8 w-8 fill-current" />
                  </div>
                </div>
                {/* Date Badge */}
                <div className="absolute bottom-3 left-3 rounded bg-black/70 px-2 py-1 text-xs font-medium text-white">
                  {latestKhutbah.date}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="text-primary mb-2 flex items-center gap-2 text-xs font-bold uppercase">
                  <span className="bg-primary/10 flex size-5 items-center justify-center rounded-full">
                    <Play className="h-3 w-3 fill-current" />
                  </span>
                  Latest Khutbah
                </div>
                <h3 className="text-foreground mb-2 text-xl font-bold">{latestKhutbah.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                  {latestKhutbah.description}
                </p>
                <Link
                  href="/sermons"
                  className="text-muted-foreground hover:text-foreground hover:bg-muted/50 block w-full rounded-lg border border-slate-200 py-2 text-center text-sm font-medium transition-colors dark:border-slate-600"
                >
                  Watch Archive
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
