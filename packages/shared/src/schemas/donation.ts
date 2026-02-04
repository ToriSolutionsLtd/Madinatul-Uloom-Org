import { z } from 'zod';
import { DonationFund, DonationType } from '../types/donation';

export const donationSchema = z.object({
  amount: z
    .number()
    .min(1, 'Minimum donation is $1')
    .max(1000000, 'Maximum donation is $1,000,000'),
  fund: z.nativeEnum(DonationFund),
  type: z.nativeEnum(DonationType).default(DonationType.ONE_TIME),
  donorEmail: z.string().email().optional(),
  donorName: z.string().optional(),
  isAnonymous: z.boolean().default(false),
});

export const recurringDonationSchema = donationSchema.extend({
  type: z.literal(DonationType.RECURRING),
  frequency: z.enum(['monthly', 'quarterly', 'yearly']),
});

export type DonationInput = z.infer<typeof donationSchema>;
export type RecurringDonationInput = z.infer<typeof recurringDonationSchema>;

// Preset donation amounts
export const DONATION_PRESETS = [10, 25, 50, 100, 250, 500] as const;
