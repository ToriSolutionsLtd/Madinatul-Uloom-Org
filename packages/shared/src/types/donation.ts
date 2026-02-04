// Donation Types for Madinatul Uloom

export enum DonationStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  DISPUTED = 'DISPUTED',
}

export enum DonationType {
  ONE_TIME = 'ONE_TIME',
  RECURRING = 'RECURRING',
  PLEDGE = 'PLEDGE',
}

export enum DonationFund {
  GENERAL = 'GENERAL',
  ZAKAT = 'ZAKAT',
  SADAQAH = 'SADAQAH',
  SADAQAH_JARIYAH = 'SADAQAH_JARIYAH',
  FIDYA = 'FIDYA',
  KAFFARAH = 'KAFFARAH',
  BUILDING = 'BUILDING',
  MAINTENANCE = 'MAINTENANCE',
  EDUCATION = 'EDUCATION',
  YOUTH = 'YOUTH',
  RAMADAN = 'RAMADAN',
  QURBANI = 'QURBANI',
  EMERGENCY = 'EMERGENCY',
  REFUGEE = 'REFUGEE',
  ORPHAN_SPONSORSHIP = 'ORPHAN_SPONSORSHIP',
  SCHOLARSHIP = 'SCHOLARSHIP',
}

export interface Donation {
  id: string;
  userId?: string;
  campaignId?: string;
  amount: number;
  currency: string;
  processingFee?: number;
  netAmount?: number;
  fund: DonationFund;
  type: DonationType;
  status: DonationStatus;
  donorEmail?: string;
  donorName?: string;
  donorPhone?: string;
  donorAddress?: DonorAddress;
  stripePaymentIntentId?: string;
  stripeChargeId?: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripeInvoiceId?: string;
  paymentMethod?: string;
  lastFour?: string;
  recurringInterval?: string;
  nextPaymentDate?: Date;
  isAnonymous: boolean;
  coverFees: boolean;
  isTaxDeductible: boolean;
  dedicatedTo?: string;
  dedicationType?: 'memory' | 'honor';
  sendAcknowledgment: boolean;
  acknowledgmentSentAt?: Date;
  receiptNumber?: string;
  receiptSentAt?: Date;
  publicNote?: string;
  privateNote?: string;
  source?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface DonorAddress {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Campaign {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  imageUrl?: string;
  goalAmount: number;
  currentAmount: number;
  donorCount: number;
  fund: DonationFund;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecurringDonation {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  fund: DonationFund;
  interval: 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly';
  dayOfMonth?: number;
  dayOfWeek?: number;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  stripePriceId: string;
  status: 'active' | 'paused' | 'cancelled';
  pausedAt?: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
  lastPaymentAt?: Date;
  nextPaymentAt?: Date;
  totalDonated: number;
  paymentCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DonationCreateInput {
  amount: number;
  fund: DonationFund;
  type?: DonationType;
  currency?: string;
  donorEmail?: string;
  donorName?: string;
  donorPhone?: string;
  donorAddress?: DonorAddress;
  isAnonymous?: boolean;
  coverFees?: boolean;
  dedicatedTo?: string;
  dedicationType?: 'memory' | 'honor';
  campaignId?: string;
  publicNote?: string;
}

export interface DonationStats {
  totalAmount: number;
  totalDonations: number;
  uniqueDonors: number;
  averageDonation: number;
  byFund: Array<{
    fund: DonationFund;
    amount: number;
    count: number;
  }>;
  byMonth: Array<{
    month: string;
    amount: number;
    count: number;
  }>;
  recentDonations: Array<{
    id: string;
    amount: number;
    fund: DonationFund;
    isAnonymous: boolean;
    donorName?: string;
    createdAt: Date;
  }>;
}

export interface DonationReceipt {
  id: string;
  donationId?: string;
  userId?: string;
  receiptNumber: string;
  year: number;
  totalAmount: number;
  taxDeductible: number;
  donorName: string;
  donorEmail: string;
  donorAddress: DonorAddress;
  pdfUrl?: string;
  sentAt?: Date;
  createdAt: Date;
}

