'use client';

import { useEffect, useRef, useState } from 'react';

interface CandlestickChartProps {
  chartType?: string;
}

// Sample OHLC data for demonstration
const generateSampleData = () => {
  const data = [];
  let price = 150;
  const baseDate = new Date('2024-01-02');

  for (let i = 0; i < 120; i++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + i);
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    const change = (Math.random() - 0.48) * 5;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * 3;
    const low = Math.min(open, close) - Math.random() * 3;

    data.push({
      time: date.toISOString().split('T')[0],
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
    });

    price = close;
  }
  return data;
};

// Calculate SMA
function calcSMA(data: any[], period: number) {
  const sma: { time: string; value: number }[] = [];
  for (let i = period - 1; i < data.length; i++) {
    const sum = data.slice(i - period + 1, i + 1).reduce((a: number, b: any) => a + b.close, 0);
    sma.push({ time: data[i].time, value: Math.round((sum / period) * 100) / 100 });
  }
  return sma;
}

export default function CandlestickChart({ chartType = 'default' }: CandlestickChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let chart: any = null;

    const initChart = async () => {
      try {
        const { createChart, ColorType } = await import('lightweight-charts');
        if (!containerRef.current) return;

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
          height: 400,
          crosshair: {
            mode: 0,
          },
          timeScale: {
            borderColor: '#2a2a3a',
          },
          rightPriceScale: {
            borderColor: '#2a2a3a',
          },
        });

        const data = generateSampleData();

        // Candlestick series
        const candleSeries = chart.addCandlestickSeries({
          upColor: '#00d4aa',
          downColor: '#ff4757',
          borderUpColor: '#00d4aa',
          borderDownColor: '#ff4757',
          wickUpColor: '#00d4aa',
          wickDownColor: '#ff4757',
        });
        candleSeries.setData(data);

        // SMA lines for technical analysis lessons
        if (chartType === 'indicators' || chartType === 'default') {
          const sma20 = calcSMA(data, 20);
          const sma50 = calcSMA(data, 50);

          const sma20Series = chart.addLineSeries({ color: '#3b82f6', lineWidth: 2, title: 'SMA 20' });
          sma20Series.setData(sma20);

          if (sma50.length > 0) {
            const sma50Series = chart.addLineSeries({ color: '#fbbf24', lineWidth: 2, title: 'SMA 50' });
            sma50Series.setData(sma50);
          }
        }

        // Volume
        const volumeData = data.map((d: any) => ({
          time: d.time,
          value: Math.round(Math.random() * 1000000 + 500000),
          color: d.close >= d.open ? 'rgba(0, 212, 170, 0.3)' : 'rgba(255, 71, 87, 0.3)',
        }));

        const volumeSeries = chart.addHistogramSeries({
          priceFormat: { type: 'volume' },
          priceScaleId: 'volume',
        });
        volumeSeries.setData(volumeData);
        chart.priceScale('volume').applyOptions({
          scaleMargins: { top: 0.8, bottom: 0 },
        });

        chart.timeScale().fitContent();
        setLoaded(true);

        // Handle resize
        const handleResize = () => {
          if (containerRef.current) {
            chart.applyOptions({ width: containerRef.current.clientWidth });
          }
        };
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          chart.remove();
        };
      } catch (err) {
        console.error('Failed to load chart:', err);
      }
    };

    initChart();

    return () => {
      if (chart) chart.remove();
    };
  }, [chartType]);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-text-secondary">
          📊 Интерактивный график
        </h4>
        <div className="flex gap-2 text-xs">
          <span className="badge badge-green">SMA 20</span>
          <span className="badge bg-chart-yellow/10 text-chart-yellow">SMA 50</span>
        </div>
      </div>
      <div ref={containerRef} className="rounded-lg overflow-hidden border border-surface-border" />
      {!loaded && (
        <div className="h-[400px] flex items-center justify-center text-text-muted">
          Загрузка графика...
        </div>
      )}
    </div>
  );
}
