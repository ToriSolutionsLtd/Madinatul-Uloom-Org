'use client';

import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

interface SemesterDate {
  label: string;
  date: string;
  color: 'primary' | 'orange';
}

interface SemesterInfoProps {
  semester: string;
  status: string;
  dates: SemesterDate[];
}

const colorMap = {
  primary: 'bg-primary',
  orange: 'bg-orange-400',
};

export function SemesterInfo({ semester, status, dates }: SemesterInfoProps) {
  return (
    <div className="bg-card relative overflow-hidden rounded-xl border p-6 shadow-sm">
      {/* Background Icon */}
      <div className="absolute right-0 top-0 p-4 opacity-5">
        <Calendar className="h-24 w-24" />
      </div>

      <div className="relative z-10">
        <h3 className="text-foreground mb-1 text-lg font-bold">{semester}</h3>
        <p className="text-primary mb-4 text-sm font-medium">{status}</p>
      </div>

      <div className="relative z-10 space-y-4">
        {dates.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`mt-2 h-2 w-2 rounded-full ${colorMap[item.color]}`} />
            <div>
              <p className="text-muted-foreground text-xs font-bold uppercase">{item.label}</p>
              <p className="text-foreground font-bold">{item.date}</p>
            </div>
          </div>
        ))}
      </div>

      <Button variant="link" className="text-primary mt-6 h-auto p-0 text-sm font-bold" asChild>
        <Link href="/programs/calendar">
          View Full Academic Calendar
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
