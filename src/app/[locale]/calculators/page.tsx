import { getTranslations } from 'next-intl/server';
import CompoundCalculator from '@/components/calculator/CompoundCalculator';
import BondYieldCalculator from '@/components/calculator/BondYieldCalculator';
import PositionSizeCalculator from '@/components/calculator/PositionSizeCalculator';

export default async function CalculatorsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('calc');

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">{t('title')}</h1>
          <p className="text-lg text-text-secondary">{t('subtitle')}</p>
        </div>

        <div className="space-y-8">
          <CompoundCalculator />
          <BondYieldCalculator />
          <PositionSizeCalculator />
        </div>
      </div>
    </div>
  );
}
