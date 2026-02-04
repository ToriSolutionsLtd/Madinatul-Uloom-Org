// Facility Types for Madinatul Uloom

export interface Facility {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  operatingHours?: OperatingHours;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OperatingHours {
  monday?: DayHours;
  tuesday?: DayHours;
  wednesday?: DayHours;
  thursday?: DayHours;
  friday?: DayHours;
  saturday?: DayHours;
  sunday?: DayHours;
}

export interface DayHours {
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface Room {
  id: string;
  facilityId: string;
  name: string;
  description?: string;
  imageUrl?: string;
  capacity: number;
  minCapacity?: number;
  hasAV: boolean;
  hasProjector: boolean;
  hasWhiteboard: boolean;
  hasWifi: boolean;
  isWheelchairAccessible: boolean;
  amenities: string[];
  isBookable: boolean;
  requiresApproval: boolean;
  hourlyRate?: number;
  genderRestriction?: 'male' | 'female' | 'all';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum BookingStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export interface FacilityBooking {
  id: string;
  roomId: string;
  userId: string;
  date: Date;
  startTime: string;
  endTime: string;
  title: string;
  purpose?: string;
  expectedAttendees?: number;
  setupRequirements?: string;
  status: BookingStatus;
  approvedBy?: string;
  approvedAt?: Date;
  rejectionReason?: string;
  totalCost?: number;
  paymentStatus?: 'pending' | 'paid' | 'waived';
  contactName: string;
  contactPhone?: string;
  contactEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

export type RoomCreateInput = Pick<
  Room,
  | 'facilityId'
  | 'name'
  | 'description'
  | 'imageUrl'
  | 'capacity'
  | 'minCapacity'
  | 'hasAV'
  | 'hasProjector'
  | 'hasWhiteboard'
  | 'hasWifi'
  | 'isWheelchairAccessible'
  | 'amenities'
  | 'isBookable'
  | 'requiresApproval'
  | 'hourlyRate'
  | 'genderRestriction'
>;

export type RoomUpdateInput = Partial<RoomCreateInput> & {
  isActive?: boolean;
};

export type BookingCreateInput = Pick<
  FacilityBooking,
  | 'roomId'
  | 'date'
  | 'startTime'
  | 'endTime'
  | 'title'
  | 'purpose'
  | 'expectedAttendees'
  | 'setupRequirements'
  | 'contactName'
  | 'contactPhone'
  | 'contactEmail'
>;

export type BookingUpdateInput = Partial<
  Pick<FacilityBooking, 'title' | 'purpose' | 'expectedAttendees' | 'setupRequirements'>
> & {
  status?: BookingStatus;
  rejectionReason?: string;
};

export interface RoomAvailability {
  roomId: string;
  date: Date;
  slots: TimeSlot[];
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  bookingId?: string;
}
