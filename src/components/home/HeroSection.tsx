'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { TrendingUp, ChevronRight, Activity, ShieldCheck, Zap, BarChart2 } from 'lucide-react';

export default function HeroSection() {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden py-16 lg:py-28">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-transparent pointer-events-none" />

      {/* Floating Animated Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-accent/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-chart-blue/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Floating decorative financial tags with Framer Motion */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:flex items-center gap-2.5 absolute top-24 left-12 card !p-3.5 bg-surface/90 backdrop-blur-md border-surface-border shadow-xl z-10"
      >
        <div className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
          <TrendingUp className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[11px] text-text-muted font-mono">LONG SBER</div>
          <div className="text-xs font-bold text-accent font-mono">+12.4% TP hit</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="hidden lg:flex items-center gap-2.5 absolute top-36 right-16 card !p-3.5 bg-surface/90 backdrop-blur-md border-surface-border shadow-xl z-10"
      >
        <div className="w-8 h-8 rounded-lg bg-chart-blue/15 text-chart-blue flex items-center justify-center">
          <Activity className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[11px] text-text-muted font-mono">IMOEX Index</div>
          <div className="text-xs font-bold text-text-primary font-mono">2,842.15 pts</div>
        </div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-surface/80 backdrop-blur-md border border-accent/30 rounded-full px-4 py-2 mb-6 shadow-sm hover:border-accent/60 transition-colors"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-xs sm:text-sm font-semibold text-text-primary">
              {locale === 'ru' ? 'Интерактивная Академия Трейдинга' : 'Free Interactive Trading Academy'}
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
            <span className="gradient-text">{t('title')}</span>
          </h1>

          <p className="text-base sm:text-xl text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/courses`}
              className="btn-primary text-base sm:text-lg !px-8 !py-3.5 shadow-lg shadow-accent/20 hover:shadow-accent/40 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>{t('cta')}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href={`/${locale}/glossary`}
              className="btn-secondary text-base sm:text-lg !px-8 !py-3.5 hover:border-accent/40 active:scale-95 transition-all"
            >
              {locale === 'ru' ? 'Глоссарий терминов' : 'Term Glossary'}
            </Link>
          </div>

          {/* Value props badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              <span>{locale === 'ru' ? 'Без рекламы и оплат' : '100% Free & Open'}</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-chart-blue" />
              <span>{locale === 'ru' ? 'Живые графики TradingView' : 'Interactive Charts'}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>{locale === 'ru' ? 'Проверенная теория рынков' : 'Verified Knowledge'}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
