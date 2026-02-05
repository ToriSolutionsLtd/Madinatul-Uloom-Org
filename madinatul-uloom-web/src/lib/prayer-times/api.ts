/**
 * Prayer Times API Service
 * Integration with UmmahAPI via local proxy
 *
 * OPTIMIZATIONS:
 * - Multi-layer caching (memory, localStorage, IndexedDB)
 * - Request deduplication to prevent parallel fetches
 * - Smart pre-fetching for tomorrow's times
 * - Stale-while-revalidate pattern support
 * - Lazy geolocation with cached fallback
 */

import { prayerTimesCache } from './cache';
import type {
  LocationInfo,
  PrayerName,
  PrayerTime,
  PrayerTimesData,
  UmmahAPIResponse,
} from './types';
import { AsrSchool, CalculationMethod } from './types';

// Arabic names for prayers
const PRAYER_NAMES_ARABIC: Record<PrayerName, string> = {
  fajr: 'الفجر',
  sunrise: 'الشروق',
  dhuhr: 'الظهر',
  asr: 'العصر',
  maghrib: 'المغرب',
  isha: 'العشاء',
};

const PRAYER_ORDER: PrayerName[] = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

// Fetch options type
interface FetchOptions {
  /** Skip cache lookup and force fresh fetch */
  forceRefresh?: boolean;
  /** Silent mode - don't throw errors, return null */
  silent?: boolean;
  /** AbortSignal for cancellation */
  signal?: AbortSignal;
}

/**
 * Fetch prayer times with multi-layer caching and request deduplication
 *
 * Cache lookup order:
 * 1. Memory cache (instant, 0ms)
 * 2. localStorage (very fast, <5ms)
 * 3. IndexedDB (fast, <20ms)
 * 4. API call (slow, 500-2000ms)
 */
export async function fetchPrayerTimes(
  latitude: number,
  longitude: number,
  method: CalculationMethod = CalculationMethod.ISNA,
  school: AsrSchool = AsrSchool.STANDARD,
  date?: Date,
  options: FetchOptions = {}
): Promise<PrayerTimesData> {
  const { forceRefresh = false, silent = false, signal } = options;

  const targetDate = date || new Date();
  const dateStr = formatDateForAPI(targetDate);
  const cacheKey = prayerTimesCache.generateKey(latitude, longitude, dateStr, method);

  // 1. Check cache first (unless forcing refresh)
  if (!forceRefresh) {
    const cached = await prayerTimesCache.get(cacheKey);
    if (cached) {
      // Trigger background refresh if data is older than 4 hours
      if (Date.now() - cached.timestamp > 4 * 60 * 60 * 1000) {
        refreshInBackground(latitude, longitude, method, school, targetDate, cacheKey);
      }
      return cached.data;
    }
  }

  // 2. Check for in-flight request (deduplication)
  const inflight = prayerTimesCache.getInflightRequest(cacheKey);
  if (inflight) {
    return inflight;
  }

  // 3. Make API request with deduplication
  const fetchPromise = fetchFromAPI(latitude, longitude, method, school, dateStr, signal);
  prayerTimesCache.setInflightRequest(cacheKey, fetchPromise);

  try {
    const data = await fetchPromise;

    // Cache the result
    await prayerTimesCache.set(
      cacheKey,
      data,
      { latitude, longitude },
      prayerTimesCache.formatDate(targetDate),
      method
    );

    // Pre-fetch tomorrow's times in background
    prefetchTomorrow(latitude, longitude, method, school);

    return data;
  } catch (error) {
    // Try to return stale cache data on error
    const staleCache = prayerTimesCache.getStale(cacheKey);
    if (staleCache) {
      console.warn('[PrayerTimes] Using stale cache due to error:', error);
      return staleCache.data;
    }

    if (silent) {
      console.warn('[PrayerTimes] Silent fetch failed:', error);
      return null as unknown as PrayerTimesData;
    }

    throw error;
  }
}

/**
 * Get cached prayer times synchronously (for instant rendering)
 * Returns null if no cache available - use for stale-while-revalidate
 */
export function getCachedPrayerTimesSync(
  latitude: number,
  longitude: number,
  method: CalculationMethod = CalculationMethod.ISNA,
  date?: Date
): PrayerTimesData | null {
  const targetDate = date || new Date();
  const dateStr = formatDateForAPI(targetDate);
  const cacheKey = prayerTimesCache.generateKey(latitude, longitude, dateStr, method);

  const cached = prayerTimesCache.getSync(cacheKey);
  return cached?.data || null;
}

/**
 * Get any cached prayer times (even stale) for instant rendering
 */
export function getStalePrayerTimes(
  latitude: number,
  longitude: number,
  method: CalculationMethod = CalculationMethod.ISNA,
  date?: Date
): { data: PrayerTimesData; isStale: boolean } | null {
  const targetDate = date || new Date();
  const dateStr = formatDateForAPI(targetDate);
  const cacheKey = prayerTimesCache.generateKey(latitude, longitude, dateStr, method);

  const cached = prayerTimesCache.getStale(cacheKey);
  if (!cached) return null;

  const isStale =
    Date.now() - cached.timestamp > 6 * 60 * 60 * 1000 ||
    cached.date !== prayerTimesCache.formatDate(targetDate);

  return { data: cached.data, isStale };
}

/**
 * Internal: Fetch from Prayer Times API (via local proxy to avoid CORS)
 */
async function fetchFromAPI(
  latitude: number,
  longitude: number,
  method: CalculationMethod,
  school: AsrSchool,
  dateStr: string,
  signal?: AbortSignal
): Promise<PrayerTimesData> {
  // Use local API route to proxy request (avoids CORS issues)
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    method: method.toString(),
    juristic: school.toString(),
  });

  // Use local API route instead of external API directly
  const url = `/api/prayer-times?${params.toString()}`;

  // Create AbortController for timeout if no signal provided
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

  try {
    const fetchOptions: RequestInit = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: signal || controller.signal,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API error: ${response.status} ${response.statusText}`);
    }

    const data: UmmahAPIResponse = await response.json();

    if (!data.success || !data.data) {
      throw new Error(`API returned error: ${data.message || 'No results'}`);
    }

    return transformUmmahResponse(data, { latitude, longitude }, dateStr);
  } catch (error) {
    // Check if it's a network/timeout error
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error(
          'Prayer times API request timed out. Please check your internet connection.'
        );
      }
      if (error.message === 'Failed to fetch') {
        throw new Error(
          'Unable to connect to prayer times service. Please check your internet connection.'
        );
      }
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Refresh cache in background (doesn't block)
 */
function refreshInBackground(
  latitude: number,
  longitude: number,
  method: CalculationMethod,
  school: AsrSchool,
  date: Date,
  cacheKey: string
): void {
  // Don't refresh if already in flight
  if (prayerTimesCache.hasInflightRequest(cacheKey)) return;

  // Use requestIdleCallback if available, otherwise setTimeout
  const scheduleRefresh =
    typeof requestIdleCallback !== 'undefined'
      ? requestIdleCallback
      : (cb: () => void) => setTimeout(cb, 100);

  scheduleRefresh(() => {
    fetchPrayerTimes(latitude, longitude, method, school, date, {
      forceRefresh: true,
      silent: true,
    }).catch(() => {
      // Silent fail for background refresh
    });
  });
}

/**
 * Pre-fetch tomorrow's prayer times
 */
function prefetchTomorrow(
  latitude: number,
  longitude: number,
  method: CalculationMethod,
  school: AsrSchool
): void {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = formatDateForAPI(tomorrow);
  const cacheKey = prayerTimesCache.generateKey(latitude, longitude, tomorrowStr, method);

  // Don't prefetch if already cached or in flight
  if (prayerTimesCache.getSync(cacheKey) || prayerTimesCache.hasInflightRequest(cacheKey)) {
    return;
  }

  // Schedule prefetch with low priority
  const schedulePreFetch =
    typeof requestIdleCallback !== 'undefined'
      ? requestIdleCallback
      : (cb: () => void) => setTimeout(cb, 2000);

  schedulePreFetch(() => {
    fetchPrayerTimes(latitude, longitude, method, school, tomorrow, {
      silent: true,
    }).catch(() => {
      // Silent fail for prefetch
    });
  });
}

/**
 * Clear prayer times cache (all layers)
 */
export async function clearPrayerTimesCache(): Promise<void> {
  await prayerTimesCache.clearAll();
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return prayerTimesCache.getStats();
}

/**
 * Fetch prayer times by city name
 * Uses geocoding to get coordinates, then fetches from Islamic Finder
 */
export async function fetchPrayerTimesByCity(
  city: string,
  country: string,
  method: CalculationMethod = CalculationMethod.ISNA,
  school: AsrSchool = AsrSchool.STANDARD,
  date?: Date
): Promise<PrayerTimesData> {
  // First, geocode the city to get coordinates
  const geocodeUrl = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&format=json&limit=1`;

  const geocodeResponse = await fetch(geocodeUrl, {
    headers: {
      'User-Agent': 'MadinatulUloom/1.0',
    },
  });

  if (!geocodeResponse.ok) {
    throw new Error('Failed to geocode city');
  }

  const geocodeData = await geocodeResponse.json();
  if (!geocodeData || geocodeData.length === 0) {
    throw new Error(`City not found: ${city}, ${country}`);
  }

  const latitude = parseFloat(geocodeData[0].lat);
  const longitude = parseFloat(geocodeData[0].lon);

  // Now fetch prayer times using coordinates
  return fetchPrayerTimes(latitude, longitude, method, school, date);
}

/**
 * Get the user's timezone from browser
 */
function getUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'UTC';
  }
}

/**
 * Convert UTC time string to local time for a specific timezone
 * @param utcTime - Time in UTC format "HH:MM"
 * @param dateStr - Date string "YYYY-MM-DD"
 * @param timezone - IANA timezone name e.g., "Asia/Dhaka"
 * @returns Local time string "HH:MM" in 24-hour format
 */
function convertUTCToLocal(utcTime: string, dateStr: string, timezone: string): string {
  try {
    // Handle empty or invalid time
    if (!utcTime || utcTime === '-') return utcTime;

    // Create full UTC datetime string: "2025-12-24T05:30:00Z"
    const utcDateTimeString = `${dateStr}T${utcTime}:00Z`;
    const utcDate = new Date(utcDateTimeString);

    // Validate the date
    if (isNaN(utcDate.getTime())) {
      console.warn('[TimeConverter] Invalid date:', utcDateTimeString);
      return utcTime;
    }

    // Use Intl.DateTimeFormat for timezone conversion
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    return formatter.format(utcDate);
  } catch (error) {
    console.warn('[TimeConverter] Error converting time:', error);
    return utcTime; // Fallback to original time
  }
}

/**
 * Transform UmmahAPI response to our internal format
 * NOTE: UmmahAPI returns times in UTC, so we convert to user's local timezone.
 */
function transformUmmahResponse(
  response: UmmahAPIResponse,
  location: LocationInfo,
  _dateStr: string
): PrayerTimesData {
  const { data } = response;
  const prayerTimes = data.prayer_times;

  // Parse the API date (YYYY-MM-DD format)
  const apiDate = data.date; // e.g., "2025-12-24"
  const [year, month, day] = apiDate.split('-');

  // Get user's timezone for location info
  const userTimezone = getUserTimezone();

  // Create Date object for weekday calculation (in local time)
  const dateObj = new Date(
    parseInt(year || '2025'),
    parseInt(month || '1') - 1,
    parseInt(day || '1')
  );
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Convert dateStr to DD-MM-YYYY format for timestamp parsing
  const dateForTimestamp = `${day}-${month}-${year}`;

  // Parse times and create prayer objects
  // UmmahAPI returns times in UTC - convert to user's local timezone
  const prayers: PrayerTime[] = PRAYER_ORDER.map((key) => {
    const utcTimeStr = prayerTimes[key as keyof typeof prayerTimes] || '';

    // Convert UTC time to user's local timezone
    const localTimeStr = convertUTCToLocal(utcTimeStr, apiDate, userTimezone);

    return {
      key,
      name: key.charAt(0).toUpperCase() + key.slice(1),
      nameArabic: PRAYER_NAMES_ARABIC[key],
      time: localTimeStr, // Converted to local time
      timestamp: parseTimeToTimestamp(localTimeStr, dateForTimestamp),
    };
  });

  // Calculate approximate Hijri date
  const hijriDate = gregorianToHijri(dateObj);

  return {
    prayers,
    date: {
      gregorian: {
        date: apiDate,
        day: day || '1',
        weekday: weekdays[dateObj.getDay()] || 'Unknown',
        month: months[parseInt(month || '1') - 1] || 'Unknown',
        year: year || '2025',
      },
      hijri: hijriDate,
    },
    location: {
      ...location,
      latitude: data.location.latitude,
      longitude: data.location.longitude,
      timezone: userTimezone,
    },
    meta: {
      method: {
        id: 2,
        name: data.calculation_method || 'ISNA',
      },
      school: data.madhab || 'Standard',
      latitudeAdjustmentMethod: 'angle based',
    },
  };
}

/**
 * Gregorian to Hijri date conversion using JavaScript's Intl API
 * Uses the built-in Islamic (Umm al-Qura) calendar for accurate conversion
 */
function gregorianToHijri(date: Date): {
  date: string;
  day: string;
  weekday: { en: string; ar: string };
  month: { number: number; en: string; ar: string };
  year: string;
} {
  const hijriMonths = [
    { en: 'Muharram', ar: 'محرم' },
    { en: 'Safar', ar: 'صفر' },
    { en: 'Rabi al-Awwal', ar: 'ربيع الأول' },
    { en: 'Rabi al-Thani', ar: 'ربيع الثاني' },
    { en: 'Jumada al-Awwal', ar: 'جمادى الأولى' },
    { en: 'Jumada al-Thani', ar: 'جمادى الثانية' },
    { en: 'Rajab', ar: 'رجب' },
    { en: 'Shaban', ar: 'شعبان' },
    { en: 'Ramadan', ar: 'رمضان' },
    { en: 'Shawwal', ar: 'شوال' },
    { en: 'Dhul Qadah', ar: 'ذو القعدة' },
    { en: 'Dhul Hijjah', ar: 'ذو الحجة' },
  ];

  const hijriWeekdays = [
    { en: 'Al-Ahad', ar: 'الأحد' },
    { en: 'Al-Ithnayn', ar: 'الإثنين' },
    { en: 'Al-Thulatha', ar: 'الثلاثاء' },
    { en: 'Al-Arbia', ar: 'الأربعاء' },
    { en: 'Al-Khamis', ar: 'الخميس' },
    { en: 'Al-Jumah', ar: 'الجمعة' },
    { en: 'Al-Sabt', ar: 'السبت' },
  ];

  // Use Intl.DateTimeFormat with Islamic-Umalqura calendar for accurate Hijri dates
  const dayFormatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
    day: 'numeric',
  });
  const monthFormatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
    month: 'numeric',
  });
  const yearFormatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
    year: 'numeric',
  });

  const hijriDay = parseInt(dayFormatter.format(date), 10);
  const hijriMonth = parseInt(monthFormatter.format(date), 10);
  // Year format returns "1447 AH", extract just the number
  const hijriYearStr = yearFormatter.format(date).replace(/[^\d]/g, '');
  const hijriYear = parseInt(hijriYearStr, 10);

  const monthData = hijriMonths[hijriMonth - 1] ?? hijriMonths[0];
  const weekdayData = hijriWeekdays[date.getDay()] ?? hijriWeekdays[0];

  return {
    date: `${hijriDay}-${hijriMonth}-${hijriYear}`,
    day: hijriDay.toString(),
    weekday: weekdayData!,
    month: {
      number: hijriMonth,
      en: monthData!.en,
      ar: monthData!.ar,
    },
    year: hijriYear.toString(),
  };
}

/**
 * Parse time string to timestamp
 */
function parseTimeToTimestamp(timeStr: string, dateStr: string): number {
  // Parse date in DD-MM-YYYY format
  const [day, month, year] = dateStr.split('-').map(Number);
  // Parse time in HH:MM format (24-hour)
  const [hours, minutes] = timeStr.split(':').map(Number);

  // Use default values if parsing fails
  const safeYear = year ?? new Date().getFullYear();
  const safeMonth = month ?? 1;
  const safeDay = day ?? 1;
  const safeHours = hours ?? 0;
  const safeMinutes = minutes ?? 0;

  const date = new Date(safeYear, safeMonth - 1, safeDay, safeHours, safeMinutes);
  return date.getTime();
}

/**
 * Format date for API request
 */
function formatDateForAPI(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// Legacy storage prefix for backwards compatibility
const STORAGE_PREFIX_LEGACY = 'madinatul_uloom_prayer_times_';

/**
 * Clear legacy prayer times cache
 */
export function clearLegacyPrayerTimesCache(): void {
  if (typeof window === 'undefined') return;
  // Clear old cache format
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(STORAGE_PREFIX_LEGACY)) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
}

/**
 * Get user's current location using browser geolocation
 */
export function getCurrentLocation(): Promise<LocationInfo> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Try to get city name via reverse geocoding
        try {
          const cityInfo = await reverseGeocode(latitude, longitude);
          resolve({
            latitude,
            longitude,
            ...cityInfo,
          });
        } catch {
          resolve({ latitude, longitude });
        }
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(
              new Error(
                'Location permission denied. Please enable location access or enter your city manually.'
              )
            );
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Location information is unavailable.'));
            break;
          case error.TIMEOUT:
            reject(new Error('Location request timed out.'));
            break;
          default:
            reject(new Error('An unknown error occurred while getting location.'));
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
}

/**
 * Reverse geocode coordinates to get city name
 */
async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<{ city?: string; country?: string }> {
  try {
    // Using OpenStreetMap Nominatim (free, no API key needed)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      {
        headers: {
          'User-Agent': 'MadinatulUloom/1.0',
        },
      }
    );

    if (!response.ok) return {};

    const data = await response.json();
    return {
      city:
        data.address?.city || data.address?.town || data.address?.village || data.address?.county,
      country: data.address?.country,
    };
  } catch {
    return {};
  }
}

/**
 * Determine current prayer and next prayer
 */
export function getCurrentAndNextPrayer(prayers: PrayerTime[]): {
  current: PrayerName | null;
  next: PrayerName | null;
  nextTime: Date | null;
  timeUntilNext: number; // milliseconds
} {
  const now = Date.now();
  const actualPrayers = prayers.filter((p) => p.key !== 'sunrise');

  let current: PrayerName | null = null;
  let next: PrayerName | null = null;
  let nextTime: Date | null = null;
  let timeUntilNext = 0;

  // Find current and next prayer
  for (let i = 0; i < actualPrayers.length; i++) {
    const prayer = actualPrayers[i];
    const nextPrayer = actualPrayers[i + 1];

    if (!prayer) continue;

    if (now >= prayer.timestamp) {
      current = prayer.key;
      if (nextPrayer && now < nextPrayer.timestamp) {
        next = nextPrayer.key;
        nextTime = new Date(nextPrayer.timestamp);
        timeUntilNext = nextPrayer.timestamp - now;
        break;
      } else if (!nextPrayer) {
        // After Isha, next is Fajr of tomorrow
        next = 'fajr';
        const fajr = prayers.find((p) => p.key === 'fajr');
        if (fajr) {
          const tomorrow = new Date(fajr.timestamp);
          tomorrow.setDate(tomorrow.getDate() + 1);
          nextTime = tomorrow;
          timeUntilNext = tomorrow.getTime() - now;
        }
      }
    }
  }

  // If before Fajr
  if (!current) {
    const fajr = actualPrayers[0];
    if (fajr && now < fajr.timestamp) {
      current = 'isha'; // Still in Isha from yesterday
      next = 'fajr';
      nextTime = new Date(fajr.timestamp);
      timeUntilNext = fajr.timestamp - now;
    }
  }

  return { current, next, nextTime, timeUntilNext };
}

/**
 * Format time string based on preference
 */
export function formatPrayerTime(time: string, format: '12h' | '24h'): string {
  if (!time || time === '-') return time;

  const parts = time.split(':').map(Number);
  const hours = parts[0] ?? 0;
  const minutes = parts[1] ?? 0;

  if (format === '24h') {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * Format countdown time
 */
export function formatCountdown(milliseconds: number): {
  hours: string;
  minutes: string;
  seconds: string;
} {
  if (milliseconds <= 0) {
    return { hours: '00', minutes: '00', seconds: '00' };
  }

  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
  };
}
