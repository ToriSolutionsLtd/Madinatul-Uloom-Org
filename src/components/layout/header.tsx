'use client';

import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { getSiteContent } from '@/data/site-content';
import { Link } from '@/i18n/routing';
import { Heart, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = useTranslations('nav');
  const locale = useLocale();
  const content = getSiteContent(locale);

  const navItems = [
    { href: '/about', label: t('about') },
    { href: '/programs', label: t('programs') },
    { href: '/campus', label: t('campus') },
    { href: '/contact', label: t('contact') },
  ];

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  return (
    <header className="dark:bg-background/95 sticky top-0 z-50 w-full bg-white/95 shadow-sm backdrop-blur">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-xl">
            <Image
              src="/images/MU-logo.png"
              alt="Madinatul Uloom Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-foreground text-xl font-bold">Madinatul Uloom</span>
            <span className="text-muted-foreground text-xs">{content.contact.addressLines[1]}</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href as '/'}
              className="text-foreground/80 hover:text-primary text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button
            asChild
            className="hidden gap-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 lg:inline-flex"
          >
            <Link href="/donate" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              {content.home.hero.ctaPrimary}
            </Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="dark:bg-background border-t bg-white lg:hidden">
          <nav id="mobile-nav" className="container flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href as '/'}
                className="hover:bg-primary/10 hover:text-primary rounded-lg px-4 py-3 text-sm font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 px-4">
              <Button
                asChild
                className="w-full gap-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500"
              >
                <Link href="/donate" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  {content.home.hero.ctaPrimary}
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
