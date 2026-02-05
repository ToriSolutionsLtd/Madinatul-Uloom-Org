'use client';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { ArrowRight, ClipboardCheck, Heart, Landmark, ShieldCheck } from 'lucide-react';

export default function DonatePage() {
  return (
    <div className="bg-background text-foreground relative flex min-h-screen flex-col transition-colors duration-300">
      <div className="absolute inset-0">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.08)_1px,transparent_0)] [background-size:26px_26px]" />
      </div>
      <Header />

      <main className="relative z-10 flex flex-1 flex-col items-center px-4 py-12 sm:px-8 lg:px-16">
        <section className="w-full max-w-[1180px]">
          <div className="mb-10 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
              <Heart className="h-4 w-4" />
              <span>Donate</span>
            </div>
            <h1 className="text-foreground text-3xl font-black tracking-tight sm:text-5xl">
              Donate Now
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg">
              We’re preparing online donation processing. For now, you can donate using the verified
              options below.
            </p>
            <div className="text-muted-foreground flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Landmark className="text-primary h-4 w-4" />
                <span>Local bank transfer</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-primary h-4 w-4" />
                <span>Verified accounts</span>
              </div>
              <div className="flex items-center gap-2">
                <ClipboardCheck className="text-primary h-4 w-4" />
                <span>Receipts available</span>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="bg-card rounded-3xl border p-8 shadow-lg">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.35em]">
                    Bank Account
                  </div>
                  <h2 className="text-foreground mt-2 text-2xl font-bold">Madinatul Uloom</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <Landmark className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border bg-white p-4">
                  <p className="text-muted-foreground text-xs uppercase tracking-widest">
                    Account Name
                  </p>
                  <p className="text-foreground mt-2 text-base font-semibold">
                    Madinatul Uloom Lalmonirhat
                  </p>
                </div>
                <div className="rounded-2xl border bg-white p-4">
                  <p className="text-muted-foreground text-xs uppercase tracking-widest">C/O</p>
                  <p className="text-foreground mt-2 text-base font-semibold">Zillur Rahman</p>
                </div>
                <div className="rounded-2xl border bg-white p-4">
                  <p className="text-muted-foreground text-xs uppercase tracking-widest">Bank</p>
                  <p className="text-foreground mt-2 text-base font-semibold">Sonali Bank LLC</p>
                </div>
                <div className="rounded-2xl border bg-white p-4">
                  <p className="text-muted-foreground text-xs uppercase tracking-widest">Branch</p>
                  <p className="text-foreground mt-2 text-base font-semibold">Lalmonirhat Branch</p>
                </div>
                <div className="rounded-2xl border bg-white p-4">
                  <p className="text-muted-foreground text-xs uppercase tracking-widest">
                    Account Number
                  </p>
                  <p className="text-foreground mt-2 text-base font-semibold">34196296</p>
                </div>
                <div className="rounded-2xl border bg-white p-4">
                  <p className="text-muted-foreground text-xs uppercase tracking-widest">
                    Routing Number
                  </p>
                  <p className="text-foreground mt-2 text-base font-semibold">52100</p>
                </div>
              </div>

              <div className="text-muted-foreground mt-6 flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700">
                  Account type: Checking
                </span>
                <span className="border-border/60 rounded-full border bg-white px-3 py-1">
                  Transfer note: donor name
                </span>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-card rounded-3xl border p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.35em]">
                      BKASH (PERSONAL)
                    </div>
                    <h3 className="text-foreground mt-2 text-xl font-semibold">Mobile Payment</h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-white">
                    <img src="/images/bkash-logo.png" alt="bKash logo" className="h-7 w-7" />
                  </div>
                </div>
                <div className="mt-5 rounded-2xl border bg-white p-4">
                  <p className="text-muted-foreground text-xs uppercase tracking-widest">Number</p>
                  <p className="text-foreground mt-2 text-base font-semibold">+8801774641393</p>
                </div>
              </div>

              <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6">
                <h3 className="text-lg font-semibold text-emerald-700">Donation tips</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  Include your name in the transfer note so we can issue a receipt quickly.
                </p>
              </div>

              <div className="bg-card rounded-3xl border p-6 shadow-sm">
                <h3 className="text-foreground text-lg font-semibold">Need help?</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  Contact the mosque office if you have any questions about bank transfers.
                </p>
                <Button asChild variant="outline" size="lg" className="mt-6 w-full">
                  <Link href="/contact" className="flex items-center justify-center gap-2">
                    Contact Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
