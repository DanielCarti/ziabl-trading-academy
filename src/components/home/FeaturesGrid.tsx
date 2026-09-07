'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { BookOpen, HelpCircle, BarChart3, BookMarked, Calculator, Trophy } from 'lucide-react';

export default function FeaturesGrid() {
  const t = useTranslations('home.features');

  const features = [
    { key: 'structured', icon: BookOpen, color: 'text-blue-400' },
    { key: 'quizzes', icon: HelpCircle, color: 'text-purple-400' },
    { key: 'charts', icon: BarChart3, color: 'text-accent' },
    { key: 'glossary', icon: BookMarked, color: 'text-yellow-400' },
    { key: 'calculators', icon: Calculator, color: 'text-orange-400' },
    { key: 'progress', icon: Trophy, color: 'text-pink-400' },
  ];

  return (
    <section className="py-20 bg-surface/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.key}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card !p-6 relative overflow-hidden group hover:border-accent/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-accent/5 cursor-default"
            >
              {/* Corner decorative light */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-colors pointer-events-none" />

              <div className="w-12 h-12 rounded-xl bg-surface-light border border-surface-border flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-accent/30 transition-all duration-300">
                <feat.icon className={`w-6 h-6 ${feat.color}`} />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
                {t(`${feat.key}.title`)}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {t(`${feat.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
