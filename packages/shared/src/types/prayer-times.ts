export interface PrayerTime {
  id: string;
  date: Date;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  fajrIqama?: string;
  dhuhrIqama?: string;
  asrIqama?: string;
  maghribIqama?: string;
  ishaIqama?: string;
  jummah1?: string;
  jummah2?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PrayerName = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export interface PrayerTimeDisplay {
  name: PrayerName;
  adhan: string;
  iqama?: string;
  isActive?: boolean;
  isNext?: boolean;
}

export type PrayerTimeCreateInput = Pick<
  PrayerTime,
  | 'date'
  | 'fajr'
  | 'sunrise'
  | 'dhuhr'
  | 'asr'
  | 'maghrib'
  | 'isha'
  | 'fajrIqama'
  | 'dhuhrIqama'
  | 'asrIqama'
  | 'maghribIqama'
  | 'ishaIqama'
  | 'jummah1'
  | 'jummah2'
>;
