/**
 * Prayer Times Module
 * Re-exports all prayer times related functionality
 *
 * Performance Features:
 * - Multi-layer caching (memory, localStorage, IndexedDB)
 * - Request deduplication
 * - Stale-while-revalidate pattern
 * - Smart pre-fetching
 * - Lazy geolocation
 */

// Types
export * from './types';

// Cache utilities (for advanced usage)
export { locationCache, prayerTimesCache, type CacheEntry, type CacheStats } from './cache';

// API Functions
export {
  clearPrayerTimesCache,
  fetchPrayerTimes,
  fetchPrayerTimesByCity,
  formatCountdown,
  formatPrayerTime,
  getCacheStats,
  getCachedPrayerTimesSync,
  getCurrentAndNextPrayer,
  getCurrentLocation,
  getStalePrayerTimes,
} from './api';

// Hooks
export {
  prayerTimesKeys,
  useCacheStats,
  useCountdown,
  useCurrentPrayer,
  useGeolocation,
  useHijriDate,
  usePrayerTimes,
  usePrayerTimesWidget,
  usePrefetchPrayerTimes,
} from './hooks';
