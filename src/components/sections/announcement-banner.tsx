'use client';

import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

interface AnnouncementBannerProps {
  message?: string;
  type?: 'warning' | 'info' | 'success';
}

export function AnnouncementBanner({
  message = 'Weather Alert: Mosque closed for Fajr due to heavy snow. Reopening for Dhuhr.',
  type = 'warning',
}: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const bgColors = {
    warning: 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800/30',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/30',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800/30',
  };

  const textColors = {
    warning: 'text-red-800 dark:text-red-200',
    info: 'text-blue-800 dark:text-blue-200',
    success: 'text-green-800 dark:text-green-200',
  };

  const iconColors = {
    warning: 'text-red-600 dark:text-red-400',
    info: 'text-blue-600 dark:text-blue-400',
    success: 'text-green-600 dark:text-green-400',
  };

  const dismissColors = {
    warning: 'text-red-700 hover:text-red-900 dark:text-red-300 dark:hover:text-red-100',
    info: 'text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100',
    success: 'text-green-700 hover:text-green-900 dark:text-green-300 dark:hover:text-green-100',
  };

  return (
    <div className={`${bgColors[type]} border-b`}>
      <div className="mx-auto max-w-[1280px] px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className={`flex items-center gap-3 ${textColors[type]}`}>
            <AlertTriangle className={`h-5 w-5 shrink-0 ${iconColors[type]}`} />
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className={`flex items-center gap-1 text-sm font-semibold ${dismissColors[type]}`}
            aria-label="Dismiss announcement"
          >
            <span>Dismiss</span>
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
