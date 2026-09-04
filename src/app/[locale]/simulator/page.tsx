import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';

const TradingSimulator = dynamic(() => import('@/components/charts/TradingSimulator'), {
  ssr: false,
  loading: () => (
    <div className="card h-[500px] flex items-center justify-center text-text-muted">
      Загрузка торгового симулятора...
    </div>
  ),
});

export default async function SimulatorPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('simulator');

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">{t('title')}</h1>
          <p className="text-text-secondary">
            {locale === 'ru'
              ? 'Практикуйтесь в совершении сделок на исторических данных без риска для реальных средств'
              : 'Practice trading on historical market data with zero financial risk'}
          </p>
        </div>

        <TradingSimulator />
      </div>
    </div>
  );
}
