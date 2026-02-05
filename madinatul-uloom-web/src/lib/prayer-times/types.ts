/**
 * Prayer Times Types
 * TypeScript interfaces for Islamic Finder API integration
 */

export interface PrayerTime {
  key: PrayerName;
  name: string;
  nameArabic: string;
  time: string;
  timestamp: number;
  iqama?: string;
}

export type PrayerName = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export interface PrayerTimesData {
  prayers: PrayerTime[];
  date: DateInfo;
  location: LocationInfo;
  meta: MetaInfo;
}

export interface DateInfo {
  gregorian: {
    date: string;
    day: string;
    weekday: string;
    month: string;
    year: string;
  };
  hijri: {
    date: string;
    day: string;
    weekday: {
      en: string;
      ar: string;
    };
    month: {
      number: number;
      en: string;
      ar: string;
    };
    year: string;
  };
}

export interface LocationInfo {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
  timezone?: string;
}

export interface MetaInfo {
  method: {
    id: number;
    name: string;
  };
  school: string;
  latitudeAdjustmentMethod: string;
}

// UmmahAPI Response
export interface UmmahAPIResponse {
  success: boolean;
  service: string;
  data: {
    date: string;
    location: {
      latitude: number;
      longitude: number;
    };
    calculation_method: string;
    madhab: string;
    prayer_times: {
      fajr: string;
      sunrise: string;
      dhuhr: string;
      asr: string;
      maghrib: string;
      isha: string;
    };
    prayer_times_detailed: {
      fajr: string;
      sunrise: string;
      dhuhr: string;
      asr: string;
      maghrib: string;
      isha: string;
    };
    current_status: {
      current_prayer: string;
      next_prayer: string;
      time_until_next: string;
      minutes_until_next: number;
    };
    islamic_info: {
      prayer_names: Record<string, string>;
      note: string;
    };
  };
  timestamp: string;
  api_info: {
    sadaqah_jariah: string;
    usage: string;
  };
  message?: string;
}

// Islamic Finder API Response (Legacy)
export interface IslamicFinderAPIResponse {
  success: boolean;
  message?: string;
  settings?: {
    location?: string;
    date?: string;
  };
  results?: {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
    datetime?: string;
  };
}

// Aladhan API Response (Fallback)
export interface AladhanAPIResponse {
  code: number;
  status: string;
  data: {
    timings: {
      Fajr: string;
      Sunrise: string;
      Dhuhr: string;
      Asr: string;
      Sunset: string;
      Maghrib: string;
      Isha: string;
      Imsak: string;
      Midnight: string;
      Firstthird: string;
      Lastthird: string;
    };
    date: {
      readable: string;
      timestamp: string;
      gregorian: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string };
        month: { number: number; en: string };
        year: string;
        designation: { abbreviated: string; expanded: string };
      };
      hijri: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string; ar: string };
        month: { number: number; en: string; ar: string };
        year: string;
        designation: { abbreviated: string; expanded: string };
        holidays: string[];
      };
    };
    meta: {
      latitude: number;
      longitude: number;
      timezone: string;
      method: {
        id: number;
        name: string;
        params: Record<string, number>;
        location: { latitude: number; longitude: number };
      };
      latitudeAdjustmentMethod: string;
      midnightMode: string;
      school: string;
      offset: Record<string, number>;
    };
  };
}

// Calculation methods available
export enum CalculationMethod {
  SHIA_ITHNA_ASHARI = 0,
  UNIVERSITY_OF_ISLAMIC_SCIENCES_KARACHI = 1,
  ISNA = 2, // Islamic Society of North America
  MWL = 3, // Muslim World League
  UMM_AL_QURA = 4, // Umm Al-Qura, Makkah
  EGYPTIAN = 5, // Egyptian General Authority
  TEHRAN = 7, // Institute of Geophysics, Tehran
  GULF_REGION = 8,
  KUWAIT = 9,
  QATAR = 10,
  MAJLIS_UGAMA_ISLAM_SINGAPURA = 11,
  UNION_OF_ISLAMIC_ORGANISATIONS_FRANCE = 12,
  DIYANET_TURKEY = 13,
  SPIRITUAL_ADMINISTRATION_RUSSIA = 14,
  MOONSIGHTING_COMMITTEE = 15,
  DUBAI = 16,
}

export const CALCULATION_METHODS: Record<CalculationMethod, string> = {
  [CalculationMethod.SHIA_ITHNA_ASHARI]: 'Shia Ithna-Ashari',
  [CalculationMethod.UNIVERSITY_OF_ISLAMIC_SCIENCES_KARACHI]:
    'University of Islamic Sciences, Karachi',
  [CalculationMethod.ISNA]: 'Islamic Society of North America (ISNA)',
  [CalculationMethod.MWL]: 'Muslim World League',
  [CalculationMethod.UMM_AL_QURA]: 'Umm Al-Qura University, Makkah',
  [CalculationMethod.EGYPTIAN]: 'Egyptian General Authority of Survey',
  [CalculationMethod.TEHRAN]: 'Institute of Geophysics, University of Tehran',
  [CalculationMethod.GULF_REGION]: 'Gulf Region',
  [CalculationMethod.KUWAIT]: 'Kuwait',
  [CalculationMethod.QATAR]: 'Qatar',
  [CalculationMethod.MAJLIS_UGAMA_ISLAM_SINGAPURA]: 'Majlis Ugama Islam Singapura, Singapore',
  [CalculationMethod.UNION_OF_ISLAMIC_ORGANISATIONS_FRANCE]: 'Union Organization Islamic de France',
  [CalculationMethod.DIYANET_TURKEY]: 'Diyanet İşleri Başkanlığı, Turkey',
  [CalculationMethod.SPIRITUAL_ADMINISTRATION_RUSSIA]:
    'Spiritual Administration of Muslims of Russia',
  [CalculationMethod.MOONSIGHTING_COMMITTEE]: 'Moonsighting Committee Worldwide',
  [CalculationMethod.DUBAI]: 'Dubai',
};

// School for Asr calculation
export enum AsrSchool {
  STANDARD = 0, // Shafi, Maliki, Hanbali
  HANAFI = 1,
}

export interface PrayerTimesConfig {
  calculationMethod: CalculationMethod;
  school: AsrSchool;
  timeFormat: '12h' | '24h';
  showHijriDate: boolean;
  showCountdown: boolean;
  showIqamaTimes: boolean;
  defaultLocation?: LocationInfo;
}

export interface GeolocationState {
  loading: boolean;
  error: string | null;
  location: LocationInfo | null;
  permissionStatus: 'granted' | 'denied' | 'prompt' | 'unknown';
}

// Cache structure
export interface PrayerTimesCache {
  data: PrayerTimesData;
  timestamp: number;
  location: LocationInfo;
  date: string; // YYYY-MM-DD format
}
