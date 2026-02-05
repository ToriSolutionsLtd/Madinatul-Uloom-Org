'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Calendar, Clock, GraduationCap } from 'lucide-react';
import { Link } from '@/i18n/routing';

export interface Program {
  id: string;
  title: string;
  description: string;
  ageGroup: string;
  price: string;
  priceUnit?: string;
  schedule: {
    days: string;
    time: string;
  };
  instructor: string;
  capacity: {
    current: number;
    max: number;
  };
  accentColor?: 'primary' | 'orange' | 'secondary' | 'gray';
  isFull?: boolean;
}

interface ProgramCardProps {
  program: Program;
  className?: string;
}

const accentColorMap = {
  primary: 'bg-primary',
  orange: 'bg-orange-400',
  secondary: 'bg-muted-foreground',
  gray: 'bg-gray-400',
};

const progressColorMap = {
  primary: 'bg-primary',
  orange: 'bg-orange-400',
  secondary: 'bg-muted-foreground',
  gray: 'bg-gray-400',
};

export function ProgramCard({ program, className }: ProgramCardProps) {
  const capacityPercentage = (program.capacity.current / program.capacity.max) * 100;
  const accentColor = program.accentColor || 'primary';
  const isFull = program.isFull || capacityPercentage >= 100;

  return (
    <div
      className={cn(
        'bg-card group flex flex-col overflow-hidden rounded-xl border transition-shadow hover:shadow-md',
        isFull && 'opacity-60',
        className
      )}
    >
      {/* Accent Bar */}
      <div className={cn('h-2 w-full', accentColorMap[accentColor])} />

      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className="text-xs font-bold uppercase tracking-wider">
            {program.ageGroup}
          </Badge>
          <span className="text-primary text-sm font-bold">
            {program.price}
            {program.priceUnit && (
              <span className="text-muted-foreground text-xs font-normal">{program.priceUnit}</span>
            )}
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h3
            className={cn(
              'text-foreground mb-2 text-xl font-bold transition-colors',
              !isFull && 'group-hover:text-primary'
            )}
          >
            {program.title}
          </h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">{program.description}</p>
        </div>

        {/* Schedule Info */}
        <div className="mt-2 space-y-2 border-t pt-4">
          <div className="text-foreground flex items-center gap-2 text-sm">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <span>{program.schedule.days}</span>
          </div>
          <div className="text-foreground flex items-center gap-2 text-sm">
            <Clock className="text-muted-foreground h-4 w-4" />
            <span>{program.schedule.time}</span>
          </div>
          <div className="text-foreground flex items-center gap-2 text-sm">
            <GraduationCap className="text-muted-foreground h-4 w-4" />
            <span>{program.instructor}</span>
          </div>
        </div>

        {/* Capacity & CTA */}
        <div className="relative mt-auto pt-4">
          {isFull && (
            <div className="bg-background/50 absolute inset-0 z-10 flex items-center justify-center rounded-lg backdrop-blur-[1px]">
              <span className="rounded bg-red-500 px-3 py-1 text-xs font-bold uppercase text-white shadow-sm">
                Class Full
              </span>
            </div>
          )}

          <div className="text-muted-foreground mb-1 flex justify-between text-xs font-medium">
            <span>Capacity</span>
            <span>
              {program.capacity.current}/{program.capacity.max}
            </span>
          </div>

          <Progress
            value={capacityPercentage}
            className="mb-4 h-1.5"
            indicatorClassName={cn(isFull ? 'bg-red-500' : progressColorMap[accentColor])}
          />

          <Button
            variant="outline"
            className={cn(
              'border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full border-2 font-bold transition-all',
              isFull &&
                'border-muted-foreground text-muted-foreground hover:text-muted-foreground cursor-not-allowed hover:bg-transparent'
            )}
            disabled={isFull}
            asChild={!isFull}
          >
            {isFull ? (
              <span>Enroll Now</span>
            ) : (
              <Link href={`/programs/${program.id}/enroll` as '/'}>Enroll Now</Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
