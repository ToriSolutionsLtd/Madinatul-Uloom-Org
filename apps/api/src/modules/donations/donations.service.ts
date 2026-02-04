import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { DonationFund, DonationType, DonationStatus } from '@prisma/client';
import Stripe from 'stripe';

interface CreateDonationDto {
  amount: number;
  fund: DonationFund;
  type: DonationType;
  userId?: string;
  donorEmail?: string;
  donorName?: string;
  isAnonymous?: boolean;
}

@Injectable()
export class DonationsService {
  private stripe?: Stripe;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService
  ) {
    const stripeKey = this.configService.get('STRIPE_SECRET_KEY');
    if (stripeKey) {
      this.stripe = new Stripe(stripeKey, { apiVersion: '2025-02-24.acacia' });
    }
  }

  async createPaymentIntent(data: CreateDonationDto) {
    // Create donation record
    const donation = await this.prisma.donation.create({
      data: {
        amount: data.amount,
        fund: data.fund,
        type: data.type,
        userId: data.userId,
        donorEmail: data.donorEmail,
        donorName: data.donorName,
        isAnonymous: data.isAnonymous || false,
        status: DonationStatus.PENDING,
      },
    });

    // Create Stripe PaymentIntent
    if (this.stripe) {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(data.amount * 100), // Convert to cents
        currency: 'usd',
        metadata: {
          donationId: donation.id,
          fund: data.fund,
        },
      });

      await this.prisma.donation.update({
        where: { id: donation.id },
        data: { stripePaymentIntentId: paymentIntent.id },
      });

      return {
        donationId: donation.id,
        clientSecret: paymentIntent.client_secret,
      };
    }

    return { donationId: donation.id };
  }

  async handleWebhook(event: Stripe.Event) {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await this.prisma.donation.update({
          where: { stripePaymentIntentId: paymentIntent.id },
          data: { status: DonationStatus.COMPLETED },
        });
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await this.prisma.donation.update({
          where: { stripePaymentIntentId: paymentIntent.id },
          data: { status: DonationStatus.FAILED },
        });
        break;
      }
    }
  }

  async findAll(options?: {
    fund?: DonationFund;
    status?: DonationStatus;
    userId?: string;
    page?: number;
    limit?: number;
  }) {
    const { fund, status, userId, page = 1, limit = 20 } = options || {};

    const where: any = {};
    if (fund) where.fund = fund;
    if (status) where.status = status;
    if (userId) where.userId = userId;

    const [donations, total] = await Promise.all([
      this.prisma.donation.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.donation.count({ where }),
    ]);

    return {
      data: donations,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getStats(options?: { startDate?: Date; endDate?: Date }) {
    const { startDate, endDate } = options || {};

    const where: any = { status: DonationStatus.COMPLETED };
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
    }

    const [totalAmount, byFund, recentDonations] = await Promise.all([
      this.prisma.donation.aggregate({
        where,
        _sum: { amount: true },
        _count: true,
      }),
      this.prisma.donation.groupBy({
        by: ['fund'],
        where,
        _sum: { amount: true },
        _count: true,
      }),
      this.prisma.donation.findMany({
        where,
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          amount: true,
          fund: true,
          isAnonymous: true,
          donorName: true,
          createdAt: true,
        },
      }),
    ]);

    return {
      totalAmount: totalAmount._sum.amount || 0,
      totalDonations: totalAmount._count,
      byFund,
      recentDonations,
    };
  }

  async getUserDonations(userId: string) {
    return this.findAll({ userId, status: DonationStatus.COMPLETED });
  }
}
