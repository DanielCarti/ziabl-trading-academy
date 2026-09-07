import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import AuthProvider from '@/components/providers/AuthProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NavigationProgress from '@/components/layout/NavigationProgress';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) notFound();

  const messages = await getMessages();

  return (
    <AuthProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <NavigationProgress />
        <Header />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </NextIntlClientProvider>
    </AuthProvider>
  );
}
