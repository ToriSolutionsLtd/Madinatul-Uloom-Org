'use client';

import type { PrayerName, PrayerTime } from '@/lib/prayer-times';
import { formatPrayerTime, usePrayerTimesWidget } from '@/lib/prayer-times';
import {
  AlertCircle,
  Calendar,
  Loader2,
  MapPin,
  Moon,
  RefreshCw,
  Sun,
  Timer,
  Wifi,
} from 'lucide-react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

// Iqamah offsets (minutes after adhan) - can be configured per mosque
const IQAMAH_OFFSETS: Record<PrayerName, number | string> = {
  fajr: 30,
  sunrise: '-',
  dhuhr: 15,
  asr: 15,
  maghrib: '+5m',
  isha: 15,
};

// Prayer icons for visual enhancement
const PRAYER_ICONS: Record<PrayerName, typeof Moon | typeof Sun> = {
  fajr: Moon,
  sunrise: Sun,
  dhuhr: Sun,
  asr: Sun,
  maghrib: Moon,
  isha: Moon,
};

export function PrayerTimesWidget() {
  const [mounted, setMounted] = useState(false);

  const {
    prayers,
    date,
    countdown,
    currentPrayer,
    nextPrayer,
    isLoading,
    isError,
    error,
    hasLocation,
    locationLoading,
    requestLocation,
    location,
    config,
    isStale,
  } = usePrayerTimesWidget({
    showSunrise: true,
    timeFormat: '12h',
  });

  const gregorianDate = useMemo(() => {
    if (!date?.gregorian) return null;
    const { weekday, month, day, year } = date.gregorian;
    return `${weekday}, ${month} ${day}, ${year}`;
  }, [date]);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-request location on first mount if no location saved
  useEffect(() => {
    if (mounted && !hasLocation && !locationLoading && !isError) {
      requestLocation().catch(() => {
        // Silent fail - user can manually request
      });
    }
  }, [mounted, hasLocation, locationLoading, isError, requestLocation]);

  const handleRequestLocation = useCallback(async () => {
    try {
      await requestLocation();
    } catch {
      // Error will be shown in UI
    }
  }, [requestLocation]);

  // Memoize iqamah time calculation
  const getIqamahTime = useCallback((prayer: PrayerTime): string => {
    const offset = IQAMAH_OFFSETS[prayer.key];
    if (typeof offset === 'string') return offset;
    if (typeof offset === 'number' && offset > 0) {
      const parts = prayer.time.split(':').map(Number);
      const hours = parts[0] ?? 0;
      const minutes = parts[1] ?? 0;
      const totalMinutes = hours * 60 + minutes + offset;
      const iqamaHours = Math.floor(totalMinutes / 60) % 24;
      const iqamaMins = totalMinutes % 60;
      const hour12 = iqamaHours % 12 || 12;
      return `${hour12}:${iqamaMins.toString().padStart(2, '0')}`;
    }
    return '-';
  }, []);

  // Memoize display prayers filtering
  const displayPrayers = useMemo(() => {
    if (!prayers) return [];
    return config.showSunrise ? prayers : prayers.filter((p) => p.key !== 'sunrise');
  }, [prayers, config.showSunrise]);

  // Memoize next prayer data
  const nextPrayerData = useMemo(
    () => prayers?.find((p) => p.key === nextPrayer),
    [prayers, nextPrayer]
  );

  // Loading state - only shown when NO cached data
  if (!mounted) {
    return (
      <section className="relative z-20 mx-auto -mt-24 w-full max-w-[1280px] px-4 sm:-mt-32 sm:px-6 lg:px-8">
        <PrayerTimesLoadingCard />
      </section>
    );
  }

  // No location yet - prompt user (only if no cached data)
  if (!hasLocation && !isLoading && !prayers) {
    return (
      <section className="relative z-20 mx-auto -mt-24 w-full max-w-[1280px] px-4 sm:-mt-32 sm:px-6 lg:px-8">
        <PrayerTimesLocationPrompt
          onRequestLocation={handleRequestLocation}
          loading={locationLoading}
          error={error}
        />
      </section>
    );
  }

  // Loading state - only show if no cached data available
  if (isLoading && !prayers) {
    return (
      <section className="relative z-20 mx-auto -mt-24 w-full max-w-[1280px] px-4 sm:-mt-32 sm:px-6 lg:px-8">
        <PrayerTimesLoadingCard />
      </section>
    );
  }

  // Error state - only show if no fallback data
  if (isError && !prayers) {
    return (
      <section className="relative z-20 mx-auto -mt-24 w-full max-w-[1280px] px-4 sm:-mt-32 sm:px-6 lg:px-8">
        <PrayerTimesErrorCard error={error} onRetry={handleRequestLocation} />
      </section>
    );
  }

  // Should not reach here if no prayers
  if (!prayers || displayPrayers.length === 0) {
    return (
      <section className="relative z-20 mx-auto -mt-24 w-full max-w-[1280px] px-4 sm:-mt-32 sm:px-6 lg:px-8">
        <PrayerTimesLoadingCard />
      </section>
    );
  }

  return (
    <section className="relative z-20 mx-auto -mt-24 w-full max-w-[1280px] px-4 sm:-mt-32 sm:px-6 lg:px-8">
      <div className="border-border bg-card overflow-hidden rounded-xl border shadow-xl">
        {/* Top Status Bar */}
        <div className="border-primary/10 bg-primary/5 dark:bg-primary/10 flex flex-wrap items-center justify-between gap-4 border-b px-6 py-4">
          <div className="text-primary flex items-center gap-2 font-bold">
            <Timer className="h-5 w-5" />
            <span>
              Next: <span className="capitalize">{nextPrayerData?.name || 'Fajr'}</span>
            </span>
          </div>

          {/* Countdown Timer - Memoized component */}
          <CountdownDisplay countdown={countdown} />

          <div className="text-muted-foreground hidden items-center gap-4 text-sm font-medium sm:flex">
            {/* Stale data indicator */}
            {isStale && (
              <span className="flex items-center gap-1.5 text-yellow-600 dark:text-yellow-500">
                <Wifi className="h-4 w-4" />
                Updating...
              </span>
            )}

            {/* Gregorian Date */}
            {gregorianDate && (
              <span className="flex items-center gap-1.5">
                <Calendar className="text-primary/70 h-4 w-4" />
                {gregorianDate}
              </span>
            )}

            {/* Location */}
            {location?.city && (
              <span className="flex items-center gap-1.5">
                <MapPin className="text-primary/70 h-4 w-4" />
                {location.city}
              </span>
            )}
          </div>
        </div>

        {/* Prayer Grid - Memoized */}
        <PrayerGrid
          prayers={displayPrayers}
          currentPrayer={currentPrayer}
          nextPrayer={nextPrayer}
          timeFormat={config.timeFormat}
          getIqamahTime={getIqamahTime}
        />

        {/* Mobile Date & Location */}
        <div className="border-border text-muted-foreground flex items-center justify-center gap-4 border-t px-4 py-3 text-xs sm:hidden">
          {gregorianDate && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {gregorianDate}
            </span>
          )}
          {location?.city && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {location.city}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

// Memoized countdown display component
const CountdownDisplay = memo(function CountdownDisplay({
  countdown,
}: {
  countdown: { formatted: { hours: string; minutes: string; seconds: string } };
}) {
  return (
    <div className="text-foreground flex items-center gap-1 font-mono text-lg font-bold">
      <span className="bg-background rounded px-2 py-1 shadow-sm dark:bg-black/20">
        {countdown.formatted.hours}
      </span>
      <span className="text-primary animate-pulse">:</span>
      <span className="bg-background rounded px-2 py-1 shadow-sm dark:bg-black/20">
        {countdown.formatted.minutes}
      </span>
      <span className="text-primary animate-pulse">:</span>
      <span className="bg-background rounded px-2 py-1 shadow-sm dark:bg-black/20">
        {countdown.formatted.seconds}
      </span>
    </div>
  );
});

// Memoized prayer grid component
const PrayerGrid = memo(function PrayerGrid({
  prayers,
  currentPrayer,
  nextPrayer,
  timeFormat,
  getIqamahTime,
}: {
  prayers: PrayerTime[];
  currentPrayer: PrayerName | null;
  nextPrayer: PrayerName | null;
  timeFormat: '12h' | '24h';
  getIqamahTime: (prayer: PrayerTime) => string;
}) {
  return (
    <div
      className={`divide-border grid grid-cols-2 divide-x divide-y sm:grid-cols-3 ${prayers.length === 6 ? 'md:grid-cols-6' : 'md:grid-cols-5'} md:divide-y-0`}
    >
      {prayers.map((prayer) => (
        <PrayerCell
          key={prayer.key}
          prayer={prayer}
          isNext={prayer.key === nextPrayer}
          isCurrent={prayer.key === currentPrayer}
          timeFormat={timeFormat}
          iqamahTime={getIqamahTime(prayer)}
        />
      ))}
    </div>
  );
});

// Memoized individual prayer cell
const PrayerCell = memo(function PrayerCell({
  prayer,
  isNext,
  isCurrent,
  timeFormat,
  iqamahTime,
}: {
  prayer: PrayerTime;
  isNext: boolean;
  isCurrent: boolean;
  timeFormat: '12h' | '24h';
  iqamahTime: string;
}) {
  const Icon = PRAYER_ICONS[prayer.key];
  const isHighlighted = isNext;

  return (
    <div
      className={`group relative flex flex-col items-center justify-center gap-1.5 p-6 transition-all duration-300 ${
        isHighlighted
          ? 'bg-primary text-white'
          : isCurrent
            ? 'bg-primary/10 dark:bg-primary/20'
            : 'hover:bg-muted/50'
      }`}
    >
      {/* Highlight pulse effect */}
      {isHighlighted && (
        <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
      )}

      {/* Prayer icon */}
      <Icon className={`mb-1 h-4 w-4 ${isHighlighted ? 'text-white/80' : 'text-primary/50'}`} />

      {/* Prayer name */}
      <span
        className={`text-xs font-semibold uppercase tracking-wider ${
          isHighlighted ? 'text-white/90' : 'text-muted-foreground'
        }`}
      >
        {prayer.name}
      </span>

      {/* Prayer time */}
      <span className="text-xl font-bold">{formatPrayerTime(prayer.time, timeFormat)}</span>

      {/* Arabic name */}
      <span
        className={`font-arabic text-sm ${
          isHighlighted ? 'text-white/70' : 'text-muted-foreground/50'
        }`}
      >
        {prayer.nameArabic}
      </span>

      {/* Iqamah time */}
      {prayer.key !== 'sunrise' && (
        <span className={`text-xs ${isHighlighted ? 'text-white/80' : 'text-muted-foreground/60'}`}>
          Iqamah: {iqamahTime}
        </span>
      )}

      {/* Next prayer badge */}
      {isHighlighted && (
        <span className="absolute right-2 top-2 rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-bold uppercase">
          Next
        </span>
      )}
    </div>
  );
});

// Loading skeleton - Memoized
const PrayerTimesLoadingCard = memo(function PrayerTimesLoadingCard() {
  return (
    <div className="border-border bg-card overflow-hidden rounded-xl border shadow-xl">
      <div className="border-primary/10 bg-primary/5 dark:bg-primary/10 flex items-center justify-center gap-3 border-b px-6 py-4">
        <Loader2 className="text-primary h-5 w-5 animate-spin" />
        <span className="text-muted-foreground font-medium">Loading prayer times...</span>
      </div>
      <div className="divide-border grid grid-cols-2 divide-x divide-y sm:grid-cols-3 md:grid-cols-6 md:divide-y-0">
        {['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'].map((key) => (
          <div key={key} className="flex flex-col items-center justify-center gap-2 p-6">
            <div className="bg-muted h-3 w-12 animate-pulse rounded" />
            <div className="bg-muted h-6 w-16 animate-pulse rounded" />
            <div className="bg-muted h-2 w-10 animate-pulse rounded" />
          </div>
        ))}
      </div>
    </div>
  );
});

// Location prompt - Memoized
const PrayerTimesLocationPrompt = memo(function PrayerTimesLocationPrompt({
  onRequestLocation,
  loading,
  error,
}: {
  onRequestLocation: () => void;
  loading: boolean;
  error: string | null;
}) {
  return (
    <div className="border-border bg-card overflow-hidden rounded-xl border shadow-xl">
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-12 text-center">
        <div className="bg-primary/10 rounded-full p-4">
          <MapPin className="text-primary h-8 w-8" />
        </div>
        <div>
          <h3 className="text-foreground text-lg font-semibold">Enable Location</h3>
          <p className="text-muted-foreground mt-1 max-w-md text-sm">
            Allow location access to see accurate prayer times for your area, or enter your city
            manually.
          </p>
        </div>
        {error && (
          <div className="text-destructive flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}
        <button
          onClick={onRequestLocation}
          disabled={loading}
          className="bg-primary hover:bg-primary/90 disabled:bg-primary/50 inline-flex items-center gap-2 rounded-lg px-6 py-2.5 font-medium text-white transition-colors disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Detecting location...
            </>
          ) : (
            <>
              <MapPin className="h-4 w-4" />
              Use My Location
            </>
          )}
        </button>
      </div>
    </div>
  );
});

// Error card
// Error card - Memoized
const PrayerTimesErrorCard = memo(function PrayerTimesErrorCard({
  error,
  onRetry,
}: {
  error: string | null;
  onRetry: () => void;
}) {
  return (
    <div className="border-border bg-card overflow-hidden rounded-xl border shadow-xl">
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-12 text-center">
        <div className="bg-destructive/10 rounded-full p-4">
          <AlertCircle className="text-destructive h-8 w-8" />
        </div>
        <div>
          <h3 className="text-foreground text-lg font-semibold">Unable to Load Prayer Times</h3>
          <p className="text-muted-foreground mt-1 max-w-md text-sm">
            {error || 'There was an error loading prayer times. Please try again.'}
          </p>
        </div>
        <button
          onClick={onRetry}
          className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-2.5 font-medium text-white transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    </div>
  );
});

// Keep the old component for backwards compatibility
export function PrayerTimesCard() {
  return <PrayerTimesWidget />;
}
