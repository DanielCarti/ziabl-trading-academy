import { prisma } from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';
import GlossaryClient from '@/components/glossary/GlossaryClient';

export default async function GlossaryPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('glossary');
  let terms: any[] = [];
  try {
    terms = await prisma.glossaryTerm.findMany({ orderBy: { termRu: 'asc' } });
  } catch (err) {
    const { mockGlossaryTerms } = await import('@/lib/mockData');
    terms = mockGlossaryTerms as any;
  }
  if (!terms || terms.length === 0) {
    const { mockGlossaryTerms } = await import('@/lib/mockData');
    terms = mockGlossaryTerms as any;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">{t('title')}</h1>
          <p className="text-lg text-text-secondary">{t('subtitle')}</p>
        </div>
        <GlossaryClient terms={terms} locale={locale} />
      </div>
    </div>
  );
}
