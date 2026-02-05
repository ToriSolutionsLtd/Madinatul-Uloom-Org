import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { LightboxImage } from '@/components/ui/lightbox';
import { getSiteContent } from '@/data/site-content';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CampusPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getSiteContent(locale);
  const nav = await getTranslations('nav');

  const existingImages = [
    {
      src: '/images/campus/campus-existing-1.png',
      alt: `${content.campus.title} 1`,
    },
    {
      src: '/images/campus/campus-existing-2.png',
      alt: `${content.campus.title} 2`,
    },
    {
      src: '/images/campus/campus-existing-3.png',
      alt: `${content.campus.title} 3`,
    },
  ];

  const proposedImages = [
    {
      src: '/images/campus/campus-proposed-1.png',
      alt: `${content.campus.title} proposed 1`,
    },
    {
      src: '/images/campus/campus-proposed-2.png',
      alt: `${content.campus.title} proposed 2`,
    },
  ];

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />

      <main id="main-content" className="flex flex-1 flex-col pb-16">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(21,128,61,0.18),_rgba(15,23,42,0.92))]">
          <div className="absolute inset-0 bg-[url('/images/patterns/arabesque.svg')] opacity-[0.12]" />
          <div className="section-container py-16 sm:py-20">
            <h1 className="text-4xl font-black text-white sm:text-5xl">{content.campus.title}</h1>
            <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
              {content.campus.subtitle}
            </p>
          </div>
        </section>

        <section className="section-container py-6">
          <Breadcrumbs
            items={[
              { label: nav('home'), href: '/' },
              { label: nav('campus') },
            ]}
          />
        </section>

        {/* Facilities */}
        <section className="section-container section-padding">
          <h2 className="text-2xl font-bold sm:text-3xl">{content.campus.facilitiesTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {content.campus.facilities.map((item) => (
              <div key={item} className="bg-card rounded-2xl border p-4 text-sm shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="bg-muted/40 section-padding">
          <div className="section-container">
            <div className="mb-6">
              <h2 className="text-2xl font-bold sm:text-3xl">{content.campus.galleryTitle}</h2>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                {content.campus.gallerySubtitle}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {existingImages.map((image, index) => (
                <LightboxImage
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  width={700}
                  height={520}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 30vw"
                  className="h-56"
                  priority={index === 0}
                />
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {proposedImages.map((image, index) => (
                <LightboxImage
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
                  className="h-64"
                  priority={index === 0}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
