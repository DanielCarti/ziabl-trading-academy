'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { TrendingUp, Mail, Lock, AlertCircle } from 'lucide-react';

export default function SignInPage() {
  const t = useTranslations('auth');
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const urlError = searchParams.get('error');
  const [error, setError] = useState(
    urlError ? (urlError === 'Callback' ? 'Ошибка входа через внешнюю службу' : urlError) : ''
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(t('error'));
      setLoading(false);
    } else {
      // Determine if user has a preferred locale in DB, else use current
      try {
        const prefRes = await fetch('/api/user/preferences');
        if (prefRes.ok) {
          const prefData = await prefRes.json();
          if (prefData?.locale && (prefData.locale === 'ru' || prefData.locale === 'en')) {
            const target = searchParams.get('callbackUrl') || `/${prefData.locale}/courses`;
            window.location.href = target.replace(/^\/(ru|en)/, `/${prefData.locale}`);
            return;
          }
        }
      } catch (e) {}

      const destination = searchParams.get('callbackUrl') || `/${locale}/courses`;
      window.location.href = destination;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <TrendingUp className="w-8 h-8 text-accent" />
              <span className="text-2xl font-bold gradient-text">ZIABL</span>
            </div>
            <h1 className="text-2xl font-bold text-text-primary">{t('signin')}</h1>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-danger/10 border border-danger/30 flex items-center gap-2 text-sm text-danger">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1">{t('email')}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field pl-11"
                  placeholder="user@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1">{t('password')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field pl-11"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? '...' : t('loginButton')}
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-6">
            <div className="relative flex items-center justify-center mb-4">
              <div className="border-t border-surface-border w-full" />
              <span className="bg-surface px-3 text-xs text-text-muted uppercase tracking-wider">или через соцсети</span>
              <div className="border-t border-surface-border w-full" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => signIn('yandex', { callbackUrl: `/${locale}/courses` })}
                className="btn-secondary !py-2.5 !px-2 flex items-center justify-center gap-1.5 text-xs font-semibold hover:border-[#fc3f1d]/50"
                title="Войти через Яндекс"
              >
                <span className="text-[#fc3f1d] font-bold text-sm">Я</span>
                <span>Яндекс</span>
              </button>

              <button
                type="button"
                onClick={() => signIn('google', { callbackUrl: `/${locale}/courses` })}
                className="btn-secondary !py-2.5 !px-2 flex items-center justify-center gap-1.5 text-xs font-semibold hover:border-accent/50"
                title="Войти через Google"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => signIn('github', { callbackUrl: `/${locale}/courses` })}
                className="btn-secondary !py-2.5 !px-2 flex items-center justify-center gap-1.5 text-xs font-semibold hover:border-text-primary/50"
                title="Войти через GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </button>
            </div>
          </div>

          {/* Quick Demo Login */}
          <div className="mt-5 p-3 rounded-lg bg-surface-light border border-surface-border text-xs text-center space-y-2">
            <span className="text-text-muted block">Быстрый тестовый вход (локально):</span>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@ziabl.ru');
                  setPassword('admin123');
                }}
                className="px-2.5 py-1 rounded bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition-colors text-xs font-mono"
              >
                Администратор
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('student@ziabl.ru');
                  setPassword('demo123');
                }}
                className="px-2.5 py-1 rounded bg-surface border border-surface-border text-text-secondary hover:text-text-primary transition-colors text-xs font-mono"
              >
                Студент
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-text-secondary">
            {t('noAccount')}{' '}
            <Link href={`/${locale}/auth/signup`} className="text-accent hover:text-accent-light transition-colors">
              {t('createAccount')}
            </Link>
          </div>

          <p className="mt-4 text-[11px] text-text-muted text-center leading-relaxed">
            Входя в аккаунт, вы соглашаетесь с{' '}
            <Link href={`/${locale}/privacy`} className="text-accent hover:underline">
              Политикой обработки персональных данных (152-ФЗ)
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
