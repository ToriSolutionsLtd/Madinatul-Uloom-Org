'use client';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('common');

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />
      <main
        id="main-content"
        className="section-container section-padding flex flex-1 flex-col items-center justify-center text-center"
      >
        <div className="max-w-xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">404</p>
          <h1 className="text-3xl font-black sm:text-4xl">{t('notFoundTitle')}</h1>
          <p className="text-muted-foreground text-sm sm:text-base">{t('notFoundMessage')}</p>
          <Button asChild className="mt-4">
            <Link href="/">{t('backHome')}</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
