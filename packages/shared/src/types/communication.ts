// Communication Types for Madinatul Uloom

export enum AnnouncementType {
  GENERAL = 'GENERAL',
  URGENT = 'URGENT',
  EVENT = 'EVENT',
  PRAYER_TIME = 'PRAYER_TIME',
  CLOSURE = 'CLOSURE',
  MAINTENANCE = 'MAINTENANCE',
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  type: AnnouncementType;
  isPublished: boolean;
  isPinned: boolean;
  showOnHomepage: boolean;
  publishAt?: Date;
  unpublishAt?: Date;
  authorId?: string;
  authorName?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface Newsletter {
  id: string;
  title: string;
  subject: string;
  content: string;
  previewText?: string;
  templateId?: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent';
  scheduledAt?: Date;
  sentAt?: Date;
  recipientCount: number;
  openCount: number;
  clickCount: number;
  bounceCount: number;
  unsubscribeCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  interests: string[];
  isActive: boolean;
  confirmedAt?: Date;
  unsubscribedAt?: Date;
  unsubscribeReason?: string;
  source?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationPreference {
  id: string;
  userId: string;
  emailEnabled: boolean;
  emailPrayerTimes: boolean;
  emailEvents: boolean;
  emailAnnouncements: boolean;
  emailNewsletter: boolean;
  emailDonationReceipts: boolean;
  smsEnabled: boolean;
  smsPrayerTimes: boolean;
  smsEvents: boolean;
  smsUrgent: boolean;
  pushEnabled: boolean;
  pushPrayerTimes: boolean;
  pushEvents: boolean;
  pushAnnouncements: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum InquiryType {
  GENERAL = 'GENERAL',
  MEMBERSHIP = 'MEMBERSHIP',
  PROGRAMS = 'PROGRAMS',
  DONATIONS = 'DONATIONS',
  FACILITIES = 'FACILITIES',
  VOLUNTEERING = 'VOLUNTEERING',
  MARRIAGE = 'MARRIAGE',
  FUNERAL = 'FUNERAL',
  COUNSELING = 'COUNSELING',
  OTHER = 'OTHER',
}

export enum InquiryStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_RESPONSE = 'WAITING_RESPONSE',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: InquiryType;
  subject: string;
  message: string;
  status: InquiryStatus;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  assignedTo?: string;
  assignedAt?: Date;
  resolution?: string;
  resolvedBy?: string;
  resolvedAt?: Date;
  internalNotes?: string;
  source?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AnnouncementCreateInput = Pick<
  Announcement,
  | 'title'
  | 'content'
  | 'excerpt'
  | 'imageUrl'
  | 'type'
  | 'showOnHomepage'
  | 'publishAt'
  | 'unpublishAt'
>;

export type AnnouncementUpdateInput = Partial<AnnouncementCreateInput> & {
  isPublished?: boolean;
  isPinned?: boolean;
};

export type NewsletterCreateInput = Pick<
  Newsletter,
  'title' | 'subject' | 'content' | 'previewText' | 'templateId' | 'scheduledAt'
>;

export type NewsletterUpdateInput = Partial<NewsletterCreateInput>;

export type ContactInquiryCreateInput = Pick<
  ContactInquiry,
  'name' | 'email' | 'phone' | 'type' | 'subject' | 'message'
>;

export type ContactInquiryUpdateInput = {
  status?: InquiryStatus;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  assignedTo?: string;
  resolution?: string;
  internalNotes?: string;
};

export interface SubscribeInput {
  email: string;
  firstName?: string;
  lastName?: string;
  frequency?: 'daily' | 'weekly' | 'monthly';
  interests?: string[];
  source?: string;
}
