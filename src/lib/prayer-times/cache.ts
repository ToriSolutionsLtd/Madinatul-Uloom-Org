/**
 * Multi-Layer Prayer Times Cache
 *
 * Implements a sophisticated caching system with:
 * - Layer 1: Memory cache (instant, 0ms)
 * - Layer 2: localStorage (very fast, <5ms)
 * - Layer 3: IndexedDB (fast, <20ms, persistent)
 *
 * Features:
 * - Request deduplication (prevents parallel fetches)
 * - Smart cache keys (location + date + method)
 * - Stale-while-revalidate pattern support
 * - Graceful degradation on storage errors
 * - Pre-fetching support for tomorrow's times
 */

import type { LocationInfo, PrayerTimesData } from './types';

// Constants
const STORAGE_PREFIX = 'mu_prayer_';
const INDEXEDDB_NAME = 'madinatul_uloom_prayer_times';
const INDEXEDDB_VERSION = 1;
const INDEXEDDB_STORE = 'prayer_times';

// Cache duration constants
const CACHE_DURATION = {
  MEMORY: 24 * 60 * 60 * 1000, // 24 hours
  LOCAL_STORAGE: 7 * 24 * 60 * 60 * 1000, // 7 days
  INDEXED_DB: 30 * 24 * 60 * 60 * 1000, // 30 days
} as const;

// Cache entry interface
export interface CacheEntry {
  data: PrayerTimesData;
  timestamp: number;
  location: LocationInfo;
  date: string; // YYYY-MM-DD format
  method: number;
  expiresAt: number;
}

// Cache statistics for monitoring
export interface CacheStats {
  hits: number;
  misses: number;
  hitRate: number;
  memoryHits: number;
  localStorageHits: number;
  indexedDBHits: number;
}

/**
 * Multi-Layer Cache Manager
 */
class PrayerTimesCacheManager {
  // Layer 1: Memory cache (Map for O(1) lookups)
  private memoryCache = new Map<string, CacheEntry>();

  // Request deduplication: Track in-flight requests
  private inflightRequests = new Map<string, Promise<PrayerTimesData>>();

  // Cache statistics
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    hitRate: 0,
    memoryHits: 0,
    localStorageHits: 0,
    indexedDBHits: 0,
  };

  // IndexedDB instance
  private db: IDBDatabase | null = null;
  private dbInitPromise: Promise<IDBDatabase | null> | null = null;

  /**
   * Generate a unique cache key
   */
  generateKey(latitude: number, longitude: number, date: string, method: number = 2): string {
    // Round coordinates to ~1km precision for cache efficiency
    const lat = Math.round(latitude * 100) / 100;
    const lon = Math.round(longitude * 100) / 100;
    return `${lat}_${lon}_${date}_${method}`;
  }

  /**
   * Format date as YYYY-MM-DD
   */
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Get cached data with multi-layer lookup
   * Returns immediately from fastest available cache layer
   */
  async get(key: string): Promise<CacheEntry | null> {
    // Layer 1: Memory cache (instant)
    const memoryEntry = this.memoryCache.get(key);
    if (memoryEntry && !this.isExpired(memoryEntry, CACHE_DURATION.MEMORY)) {
      this.stats.memoryHits++;
      this.stats.hits++;
      this.updateHitRate();
      return memoryEntry;
    }

    // Layer 2: localStorage (very fast)
    const localEntry = this.getFromLocalStorage(key);
    if (localEntry && !this.isExpired(localEntry, CACHE_DURATION.LOCAL_STORAGE)) {
      // Promote to memory cache
      this.memoryCache.set(key, localEntry);
      this.stats.localStorageHits++;
      this.stats.hits++;
      this.updateHitRate();
      return localEntry;
    }

    // Layer 3: IndexedDB (fast, persistent)
    const idbEntry = await this.getFromIndexedDB(key);
    if (idbEntry && !this.isExpired(idbEntry, CACHE_DURATION.INDEXED_DB)) {
      // Promote to faster caches
      this.memoryCache.set(key, idbEntry);
      this.setInLocalStorage(key, idbEntry);
      this.stats.indexedDBHits++;
      this.stats.hits++;
      this.updateHitRate();
      return idbEntry;
    }

    this.stats.misses++;
    this.updateHitRate();
    return null;
  }

  /**
   * Get cached data synchronously (memory + localStorage only)
   * Use this for instant rendering before async operations
   */
  getSync(key: string): CacheEntry | null {
    // Layer 1: Memory cache
    const memoryEntry = this.memoryCache.get(key);
    if (memoryEntry && !this.isExpired(memoryEntry, CACHE_DURATION.MEMORY)) {
      this.stats.memoryHits++;
      this.stats.hits++;
      this.updateHitRate();
      return memoryEntry;
    }

    // Layer 2: localStorage
    const localEntry = this.getFromLocalStorage(key);
    if (localEntry && !this.isExpired(localEntry, CACHE_DURATION.LOCAL_STORAGE)) {
      this.memoryCache.set(key, localEntry);
      this.stats.localStorageHits++;
      this.stats.hits++;
      this.updateHitRate();
      return localEntry;
    }

    return null;
  }

  /**
   * Get stale data even if expired (for stale-while-revalidate)
   */
  getStale(key: string): CacheEntry | null {
    // Check memory first
    const memoryEntry = this.memoryCache.get(key);
    if (memoryEntry) {
      return memoryEntry;
    }

    // Check localStorage
    return this.getFromLocalStorage(key);
  }

  /**
   * Store data in all cache layers
   */
  async set(
    key: string,
    data: PrayerTimesData,
    location: LocationInfo,
    date: string,
    method: number = 2
  ): Promise<void> {
    const entry: CacheEntry = {
      data,
      timestamp: Date.now(),
      location,
      date,
      method,
      expiresAt: Date.now() + CACHE_DURATION.MEMORY,
    };

    // Layer 1: Memory cache (synchronous)
    this.memoryCache.set(key, entry);

    // Layer 2: localStorage (synchronous)
    this.setInLocalStorage(key, entry);

    // Layer 3: IndexedDB (asynchronous)
    await this.setInIndexedDB(key, entry);
  }

  /**
   * Check if a request is already in flight
   */
  hasInflightRequest(key: string): boolean {
    return this.inflightRequests.has(key);
  }

  /**
   * Get in-flight request promise
   */
  getInflightRequest(key: string): Promise<PrayerTimesData> | undefined {
    return this.inflightRequests.get(key);
  }

  /**
   * Register an in-flight request for deduplication
   */
  setInflightRequest(key: string, promise: Promise<PrayerTimesData>): void {
    this.inflightRequests.set(key, promise);
    // Auto-cleanup when request completes
    promise.finally(() => {
      this.inflightRequests.delete(key);
    });
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    return { ...this.stats };
  }

  /**
   * Clear all caches
   */
  async clearAll(): Promise<void> {
    // Clear memory cache
    this.memoryCache.clear();

    // Clear localStorage entries
    if (typeof window !== 'undefined') {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(STORAGE_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));
    }

    // Clear IndexedDB
    await this.clearIndexedDB();
  }

  /**
   * Preload data into memory cache (for pre-fetching)
   */
  preload(key: string, entry: CacheEntry): void {
    this.memoryCache.set(key, entry);
  }

  // ============================================
  // Private Methods - localStorage
  // ============================================

  private getFromLocalStorage(key: string): CacheEntry | null {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
      if (!stored) return null;
      return JSON.parse(stored) as CacheEntry;
    } catch (error) {
      console.warn('[Cache] localStorage read error:', error);
      return null;
    }
  }

  private setInLocalStorage(key: string, entry: CacheEntry): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(entry));
    } catch (error) {
      // Handle quota exceeded - clear old entries
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        this.pruneLocalStorage();
        try {
          localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(entry));
        } catch {
          console.warn('[Cache] localStorage write error after prune:', error);
        }
      } else {
        console.warn('[Cache] localStorage write error:', error);
      }
    }
  }

  private pruneLocalStorage(): void {
    if (typeof window === 'undefined') return;

    const entries: { key: string; timestamp: number }[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(STORAGE_PREFIX)) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          entries.push({ key, timestamp: data.timestamp || 0 });
        } catch {
          // Remove corrupted entries
          localStorage.removeItem(key);
        }
      }
    }

    // Sort by timestamp and remove oldest half
    entries.sort((a, b) => a.timestamp - b.timestamp);
    const toRemove = entries.slice(0, Math.ceil(entries.length / 2));
    toRemove.forEach(({ key }) => localStorage.removeItem(key));
  }

  // ============================================
  // Private Methods - IndexedDB
  // ============================================

  private async initIndexedDB(): Promise<IDBDatabase | null> {
    if (typeof window === 'undefined' || !window.indexedDB) return null;

    if (this.db) return this.db;
    if (this.dbInitPromise) return this.dbInitPromise;

    this.dbInitPromise = new Promise((resolve) => {
      try {
        const request = indexedDB.open(INDEXEDDB_NAME, INDEXEDDB_VERSION);

        request.onerror = () => {
          console.warn('[Cache] IndexedDB open error');
          resolve(null);
        };

        request.onsuccess = () => {
          this.db = request.result;
          resolve(this.db);
        };

        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(INDEXEDDB_STORE)) {
            const store = db.createObjectStore(INDEXEDDB_STORE, { keyPath: 'key' });
            store.createIndex('timestamp', 'timestamp', { unique: false });
            store.createIndex('date', 'date', { unique: false });
          }
        };
      } catch (error) {
        console.warn('[Cache] IndexedDB init error:', error);
        resolve(null);
      }
    });

    return this.dbInitPromise;
  }

  private async getFromIndexedDB(key: string): Promise<CacheEntry | null> {
    const db = await this.initIndexedDB();
    if (!db) return null;

    return new Promise((resolve) => {
      try {
        const transaction = db.transaction(INDEXEDDB_STORE, 'readonly');
        const store = transaction.objectStore(INDEXEDDB_STORE);
        const request = store.get(key);

        request.onerror = () => resolve(null);
        request.onsuccess = () => {
          const result = request.result;
          if (result) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { key: _, ...entry } = result;
            resolve(entry as CacheEntry);
          } else {
            resolve(null);
          }
        };
      } catch {
        resolve(null);
      }
    });
  }

  private async setInIndexedDB(key: string, entry: CacheEntry): Promise<void> {
    const db = await this.initIndexedDB();
    if (!db) return;

    return new Promise((resolve) => {
      try {
        const transaction = db.transaction(INDEXEDDB_STORE, 'readwrite');
        const store = transaction.objectStore(INDEXEDDB_STORE);
        store.put({ key, ...entry });

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => resolve();
      } catch {
        resolve();
      }
    });
  }

  private async clearIndexedDB(): Promise<void> {
    const db = await this.initIndexedDB();
    if (!db) return;

    return new Promise((resolve) => {
      try {
        const transaction = db.transaction(INDEXEDDB_STORE, 'readwrite');
        const store = transaction.objectStore(INDEXEDDB_STORE);
        store.clear();

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => resolve();
      } catch {
        resolve();
      }
    });
  }

  // ============================================
  // Private Helper Methods
  // ============================================

  private isExpired(entry: CacheEntry, maxAge: number): boolean {
    // Check if the cached date matches today
    const today = this.formatDate(new Date());
    if (entry.date !== today) {
      // Allow yesterday's data for a brief window (early morning Fajr)
      const now = new Date();
      if (now.getHours() < 2) {
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = this.formatDate(yesterday);
        if (entry.date === yesterdayStr) {
          return false; // Allow yesterday's data
        }
      }
      return true; // Different date = expired
    }

    // Check time-based expiration
    return Date.now() - entry.timestamp > maxAge;
  }

  private updateHitRate(): void {
    const total = this.stats.hits + this.stats.misses;
    this.stats.hitRate = total > 0 ? this.stats.hits / total : 0;
  }
}

// Export singleton instance
export const prayerTimesCache = new PrayerTimesCacheManager();

// Export type for cache manager
export type { PrayerTimesCacheManager };

/**
 * Location cache manager for geolocation data
 */
class LocationCacheManager {
  private static readonly STORAGE_KEY = 'mu_last_location';
  private memoryLocation: LocationInfo | null = null;

  /**
   * Get last known location (instant)
   */
  get(): LocationInfo | null {
    // Memory first
    if (this.memoryLocation) {
      return this.memoryLocation;
    }

    // localStorage fallback
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(LocationCacheManager.STORAGE_KEY);
      if (stored) {
        this.memoryLocation = JSON.parse(stored);
        return this.memoryLocation;
      }
    } catch {
      // Ignore parse errors
    }

    return null;
  }

  /**
   * Store location
   */
  set(location: LocationInfo): void {
    this.memoryLocation = location;

    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(LocationCacheManager.STORAGE_KEY, JSON.stringify(location));
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Check if location changed significantly (>5km)
   */
  hasChangedSignificantly(newLocation: LocationInfo): boolean {
    const cached = this.get();
    if (!cached) return true;

    const distance = this.calculateDistance(
      cached.latitude,
      cached.longitude,
      newLocation.latitude,
      newLocation.longitude
    );

    return distance > 5; // 5km threshold
  }

  /**
   * Calculate distance between two points in km (Haversine formula)
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}

export const locationCache = new LocationCacheManager();
