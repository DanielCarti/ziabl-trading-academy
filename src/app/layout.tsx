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

import { ThemeProvider } from '@/components/providers/ThemeProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" lang="ru" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('ziabl_theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (storedTheme === 'light' || (!storedTheme && !prefersDark)) {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-text-primary transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
