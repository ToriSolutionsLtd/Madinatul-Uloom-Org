'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Clock, Users, ArrowRight, GraduationCap } from 'lucide-react';
import { Link } from '@/i18n/routing';

export interface FeaturedProgram {
  id: string;
  title: string;
  description: string;
  schedule: string;
  audience: string;
  instructor?: string;
  variant: 'dark' | 'accent';
  badge: {
    text: string;
    variant: 'featured' | 'new';
  };
  ctaText: string;
}

interface FeaturedProgramCardProps {
  program: FeaturedProgram;
  className?: string;
}

export function FeaturedProgramCard({ program, className }: FeaturedProgramCardProps) {
  const isDark = program.variant === 'dark';

  return (
    <div
      className={cn(
        'group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-xl p-6 shadow-lg',
        isDark ? 'bg-slate-900' : 'bg-primary',
        className
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/patterns/arabesque.svg')] opacity-10" />

      {/* Glow Effect (only for dark variant) */}
      {isDark && (
        <div className="bg-primary absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-20 blur-[80px]" />
      )}

      {/* Content */}
      <div className="relative z-10">
        <Badge
          className={cn(
            'mb-3 text-xs font-bold',
            program.badge.variant === 'featured'
              ? 'bg-primary text-slate-900'
              : 'bg-slate-900 text-white'
          )}
        >
          {program.badge.text}
        </Badge>

        <h3 className={cn('mb-2 text-2xl font-bold', isDark ? 'text-white' : 'text-slate-900')}>
          {program.title}
        </h3>

        <p
          className={cn(
            'mb-4 line-clamp-2 text-sm',
            isDark ? 'text-gray-300' : 'text-slate-900/80'
          )}
        >
          {program.description}
        </p>

        <div
          className={cn(
            'flex flex-wrap gap-4 text-sm',
            isDark ? 'text-gray-300' : 'text-slate-900/80'
          )}
        >
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {program.schedule}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {program.audience}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div
        className={cn(
          'relative z-10 mt-6 flex items-center justify-between border-t pt-4',
          isDark ? 'border-white/10' : 'border-slate-900/10'
        )}
      >
        {program.instructor ? (
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full',
                isDark ? 'bg-white/20' : 'bg-slate-900/10'
              )}
            >
              <GraduationCap className={cn('h-4 w-4', isDark ? 'text-white' : 'text-slate-900')} />
            </div>
            <span className={cn('text-sm font-medium', isDark ? 'text-white' : 'text-slate-900')}>
              {program.instructor}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full',
                isDark ? 'bg-white/20' : 'bg-slate-900/10'
              )}
            >
              <Users className={cn('h-4 w-4', isDark ? 'text-white' : 'text-slate-900')} />
            </div>
            <span className={cn('text-sm font-bold', isDark ? 'text-white' : 'text-slate-900')}>
              Staff Led
            </span>
          </div>
        )}

        <Button
          asChild
          className={cn(
            'text-sm font-bold transition-colors',
            isDark
              ? 'bg-white text-slate-900 hover:bg-gray-100'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          )}
        >
          <Link href={`/programs/${program.id}/apply` as '/'}>
            {program.ctaText}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
