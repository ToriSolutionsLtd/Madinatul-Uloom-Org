import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { getSiteContent } from '@/data/site-content';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getSiteContent(locale);
  const nav = await getTranslations('nav');

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />

      <main id="main-content" className="flex flex-1 flex-col pb-16">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(21,128,61,0.15),_rgba(15,23,42,0.95))]">
          <div className="absolute inset-0 bg-[url('/images/patterns/arabesque.svg')] opacity-[0.1]" />
          <div className="section-container py-16 sm:py-20">
            <h1 className="text-4xl font-black text-white sm:text-5xl">{content.about.title}</h1>
          </div>
        </section>

        <section className="section-container py-6">
          <Breadcrumbs
            items={[
              { label: nav('home'), href: '/' },
              { label: nav('about') },
            ]}
          />
        </section>

        {/* Mission + Objectives */}
        <section className="section-container section-padding">
          <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-white via-emerald-50/40 to-amber-50/30 p-6 sm:p-8 shadow-sm">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-100/50 blur-3xl" />
            <div className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-amber-100/40 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  {content.about.missionTitle}
                </span>
                <h2 className="text-2xl font-bold sm:text-3xl">{content.about.missionTitle}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                  {content.about.mission}
                </p>
              </div>
              <div className="rounded-2xl border bg-white/80 p-6 shadow-sm">
                <h3 className="text-lg font-semibold sm:text-xl">{content.about.objectivesTitle}</h3>
                <ul className="text-muted-foreground mt-4 space-y-3 text-sm sm:text-base">
                  {content.about.objectives.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Chairman Message */}
        <section className="section-container section-padding">
          <div className="rounded-2xl border bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold sm:text-3xl">{content.about.chairmanTitle}</h2>
            <p className="text-muted-foreground mt-3 whitespace-pre-line text-sm leading-relaxed sm:text-base">
              {content.about.chairmanMessage}
            </p>
          </div>
        </section>

        {/* History & Vision */}
        <section className="section-container section-padding">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-card rounded-2xl border p-6 shadow-sm">
              <h3 className="text-lg font-semibold sm:text-xl">{content.about.historyTitle}</h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
                {content.about.history}
              </p>
            </div>
            <div className="bg-card rounded-2xl border p-6 shadow-sm">
              <h3 className="text-lg font-semibold sm:text-xl">{content.about.visionTitle}</h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
                {content.about.vision}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
