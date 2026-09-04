'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { calculatePositionSize, formatNumber } from '@/lib/utils';
import { Shield } from 'lucide-react';

export default function PositionSizeCalculator() {
  const t = useTranslations('calc.position');
  const [balance, setBalance] = useState(1000000);
  const [riskPercent, setRiskPercent] = useState(2);
  const [entryPrice, setEntryPrice] = useState(250);
  const [stopLoss, setStopLoss] = useState(240);

  const result = useMemo(() => {
    return calculatePositionSize(balance, riskPercent, entryPrice, stopLoss);
  }, [balance, riskPercent, entryPrice, stopLoss]);

  const riskRatio = (result.positionSize / balance) * 100;

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
        <Shield className="w-5 h-5 text-chart-yellow" />
        {t('title')}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-1">{t('accountBalance')}</label>
            <input type="number" value={balance} onChange={e => setBalance(+e.target.value)} className="input-field font-mono" />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">{t('riskPercent')}</label>
            <input type="number" value={riskPercent} step="0.5" min="0.5" max="10" onChange={e => setRiskPercent(+e.target.value)} className="input-field font-mono" />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">{t('entryPrice')}</label>
            <input type="number" value={entryPrice} onChange={e => setEntryPrice(+e.target.value)} className="input-field font-mono" />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">{t('stopLoss')}</label>
            <input type="number" value={stopLoss} onChange={e => setStopLoss(+e.target.value)} className="input-field font-mono" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 rounded-xl bg-surface-light border border-surface-border">
              <div className="text-xs text-text-muted mb-1">{t('shares')}</div>
              <div className="text-3xl font-bold text-accent font-mono">{result.shares}</div>
            </div>
            <div className="p-4 rounded-xl bg-surface-light border border-surface-border">
              <div className="text-xs text-text-muted mb-1">{t('positionSize')}</div>
              <div className="text-xl font-bold text-text-primary font-mono">₽{formatNumber(result.positionSize)}</div>
            </div>
            <div className="p-4 rounded-xl bg-surface-light border border-surface-border">
              <div className="text-xs text-text-muted mb-1">{t('riskAmount')}</div>
              <div className="text-xl font-bold text-danger font-mono">₽{formatNumber(result.riskAmount)}</div>
            </div>
          </div>

          {/* Risk visual indicator */}
          <div className="p-4 rounded-xl bg-surface-light border border-surface-border">
            <div className="text-xs text-text-muted mb-2">Позиция / Баланс</div>
            <div className="progress-bar h-4">
              <div
                className={`h-full rounded-full transition-all ${riskRatio > 30 ? 'bg-danger' : riskRatio > 15 ? 'bg-warning' : 'bg-accent'}`}
                style={{ width: `${Math.min(100, riskRatio)}%` }}
              />
            </div>
            <div className="text-right text-xs text-text-muted mt-1 font-mono">
              {riskRatio.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
