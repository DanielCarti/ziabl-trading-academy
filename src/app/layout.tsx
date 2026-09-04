import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Ziabl Trade Academy',
    template: '%s | Ziabl Trade Academy',
  },
  description: 'Бесплатная платформа для обучения трейдингу и инвестициям — от облигаций до технического анализа',
  keywords: ['трейдинг', 'обучение', 'инвестиции', 'акции', 'облигации', 'ОФЗ', 'технический анализ'],
  authors: [{ name: 'Ziabl Trade Academy' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Ziabl Trade Academy',
    description: 'Бесплатная платформа для обучения трейдингу и инвестициям',
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
