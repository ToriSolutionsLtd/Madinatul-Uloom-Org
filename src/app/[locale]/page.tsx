import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { getSiteContent } from '@/data/site-content';
import { Link } from '@/i18n/routing';
import {
  BookOpen,
  Building2,
  CalendarDays,
  ClipboardCheck,
  Download,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
  Mic,
  ShieldCheck,
  Phone,
  Sun,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getSiteContent(locale);
  const primaryPhone = content.contact.phones?.[0]?.value ?? '';

  const divisionIcons = {
    nurani: BookOpen,
    madrasa: GraduationCap,
    hifz: CalendarDays,
    qirat: Mic,
  } as const;

  const highlightIcons = [Building2, Sun, Users, GraduationCap];

  const campusImages = [
    '/images/campus/campus-existing-1.png',
    '/images/campus/campus-existing-2.png',
    '/images/campus/campus-existing-3.png',
    '/images/campus/campus-proposed-1.png',
    '/images/campus/campus-proposed-2.png',
  ];

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col transition-colors duration-300">
      <Header />

      <main className="flex flex-1 flex-col gap-16 pb-20">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(20,83,45,0.25),_rgba(15,23,42,0.85))]">
          <div className="absolute inset-0 bg-[url('/images/patterns/arabesque.svg')] opacity-[0.15]" />
          <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
            <div className="relative z-10 space-y-6 text-white">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90">
                {content.home.hero.badge}
              </span>
              <h1 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
                {content.home.hero.title}
              </h1>
              <p className="text-base text-white/80 sm:text-lg">{content.home.hero.subtitle}</p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
                <MapPin className="h-4 w-4 text-emerald-300" />
                <span>{content.home.hero.location}</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-xl bg-emerald-600 text-white hover:bg-emerald-500"
                >
                  <Link href="/donate" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    {content.home.hero.ctaPrimary}
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-white/10 text-white hover:bg-white/20"
                >
                  <Link href="/programs">{content.home.hero.ctaSecondary}</Link>
                </Button>
              </div>
            </div>
            <div className="relative z-10 mx-auto w-full max-w-md space-y-4">
              <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/5 shadow-2xl">
                <Image
                  src="/images/campus/prospectus-cover.png"
                  alt="Madinatul Uloom prospectus cover"
                  width={640}
                  height={960}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
              <Button
                asChild
                variant="outline"
                className="w-full border-white/40 bg-white/10 text-white hover:bg-white/20"
              >
                <a href="/docs/madinatul-uloom-prospectus.pdf" download>
                  <Download className="h-4 w-4" />
                  {content.home.hero.prospectusLabel}
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-bold">{content.home.highlights.title}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.home.highlights.items.map((item, index) => {
              const Icon = highlightIcons[index] ?? Building2;
              return (
                <div
                  key={item.title}
                  className="bg-card rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-emerald-50 p-3 text-emerald-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Divisions */}
        <section className="bg-muted/30 py-14">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold">{content.home.divisions.title}</h2>
              <p className="text-muted-foreground mt-2">{content.home.divisions.subtitle}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {content.home.divisions.items.map((division) => {
                const Icon = divisionIcons[division.id as keyof typeof divisionIcons] ?? BookOpen;
                return (
                  <Link
                    key={division.id}
                    href={`/programs#${division.id}` as '/'}
                    className="bg-background group flex items-start gap-4 rounded-xl border p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
                  >
                    <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700 group-hover:bg-emerald-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{division.title}</h3>
                      <p className="text-muted-foreground mt-2 text-sm">{division.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Policies */}
        <section className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">{content.home.policies.title}</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="bg-card rounded-2xl border p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">{content.home.policies.visiting.title}</h3>
              <ul className="text-muted-foreground space-y-2 text-sm">
                {content.home.policies.visiting.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-2xl border p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">{content.home.policies.holidays.title}</h3>
              <ul className="text-muted-foreground space-y-2 text-sm">
                {content.home.policies.holidays.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground mt-4 text-xs">
                {content.home.policies.holidays.note}
              </p>
            </div>
          </div>
        </section>

        {/* Campus Gallery */}
        <section className="bg-muted/40 py-14">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold">{content.home.campus.title}</h2>
                <p className="text-muted-foreground mt-2">{content.home.campus.subtitle}</p>
              </div>
              <Link href="/campus" className="text-sm font-semibold text-emerald-700">
                {content.home.campus.cta}
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {campusImages.map((src, index) => (
                <div
                  key={src}
                  className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm"
                >
                  <Image
                    src={src}
                    alt={`${content.campus.title} ${index + 1}`}
                    width={640}
                    height={480}
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Donation */}
        <section className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-3xl border bg-gradient-to-br from-amber-50 via-white to-emerald-50 p-8 md:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col justify-center gap-5">
              <div className="space-y-3">
                <h2 className="text-3xl font-black leading-tight">
                  {content.home.donation.headline}{' '}
                  <span className="text-emerald-700">{content.home.donation.headlineAccent}</span>
                </h2>
                <p className="text-muted-foreground text-base">
                  {content.home.donation.supporting}
                </p>
              </div>
              <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-2 text-emerald-700">
                  <ShieldCheck className="h-4 w-4" />
                  {content.home.donation.badges[0]}
                </span>
                <span className="flex items-center gap-2 text-emerald-700">
                  <ClipboardCheck className="h-4 w-4" />
                  {content.home.donation.badges[1]}
                </span>
              </div>
              <Button
                asChild
                className="w-fit rounded-xl bg-emerald-600 text-white hover:bg-emerald-500"
              >
                <Link href="/donate" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  {content.home.donation.button}
                </Link>
              </Button>
            </div>
            <div className="bg-card rounded-2xl border p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-emerald-50 p-2 text-emerald-700">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{content.home.donation.tipTitle}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">{content.home.donation.note}</p>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-sm">
                <div className="bg-background/80 rounded-2xl border p-4">
                  <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
                    {content.home.donation.bank.title}
                  </p>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <p className="text-muted-foreground text-[10px] uppercase tracking-wide">
                        {content.home.donation.bank.accountNameLabel}
                      </p>
                      <p className="text-foreground mt-1 font-semibold">
                        {content.home.donation.bank.accountName}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[10px] uppercase tracking-wide">
                        {content.home.donation.bank.coLabel}
                      </p>
                      <p className="text-foreground mt-1 font-semibold">
                        {content.home.donation.bank.co}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[10px] uppercase tracking-wide">
                        {content.home.donation.bank.bankNameLabel}
                      </p>
                      <p className="text-foreground mt-1 font-semibold">
                        {content.home.donation.bank.bankName}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[10px] uppercase tracking-wide">
                        {content.home.donation.bank.branchLabel}
                      </p>
                      <p className="text-foreground mt-1 font-semibold">
                        {content.home.donation.bank.branch}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[10px] uppercase tracking-wide">
                        {content.home.donation.bank.accountNumberLabel}
                      </p>
                      <p className="text-foreground mt-1 font-semibold">
                        {content.home.donation.bank.accountNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[10px] uppercase tracking-wide">
                        {content.home.donation.bank.routingNumberLabel}
                      </p>
                      <p className="text-foreground mt-1 font-semibold">
                        {content.home.donation.bank.routingNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[10px] uppercase tracking-wide">
                        {content.home.donation.bank.accountTypeLabel}
                      </p>
                      <p className="text-foreground mt-1 font-semibold">
                        {content.home.donation.bank.accountType}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-background/80 rounded-2xl border p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
                      {content.home.donation.bkash.title}
                    </p>
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                      {content.home.donation.bkash.type}
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="text-muted-foreground text-[10px] uppercase tracking-wide">
                      {content.home.donation.bkash.numberLabel}
                    </p>
                    <p className="text-foreground mt-1 font-semibold">
                      {content.home.donation.bkash.number}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Block */}
        <section className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-3xl border bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">{content.home.contactCta.title}</h2>
              <p className="text-muted-foreground mt-2">{content.home.contactCta.description}</p>
              <Button asChild className="mt-6">
                <Link href="/contact">{content.home.contactCta.button}</Link>
              </Button>
            </div>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 text-emerald-600" />
                <div>
                  <p className="font-semibold">{content.contact.addressLabel}</p>
                  <p className="text-muted-foreground">{content.contact.addressLines[0]}</p>
                  <p className="text-muted-foreground">{content.contact.addressLines[1]}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4 text-emerald-600" />
                <div>
                  <p className="font-semibold">{content.contact.phonesLabel}</p>
                  <p className="text-muted-foreground">{primaryPhone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-4 w-4 text-emerald-600" />
                <div>
                  <p className="font-semibold">{content.contact.emailLabel}</p>
                  <p className="text-muted-foreground">{content.contact.email}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
