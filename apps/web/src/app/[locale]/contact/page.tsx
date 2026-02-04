import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { getSiteContent } from '@/data/site-content';
import { Mail, MapPin, Phone } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getSiteContent(locale);

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 flex-col gap-12 pb-16">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(21,128,61,0.18),_rgba(15,23,42,0.92))]">
          <div className="absolute inset-0 bg-[url('/images/patterns/arabesque.svg')] opacity-[0.12]" />
          <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-black text-white sm:text-4xl">{content.contact.title}</h1>
            <p className="mt-3 max-w-2xl text-base text-white/80">{content.contact.subtitle}</p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-card rounded-3xl border p-6 shadow-sm">
              <div className="space-y-6 text-sm">
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
                          {phone.value} · {phone.label}
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
                  <ul className="text-muted-foreground mt-2 space-y-1 text-sm">
                    {content.contact.hours.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
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
