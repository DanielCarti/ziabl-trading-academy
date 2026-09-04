'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TrendingUp, Mail, Lock, User, AlertCircle } from 'lucide-react';

export default function SignUpPage() {
  const t = useTranslations('auth');
  const locale = useLocale();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Registration failed');
      }

      // Auto sign in
      await signIn('credentials', { email, password, redirect: false });
      router.push(`/${locale}/courses`);
    } catch (err: any) {
      setError(err.message || t('registerError'));
      setLoading(false);
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
            <h1 className="text-2xl font-bold text-text-primary">{t('signup')}</h1>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-danger/10 border border-danger/30 flex items-center gap-2 text-sm text-danger">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1">{t('name')}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input type="text" value={name} onChange={e => setName(e.target.value)} required className="input-field pl-11" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1">{t('email')}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input-field pl-11" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1">{t('password')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} className="input-field pl-11" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? '...' : t('createAccount')}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-text-secondary">
            {t('hasAccount')}{' '}
            <Link href={`/${locale}/auth/signin`} className="text-accent hover:text-accent-light transition-colors">
              {t('loginButton')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
