// Event Types for Madinatul Uloom

export enum EventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CANCELLED = 'CANCELLED',
  POSTPONED = 'POSTPONED',
  COMPLETED = 'COMPLETED',
}

export enum EventType {
  LECTURE = 'LECTURE',
  CLASS = 'CLASS',
  WORKSHOP = 'WORKSHOP',
  COMMUNITY = 'COMMUNITY',
  FUNDRAISER = 'FUNDRAISER',
  YOUTH = 'YOUTH',
  SISTERS = 'SISTERS',
  BROTHERS = 'BROTHERS',
  CHILDREN = 'CHILDREN',
  FAMILY = 'FAMILY',
  INTERFAITH = 'INTERFAITH',
  SPECIAL = 'SPECIAL',
  EID = 'EID',
  RAMADAN = 'RAMADAN',
}

export enum RegistrationStatus {
  REGISTERED = 'REGISTERED',
  WAITLISTED = 'WAITLISTED',
  CONFIRMED = 'CONFIRMED',
  ATTENDED = 'ATTENDED',
  NO_SHOW = 'NO_SHOW',
  CANCELLED = 'CANCELLED',
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  imageUrl?: string;
  type: EventType;
  status: EventStatus;
  startDate: Date;
  endDate?: Date;
  allDay: boolean;
  location?: string;
  roomId?: string;
  isOnline: boolean;
  onlineUrl?: string;
  onlinePlatform?: string;
  requiresRegistration: boolean;
  capacity?: number;
  registrationDeadline?: Date;
  waitlistEnabled: boolean;
  isFree: boolean;
  price?: number;
  earlyBirdPrice?: number;
  earlyBirdDeadline?: Date;
  speaker?: string;
  speakerBio?: string;
  speakerImageUrl?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  metaTitle?: string;
  metaDescription?: string;
  viewCount: number;
  registrationCount: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  status: RegistrationStatus;
  guestName?: string;
  guestEmail?: string;
  guestPhone?: string;
  numberOfGuests: number;
  specialNeeds?: string;
  dietaryNeeds?: string;
  notes?: string;
  checkedInAt?: Date;
  checkedInBy?: string;
  amountPaid?: number;
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type EventCreateInput = Pick<
  Event,
  | 'title'
  | 'slug'
  | 'description'
  | 'content'
  | 'imageUrl'
  | 'type'
  | 'startDate'
  | 'endDate'
  | 'allDay'
  | 'location'
  | 'roomId'
  | 'isOnline'
  | 'onlineUrl'
  | 'requiresRegistration'
  | 'capacity'
  | 'registrationDeadline'
  | 'isFree'
  | 'price'
  | 'speaker'
  | 'speakerBio'
  | 'contactEmail'
>;

export type EventUpdateInput = Partial<EventCreateInput> & {
  status?: EventStatus;
};

export type EventSummary = Pick<
  Event,
  | 'id'
  | 'title'
  | 'slug'
  | 'description'
  | 'imageUrl'
  | 'type'
  | 'status'
  | 'startDate'
  | 'endDate'
  | 'location'
  | 'isOnline'
  | 'isFree'
  | 'price'
  | 'registrationCount'
>;

