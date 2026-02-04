// Program Types for Madinatul Uloom

export enum ProgramCategory {
  QURAN = 'QURAN',
  HIFZ = 'HIFZ',
  ARABIC = 'ARABIC',
  ISLAMIC_STUDIES = 'ISLAMIC_STUDIES',
  FIQH = 'FIQH',
  SEERAH = 'SEERAH',
  TAFSIR = 'TAFSIR',
  TAJWEED = 'TAJWEED',
  CHILDREN = 'CHILDREN',
  YOUTH = 'YOUTH',
  ADULTS = 'ADULTS',
  SISTERS = 'SISTERS',
  BROTHERS = 'BROTHERS',
  SENIORS = 'SENIORS',
  NEW_MUSLIM = 'NEW_MUSLIM',
  FAMILY = 'FAMILY',
  MARRIAGE_PREP = 'MARRIAGE_PREP',
  COUNSELING = 'COUNSELING',
}

export enum ProgramStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  REGISTRATION_OPEN = 'REGISTRATION_OPEN',
  REGISTRATION_CLOSED = 'REGISTRATION_CLOSED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
  CANCELLED = 'CANCELLED',
}

export enum EnrollmentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  WAITLISTED = 'WAITLISTED',
  ENROLLED = 'ENROLLED',
  DROPPED = 'DROPPED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Program {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  imageUrl?: string;
  category: ProgramCategory;
  status: ProgramStatus;
  ageGroup?: 'children' | 'youth' | 'adults' | 'all';
  minAge?: number;
  maxAge?: number;
  genderRestriction?: 'male' | 'female' | 'all';
  prerequisites?: string;
  schedule?: string;
  startDate?: Date;
  endDate?: Date;
  sessionDuration?: number;
  totalSessions?: number;
  minEnrollment?: number;
  maxEnrollment?: number;
  currentEnrollment: number;
  waitlistEnabled: boolean;
  isFree: boolean;
  price?: number;
  familyPrice?: number;
  scholarshipAvailable: boolean;
  roomId?: string;
  isOnline: boolean;
  onlineUrl?: string;
  instructorId?: string;
  instructorName?: string;
  instructorBio?: string;
  materials?: string[];
  moodleCourseId?: string;
  hasOnlineCourse: boolean;
  contactEmail?: string;
  contactPhone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProgramEnrollment {
  id: string;
  programId: string;
  userId: string;
  status: EnrollmentStatus;
  studentName?: string;
  studentAge?: number;
  parentUserId?: string;
  amountPaid?: number;
  paymentId?: string;
  scholarshipApplied: boolean;
  scholarshipAmount?: number;
  notes?: string;
  adminNotes?: string;
  enrolledAt?: Date;
  droppedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  programId: string;
  title: string;
  description?: string;
  orderIndex: number;
  dayOfWeek?: number;
  startTime?: string;
  endTime?: string;
  startDate?: Date;
  endDate?: Date;
  instructorId?: string;
  instructorName?: string;
  roomId?: string;
  moodleCourseId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseSession {
  id: string;
  courseId: string;
  title?: string;
  date: Date;
  startTime: string;
  endTime: string;
  topic?: string;
  description?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  userId: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
  checkedInAt?: Date;
  checkedOutAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type ProgramCreateInput = Pick<
  Program,
  | 'title'
  | 'slug'
  | 'description'
  | 'content'
  | 'imageUrl'
  | 'category'
  | 'ageGroup'
  | 'minAge'
  | 'maxAge'
  | 'genderRestriction'
  | 'prerequisites'
  | 'schedule'
  | 'startDate'
  | 'endDate'
  | 'sessionDuration'
  | 'totalSessions'
  | 'minEnrollment'
  | 'maxEnrollment'
  | 'isFree'
  | 'price'
  | 'familyPrice'
  | 'scholarshipAvailable'
  | 'isOnline'
  | 'instructorName'
  | 'instructorBio'
  | 'contactEmail'
>;

export type ProgramUpdateInput = Partial<ProgramCreateInput> & {
  status?: ProgramStatus;
};

export type ProgramSummary = Pick<
  Program,
  | 'id'
  | 'title'
  | 'slug'
  | 'description'
  | 'imageUrl'
  | 'category'
  | 'status'
  | 'schedule'
  | 'startDate'
  | 'isFree'
  | 'price'
  | 'currentEnrollment'
  | 'maxEnrollment'
>;

