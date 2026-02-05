import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { getSiteContent } from '@/data/site-content';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ProgramsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getSiteContent(locale);

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 flex-col gap-14 pb-16">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(20,83,45,0.2),_rgba(15,23,42,0.9))]">
          <div className="absolute inset-0 bg-[url('/images/patterns/arabesque.svg')] opacity-[0.12]" />
          <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-black text-white sm:text-4xl">{content.programs.title}</h1>
            <p className="mt-3 max-w-2xl text-base text-white/80">{content.programs.subtitle}</p>
          </div>
        </section>

        {/* Divisions */}
        <section className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">{content.programs.divisionsTitle}</h2>
          <div className="mt-6 grid gap-6">
            {content.programs.divisions.map((division) => (
              <div
                key={division.id}
                id={division.id}
                className="bg-card/90 border-border/60 grid gap-6 rounded-3xl border p-6 shadow-sm lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-8"
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold tracking-tight">{division.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {division.summary}
                  </p>
                  <div className="grid gap-3 text-sm sm:grid-cols-2">
                    {division.meta.map((item) => (
                      <div
                        key={item.label}
                        className="border-border/60 bg-muted/40 rounded-xl border p-3"
                      >
                        <p className="text-muted-foreground text-[11px] uppercase tracking-wide">
                          {item.label}
                        </p>
                        <p className="font-semibold">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <ul className="text-muted-foreground/90 space-y-2 text-sm leading-relaxed">
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
                    <Image
                      src={division.image}
                      alt={division.imageAlt}
                      fill
                      sizes="(min-width: 1280px) 420px, (min-width: 1024px) 36vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Syllabus */}
        <section className="bg-muted/30 py-12">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{content.programs.syllabusTitle}</h2>
              <p className="text-muted-foreground mt-2">{content.programs.syllabusSubtitle}</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {content.programs.syllabusImages.map((image) => (
                <figure
                  key={image.src}
                  className="bg-card/90 border-border/60 rounded-2xl border p-4 shadow-sm"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={900}
                    height={700}
                    className="border-border/60 h-auto w-full rounded-xl border bg-white object-cover"
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
