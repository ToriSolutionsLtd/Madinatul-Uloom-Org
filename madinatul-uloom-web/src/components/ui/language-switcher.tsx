'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const localeNames: Record<string, string> = {
  en: 'EN',
  ar: 'عربي',
  bn: 'বাং',
};

const localeFullNames: Record<string, string> = {
  en: 'English',
  ar: 'العربية',
  bn: 'বাংলা',
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as 'en' | 'ar' | 'bn' });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span className="text-xs">{localeNames[locale]}</span>
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute end-0 top-full z-50 mt-1 min-w-32 rounded-md border bg-background p-1 shadow-lg">
            {Object.entries(localeFullNames).map(([key, name]) => (
              <button
                key={key}
                onClick={() => handleLocaleChange(key)}
                className={`w-full rounded-sm px-3 py-2 text-start text-sm transition-colors hover:bg-accent ${
                  locale === key ? 'bg-accent font-medium' : ''
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
