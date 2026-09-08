import { prisma } from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';
import { getLocalizedField } from '@/lib/utils';
import Link from 'next/link';
import { BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';

export default async function CoursesPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('courses');

  let modules: any[] = [];
  try {
    modules = await prisma.module.findMany({
      where: { published: true },
      include: {
        lessons: {
          where: { published: true },
          orderBy: { order: 'asc' },
          select: { id: true, slug: true, titleRu: true, titleEn: true, order: true },
        },
        _count: { select: { lessons: true } },
      },
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

  const defaultModuleIcons = ['💡', '📊', '🏛️', '📈', '💎', '🌪️', '🏦', '📉', '⚡', '🔍'];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">{t('title')}</h1>
          <p className="text-lg text-text-secondary">{t('subtitle')}</p>
        </div>

        {/* Modules */}
        <div className="space-y-6">
          {modules.map((mod, i) => (
            <div key={mod.id} className="card-hover">
              {/* Module Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl">{mod.icon || defaultModuleIcons[i] || '📘'}</div>
                <div className="flex-1">
                  <div className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">
                    {t('module')} {i + 1}
                  </div>
                  <h2 className="text-xl font-bold text-text-primary">
                    {getLocalizedField(mod, 'title', locale)}
                  </h2>
                  <p className="text-sm text-text-secondary mt-1">
                    {getLocalizedField(mod, 'desc', locale)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <BookOpen className="w-4 h-4 text-text-muted" />
                    <span className="text-xs text-text-muted">
                      {mod._count.lessons} {t('lessons')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lessons List */}
              <div className="ml-12 space-y-1">
                {mod.lessons.map((lesson: any) => (
                  <Link
                    key={lesson.id}
                    href={`/${locale}/lesson/${lesson.slug}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-light transition-all group"
                  >
                    <div className="w-6 h-6 rounded-full bg-surface-light border border-surface-border flex items-center justify-center text-xs text-text-muted group-hover:border-accent group-hover:text-accent transition-colors">
                      {lesson.order}
                    </div>
                    <span className="flex-1 text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                      {getLocalizedField(lesson, 'title', locale)}
                    </span>
                    <ChevronRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
