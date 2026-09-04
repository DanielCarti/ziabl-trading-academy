'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { formatNumber } from '@/lib/utils';
import { Play, Pause, RotateCcw, TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface Trade {
  id: number;
  type: 'BUY' | 'SELL';
  price: number;
  shares: number;
  time: string;
}

// Generate base realistic market series
function createMarketData(): CandleData[] {
  const data: CandleData[] = [];
  let price = 250.0;
  const startDate = new Date('2024-01-02');

  for (let i = 0; i < 150; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    if (d.getDay() === 0 || d.getDay() === 6) continue;

    const drift = (Math.random() - 0.49) * 4.5;
    const open = price;
    const close = Math.max(10, price + drift);
    const high = Math.max(open, close) + Math.random() * 2.5;
    const low = Math.min(open, close) - Math.random() * 2.5;

    data.push({
      time: d.toISOString().split('T')[0],
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
    });
    price = close;
  }
  return data;
}

export default function TradingSimulator() {
  const t = useTranslations('simulator');
  const fullDataRef = useRef<CandleData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);

  const [currentIndex, setCurrentIndex] = useState(40);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);

  // Trading state
  const initialBalance = 100000;
  const [balance, setBalance] = useState(initialBalance);
  const [shares, setShares] = useState(0);
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    fullDataRef.current = createMarketData();
  }, []);

  useEffect(() => {
    let chart: any = null;

    const init = async () => {
      if (!containerRef.current || fullDataRef.current.length === 0) return;

      const { createChart, ColorType } = await import('lightweight-charts');
      chart = createChart(containerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: '#12121a' },
          textColor: '#71717a',
          fontFamily: 'JetBrains Mono, monospace',
        },
        grid: {
          vertLines: { color: '#1a1a28' },
          horzLines: { color: '#1a1a28' },
        },
        width: containerRef.current.clientWidth,
        height: 420,
        timeScale: { borderColor: '#2a2a3a' },
        rightPriceScale: { borderColor: '#2a2a3a' },
      });

      const series = chart.addCandlestickSeries({
        upColor: '#00d4aa',
        downColor: '#ff4757',
        borderUpColor: '#00d4aa',
        borderDownColor: '#ff4757',
        wickUpColor: '#00d4aa',
        wickDownColor: '#ff4757',
      });

      series.setData(fullDataRef.current.slice(0, currentIndex));
      chart.timeScale().fitContent();

      chartInstanceRef.current = chart;
      seriesRef.current = series;

      const handleResize = () => {
        if (containerRef.current) {
          chart.applyOptions({ width: containerRef.current.clientWidth });
        }
      };
      window.addEventListener('resize', handleResize);
    };

    init();

    return () => {
      if (chart) chart.remove();
    };
  }, []);

  // Tick playback
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= fullDataRef.current.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        const nextIndex = prev + 1;
        const candle = fullDataRef.current[nextIndex];
        if (seriesRef.current && candle) {
          seriesRef.current.update(candle);
        }
        return nextIndex;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const currentCandle = fullDataRef.current[currentIndex] || fullDataRef.current[0];
  const currentPrice = currentCandle ? currentCandle.close : 0;
  const portfolioValue = balance + shares * currentPrice;
  const pnl = portfolioValue - initialBalance;
  const pnlPercent = (pnl / initialBalance) * 100;

  const handleBuy = (amount: number = 10) => {
    const cost = amount * currentPrice;
    if (balance < cost) return;

    setBalance((b) => b - cost);
    setShares((s) => s + amount);
    setTrades((tList) => [
      {
        id: Date.now(),
        type: 'BUY',
        price: currentPrice,
        shares: amount,
        time: currentCandle.time,
      },
      ...tList,
    ]);
  };

  const handleSell = (amount: number = 10) => {
    const sellCount = Math.min(shares, amount);
    if (sellCount <= 0) return;

    const revenue = sellCount * currentPrice;
    setBalance((b) => b + revenue);
    setShares((s) => s - sellCount);
    setTrades((tList) => [
      {
        id: Date.now(),
        type: 'SELL',
        price: currentPrice,
        shares: sellCount,
        time: currentCandle.time,
      },
      ...tList,
    ]);
  };

  const handleReset = () => {
    setIsPlaying(false);
    fullDataRef.current = createMarketData();
    setCurrentIndex(40);
    setBalance(initialBalance);
    setShares(0);
    setTrades([]);
    if (seriesRef.current) {
      seriesRef.current.setData(fullDataRef.current.slice(0, 40));
      if (chartInstanceRef.current) {
        chartInstanceRef.current.timeScale().fitContent();
      }
    }
  };

  return (
    <div className="card space-y-6">
      {/* Header and Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-surface-border pb-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-accent" />
            {t('title')}
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Практикуйте сделки на симулированном историческом графике
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm font-mono">
          <div className="px-3 py-2 bg-surface-light rounded-lg border border-surface-border">
            <span className="text-text-muted text-xs block">{t('balance')}</span>
            <span className="text-text-primary font-bold">₽{formatNumber(Math.round(balance))}</span>
          </div>

          <div className="px-3 py-2 bg-surface-light rounded-lg border border-surface-border">
            <span className="text-text-muted text-xs block">{t('portfolio')}</span>
            <span className="text-text-primary font-bold">₽{formatNumber(Math.round(portfolioValue))}</span>
          </div>

          <div className="px-3 py-2 bg-surface-light rounded-lg border border-surface-border">
            <span className="text-text-muted text-xs block">{t('pnl')}</span>
            <span className={`font-bold flex items-center gap-1 ${pnl >= 0 ? 'text-accent' : 'text-danger'}`}>
              {pnl >= 0 ? '+' : ''}₽{formatNumber(Math.round(pnl))} ({pnlPercent.toFixed(2)}%)
            </span>
          </div>

          <div className="px-3 py-2 bg-surface-light rounded-lg border border-surface-border">
            <span className="text-text-muted text-xs block">В позиции</span>
            <span className="text-chart-blue font-bold">{shares} {t('shares')}</span>
          </div>
        </div>
      </div>

      {/* Playback Controls and Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`btn-primary !py-2 !px-4 text-sm ${isPlaying ? '!bg-warning hover:!bg-warning-light text-black' : ''}`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Пауза' : 'Пуск'}
          </button>

          <button onClick={handleReset} className="btn-secondary !py-2 !px-3 text-sm" title={t('reset')}>
            <RotateCcw className="w-4 h-4" />
          </button>

          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="px-3 py-2 bg-surface-light border border-surface-border rounded-lg text-xs font-mono text-text-primary"
          >
            <option value={1500}>0.5x Скорость</option>
            <option value={800}>1x Скорость</option>
            <option value={300}>2x Скорость</option>
          </select>

          <div className="text-xs text-text-muted font-mono ml-2">
            Свеча: {currentIndex + 1} / {fullDataRef.current.length} ({currentCandle?.time})
          </div>
        </div>

        {/* Buy / Sell buttons */}
        <div className="flex items-center gap-3">
          <div className="text-right pr-2">
            <div className="text-xs text-text-muted">{t('price')}</div>
            <div className="text-xl font-bold font-mono text-text-primary">
              ₽{currentPrice.toFixed(2)}
            </div>
          </div>

          <button
            onClick={() => handleBuy(10)}
            disabled={balance < currentPrice * 10}
            className="btn-primary !py-2.5 !px-5 text-sm !bg-accent hover:!bg-accent-light"
          >
            {t('buy')} 10 шт
          </button>

          <button
            onClick={() => handleSell(10)}
            disabled={shares < 10}
            className="btn-danger !py-2.5 !px-5 text-sm"
          >
            {t('sell')} 10 шт
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div ref={containerRef} className="rounded-xl overflow-hidden border border-surface-border" />

      {/* Trade Log */}
      <div>
        <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
          {t('history')} ({trades.length})
        </h4>

        {trades.length === 0 ? (
          <div className="p-4 rounded-lg bg-surface-light border border-surface-border text-xs text-text-muted text-center">
            Сделок пока нет. Нажмите «Купить» для открытия позиции.
          </div>
        ) : (
          <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
            {trades.map((tr) => (
              <div
                key={tr.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-surface-light border border-surface-border text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span className={`badge font-bold ${tr.type === 'BUY' ? 'badge-green' : 'badge-red'}`}>
                    {tr.type}
                  </span>
                  <span className="text-text-primary">{tr.shares} шт @ ₽{tr.price.toFixed(2)}</span>
                </div>
                <span className="text-text-muted">{tr.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
