import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocalizedField(
  item: any,
  field: string,
  locale: string
): string {
  if (!item) return '';
  const key = `${field}${locale === 'ru' ? 'Ru' : 'En'}`;
  return (item[key] as string) || (item[`${field}Ru`] as string) || '';
}

export function formatNumber(num: number, locale: string = 'ru'): string {
  return new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'en-US').format(num);
}

export function formatCurrency(amount: number, currency: string = 'RUB', locale: string = 'ru'): string {
  return new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercent(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

export function calculateCompoundInterest(
  principal: number,
  rate: number,
  years: number,
  compoundingPerYear: number = 12
): { total: number; interest: number; yearlyData: { year: number; total: number; interest: number }[] } {
  const yearlyData: { year: number; total: number; interest: number }[] = [];
  
  for (let year = 1; year <= years; year++) {
    const total = principal * Math.pow(1 + rate / 100 / compoundingPerYear, compoundingPerYear * year);
    yearlyData.push({
      year,
      total: Math.round(total * 100) / 100,
      interest: Math.round((total - principal) * 100) / 100,
    });
  }

  const finalTotal = yearlyData[yearlyData.length - 1]?.total || principal;
  return {
    total: finalTotal,
    interest: finalTotal - principal,
    yearlyData,
  };
}

export function calculateBondYTM(
  faceValue: number,
  currentPrice: number,
  couponRate: number,
  yearsToMaturity: number
): number {
  const coupon = faceValue * (couponRate / 100);
  // Approximate YTM formula
  const ytm = (coupon + (faceValue - currentPrice) / yearsToMaturity) / ((faceValue + currentPrice) / 2) * 100;
  return Math.round(ytm * 100) / 100;
}

export function calculatePositionSize(
  accountBalance: number,
  riskPercent: number,
  entryPrice: number,
  stopLossPrice: number
): { positionSize: number; shares: number; riskAmount: number } {
  const riskAmount = accountBalance * (riskPercent / 100);
  const riskPerShare = Math.abs(entryPrice - stopLossPrice);
  const shares = riskPerShare > 0 ? Math.floor(riskAmount / riskPerShare) : 0;
  const positionSize = shares * entryPrice;

  return {
    positionSize: Math.round(positionSize * 100) / 100,
    shares,
    riskAmount: Math.round(riskAmount * 100) / 100,
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
