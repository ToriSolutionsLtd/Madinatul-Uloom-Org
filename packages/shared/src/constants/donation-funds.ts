import { DonationFund } from '../types/donation';

/**
 * Human-readable labels for donation funds
 */
export const FUND_LABELS: Record<DonationFund, string> = {
  [DonationFund.GENERAL]: 'General Fund',
  [DonationFund.ZAKAT]: 'Zakat',
  [DonationFund.SADAQAH]: 'Sadaqah',
  [DonationFund.SADAQAH_JARIYAH]: 'Sadaqah Jariyah',
  [DonationFund.FIDYA]: 'Fidya',
  [DonationFund.KAFFARAH]: 'Kaffarah',
  [DonationFund.BUILDING]: 'Building Fund',
  [DonationFund.MAINTENANCE]: 'Maintenance Fund',
  [DonationFund.EDUCATION]: 'Education Fund',
  [DonationFund.YOUTH]: 'Youth Programs',
  [DonationFund.RAMADAN]: 'Ramadan Campaign',
  [DonationFund.QURBANI]: 'Qurbani/Udhiya',
  [DonationFund.EMERGENCY]: 'Emergency Relief',
  [DonationFund.REFUGEE]: 'Refugee Support',
  [DonationFund.ORPHAN_SPONSORSHIP]: 'Orphan Sponsorship',
  [DonationFund.SCHOLARSHIP]: 'Scholarship Fund',
};

/**
 * Descriptions for each donation fund
 */
export const FUND_DESCRIPTIONS: Record<DonationFund, string> = {
  [DonationFund.GENERAL]:
    'Support the daily operations, utilities, and maintenance of the mosque.',
  [DonationFund.ZAKAT]:
    'Obligatory charity distributed to the eight categories of recipients as prescribed in the Quran.',
  [DonationFund.SADAQAH]:
    'Voluntary charity to help those in need in our community and beyond.',
  [DonationFund.SADAQAH_JARIYAH]:
    'Ongoing charity that provides continuous rewards, such as building wells, schools, or mosques.',
  [DonationFund.FIDYA]:
    'Compensation for missed fasts due to chronic illness or old age.',
  [DonationFund.KAFFARAH]:
    'Expiation for broken oaths or deliberately broken fasts during Ramadan.',
  [DonationFund.BUILDING]:
    'Contribute to mosque expansion, renovations, and new construction projects.',
  [DonationFund.MAINTENANCE]:
    'Fund for repairs, equipment upgrades, and facility improvements.',
  [DonationFund.EDUCATION]:
    'Support Islamic education programs, classes, and learning materials.',
  [DonationFund.YOUTH]:
    'Programs, activities, and resources dedicated to youth development.',
  [DonationFund.RAMADAN]:
    'Special Ramadan programs including iftar meals, taraweeh, and charity distribution.',
  [DonationFund.QURBANI]:
    'Eid al-Adha sacrifice distributed to those in need locally and globally.',
  [DonationFund.EMERGENCY]:
    'Emergency relief for community members facing crisis situations.',
  [DonationFund.REFUGEE]:
    'Support services, resettlement assistance, and aid for refugees.',
  [DonationFund.ORPHAN_SPONSORSHIP]:
    'Monthly sponsorship to support orphans with food, education, and care.',
  [DonationFund.SCHOLARSHIP]:
    'Financial assistance for students pursuing Islamic or secular education.',
};

/**
 * Funds that qualify as Zakat-eligible
 */
export const ZAKAT_ELIGIBLE_FUNDS: DonationFund[] = [
  DonationFund.ZAKAT,
  DonationFund.FIDYA,
  DonationFund.KAFFARAH,
];

/**
 * Funds that are tax-deductible (depends on jurisdiction)
 */
export const TAX_DEDUCTIBLE_FUNDS: DonationFund[] = [
  DonationFund.GENERAL,
  DonationFund.SADAQAH,
  DonationFund.SADAQAH_JARIYAH,
  DonationFund.BUILDING,
  DonationFund.MAINTENANCE,
  DonationFund.EDUCATION,
  DonationFund.YOUTH,
  DonationFund.RAMADAN,
  DonationFund.EMERGENCY,
  DonationFund.REFUGEE,
  DonationFund.ORPHAN_SPONSORSHIP,
  DonationFund.SCHOLARSHIP,
];

/**
 * Funds that support monthly/recurring giving
 */
export const RECURRING_FRIENDLY_FUNDS: DonationFund[] = [
  DonationFund.GENERAL,
  DonationFund.ORPHAN_SPONSORSHIP,
  DonationFund.SCHOLARSHIP,
  DonationFund.EDUCATION,
  DonationFund.YOUTH,
  DonationFund.SADAQAH_JARIYAH,
];

/**
 * Seasonal/campaign funds
 */
export const SEASONAL_FUNDS: DonationFund[] = [
  DonationFund.RAMADAN,
  DonationFund.QURBANI,
];

/**
 * Common preset amounts for donations (in cents)
 */
export const DONATION_PRESET_AMOUNTS = [
  { value: 2500, label: '$25' },
  { value: 5000, label: '$50' },
  { value: 10000, label: '$100' },
  { value: 25000, label: '$250' },
  { value: 50000, label: '$500' },
  { value: 100000, label: '$1,000' },
];

/**
 * Monthly sponsorship amounts
 */
export const SPONSORSHIP_AMOUNTS = {
  orphan: 5000, // $50/month
  student: 10000, // $100/month
  family: 25000, // $250/month
};

/**
 * Get fund category
 */
export type FundCategory = 'obligatory' | 'voluntary' | 'project' | 'emergency' | 'sponsorship';

export const FUND_CATEGORIES: Record<DonationFund, FundCategory> = {
  [DonationFund.ZAKAT]: 'obligatory',
  [DonationFund.FIDYA]: 'obligatory',
  [DonationFund.KAFFARAH]: 'obligatory',
  [DonationFund.GENERAL]: 'voluntary',
  [DonationFund.SADAQAH]: 'voluntary',
  [DonationFund.SADAQAH_JARIYAH]: 'voluntary',
  [DonationFund.RAMADAN]: 'voluntary',
  [DonationFund.QURBANI]: 'voluntary',
  [DonationFund.BUILDING]: 'project',
  [DonationFund.MAINTENANCE]: 'project',
  [DonationFund.EDUCATION]: 'project',
  [DonationFund.YOUTH]: 'project',
  [DonationFund.SCHOLARSHIP]: 'project',
  [DonationFund.EMERGENCY]: 'emergency',
  [DonationFund.REFUGEE]: 'emergency',
  [DonationFund.ORPHAN_SPONSORSHIP]: 'sponsorship',
};

/**
 * Check if a fund is Zakat-eligible
 */
export function isZakatEligible(fund: DonationFund): boolean {
  return ZAKAT_ELIGIBLE_FUNDS.includes(fund);
}

/**
 * Check if a fund is tax-deductible
 */
export function isTaxDeductible(fund: DonationFund): boolean {
  return TAX_DEDUCTIBLE_FUNDS.includes(fund);
}

/**
 * Check if a fund supports recurring donations
 */
export function supportsRecurring(fund: DonationFund): boolean {
  return RECURRING_FRIENDLY_FUNDS.includes(fund);
}

/**
 * Get funds by category
 */
export function getFundsByCategory(category: FundCategory): DonationFund[] {
  return Object.entries(FUND_CATEGORIES)
    .filter(([_, cat]) => cat === category)
    .map(([fund]) => fund as DonationFund);
}

