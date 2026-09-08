'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-surface border-t border-surface-border mt-auto transition-colors duration-300">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & tagline */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-3 w-fit group">
              <div className="w-8 h-8 rounded-xl overflow-hidden border border-accent/40 shadow-[0_0_10px_rgba(0,229,179,0.3)] shrink-0 group-hover:scale-105 transition-transform">
                <img src="/logo.jpg" alt="Ziabl Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold gradient-text">ZIABL</span>
                <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Trade Academy</span>
              </div>
            </Link>
            <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider">{t('navigation')}</h4>
            <div className="space-y-2">
              {[
                { label: t('courses'), href: `/${locale}/courses` },
                { label: t('simulator'), href: `/${locale}/simulator` },
                { label: t('glossary'), href: `/${locale}/glossary` },
                { label: t('calculators'), href: `/${locale}/calculators` },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Info & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider">{t('info')}</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              {t('disclaimer')}
            </p>
            <div className="pt-1">
              <Link
                href={`/${locale}/privacy`}
                className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-medium"
              >
                <span>{locale === 'ru' ? 'Политика обработки ПДн (152-ФЗ)' : 'Privacy Policy & Compliance'}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-surface-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            © {year} Ziabl Trade Academy. {t('rights')}.
          </p>
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <Link href={`/${locale}/privacy`} className="hover:text-accent transition-colors">
              {locale === 'ru' ? 'Конфиденциальность' : 'Privacy'}
            </Link>
            <span>•</span>
            <span>v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
