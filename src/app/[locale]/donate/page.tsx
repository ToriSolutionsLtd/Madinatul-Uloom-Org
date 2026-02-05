import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { CopyField } from '@/components/ui/copy-field';
import { Link } from '@/i18n/routing';
import { ArrowRight, ClipboardCheck, Heart, Landmark, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function DonatePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const bankAccountNumber = '34196296';
  const routingNumber = '52100';
  const bkashNumber = '+8801774641393';
  const bkashHref = `tel:${bkashNumber.replace(/[\s-]/g, '')}`;
  const nav = await getTranslations('nav');

  return (
    <div className="bg-background text-foreground relative flex min-h-screen flex-col transition-colors duration-300">
      <div className="absolute inset-0">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.08)_1px,transparent_0)] [background-size:26px_26px]" />
      </div>
      <Header />

      <main id="main-content" className="relative z-10 flex flex-1 flex-col">
        <section className="section-container section-padding">
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: nav('home'), href: '/' },
                { label: nav('donate') },
              ]}
            />
          </div>
          <div className="mb-10 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
              <Heart className="h-4 w-4" />
              <span>Donate</span>
            </div>
            <h1 className="text-foreground text-4xl font-black tracking-tight sm:text-5xl">
              Donate Now
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
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
            <div className="bg-card rounded-2xl border p-8 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-muted-foreground text-sm font-semibold uppercase tracking-[0.3em]">
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
                  <p className="text-muted-foreground text-sm uppercase tracking-wide">
                    Account Name
                  </p>
                  <p className="text-foreground mt-2 text-base font-semibold">
                    Madinatul Uloom Lalmonirhat
                  </p>
                </div>
                <div className="rounded-2xl border bg-white p-4">
                  <p className="text-muted-foreground text-sm uppercase tracking-wide">C/O</p>
                  <p className="text-foreground mt-2 text-base font-semibold">Zillur Rahman</p>
                </div>
                <div className="rounded-2xl border bg-white p-4">
                  <p className="text-muted-foreground text-sm uppercase tracking-wide">Bank</p>
                  <p className="text-foreground mt-2 text-base font-semibold">Sonali Bank LLC</p>
                </div>
                <div className="rounded-2xl border bg-white p-4">
                  <p className="text-muted-foreground text-sm uppercase tracking-wide">Branch</p>
                  <p className="text-foreground mt-2 text-base font-semibold">Lalmonirhat Branch</p>
                </div>
                <CopyField
                  label="Account Number"
                  value={bankAccountNumber}
                  className="bg-white"
                />
                <CopyField label="Routing Number" value={routingNumber} className="bg-white" />
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
              <div className="bg-card rounded-2xl border p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-muted-foreground text-sm font-semibold uppercase tracking-[0.3em]">
                      BKASH (PERSONAL)
                    </div>
                    <h3 className="text-foreground mt-2 text-xl font-semibold">Mobile Payment</h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-white">
                    <Image
                      src="/images/bkash-logo.png"
                      alt="bKash logo"
                      width={28}
                      height={28}
                      className="h-7 w-7"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <CopyField label="Number" value={bkashNumber} href={bkashHref} className="bg-white" />
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
                <h3 className="text-lg font-semibold text-emerald-700">Donation tips</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  Include your name in the transfer note so we can issue a receipt quickly.
                </p>
              </div>

              <div className="bg-card rounded-2xl border p-6 shadow-sm">
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
