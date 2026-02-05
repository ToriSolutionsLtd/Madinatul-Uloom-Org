'use client';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { ArrowRight, Clock } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative flex h-[600px] w-full items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center before:absolute before:inset-0 before:bg-gradient-to-b before:from-[rgba(16,34,28,0.4)] before:to-[rgba(16,34,28,0.8)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto -mt-[60px] flex w-full max-w-[1280px] flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
        {/* Welcome Badge */}
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm">
          <span className="bg-primary h-2 w-2 animate-pulse rounded-full" />
          Welcome to Our Community
        </div>

        {/* Main Heading */}
        <h1 className="max-w-4xl text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
          A Place of Peace, <span className="text-primary">Learning</span>, and Community
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg font-light text-gray-200">
          Join us for daily prayers, educational programs, and community events. Everyone is welcome
          at Madinatul Uloom.
        </p>

        {/* CTA Buttons */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary/90 flex h-12 items-center gap-2 rounded-lg px-8 font-bold shadow-lg transition-all"
          >
            <Link href="/prayer-times">
              <span>Prayer Times</span>
              <Clock className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="flex h-12 items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-8 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            <Link href="/programs">
              <span>Our Programs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Decorative Gradient at Bottom */}
      <div className="from-background absolute bottom-0 z-10 h-16 w-full bg-gradient-to-t to-transparent sm:h-24" />
    </section>
  );
}
