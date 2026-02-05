'use client';

import { Button } from '@/components/ui/button';
import { getSiteContent } from '@/data/site-content';
import { Link } from '@/i18n/routing';
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  Youtube,
} from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const locale = useLocale();
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const contactT = useTranslations('contact');
  const content = getSiteContent(locale);

  return (
    <footer className="bg-[hsl(160,35%,8%)] text-white">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl">
                <Image
                  src="/images/MU-logo.png"
                  alt="Madinatul Uloom Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">Madinatul Uloom</span>
                <span className="text-xs text-white/60">{content.contact.addressLines[1]}</span>
              </div>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-white/70">
              {content.home.hero.subtitle}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="hover:bg-primary flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white/70 transition-colors hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:bg-primary flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white/70 transition-colors hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:bg-primary flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white/70 transition-colors hover:text-white"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:bg-primary flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white/70 transition-colors hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">{t('quickLinks')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary text-white/70 transition-colors">
                  {nav('about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="hover:text-primary text-white/70 transition-colors"
                >
                  {nav('programs')}
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-primary text-white/70 transition-colors">
                  {nav('donate')}
                </Link>
              </li>
              <li>
                <Link href="/campus" className="hover:text-primary text-white/70 transition-colors">
                  {nav('campus')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary text-white/70 transition-colors"
                >
                  {nav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">{contactT('title')}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                <span className="text-white/70">
                  {content.contact.addressLines[0]}
                  <br />
                  {content.contact.addressLines[1]}
                </span>
              </li>
              {content.contact.phones.map((phone) => (
                <li key={phone.value} className="flex items-center gap-3">
                  <Phone className="text-primary h-5 w-5 shrink-0" />
                  <span className="text-white/70">
                    {phone.value} · {phone.label}
                  </span>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <Mail className="text-primary h-5 w-5 shrink-0" />
                <span className="text-white/70">{content.contact.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                <span className="text-white/70">
                  {content.contact.hours[0]}
                  <br />
                  {content.contact.hours[1]}
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">{t('newsletter.title')}</h3>
            <p className="mb-4 text-sm text-white/70">{t('newsletter.description')}</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                className="focus:ring-primary flex-1 rounded-lg border-0 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-primary hover:bg-primary/90 shrink-0"
                aria-label={t('newsletter.subscribe')}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-3 text-xs text-white/50">{t('newsletter.note')}</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-sm text-white/50 md:flex-row">
          <p>{t('copyright', { year: currentYear })}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
