// Sermon Types for Madinatul Uloom

export enum SermonType {
  KHUTBAH_JUMMAH = 'KHUTBAH_JUMMAH',
  KHUTBAH_EID = 'KHUTBAH_EID',
  LECTURE = 'LECTURE',
  TAFSIR = 'TAFSIR',
  HALAQA = 'HALAQA',
  PODCAST = 'PODCAST',
  INTERVIEW = 'INTERVIEW',
  PANEL = 'PANEL',
  OTHER = 'OTHER',
}

export interface Sermon {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  type: SermonType;
  date: Date;
  speakerId?: string;
  speakerName: string;
  speakerTitle?: string;
  videoUrl?: string;
  audioUrl?: string;
  thumbnailUrl?: string;
  duration?: number;
  fileSize?: number;
  transcript?: string;
  hasTranscript: boolean;
  quranReferences: string[];
  hadithReferences: string[];
  topics: string[];
  isPublished: boolean;
  isFeatured: boolean;
  viewCount: number;
  downloadCount: number;
  likeCount: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface Speaker {
  id: string;
  name: string;
  slug: string;
  title?: string;
  bio?: string;
  imageUrl?: string;
  email?: string;
  website?: string;
  youtubeUrl?: string;
  twitterUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  isActive: boolean;
  isResident: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type SermonCreateInput = Pick<
  Sermon,
  | 'title'
  | 'slug'
  | 'description'
  | 'content'
  | 'type'
  | 'date'
  | 'speakerId'
  | 'speakerName'
  | 'speakerTitle'
  | 'videoUrl'
  | 'audioUrl'
  | 'thumbnailUrl'
  | 'duration'
  | 'transcript'
  | 'quranReferences'
  | 'hadithReferences'
  | 'topics'
>;

export type SermonUpdateInput = Partial<SermonCreateInput> & {
  isPublished?: boolean;
  isFeatured?: boolean;
};

export type SermonSummary = Pick<
  Sermon,
  | 'id'
  | 'title'
  | 'slug'
  | 'description'
  | 'type'
  | 'date'
  | 'speakerName'
  | 'thumbnailUrl'
  | 'duration'
  | 'hasTranscript'
  | 'viewCount'
>;

export type SpeakerCreateInput = Pick<
  Speaker,
  | 'name'
  | 'slug'
  | 'title'
  | 'bio'
  | 'imageUrl'
  | 'email'
  | 'website'
  | 'youtubeUrl'
  | 'twitterUrl'
  | 'facebookUrl'
  | 'instagramUrl'
  | 'isResident'
>;

export type SpeakerUpdateInput = Partial<SpeakerCreateInput> & {
  isActive?: boolean;
};

