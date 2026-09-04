'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { calculateBondYTM, formatNumber } from '@/lib/utils';
import { BarChart3 } from 'lucide-react';

export default function BondYieldCalculator() {
  const t = useTranslations('calc.bond');
  const [faceValue, setFaceValue] = useState(1000);
  const [currentPrice, setCurrentPrice] = useState(950);
  const [couponRate, setCouponRate] = useState(7);
  const [yearsToMaturity, setYearsToMaturity] = useState(3);

  const result = useMemo(() => {
    const ytm = calculateBondYTM(faceValue, currentPrice, couponRate, yearsToMaturity);
    const currentYield = (faceValue * couponRate / 100 / currentPrice * 100);
    const totalCoupons = faceValue * (couponRate / 100) * yearsToMaturity;
    const capitalGain = faceValue - currentPrice;
    const totalReturn = totalCoupons + capitalGain;

    return {
      ytm: Math.round(ytm * 100) / 100,
      currentYield: Math.round(currentYield * 100) / 100,
      totalReturn: Math.round(totalReturn),
      totalCoupons: Math.round(totalCoupons),
      capitalGain,
    };
  }, [faceValue, currentPrice, couponRate, yearsToMaturity]);

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-chart-blue" />
        {t('title')}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-1">{t('faceValue')}</label>
            <input type="number" value={faceValue} onChange={e => setFaceValue(+e.target.value)} className="input-field font-mono" />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">{t('currentPrice')}</label>
            <input type="number" value={currentPrice} onChange={e => setCurrentPrice(+e.target.value)} className="input-field font-mono" />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">{t('couponRate')}</label>
            <input type="number" value={couponRate} step="0.25" onChange={e => setCouponRate(+e.target.value)} className="input-field font-mono" />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">{t('yearsToMaturity')}</label>
            <input type="number" value={yearsToMaturity} min="1" onChange={e => setYearsToMaturity(+e.target.value)} className="input-field font-mono" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-surface-light border border-surface-border">
              <div className="text-xs text-text-muted mb-1">{t('ytm')}</div>
              <div className="text-2xl font-bold text-accent font-mono">{result.ytm}%</div>
            </div>
            <div className="p-4 rounded-xl bg-surface-light border border-surface-border">
              <div className="text-xs text-text-muted mb-1">{t('currentYield')}</div>
              <div className="text-2xl font-bold text-chart-blue font-mono">{result.currentYield}%</div>
            </div>
          </div>

          {/* Visual breakdown */}
          <div className="p-4 rounded-xl bg-surface-light border border-surface-border">
            <div className="text-xs text-text-muted mb-3">{t('totalReturn')}</div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Купоны</span>
                  <span className="text-accent font-mono">₽{formatNumber(result.totalCoupons)}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${Math.min(100, (result.totalCoupons / (result.totalReturn || 1)) * 100)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Курсовая разница</span>
                  <span className={`font-mono ${result.capitalGain >= 0 ? 'text-accent' : 'text-danger'}`}>
                    ₽{result.capitalGain >= 0 ? '+' : ''}{formatNumber(result.capitalGain)}
                  </span>
                </div>
              </div>
              <hr className="border-surface-border" />
              <div className="flex justify-between text-sm font-bold">
                <span className="text-text-primary">Итого</span>
                <span className="text-accent font-mono">₽{formatNumber(result.totalReturn)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
