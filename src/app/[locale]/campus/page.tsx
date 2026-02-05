import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { getSiteContent } from '@/data/site-content';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CampusPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getSiteContent(locale);

  const existingImages = [
    '/images/campus/campus-existing-1.png',
    '/images/campus/campus-existing-2.png',
    '/images/campus/campus-existing-3.png',
  ];

  const proposedImages = [
    '/images/campus/campus-proposed-1.png',
    '/images/campus/campus-proposed-2.png',
  ];

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 flex-col gap-12 pb-16">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(21,128,61,0.18),_rgba(15,23,42,0.92))]">
          <div className="absolute inset-0 bg-[url('/images/patterns/arabesque.svg')] opacity-[0.12]" />
          <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-black text-white sm:text-4xl">{content.campus.title}</h1>
            <p className="mt-3 max-w-2xl text-base text-white/80">{content.campus.subtitle}</p>
          </div>
        </section>

        {/* Facilities */}
        <section className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">{content.campus.facilitiesTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {content.campus.facilities.map((item) => (
              <div key={item} className="bg-card rounded-xl border p-4 text-sm shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="bg-muted/40 py-12">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{content.campus.galleryTitle}</h2>
              <p className="text-muted-foreground mt-2">{content.campus.gallerySubtitle}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {existingImages.map((src, index) => (
                <div
                  key={src}
                  className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm"
                >
                  <Image
                    src={src}
                    alt={`${content.campus.title} ${index + 1}`}
                    width={700}
                    height={520}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {proposedImages.map((src, index) => (
                <div
                  key={src}
                  className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm"
                >
                  <Image
                    src={src}
                    alt={`${content.campus.title} proposed ${index + 1}`}
                    width={800}
                    height={600}
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
