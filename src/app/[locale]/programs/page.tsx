import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { getSiteContent } from '@/data/site-content';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ProgramsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getSiteContent(locale);
  const nav = await getTranslations('nav');

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />

      <main id="main-content" className="flex flex-1 flex-col pb-16">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(20,83,45,0.2),_rgba(15,23,42,0.9))]">
          <div className="absolute inset-0 bg-[url('/images/patterns/arabesque.svg')] opacity-[0.12]" />
          <div className="section-container py-16 sm:py-20">
            <h1 className="text-4xl font-black text-white sm:text-5xl">{content.programs.title}</h1>
            <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
              {content.programs.subtitle}
            </p>
          </div>
        </section>

        <section className="section-container py-6">
          <Breadcrumbs
            items={[
              { label: nav('home'), href: '/' },
              { label: nav('programs') },
            ]}
          />
        </section>

        {/* Divisions */}
        <section className="section-container section-padding">
          <h2 className="text-2xl font-bold sm:text-3xl">{content.programs.divisionsTitle}</h2>
          <div className="mt-6 grid gap-6">
            {content.programs.divisions.map((division) => (
              <div
                key={division.id}
                id={division.id}
                className="bg-card/90 border-border/60 grid gap-6 rounded-2xl border p-6 shadow-sm lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-8"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{division.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                    {division.summary}
                  </p>
                  <div className="grid gap-3 text-sm sm:grid-cols-2">
                    {division.meta.map((item) => (
                      <div
                        key={item.label}
                        className="border-border/60 bg-muted/40 rounded-xl border p-3"
                      >
                        <p className="text-muted-foreground text-sm uppercase tracking-wide">
                          {item.label}
                        </p>
                        <p className="font-semibold">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <ul className="text-muted-foreground/90 space-y-2 text-sm leading-relaxed sm:text-base">
                    {division.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-border/60 bg-muted/30 w-full overflow-hidden rounded-2xl border lg:max-w-[420px] lg:justify-self-end">
                  <div className="relative aspect-[3/2] w-full">
                    <ImageWithSkeleton
                      src={division.image}
                      alt={division.imageAlt}
                      fill
                      sizes="(min-width: 1280px) 420px, (min-width: 1024px) 36vw, 100vw"
                      imageClassName="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Syllabus */}
        <section className="bg-muted/30 section-padding">
          <div className="section-container">
            <div className="mb-6">
              <h2 className="text-2xl font-bold sm:text-3xl">{content.programs.syllabusTitle}</h2>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                {content.programs.syllabusSubtitle}
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {content.programs.syllabusImages.map((image) => (
                <figure
                  key={image.src}
                  className="bg-card/90 border-border/60 rounded-2xl border p-4 shadow-sm"
                >
                  <ImageWithSkeleton
                    src={image.src}
                    alt={image.alt}
                    width={900}
                    height={700}
                    imageClassName="border-border/60 h-auto w-full rounded-xl border bg-white object-cover"
                  />
                  <figcaption className="text-muted-foreground mt-3 text-sm">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
