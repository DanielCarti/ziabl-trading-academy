import { prisma } from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';
import { getLocalizedField } from '@/lib/utils';
import HeroSection from '@/components/home/HeroSection';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('home');
  const tCourses = await getTranslations('courses');

  let modules: any[] = [];
  try {
    modules = await prisma.module.findMany({
      where: { published: true },
      include: { _count: { select: { lessons: true } } },
      orderBy: { order: 'asc' },
    });
  } catch (err) {
    const { mockModules } = await import('@/lib/mockData');
    modules = mockModules as any;
  }
  if (!modules || modules.length === 0) {
    const { mockModules } = await import('@/lib/mockData');
    modules = mockModules as any;
  }

  const moduleIcons = ['📊', '📈', '🏦', '⚡', '🔍', '📉'];

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Stats */}
      <section className="py-12 border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '6', label: t('stats.modules') },
              { value: '15', label: t('stats.lessons') },
              { value: '15', label: t('stats.quizzes') },
              { value: '50+', label: t('stats.terms') },
            ].map((stat, i) => (
              <div key={i} className="card text-center">
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-text-secondary mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturesGrid />

      {/* Modules Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">{tCourses('title')}</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">{tCourses('subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod, i) => (
              <Link
                key={mod.id}
                href={`/${locale}/courses`}
                className="card-hover group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{moduleIcons[i] || '📘'}</div>
                  <div className="flex-1">
                    <div className="text-xs text-text-muted mb-1">{tCourses('module')} {i + 1}</div>
                    <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
                      {getLocalizedField(mod, 'title', locale)}
                    </h3>
                    <p className="text-sm text-text-secondary mt-2 line-clamp-2">
                      {getLocalizedField(mod, 'desc', locale)}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <BookOpen className="w-4 h-4 text-accent" />
                      <span className="text-xs text-text-muted">{mod._count.lessons} {tCourses('lessons')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-4 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {tCourses('startLearning')} <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
