import { prisma } from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';
import { getLocalizedField } from '@/lib/utils';
import Link from 'next/link';
import CoursesListClient from '@/components/courses/CoursesListClient';

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

        {/* Modules List with Completion Tracking */}
        <CoursesListClient
          modules={modules}
          locale={locale}
          moduleLabel={t('module')}
          lessonsLabel={t('lessons')}
          completedBadgeLabel={locale === 'ru' ? 'Пройден' : 'Completed'}
        />
      </div>
    </div>
  );
}
