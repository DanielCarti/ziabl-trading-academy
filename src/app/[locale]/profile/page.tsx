'use client';

import { useSession, signOut } from 'next-auth/react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User, Mail, Shield, BookOpen, Award, CheckCircle2,
  Clock, ArrowRight, LayoutDashboard, Settings, LogOut,
  Sparkles, Moon, Sun, Globe
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
          </div>
        </div>
      </div>
    </div>
  );
}