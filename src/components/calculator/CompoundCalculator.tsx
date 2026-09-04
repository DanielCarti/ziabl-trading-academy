'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { calculateCompoundInterest, formatNumber } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';

export default function CompoundCalculator() {
  const t = useTranslations('calc.compound');
  const [principal, setPrincipal] = useState(100000);
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(10);

  const result = useMemo(() => {
    // Calculate with monthly contributions
    const data: { year: number; total: number }[] = [];
    let total = principal;
    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        total = (total + monthly) * (1 + rate / 100 / 12);
      }
      data.push({ year: y, total: Math.round(total) });
    }
    const totalContributions = principal + monthly * 12 * years;
    return { finalAmount: Math.round(total), interest: Math.round(total - totalContributions), data, totalContributions };
  }, [principal, monthly, rate, years]);

  const maxVal = Math.max(...result.data.map(d => d.total));

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-accent" />
        {t('title')}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-1">{t('initialAmount')}</label>
            <input type="number" value={principal} onChange={e => setPrincipal(+e.target.value)} className="input-field font-mono" />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">{t('monthlyContribution')}</label>
            <input type="number" value={monthly} onChange={e => setMonthly(+e.target.value)} className="input-field font-mono" />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">{t('annualRate')}</label>
            <input type="number" value={rate} step="0.5" onChange={e => setRate(+e.target.value)} className="input-field font-mono" />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">{t('years')}</label>
            <input type="range" min="1" max="30" value={years} onChange={e => setYears(+e.target.value)}
              className="w-full accent-accent" />
            <div className="text-center text-sm text-accent font-mono">{years}</div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-surface-border">
            <div className="p-3 rounded-lg bg-surface-light">
              <div className="text-xs text-text-muted">{t('totalAmount')}</div>
              <div className="text-lg font-bold text-accent font-mono">₽{formatNumber(result.finalAmount)}</div>
            </div>
            <div className="p-3 rounded-lg bg-surface-light">
              <div className="text-xs text-text-muted">{t('totalInterest')}</div>
              <div className="text-lg font-bold text-chart-green font-mono">₽{formatNumber(result.interest)}</div>
            </div>
          </div>
        </div>

        {/* Visual chart (CSS bars) */}
        <div>
          <div className="text-sm text-text-muted mb-3">{t('chartTitle')}</div>
          <div className="flex items-end gap-1 h-48">
            {result.data.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group">
                <div className="relative w-full">
                  <div
                    className="w-full bg-gradient-to-t from-accent to-accent-light rounded-t transition-all duration-300 group-hover:opacity-80"
                    style={{ height: `${(d.total / maxVal) * 180}px`, minHeight: '4px' }}
                  />
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface border border-surface-border rounded px-2 py-1 text-xs font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    ₽{formatNumber(d.total)}
                  </div>
                </div>
                {(i === 0 || i === result.data.length - 1 || (i + 1) % 5 === 0) && (
                  <span className="text-[10px] text-text-muted mt-1">{d.year}</span>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-text-muted mt-1">
            <span>1 год</span>
            <span>{years} лет</span>
          </div>
        </div>
      </div>
    </div>
  );
}
