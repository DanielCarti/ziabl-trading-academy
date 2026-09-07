'use client';

import { useSession, signOut } from 'next-auth/react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User, Mail, Shield, BookOpen, Award, CheckCircle2,
  Clock, ArrowRight, LayoutDashboard, Settings, LogOut,
  Sparkles, Moon, Sun, Globe, KeyRound, Lock, Smartphone,
  Check, QrCode, ExternalLink, AlertCircle, Copy
} from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { startNavigationProgress } from '@/components/layout/NavigationProgress';
import { mockModules } from '@/lib/mockData';

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const t = useTranslations('profile');
  const navT = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const [nameInput, setNameInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [progressData, setProgressData] = useState({
    totalLessons: 13,
    completedCount: 3,
    percentage: 23,
    quizzesPassed: 3,
    averageScore: 92,
  });

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // 2FA state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorModalOpen, setTwoFactorModalOpen] = useState(false);
  const [totpCode, setTotpCode] = useState('');
  const [totpError, setTotpError] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);
  const secretKeyMock = 'JBSWY3DPEHPK3PXP';

  // Linked accounts state
  const [linkedAccounts, setLinkedAccounts] = useState({
    yandex: true,
    google: false,
    github: false,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored2FA = localStorage.getItem('ziabl_2fa_enabled');
      if (stored2FA === 'true') setTwoFactorEnabled(true);

      const storedProviders = localStorage.getItem('ziabl_linked_providers');
      if (storedProviders) {
        try {
          setLinkedAccounts(JSON.parse(storedProviders));
        } catch (e) {}
      }
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (newPassword.length < 6) {
      setPasswordError(t('passwordTooShort'));
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError(t('passwordMismatch'));
      return;
    }

    // Mock successful password change
    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(false), 4000);
  };

  const handleToggle2FA = () => {
    if (twoFactorEnabled) {
      setTwoFactorEnabled(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem('ziabl_2fa_enabled', 'false');
      }
    } else {
      setTotpCode('');
      setTotpError('');
      setTwoFactorModalOpen(true);
    }
  };

  const handleConfirm2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (!totpCode || totpCode.trim().length !== 6 || !/^\d+$/.test(totpCode.trim())) {
      setTotpError(t('invalidCode'));
      return;
    }
    setTwoFactorEnabled(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ziabl_2fa_enabled', 'true');
    }
    setTwoFactorModalOpen(false);
  };

  const toggleLinkedAccount = (provider: 'google' | 'github' | 'yandex') => {
    setLinkedAccounts((prev) => {
      const next = { ...prev, [provider]: !prev[provider] };
      if (typeof window !== 'undefined') {
        localStorage.setItem('ziabl_linked_providers', JSON.stringify(next));
      }
      return next;
    });
  };

  const copySecretKey = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(secretKeyMock);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/${locale}/auth/signin?callbackUrl=/${locale}/profile`);
    }
  }, [status, router, locale]);

  useEffect(() => {
    const localName = typeof window !== 'undefined' ? localStorage.getItem('ziabl_user_name') : null;
    if (localName) {
      setNameInput(localName);
    } else if (session?.user?.name) {
      setNameInput(session.user.name);
    }
  }, [session]);

  useEffect(() => {
    fetch('/api/progress')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.totalLessons === 'number') {
          setProgressData((prev) => ({
            ...prev,
            totalLessons: data.totalLessons,
            completedCount: data.completedCount || 3,
            percentage: data.percentage || 23,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    if (typeof window !== 'undefined') {
      localStorage.setItem('ziabl_user_name', nameInput.trim());
    }

    if (update) {
      await update({ name: nameInput.trim() });
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    startNavigationProgress();
    router.push(`/${newLocale}/profile`);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const role = (session.user as any).role || 'USER';
  const isAdmin = role === 'ADMIN';

  // Find some recommended/recent lessons from mock data
  const sampleLessons = mockModules.flatMap((m) => m.lessons).slice(0, 3);

  return (
    <div className="min-h-screen py-10 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Hero */}
        <div className="card relative overflow-hidden bg-gradient-to-br from-surface via-surface to-surface-light border-surface-border">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent/40 flex items-center justify-center text-accent text-3xl font-extrabold shadow-lg shadow-accent/10">
                {(nameInput || session.user.name || session.user.email || 'U')[0].toUpperCase()}
              </div>

              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
                    {nameInput || session.user.name || 'Студент Ziabl'}
                  </h1>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                      isAdmin
                        ? 'bg-accent/15 text-accent border border-accent/30'
                        : 'bg-chart-blue/15 text-chart-blue border border-chart-blue/30'
                    }`}
                  >
                    {isAdmin ? t('admin') : t('student')}
                  </span>
                </div>
                
                <p className="text-sm text-text-secondary mt-1 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-text-muted" />
                  <span>{session.user.email}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isAdmin && (
                <Link href="/admin" className="btn-secondary gap-2 text-xs font-semibold">
                  <LayoutDashboard className="w-4 h-4 text-accent" />
                  {navT('admin')}
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: `/${locale}` })}
                className="btn-ghost !text-danger hover:bg-danger/10 text-xs font-medium gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                {t('signOut')}
              </button>
            </div>
          </div>
        </div>

        {/* Learning Statistics Grid */}
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            {t('stats')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card flex items-center gap-4 hover:border-accent/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-text-primary">
                  {progressData.completedCount} / {progressData.totalLessons}
                </div>
                <div className="text-xs text-text-muted">{t('completedLessons')}</div>
              </div>
            </div>

            <div className="card flex items-center gap-4 hover:border-accent/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-chart-blue/10 text-chart-blue flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-text-primary">
                  {progressData.quizzesPassed}
                </div>
                <div className="text-xs text-text-muted">{t('passedQuizzes')}</div>
              </div>
            </div>

            <div className="card flex items-center gap-4 hover:border-accent/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-chart-yellow/10 text-chart-yellow flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-text-primary">
                  {progressData.averageScore}%
                </div>
                <div className="text-xs text-text-muted">{t('averageScore')}</div>
              </div>
            </div>

            <div className="card flex items-center gap-4 hover:border-accent/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-chart-purple/10 text-chart-purple flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-text-primary">
                  4.5 ч.
                </div>
                <div className="text-xs text-text-muted">{t('studyTime')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Progress Bar Card */}
        <div className="card space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-text-primary">{t('overallProgress')}</span>
            <span className="font-mono text-accent font-bold">{progressData.percentage}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-surface-light overflow-hidden border border-surface-border">
            <div
              className="h-full bg-gradient-to-r from-accent to-chart-blue transition-all duration-500 rounded-full"
              style={{ width: `${progressData.percentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>Продолжайте обучение для открытия всех сертификатов</span>
            <Link href={`/${locale}/courses`} className="text-accent hover:underline flex items-center gap-1 font-medium">
              <span>{t('goToCourses')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 2-Column Section: Continue Learning & Account Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Continue Learning Column */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" />
              {t('continueStudy')}
            </h2>

            <div className="space-y-3">
              {sampleLessons.map((lesson, idx) => (
                <div
                  key={lesson.id}
                  className="card flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-accent/40 transition-all group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-accent">Урок {idx + 1}</span>
                      {idx === 0 && (
                        <span className="badge bg-accent/10 text-accent text-[10px]">В процессе</span>
                      )}
                    </div>
                    <h3 className="font-bold text-text-primary group-hover:text-accent transition-colors">
                      {locale === 'ru' ? lesson.titleRu : lesson.titleEn}
                    </h3>
                  </div>

                  <Link
                    href={`/${locale}/lesson/${lesson.slug}`}
                    className="btn-primary !py-2 !px-4 text-xs gap-1.5 shrink-0 self-start sm:self-center"
                  >
                    <span>Открыть</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Account Settings Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <Settings className="w-5 h-5 text-accent" />
              {t('settings')}
            </h2>

            <div className="card space-y-5">
              {savedSuccess && (
                <div className="p-3 rounded-xl bg-accent/10 border border-accent/30 text-accent text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{t('savedSuccess')}</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                    {t('editName')}
                  </label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder={t('namePlaceholder')}
                    className="input-field text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={session.user.email || ''}
                    disabled
                    className="input-field text-sm opacity-60 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-2">
                    {t('theme')}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => theme === 'light' && toggleTheme()}
                      className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        theme === 'dark'
                          ? 'bg-accent/10 border-accent text-accent shadow-sm'
                          : 'bg-surface-light border-surface-border text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <Moon className="w-4 h-4" />
                      <span>Тёмная</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => theme === 'dark' && toggleTheme()}
                      className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        theme === 'light'
                          ? 'bg-accent/10 border-accent text-accent shadow-sm'
                          : 'bg-surface-light border-surface-border text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <Sun className="w-4 h-4" />
                      <span>Светлая</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-2">
                    {t('language')}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => switchLocale('ru')}
                      className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        locale === 'ru'
                          ? 'bg-accent/10 border-accent text-accent shadow-sm'
                          : 'bg-surface-light border-surface-border text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <span>🇷🇺 Русский</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => switchLocale('en')}
                      className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        locale === 'en'
                          ? 'bg-accent/10 border-accent text-accent shadow-sm'
                          : 'bg-surface-light border-surface-border text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <span>🇬🇧 English</span>
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full text-xs font-semibold py-2.5">
                  {t('saveChanges')}
                </button>
              </form>
            </div>

            {/* Linked Social Accounts Card */}
            <div className="card space-y-4">
              <div>
                <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                  <Globe className="w-4 h-4 text-accent" />
                  {t('linkedAccounts')}
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  {t('linkedAccountsDesc')}
                </p>
              </div>

              <div className="space-y-2.5">
                {/* Yandex */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-light border border-surface-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#fc3f1d]/15 text-[#fc3f1d] flex items-center justify-center font-bold text-sm">
                      Я
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-text-primary">Яндекс ID</div>
                      <div className="text-[11px] text-text-muted">
                        {linkedAccounts.yandex ? (session.user.email || 'yandex-user') : t('notConnected')}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleLinkedAccount('yandex')}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      linkedAccounts.yandex
                        ? 'bg-accent/15 text-accent border border-accent/30 hover:bg-accent/25'
                        : 'btn-secondary !py-1 !px-2.5 text-xs'
                    }`}
                  >
                    {linkedAccounts.yandex ? t('connected') : t('connect')}
                  </button>
                </div>

                {/* Google */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-light border border-surface-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center font-bold text-sm">
                      G
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-text-primary">Google</div>
                      <div className="text-[11px] text-text-muted">
                        {linkedAccounts.google ? 'user@gmail.com' : t('notConnected')}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleLinkedAccount('google')}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      linkedAccounts.google
                        ? 'bg-accent/15 text-accent border border-accent/30 hover:bg-accent/25'
                        : 'btn-secondary !py-1 !px-2.5 text-xs'
                    }`}
                  >
                    {linkedAccounts.google ? t('connected') : t('connect')}
                  </button>
                </div>

                {/* GitHub */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-light border border-surface-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-border text-text-primary flex items-center justify-center font-bold text-sm">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-text-primary">GitHub</div>
                      <div className="text-[11px] text-text-muted">
                        {linkedAccounts.github ? 'github-connected' : t('notConnected')}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleLinkedAccount('github')}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      linkedAccounts.github
                        ? 'bg-accent/15 text-accent border border-accent/30 hover:bg-accent/25'
                        : 'btn-secondary !py-1 !px-2.5 text-xs'
                    }`}
                  >
                    {linkedAccounts.github ? t('connected') : t('connect')}
                  </button>
                </div>
              </div>
            </div>

            {/* Security & Password Card */}
            <div className="card space-y-5">
              <div>
                <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-accent" />
                  {t('security')}
                </h3>
              </div>

              {passwordSuccess && (
                <div className="p-3 rounded-xl bg-accent/10 border border-accent/30 text-accent text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{t('passwordSuccess')}</span>
                </div>
              )}

              {passwordError && (
                <div className="p-3 rounded-xl bg-danger/10 border border-danger/30 text-danger text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              {/* Password Form */}
              <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">
                    {t('currentPassword')}
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">
                    {t('newPassword')}
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="input-field text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">
                    {t('confirmNewPassword')}
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="input-field text-sm"
                  />
                </div>

                <button type="submit" className="btn-secondary w-full text-xs font-semibold py-2.5">
                  {t('updatePasswordBtn')}
                </button>
              </form>

              <hr className="border-surface-border/60" />

              {/* Two-Factor Authentication Toggle */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-accent" />
                      <span className="text-xs font-bold text-text-primary">{t('twoFactor')}</span>
                    </div>
                    <p className="text-[11px] text-text-muted mt-1">
                      {t('twoFactorDesc')}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ${
                      twoFactorEnabled
                        ? 'bg-accent/15 text-accent border border-accent/30'
                        : 'bg-surface-border text-text-muted'
                    }`}
                  >
                    {twoFactorEnabled ? 'ON' : 'OFF'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleToggle2FA}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                    twoFactorEnabled
                      ? 'border border-danger/40 text-danger hover:bg-danger/10'
                      : 'btn-primary'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>{twoFactorEnabled ? t('disable2FA') : t('enable2FA')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2FA Setup Modal */}
      {twoFactorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="card max-w-md w-full bg-surface border-surface-border p-6 shadow-2xl relative space-y-5 animate-scale-in">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <div className="flex items-center gap-2 text-text-primary font-bold">
                <Shield className="w-5 h-5 text-accent" />
                <span>{t('setup2FATitle')}</span>
              </div>
              <button
                type="button"
                onClick={() => setTwoFactorModalOpen(false)}
                className="text-text-muted hover:text-text-primary text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed">
              {t('setup2FAStep1')}
            </p>

            {/* QR Code Container Mock */}
            <div className="flex flex-col items-center justify-center p-4 bg-surface-light rounded-xl border border-surface-border">
              {/* Stylized QR placeholder */}
              <div className="w-36 h-36 bg-white p-2 rounded-lg shadow-inner flex flex-col items-center justify-center text-slate-900 border border-slate-300 relative">
                <div className="w-full h-full flex flex-wrap gap-1 items-center justify-center">
                  <div className="w-10 h-10 border-4 border-black rounded-sm flex items-center justify-center">
                    <div className="w-4 h-4 bg-black" />
                  </div>
                  <div className="w-12 h-10 flex flex-col justify-between py-1">
                    <div className="h-1.5 w-full bg-black rounded-sm" />
                    <div className="h-1.5 w-3/4 bg-black rounded-sm" />
                    <div className="h-1.5 w-full bg-black rounded-sm" />
                  </div>
                  <div className="w-10 h-10 border-4 border-black rounded-sm flex items-center justify-center">
                    <div className="w-4 h-4 bg-black" />
                  </div>
                  <div className="w-full flex items-center justify-center gap-1 my-1">
                    <div className="w-2 h-2 bg-black" />
                    <div className="w-6 h-2 bg-black" />
                    <div className="w-2 h-2 bg-black" />
                    <div className="w-4 h-2 bg-black" />
                  </div>
                  <div className="w-10 h-10 border-4 border-black rounded-sm flex items-center justify-center">
                    <div className="w-4 h-4 bg-black" />
                  </div>
                  <div className="w-12 h-10 flex items-center justify-center font-mono text-[9px] font-bold text-center tracking-tighter">
                    ZIABL 2FA
                  </div>
                </div>
              </div>

              {/* Secret key with copy button */}
              <div className="mt-3 flex items-center gap-2 bg-surface px-3 py-1.5 rounded-lg border border-surface-border">
                <span className="text-xs font-mono text-text-primary tracking-widest">{secretKeyMock}</span>
                <button
                  type="button"
                  onClick={copySecretKey}
                  title="Скопировать ключ"
                  className="text-text-muted hover:text-accent transition-colors p-1"
                >
                  {copiedKey ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <form onSubmit={handleConfirm2FA} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                  {t('setup2FAStep2')}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className="input-field text-center font-mono text-lg tracking-[0.3em] font-bold"
                  autoFocus
                />
              </div>

              {totpError && (
                <div className="p-2.5 rounded-xl bg-danger/10 border border-danger/30 text-danger text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{totpError}</span>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTwoFactorModalOpen(false)}
                  className="btn-secondary w-1/2 text-xs font-semibold py-2.5"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="btn-primary w-1/2 text-xs font-semibold py-2.5"
                >
                  {t('verifyAndEnable')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}