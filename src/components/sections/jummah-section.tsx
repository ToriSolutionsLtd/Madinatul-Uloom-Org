'use client';

import { Building2 } from 'lucide-react';

interface JummahTime {
  label: string;
  sublabel: string;
  time: string;
  khatib: string;
}

const jummahTimes: JummahTime[] = [
  {
    label: 'First Jammat',
    sublabel: 'Khutbah Starts',
    time: '1:00 PM',
    khatib: 'Sh. Ahmed Ali',
  },
  {
    label: 'Second Jammat',
    sublabel: 'Khutbah Starts',
    time: '2:00 PM',
    khatib: 'Mufti Ibrahim',
  },
];

export function JummahSection() {
  return (
    <div className="border-border bg-card flex flex-1 flex-col justify-center rounded-xl border p-8 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-primary/10 text-primary rounded-full p-3">
          <Building2 className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-bold">Jummah Prayers</h2>
      </div>

      <div className="space-y-4">
        {jummahTimes.map((jamaat, index) => (
          <div
            key={index}
            className="border-border bg-background/50 dark:bg-background/30 flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <p className="text-lg font-bold">{jamaat.label}</p>
              <p className="text-muted-foreground text-sm">{jamaat.sublabel}</p>
            </div>
            <div className="text-right">
              <p className="text-primary text-lg font-bold">{jamaat.time}</p>
              <p className="text-muted-foreground text-sm">{jamaat.khatib}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
