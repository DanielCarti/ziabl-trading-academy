'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  isPositive: boolean;
}

const initialTickers: TickerItem[] = [
  { symbol: 'IMOEX', name: 'Индекс МосБиржи', price: 2842.15, change: +0.64, isPositive: true },
  { symbol: 'SBER', name: 'Сбербанк', price: 294.80, change: +1.28, isPositive: true },
  { symbol: 'GAZP', name: 'Газпром', price: 128.40, change: -0.42, isPositive: false },
  { symbol: 'LKOH', name: 'Лукойл', price: 6780.00, change: +0.85, isPositive: true },
  { symbol: 'YNDX', name: 'Яндекс', price: 4190.50, change: +2.15, isPositive: true },
  { symbol: 'OFZ 26238', name: 'ОФЗ 26238', price: 54.12, change: +0.18, isPositive: true },
  { symbol: 'BTC/USD', name: 'Bitcoin', price: 63840, change: -0.92, isPositive: false },
  { symbol: 'ETH/USD', name: 'Ethereum', price: 2640, change: +1.45, isPositive: true },
  { symbol: 'GOLD', name: 'Золото (RUB/g)', price: 7450, change: +0.33, isPositive: true },
  { symbol: 'CNY/RUB', name: 'Юань / Рубль', price: 12.85, change: -0.22, isPositive: false },
];

export default function MarketTicker() {
  const [tickers, setTickers] = useState<TickerItem[]>(initialTickers);

  // Micro-fluctuations to simulate a live active exchange feed
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) =>
        prev.map((item) => {
          if (Math.random() > 0.4) return item;
          const delta = (Math.random() - 0.48) * (item.price * 0.002);
          const newPrice = Math.max(0.01, +(item.price + delta).toFixed(2));
          const changeDelta = +(delta / item.price * 100).toFixed(2);
          const newChange = +(item.change + changeDelta).toFixed(2);
          return {
            ...item,
            price: newPrice,
            change: newChange,
            isPositive: newChange >= 0,
          };
        })
      );
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-surface/80 backdrop-blur-md border-y border-surface-border py-2.5 overflow-hidden select-none relative group">
      <div className="flex w-max animate-ticker hover:[animation-play-state:paused]">
        {/* Double array to create seamless infinite scroll loop */}
        {[...tickers, ...tickers].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 px-6 border-r border-surface-border/50 text-xs shrink-0"
          >
            <span className="font-bold text-text-primary font-mono">{item.symbol}</span>
            <span className="font-mono text-text-secondary">
              {item.price.toLocaleString('ru-RU', { minimumFractionDigits: 2 })}
            </span>
            <span
              className={`flex items-center gap-0.5 font-mono font-semibold text-[11px] ${
                item.isPositive ? 'text-accent' : 'text-danger'
              }`}
            >
              {item.isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {item.isPositive ? `+${item.change.toFixed(2)}%` : `${item.change.toFixed(2)}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
