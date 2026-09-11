'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieBanner() {
  const locale = useLocale();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookie policy
    const accepted = localStorage.getItem('ziabl_cookie_consent');
    if (!accepted) {
      // Slight delay for smooth UX entrance
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ziabl_cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('ziabl_cookie_consent', 'essential_only');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  const isRu = locale === 'ru';

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-fade-in">
      <div className="bg-surface/95 backdrop-blur-md border border-accent/30 p-4 sm:p-5 rounded-2xl shadow-2xl shadow-black/40 text-text-primary">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 flex-1 text-xs leading-relaxed text-text-secondary">
            <h4 className="font-semibold text-text-primary text-sm">
              {isRu ? 'Файлы cookie и 152-ФЗ' : 'Cookies & Privacy Notice'}
            </h4>
            <p>
              {isRu ? (
                <>
                  Мы используем файлы cookie и локальные хранилища для корректной работы платформы, сохранения ваших настроек и безопасности. Продолжая использование сайта, вы соглашаетесь с нашей{' '}
                  <Link
                    href={`/${locale}/privacy`}
                    className="text-accent hover:underline font-medium"
                  >
                    Политикой конфиденциальности
                  </Link>
                  .
                </>
              ) : (
                <>
                  We use cookies and local storage to provide necessary website functionality, retain your preferences, and ensure security. By continuing to browse, you agree to our{' '}
                  <Link
                    href={`/${locale}/privacy`}
                    className="text-accent hover:underline font-medium"
                  >
                    Privacy Policy
                  </Link>
                  .
                </>
              )}
            </p>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="text-text-muted hover:text-text-primary p-1 -mr-1 -mt-1 transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-surface-border">
          <button
            type="button"
            onClick={handleReject}
            className="px-3 py-1.5 rounded-lg text-xs text-text-muted hover:text-danger hover:bg-danger/10 border border-surface-border/60 transition-colors"
          >
            {isRu ? 'Только технические (Отклонить)' : 'Essential only (Decline)'}
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="btn-primary !py-1.5 !px-4 text-xs font-semibold shadow-sm"
          >
            {isRu ? 'Принять все' : 'Accept All'}
          </button>
        </div>
      </div>
    </div>
  );
}
