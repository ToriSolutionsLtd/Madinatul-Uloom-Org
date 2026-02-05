import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { getSiteContent } from '@/data/site-content';
import { Mail, MapPin, Phone } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getSiteContent(locale);
  const nav = await getTranslations('nav');

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />

      <main id="main-content" className="flex flex-1 flex-col pb-16">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(21,128,61,0.18),_rgba(15,23,42,0.92))]">
          <div className="absolute inset-0 bg-[url('/images/patterns/arabesque.svg')] opacity-[0.12]" />
          <div className="section-container py-16 sm:py-20">
            <h1 className="text-4xl font-black text-white sm:text-5xl">{content.contact.title}</h1>
            <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
              {content.contact.subtitle}
            </p>
          </div>
        </section>

        <section className="section-container py-6">
          <Breadcrumbs
            items={[
              { label: nav('home'), href: '/' },
              { label: nav('contact') },
            ]}
          />
        </section>

        <section className="section-container section-padding">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-card rounded-2xl border p-6 shadow-sm">
              <div className="space-y-6 text-sm sm:text-base">
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
                    <ul className="text-muted-foreground mt-2 space-y-1">
                      {content.contact.phones.map((phone) => (
                        <li key={phone.value}>
                          <a
                            href={`tel:${phone.value.replace(/[\s-]/g, '')}`}
                            className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                          >
                            {phone.value}
                          </a>{' '}
                          · {phone.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-4 w-4 text-emerald-600" />
                  <div>
                    <p className="font-semibold">{content.contact.emailLabel}</p>
                    <p className="text-muted-foreground">{content.contact.email}</p>
                  </div>
                </div>

                <div className="rounded-2xl border bg-emerald-50/60 p-4">
                  <p className="font-semibold">{content.contact.hoursLabel}</p>
                  <ul className="text-muted-foreground mt-2 space-y-1 text-sm sm:text-base">
                    {content.contact.hours.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <iframe
                title={content.contact.mapLabel}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  content.contact.mapQuery
                )}&output=embed`}
                className="h-[420px] w-full"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
