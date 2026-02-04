import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Headers,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { DonationsService } from './donations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole, DonationFund } from '@prisma/client';
import Stripe from 'stripe';

@ApiTags('donations')
@Controller('donations')
export class DonationsController {
  private stripe?: Stripe;

  constructor(
    private readonly donationsService: DonationsService,
    private configService: ConfigService
  ) {
    const stripeKey = this.configService.get('STRIPE_SECRET_KEY');
    if (stripeKey) {
      this.stripe = new Stripe(stripeKey, { apiVersion: '2025-02-24.acacia' });
    }
  }

  @Post('create-payment-intent')
  @Public()
  @ApiOperation({ summary: 'Create a payment intent for donation' })
  async createPaymentIntent(
    @Body()
    body: {
      amount: number;
      fund: DonationFund;
      donorEmail?: string;
      donorName?: string;
      isAnonymous?: boolean;
    }
  ) {
    return this.donationsService.createPaymentIntent({
      amount: body.amount,
      fund: body.fund,
      type: 'ONE_TIME',
      donorEmail: body.donorEmail,
      donorName: body.donorName,
      isAnonymous: body.isAnonymous,
    });
  }

  @Post('webhook')
  @Public()
  @ApiOperation({ summary: 'Stripe webhook endpoint' })
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>
  ) {
    const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret || !this.stripe) {
      return { received: true };
    }

    try {
      const event = this.stripe.webhooks.constructEvent(req.rawBody!, signature, webhookSecret);
      await this.donationsService.handleWebhook(event);
      return { received: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      throw new Error(`Webhook Error: ${errorMessage}`);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.FINANCE_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all donations (Admin only)' })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('fund') fund?: DonationFund
  ) {
    return this.donationsService.findAll({ page, limit, fund });
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.FINANCE_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get donation statistics' })
  async getStats() {
    return this.donationsService.getStats();
  }

  @Get('my-donations')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user donations' })
  async getMyDonations(@CurrentUser('id') userId: string) {
    return this.donationsService.getUserDonations(userId);
  }
}
