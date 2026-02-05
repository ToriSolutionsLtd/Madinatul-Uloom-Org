'use client';

import { useEffect } from 'react';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  const t = useTranslations('common');

  useEffect(() => {
    // Log to an error reporting service if needed
    console.error(error);
  }, [error]);

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />
      <main
        id="main-content"
        className="section-container section-padding flex flex-1 flex-col items-center justify-center text-center"
      >
        <div className="max-w-xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">Error</p>
          <h1 className="text-3xl font-black sm:text-4xl">{t('error')}</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {error.message || t('error')}
          </p>
          <Button onClick={reset} className="mt-4">
            {t('retry')}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
