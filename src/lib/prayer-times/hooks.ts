/**
 * Prayer Times Custom Hooks
 * React Query integration for prayer times data
 *
 * OPTIMIZATIONS:
 * - Stale-while-revalidate pattern for instant rendering
 * - Lazy geolocation with cached fallback
 * - Request deduplication via query key
 * - Smart refetch intervals
 * - Visibility-based countdown pause
 */

'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  fetchPrayerTimes,
  formatCountdown,
  getCachedPrayerTimesSync,
  getCurrentAndNextPrayer,
  getStalePrayerTimes,
} from './api';
import { locationCache, prayerTimesCache } from './cache';
import type { LocationInfo, PrayerName, PrayerTimesConfig, PrayerTimesData } from './types';
import { AsrSchool, CalculationMethod } from './types';

// Default config for North America (ISNA method)
const DEFAULT_CONFIG: PrayerTimesConfig = {
  calculationMethod: CalculationMethod.ISNA,
  school: AsrSchool.STANDARD,
  timeFormat: '12h',
  showHijriDate: true,
  showCountdown: true,
  showIqamaTimes: true,
};

// Internal state type for geolocation hook
interface GeoState {
  location: LocationInfo | null;
  loading: boolean;
  error: string | null;
}

// Query key factory
export const prayerTimesKeys = {
  all: ['prayerTimes'] as const,
  byLocation: (lat: number, lon: number, date: string) =>
    [...prayerTimesKeys.all, 'location', lat, lon, date] as const,
};

/**
 * Hook to manage geolocation state with lazy loading
 * Uses cached location immediately, updates only if significantly different
 */
export function useGeolocation() {
  // Initialize with cached location IMMEDIATELY (no loading state)
  const [state, setState] = useState<GeoState>(() => {
    const cached = locationCache.get();
    return {
      location: cached,
      loading: false,
      error: null,
    };
  });

  const requestLocation = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      // Dynamic import to avoid blocking initial render
      const { getCurrentLocation } = await import('./api');
      const location = await getCurrentLocation();

      const newLocation: LocationInfo = {
        latitude: location.latitude,
        longitude: location.longitude,
        city: location.city,
        country: location.country,
      };

      // Only update if location changed significantly (>5km)
      if (locationCache.hasChangedSignificantly(newLocation)) {
        locationCache.set(newLocation);
        setState({
          location: newLocation,
          loading: false,
          error: null,
        });
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
        }));
      }

      return newLocation;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to get location';
      setState((prev) => ({
        ...prev,
        loading: false,
        error: message,
      }));
      throw error;
    }
  }, []);

  const setManualLocation = useCallback(
    (latitude: number, longitude: number, city?: string, country?: string) => {
      const newLocation = { latitude, longitude, city, country };
      locationCache.set(newLocation);
      setState({
        location: newLocation,
        loading: false,
        error: null,
      });
    },
    []
  );

  const clearLocation = useCallback(() => {
    setState({
      location: null,
      loading: false,
      error: null,
    });
  }, []);

  // Background geolocation update (doesn't block UI)
  useEffect(() => {
    if (typeof window === 'undefined' || !state.location) return;

    const timeoutId = setTimeout(() => {
      requestLocation().catch(() => {
        // Silent fail - cached location is good enough
      });
    }, 3000); // Wait 3s before background update

    return () => clearTimeout(timeoutId);
  }, [requestLocation, state.location]);

  return {
    ...state,
    requestLocation,
    setManualLocation,
    clearLocation,
  };
}

// Extended config type for the hook
interface PrayerTimesHookConfig extends Partial<PrayerTimesConfig> {
  showSunrise?: boolean;
  highlightCurrent?: boolean;
}

/**
 * Main prayer times hook with React Query and stale-while-revalidate
 *
 * Performance optimizations:
 * - Returns cached data immediately (no loading spinner)
 * - Fetches fresh data in background
 * - Long staleTime (6 hours) to minimize refetches
 * - placeholderData from cache for instant rendering
 */
export function usePrayerTimes(config: PrayerTimesHookConfig = {}) {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  const geolocation = useGeolocation();

  // Get today's date string for cache key
  const today = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);

  // Get cached data synchronously for instant rendering
  const initialData = useMemo(() => {
    if (!geolocation.location) return undefined;

    // Try sync cache first (fastest)
    const syncCached = getCachedPrayerTimesSync(
      geolocation.location.latitude,
      geolocation.location.longitude,
      mergedConfig.calculationMethod
    );
    if (syncCached) return syncCached;

    // Try stale cache (allows any cached data)
    const stale = getStalePrayerTimes(
      geolocation.location.latitude,
      geolocation.location.longitude,
      mergedConfig.calculationMethod
    );
    return stale?.data;
  }, [geolocation.location, mergedConfig.calculationMethod]);

  // Fetch prayer times when we have location
  const query = useQuery<PrayerTimesData, Error>({
    queryKey: geolocation.location
      ? prayerTimesKeys.byLocation(
          geolocation.location.latitude,
          geolocation.location.longitude,
          today
        )
      : prayerTimesKeys.all,
    queryFn: async () => {
      if (!geolocation.location) {
        throw new Error('No location available');
      }
      return fetchPrayerTimes(
        geolocation.location.latitude,
        geolocation.location.longitude,
        mergedConfig.calculationMethod,
        mergedConfig.school
      );
    },
    enabled: !!geolocation.location,
    // PERFORMANCE: Long stale time - data only changes once per day
    staleTime: 6 * 60 * 60 * 1000, // 6 hours
    gcTime: 24 * 60 * 60 * 1000, // Keep in cache for 24 hours
    // PERFORMANCE: Use cached data as placeholder for instant render
    placeholderData: initialData,
    // Retry with exponential backoff
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    // Don't refetch on window focus for prayer times
    refetchOnWindowFocus: false,
    // Refetch once per hour to keep times updated
    refetchInterval: 60 * 60 * 1000,
  });

  return {
    data: query.data,
    isLoading: query.isLoading && !query.data, // Only show loading if no data
    isError: query.isError && !query.data, // Only show error if no fallback data
    error: query.error?.message || geolocation.error,
    refetch: query.refetch,
    geolocation,
    config: mergedConfig,
    // New: indicate if showing stale data
    isStale: query.isPlaceholderData || (query.isStale && !!query.data),
  };
}

/**
 * Hook for countdown to next prayer
 * OPTIMIZATION: Pauses when tab is hidden to save CPU
 */
export function useCountdown(prayers: PrayerTimesData['prayers'] | undefined) {
  const [countdown, setCountdown] = useState<{
    current: PrayerName | null;
    next: PrayerName | null;
    nextTime: Date | null;
    timeUntilNext: number;
    formatted: { hours: string; minutes: string; seconds: string };
  }>({
    current: null,
    next: null,
    nextTime: null,
    timeUntilNext: 0,
    formatted: { hours: '00', minutes: '00', seconds: '00' },
  });

  // Track if document is visible
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === 'visible';
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!prayers || prayers.length === 0) return;

    const updateCountdown = () => {
      // Skip updates when tab is hidden (save CPU)
      if (!isVisibleRef.current) return;

      const result = getCurrentAndNextPrayer(prayers);
      setCountdown({
        ...result,
        formatted: formatCountdown(result.timeUntilNext),
      });
    };

    // Initial update
    updateCountdown();

    // Update every second (only when visible)
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [prayers]);

  return countdown;
}

/**
 * Hook for detecting current prayer time
 */
export function useCurrentPrayer(prayers: PrayerTimesData['prayers'] | undefined) {
  const countdown = useCountdown(prayers);
  return {
    current: countdown.current,
    next: countdown.next,
  };
}

/**
 * Hook for Hijri date
 */
export function useHijriDate(data: PrayerTimesData | undefined) {
  return useMemo(() => {
    if (!data?.date.hijri) return null;

    const { day, month, year, weekday } = data.date.hijri;

    return {
      day,
      month: month.en,
      monthArabic: month.ar,
      monthNumber: month.number,
      year,
      weekday: weekday.en,
      weekdayArabic: weekday.ar,
      formatted: `${day} ${month.en} ${year} AH`,
      formattedArabic: `${day} ${month.ar} ${year} هـ`,
    };
  }, [data]);
}

/**
 * Combined hook for full prayer times widget functionality
 * This is the main hook for the widget component
 */
export function usePrayerTimesWidget(config: PrayerTimesHookConfig = {}) {
  const prayerTimes = usePrayerTimes(config);
  const countdown = useCountdown(prayerTimes.data?.prayers);
  const hijriDate = useHijriDate(prayerTimes.data);

  return {
    // Data
    prayers: prayerTimes.data?.prayers,
    date: prayerTimes.data?.date,
    location: prayerTimes.data?.location,
    meta: prayerTimes.data?.meta,
    hijriDate,

    // Countdown
    countdown,
    currentPrayer: countdown.current,
    nextPrayer: countdown.next,

    // Loading states
    isLoading: prayerTimes.isLoading,
    isError: prayerTimes.isError,
    error: prayerTimes.error,
    isStale: prayerTimes.isStale,

    // Actions
    refetch: prayerTimes.refetch,
    requestLocation: prayerTimes.geolocation.requestLocation,
    setManualLocation: prayerTimes.geolocation.setManualLocation,

    // Geolocation state
    hasLocation: !!prayerTimes.geolocation.location,
    locationLoading: prayerTimes.geolocation.loading,

    // Config
    config: prayerTimes.config,
  };
}

/**
 * Hook for prefetching prayer times (use on parent routes)
 */
export function usePrefetchPrayerTimes() {
  const queryClient = useQueryClient();

  const prefetch = useCallback(
    async (location: LocationInfo) => {
      const today = new Date();
      const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

      await queryClient.prefetchQuery({
        queryKey: prayerTimesKeys.byLocation(location.latitude, location.longitude, dateStr),
        queryFn: () =>
          fetchPrayerTimes(location.latitude, location.longitude, CalculationMethod.ISNA),
        staleTime: 6 * 60 * 60 * 1000,
      });
    },
    [queryClient]
  );

  return prefetch;
}

/**
 * Hook for cache statistics (debugging/monitoring)
 */
export function useCacheStats() {
  const [stats, setStats] = useState(() => prayerTimesCache.getStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prayerTimesCache.getStats());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return stats;
}
