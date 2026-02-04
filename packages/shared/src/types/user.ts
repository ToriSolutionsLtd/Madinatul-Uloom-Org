// User Types for Madinatul Uloom

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  CONTENT_EDITOR = 'CONTENT_EDITOR',
  EVENT_MANAGER = 'EVENT_MANAGER',
  FINANCE_ADMIN = 'FINANCE_ADMIN',
  IMAM = 'IMAM',
  TEACHER = 'TEACHER',
  VOLUNTEER = 'VOLUNTEER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  MEMBER = 'MEMBER',
  GUEST = 'GUEST',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  SUSPENDED = 'SUSPENDED',
  BANNED = 'BANNED',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  phone?: string;
  avatarUrl?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
  language: string;
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  lastActiveAt?: Date;
}

export interface UserProfile {
  id: string;
  userId: string;
  bio?: string;
  occupation?: string;
  employer?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  reversionDate?: Date;
  islamicKnowledge?: 'beginner' | 'intermediate' | 'advanced';
  arabicProficiency?: 'none' | 'basic' | 'intermediate' | 'fluent';
  interests: string[];
  skills: string[];
  volunteerAreas: string[];
  linkedInUrl?: string;
  websiteUrl?: string;
}

export interface Address {
  id: string;
  userId: string;
  type: 'home' | 'work' | 'other';
  isPrimary: boolean;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type UserCreateInput = Pick<User, 'email' | 'firstName' | 'lastName' | 'phone'> & {
  password: string;
  role?: UserRole;
};

export type UserUpdateInput = Partial<
  Pick<User, 'firstName' | 'lastName' | 'displayName' | 'phone' | 'avatarUrl' | 'dateOfBirth' | 'gender' | 'language' | 'timezone'>
>;

export interface UserWithProfile extends User {
  profile?: UserProfile;
  addresses?: Address[];
}

export type PublicUser = Pick<
  User,
  'id' | 'firstName' | 'lastName' | 'displayName' | 'avatarUrl' | 'role'
>;

