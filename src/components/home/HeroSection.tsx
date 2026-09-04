'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { TrendingUp, ChevronRight } from 'lucide-react';

export default function HeroSection() {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />

      {/* Animated dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-accent/20"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-surface border border-surface-border rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-sm text-text-secondary">Free Trading Education</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6">
            <span className="gradient-text">{t('title')}</span>
          </h1>

          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${locale}/courses`} className="btn-primary text-lg !px-8 !py-4 animate-pulse-glow">
              {t('cta')}
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link href={`/${locale}/glossary`} className="btn-secondary text-lg !px-8 !py-4">
              {locale === 'ru' ? 'Глоссарий терминов' : 'Term Glossary'}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
