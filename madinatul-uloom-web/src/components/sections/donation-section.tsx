'use client';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { Check, Heart, Shield } from 'lucide-react';

export function DonationSection() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
      <div className="from-primary/5 via-primary/10 to-primary/5 overflow-hidden rounded-2xl bg-gradient-to-br">
        <div className="flex flex-col items-stretch gap-8 p-8 lg:flex-row lg:gap-12 lg:p-12">
          {/* Left Content */}
          <div className="flex flex-1 flex-col justify-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              Support Your Mosque. <span className="text-primary">Build Your Akhirah.</span>
            </h2>
            <p className="text-muted-foreground mb-6 text-lg">
              Your generous contributions help us maintain the mosque, provide educational programs,
              and support those in need within our community.
            </p>

            {/* Trust Badges */}
            <div className="text-muted-foreground flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Check className="text-primary h-4 w-4" />
                <span>Tax Deductible</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="text-primary h-4 w-4" />
                <span>Verified Bank Accounts</span>
              </div>
            </div>
          </div>

          {/* Right - Donation Card */}
          <div className="bg-card flex flex-1 flex-col rounded-xl p-6 shadow-lg lg:max-w-md">
            <div className="mb-5">
              <h3 className="text-foreground text-lg font-bold">Bank Transfer Details</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Send your donation using the options below.
              </p>
            </div>

            <div className="border-border/60 bg-background/70 mb-6 rounded-lg border p-4">
              <div className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
                Bank Account
              </div>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Account Name</span>
                  <span className="text-foreground font-semibold">Madinatul Uloom Lalmonirhat</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">C/O</span>
                  <span className="text-foreground font-semibold">Zillur Rahman</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Bank Name</span>
                  <span className="text-foreground font-semibold">Sonali Bank LLC</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Branch Name</span>
                  <span className="text-foreground font-semibold">Lalmonirhat Branch</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Account Number</span>
                  <span className="text-foreground font-semibold">34196296</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Account Type</span>
                  <span className="text-foreground font-semibold">Checking</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Routing Number</span>
                  <span className="text-foreground font-semibold">52100</span>
                </div>
              </div>
            </div>

            <div className="border-border/60 bg-background/70 mb-6 rounded-lg border p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
                  bKash (Personal)
                </div>
                <img src="/images/bkash-logo.png" alt="bKash logo" className="h-8 w-8" />
              </div>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Number</span>
                  <span className="text-foreground font-semibold">+8801774641393</span>
                </div>
              </div>
            </div>

            {/* Donate Button */}
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 mb-4 flex h-14 w-full items-center justify-center gap-2 rounded-lg text-lg font-bold shadow-lg transition-all"
            >
              <Link href="/donate">
                Donate Now
                <Heart className="h-5 w-5" fill="currentColor" />
              </Link>
            </Button>

            {/* Security Note */}
            <div className="text-muted-foreground text-center text-xs">
              Please include your name in the transfer note for receipt tracking.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
