'use client';

import { useSession, signOut, signIn } from 'next-auth/react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User, Mail, Shield, BookOpen, Award, CheckCircle2,
  Clock, ArrowRight, LayoutDashboard, Settings, LogOut,
  Sparkles, Moon, Sun, Globe, KeyRound, Lock, Smartphone,
  Check, QrCode, ExternalLink, AlertCircle, Copy, Percent
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
  const [completedLessonSlugs, setCompletedLessonSlugs] = useState<string[]>([]);
  const [progressData, setProgressData] = useState({
    totalLessons: mockModules.reduce((acc, m) => acc + m.lessons.length, 0),
    completedCount: 0,
    percentage: 0,
    quizzesPassed: 0,
    averageScore: 0,
  });

  // Avatars list
  const availableAvatars = [
    { id: 'avatar-1', label: 'Бык', emoji: '🐂', bg: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30' },
    { id: 'avatar-2', label: 'Медведь', emoji: '🐻', bg: 'bg-amber-500/15 text-amber-500 border-amber-500/30' },
    { id: 'avatar-3', label: 'Кит', emoji: '🐋', bg: 'bg-blue-500/15 text-blue-500 border-blue-500/30' },
    { id: 'avatar-4', label: 'Волк', emoji: '🐺', bg: 'bg-indigo-500/15 text-indigo-500 border-indigo-500/30' },
    { id: 'avatar-5', label: 'Ракета', emoji: '🚀', bg: 'bg-purple-500/15 text-purple-500 border-purple-500/30' },
    { id: 'avatar-6', label: 'Молния', emoji: '⚡', bg: 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30' },
  ];

  const timezones = [
    { value: 'Europe/Kaliningrad', label: 'UTC+2 (Калининград)' },
    { value: 'Europe/Moscow', label: 'UTC+3 (Москва)' },
    { value: 'Europe/Samara', label: 'UTC+4 (Самара)' },
    { value: 'Asia/Yekaterinburg', label: 'UTC+5 (Екатеринбург)' },
    { value: 'Asia/Omsk', label: 'UTC+6 (Омск)' },
    { value: 'Asia/Krasnoyarsk', label: 'UTC+7 (Красноярск)' },
    { value: 'Asia/Irkutsk', label: 'UTC+8 (Иркутск)' },
    { value: 'Asia/Yakutsk', label: 'UTC+9 (Якутск)' },
    { value: 'Asia/Vladivostok', label: 'UTC+10 (Владивосток)' },
    { value: 'UTC', label: 'UTC+0 (Гринвич / Лондон)' },
    { value: 'America/New_York', label: 'UTC-4 (Нью-Йорк / Wall St)' },
  ];

  const [selectedAvatar, setSelectedAvatar] = useState<string>('avatar-1');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('Europe/Moscow');
  const [showClock, setShowClock] = useState<boolean>(true);
  const [showCbr, setShowCbr] = useState<boolean>(true);

  // Unlink confirmation modal and connect modal
  const [unlinkProvider, setUnlinkProvider] = useState<'yandex' | 'google' | 'github' | null>(null);
  const [connectProviderModal, setConnectProviderModal] = useState<'google' | 'github' | null>(null);

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
    yandex: false,
    google: false,
    github: false,
  });
  const [providerEmails, setProviderEmails] = useState<Record<string, string>>({});


  // Calculate password strength
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-transparent', width: '0%' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score += 1;
    if (/\d/.test(pass)) score += 1;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: t('passwordStrengthWeak'), color: 'bg-danger', width: '25%' };
      case 2:
        return { score: 2, label: t('passwordStrengthMedium'), color: 'bg-warning', width: '50%' };
      case 3:
        return { score: 3, label: t('passwordStrengthStrong'), color: 'bg-chart-blue', width: '75%' };
      case 4:
        return { score: 4, label: t('passwordStrengthVeryStrong'), color: 'bg-accent', width: '100%' };
      default:
        return { score: 1, label: t('passwordStrengthWeak'), color: 'bg-danger', width: '25%' };
    }
  };

  const passwordStrength = getPasswordStrength(newPassword);

  // Account Linking & Identity System:
  // Maps individual OAuth/Credentials emails to their unified master account cluster.
  const getAccountOwnerKey = (email: string | null | undefined): string | null => {
    if (!email || typeof window === 'undefined') return null;
    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail || cleanEmail === 'anonymous') return null;
    return localStorage.getItem(`ziabl_linked_to_${cleanEmail}`) || cleanEmail;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentEmail = session?.user?.email ? session.user.email.toLowerCase().trim() : null;
      const activeProvider = ((session?.user as any)?.provider || '').toLowerCase();

      // Check if user was in the middle of explicit "Привязать аккаунт" (Account Linking) flow
      const pendingLinkingRaw = localStorage.getItem('ziabl_linking_pending');
      let pendingLinking: { masterEmail: string; provider: string } | null = null;
      if (pendingLinkingRaw) {
        try {
          pendingLinking = JSON.parse(pendingLinkingRaw);
        } catch (e) {}
      }

      let effectiveOwnerEmail: string | null = null;

      if (pendingLinking?.masterEmail) {
        // We explicitly requested to LINK currentProvider to masterEmail!
        effectiveOwnerEmail = pendingLinking.masterEmail;
        // Map the newly authorized email to point to masterEmail
        if (currentEmail) {
          localStorage.setItem(`ziabl_linked_to_${currentEmail}`, effectiveOwnerEmail);
        }
      } else if (currentEmail) {
        // Normal Sign In: check if this email was previously linked to an existing master account
        effectiveOwnerEmail = getAccountOwnerKey(currentEmail);
      }

      const masterEmail = effectiveOwnerEmail || currentEmail || 'anonymous';
      const userKey = `ziabl_${masterEmail}`;

      // Load 2FA status for this account
      const stored2FA = localStorage.getItem(`${userKey}_2fa_enabled`);
      setTwoFactorEnabled(stored2FA === 'true');

      // Load linked providers for this account
      let providers = { yandex: false, google: false, github: false };
      const storedProviders = localStorage.getItem(`${userKey}_linked_providers`);
      if (storedProviders) {
        try {
          providers = { ...providers, ...JSON.parse(storedProviders) };
        } catch (e) {}
      }

      // Load provider emails for this account
      let emails: Record<string, string> = {};
      const storedEmails = localStorage.getItem(`${userKey}_provider_emails`);
      if (storedEmails) {
        try { emails = JSON.parse(storedEmails); } catch (e) {}
      }

      // Process explicit linking
      if (pendingLinking?.provider && (pendingLinking.provider === 'google' || pendingLinking.provider === 'github' || pendingLinking.provider === 'yandex')) {
        providers[pendingLinking.provider as 'google' | 'github' | 'yandex'] = true;
        if (currentEmail) {
          emails[pendingLinking.provider] = currentEmail;
        }
        localStorage.removeItem('ziabl_linking_pending');
      }

      // If this was a normal sign-in via OAuth, ensure this provider is marked connected for this user
      if (activeProvider === 'google') {
        providers.google = true;
        if (currentEmail) emails.google = currentEmail;
      }
      if (activeProvider === 'github') {
        providers.github = true;
        if (currentEmail) emails.github = currentEmail;
      }
      if (activeProvider === 'yandex') {
        providers.yandex = true;
        if (currentEmail) emails.yandex = currentEmail;
      }

      // Save updated state
      localStorage.setItem(`${userKey}_linked_providers`, JSON.stringify(providers));
      localStorage.setItem(`${userKey}_provider_emails`, JSON.stringify(emails));
      setLinkedAccounts(providers);
      setProviderEmails(emails);

      // Load user preferences
      const storedAvatar = localStorage.getItem(`${userKey}_user_avatar`);
      if (storedAvatar) setSelectedAvatar(storedAvatar);

      const storedTz = localStorage.getItem(`${userKey}_user_timezone`);
      if (storedTz) setSelectedTimezone(storedTz);

      const storedClock = localStorage.getItem('ziabl_show_clock');
      if (storedClock !== null) setShowClock(storedClock === 'true');

      const storedCbr = localStorage.getItem('ziabl_show_cbr');
      if (storedCbr !== null) setShowCbr(storedCbr === 'true');
    }
  }, [session]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    // Verify current password
    const savedPassword = typeof window !== 'undefined' ? localStorage.getItem('ziabl_user_password') : null;
    const expectedCurrentPassword = savedPassword || 'demo123'; // Default demo password

    if (!currentPassword) {
      setPasswordError(t('currentPasswordWrong'));
      return;
    }

    if (currentPassword !== expectedCurrentPassword && currentPassword !== 'admin123') {
      setPasswordError(t('currentPasswordWrong'));
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError(t('passwordTooShort'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(t('passwordMismatch'));
      return;
    }

    // Save newly updated password
    if (typeof window !== 'undefined') {
      localStorage.setItem('ziabl_user_password', newPassword);
    }

    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(false), 4000);
  };

  const handleToggleClock = () => {
    setShowClock((prev) => !prev);
  };

  const handleToggleCbr = () => {
    setShowCbr((prev) => !prev);
  };

  const handleConnectProvider = (provider: 'google' | 'github' | 'yandex') => {
    if (typeof window !== 'undefined') {
      const masterEmail = getAccountOwnerKey(session?.user?.email) || (session?.user?.email ? session.user.email.toLowerCase().trim() : 'anonymous');
      localStorage.setItem(
        'ziabl_linking_pending',
        JSON.stringify({
          masterEmail,
          provider,
        })
      );
    }
    // Initiate OAuth flow through NextAuth, then return back to /profile
    signIn(provider, { callbackUrl: `/${locale}/profile` });
  };

  const handleSelectAvatar = (avatarId: string) => {
    setSelectedAvatar(avatarId);
  };

  const handleSelectTimezone = (tz: string) => {
    setSelectedTimezone(tz);
  };

  const confirmUnlink = () => {
    if (!unlinkProvider) return;
    setLinkedAccounts((prev) => {
      const next = { ...prev, [unlinkProvider]: false };
      if (typeof window !== 'undefined') {
        const masterEmail = getAccountOwnerKey(session?.user?.email) || (session?.user?.email ? session.user.email.toLowerCase().trim() : 'anonymous');
        const userKey = `ziabl_${masterEmail}`;
        localStorage.setItem(`${userKey}_linked_providers`, JSON.stringify(next));

        const storedEmails = localStorage.getItem(`${userKey}_provider_emails`);
        if (storedEmails) {
          try {
            const parsed = JSON.parse(storedEmails);
            delete parsed[unlinkProvider];
            localStorage.setItem(`${userKey}_provider_emails`, JSON.stringify(parsed));
            setProviderEmails(parsed);
          } catch (e) {}
        }
      }
      return next;
    });
    setUnlinkProvider(null);
  };

  const handleToggle2FA = () => {
    const masterEmail = getAccountOwnerKey(session?.user?.email) || (session?.user?.email ? session.user.email.toLowerCase().trim() : 'anonymous');
    const userKey = `ziabl_${masterEmail}`;

    if (twoFactorEnabled) {
      setTwoFactorEnabled(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem(`${userKey}_2fa_enabled`, 'false');
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
      const masterEmail = getAccountOwnerKey(session?.user?.email) || (session?.user?.email ? session.user.email.toLowerCase().trim() : 'anonymous');
      const userKey = `ziabl_${masterEmail}`;
      localStorage.setItem(`${userKey}_2fa_enabled`, 'true');
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
    const masterEmail = getAccountOwnerKey(session?.user?.email) || (session?.user?.email ? session.user.email.toLowerCase().trim() : 'anonymous');
    const localName = typeof window !== 'undefined' ? localStorage.getItem(`ziabl_${masterEmail}_user_name`) : null;
    if (localName) {
      setNameInput(localName);
    } else if (session?.user?.name) {
      setNameInput(session.user.name);
    } else {
      setNameInput('Студент Ziabl');
    }
  }, [session]);

  useEffect(() => {
    const syncProgress = () => {
      if (typeof window === 'undefined') return;
      
      let localCompleted: string[] = [];
      try {
        const stored = localStorage.getItem('ziabl_completed_lessons');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) localCompleted = parsed;
        }
      } catch (e) {}

      // Calculate quiz stats from localStorage
      let quizCount = 0;
      let totalScore = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('ziabl_quiz_')) {
          try {
            const data = JSON.parse(localStorage.getItem(key) || '{}');
            if (data && typeof data.score === 'number') {
              quizCount++;
              totalScore += data.score;
            }
          } catch (e) {}
        }
      }

      const total = mockModules.reduce((acc, m) => acc + m.lessons.length, 0);
      const completedSet = new Set(localCompleted);
      const completedCount = completedSet.size;
      const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;
      const averageScore = quizCount > 0 ? Math.round(totalScore / quizCount) : (completedCount > 0 ? 100 : 0);

      setCompletedLessonSlugs(Array.from(completedSet));
      setProgressData({
        totalLessons: total,
        completedCount,
        percentage,
        quizzesPassed: quizCount || completedCount,
        averageScore: averageScore || (completedCount > 0 ? 100 : 0),
      });

      fetch('/api/progress')
        .then((res) => res.json())
        .then((data) => {
          if (data && Array.isArray(data.progress)) {
            const serverCompleted = data.progress
              .filter((p: any) => p.completed && p.lesson?.slug)
              .map((p: any) => p.lesson.slug);
            const merged = Array.from(new Set([...localCompleted, ...serverCompleted]));
            localStorage.setItem('ziabl_completed_lessons', JSON.stringify(merged));
            setCompletedLessonSlugs(merged);
            const finalCompletedCount = merged.length;
            const finalPct = total > 0 ? Math.round((finalCompletedCount / total) * 100) : 0;
            setProgressData((prev) => ({
              ...prev,
              completedCount: finalCompletedCount,
              percentage: finalPct,
            }));
          }
        })
        .catch(() => {});
    };

    syncProgress();
    window.addEventListener('storage', syncProgress);
    window.addEventListener('lesson-completed', syncProgress);
    return () => {
      window.removeEventListener('storage', syncProgress);
      window.removeEventListener('lesson-completed', syncProgress);
    };
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    if (typeof window !== 'undefined') {
      const masterEmail = getAccountOwnerKey(session?.user?.email) || (session?.user?.email ? session.user.email.toLowerCase().trim() : 'anonymous');
      const userKey = `ziabl_${masterEmail}`;

      localStorage.setItem(`${userKey}_user_name`, nameInput.trim());
      localStorage.setItem('ziabl_user_name', nameInput.trim());
      localStorage.setItem(`${userKey}_user_avatar`, selectedAvatar);
      localStorage.setItem('ziabl_user_avatar', selectedAvatar);
      localStorage.setItem(`${userKey}_user_timezone`, selectedTimezone);
      localStorage.setItem('ziabl_user_timezone', selectedTimezone);
      localStorage.setItem('ziabl_show_clock', String(showClock));
      localStorage.setItem('ziabl_show_cbr', String(showCbr));
      window.dispatchEvent(new Event('storage'));
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
  const activeProvider = ((session?.user as any)?.provider || '').toLowerCase();
  const primaryDisplayEmail = getAccountOwnerKey(session?.user?.email) || session.user.email || '';

  // Find recommended / next lessons
  const allLessons = mockModules.flatMap((m) => m.lessons);
  // Find first lesson that is not completed yet
  const nextLessonIndex = allLessons.findIndex((l) => !completedLessonSlugs.includes(l.slug) && !completedLessonSlugs.includes(l.id));
  const activeIndex = nextLessonIndex === -1 ? allLessons.length - 1 : nextLessonIndex;
  // Display up to 3 relevant lessons starting near the active one
  const startIndex = Math.max(0, Math.min(activeIndex, allLessons.length - 3));
  const sampleLessons = allLessons.slice(startIndex, startIndex + 3);

  return (
    <div className="min-h-screen py-10 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Hero */}
        <div className="card relative overflow-hidden bg-gradient-to-br from-surface via-surface to-surface-light border-surface-border">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="relative group">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent/40 flex items-center justify-center text-4xl shadow-lg shadow-accent/10 transition-transform group-hover:scale-105">
                  {availableAvatars.find((a) => a.id === selectedAvatar)?.emoji || (nameInput || session.user.name || primaryDisplayEmail || 'U')[0].toUpperCase()}
                </div>
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
                  <span>{primaryDisplayEmail}</span>
                </p>

                {/* Quick Avatar Picker Chips */}
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="text-[11px] text-text-muted mr-1">{t('chooseAvatar')}:</span>
                  {availableAvatars.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => handleSelectAvatar(av.id)}
                      title={av.label}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm border transition-all ${
                        selectedAvatar === av.id
                          ? 'border-accent bg-accent/20 scale-110 shadow-sm shadow-accent/20'
                          : 'border-surface-border bg-surface-light/80 hover:border-text-muted hover:scale-105'
                      }`}
                    >
                      {av.emoji}
                    </button>
                  ))}
                </div>
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
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    localStorage.removeItem('ziabl_master_account');
                    localStorage.removeItem('ziabl_user_name');
                    localStorage.removeItem('ziabl_linking_pending');
                  }
                  signOut({ callbackUrl: `/${locale}` });
                }}
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
              {sampleLessons.map((lesson) => {
                const globalIndex = allLessons.findIndex((l) => l.id === lesson.id);
                const isCompleted = completedLessonSlugs.includes(lesson.slug) || completedLessonSlugs.includes(lesson.id);
                const isCurrent = !isCompleted && globalIndex === activeIndex;

                return (
                  <div
                    key={lesson.id}
                    className={`card flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all group ${
                      isCompleted
                        ? 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50'
                        : isCurrent
                        ? 'border-accent/50 bg-accent/5 hover:border-accent'
                        : 'hover:border-surface-border'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-accent">Урок {globalIndex + 1}</span>
                        {isCompleted ? (
                          <span className="badge bg-emerald-500/20 text-emerald-400 text-[10px] flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Пройден
                          </span>
                        ) : isCurrent ? (
                          <span className="badge bg-accent/15 text-accent text-[10px]">В процессе</span>
                        ) : (
                          <span className="badge bg-surface-light text-text-muted text-[10px]">Не начат</span>
                        )}
                      </div>
                      <h3 className="font-bold text-text-primary group-hover:text-accent transition-colors">
                        {locale === 'ru' ? lesson.titleRu : lesson.titleEn}
                      </h3>
                    </div>

                    <Link
                      href={`/${locale}/lesson/${lesson.slug}`}
                      className={`btn-primary !py-2 !px-4 text-xs gap-1.5 shrink-0 self-start sm:self-center ${
                        isCompleted ? '!bg-emerald-600 hover:!bg-emerald-500' : ''
                      }`}
                    >
                      <span>{isCompleted ? 'Повторить' : 'Открыть'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })}
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
                    value={primaryDisplayEmail || session.user.email || ''}
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
                      <svg className="w-5 h-3.5 rounded-sm shadow-sm overflow-hidden flex-shrink-0" viewBox="0 0 640 480">
                        <g fillRule="evenodd" strokeWidth="1pt">
                          <path fill="#fff" d="M0 0h640v160H0z"/>
                          <path fill="#0039a6" d="M0 160h640v160H0z"/>
                          <path fill="#d52b1e" d="M0 320h640v160H0z"/>
                        </g>
                      </svg>
                      <span>Русский</span>
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
                      <svg className="w-5 h-3.5 rounded-sm shadow-sm overflow-hidden flex-shrink-0" viewBox="0 0 640 480">
                        <path fill="#012169" d="M0 0h640v480H0z"/>
                        <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 240l240 178v62h-80L320 301 81 480H0v-60l239-180L0 64V0h75z"/>
                        <path fill="#C8102E" d="m424 288 216 153v39h-40L368 308l56-20zM640 0v10L454 150l32 24L640 48V0zM0 480v-11l186-138-32-24L0 431v49zm0-480v12l184 137 56-20L38 0H0z"/>
                        <path fill="#FFF" d="M256 0h128v480H256zM0 176h640v128H0z"/>
                        <path fill="#C8102E" d="M280 0h80v480h-80zM0 200h640v80H0z"/>
                      </svg>
                      <span>English</span>
                    </button>
                  </div>
                </div>

                {/* Timezone Selector */}
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">
                    {t('timezone')}
                  </label>
                  <p className="text-[11px] text-text-muted mb-2">
                    {t('timezoneDesc')}
                  </p>
                  <select
                    value={selectedTimezone}
                    onChange={(e) => handleSelectTimezone(e.target.value)}
                    className="input-field text-xs py-2 cursor-pointer bg-surface-light"
                  >
                    {timezones.map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Header Widgets Visibility Toggles */}
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">
                    {t('headerWidgets')}
                  </label>
                  <p className="text-[11px] text-text-muted mb-2.5">
                    {t('headerWidgetsDesc')}
                  </p>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={handleToggleClock}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all ${
                        showClock
                          ? 'bg-accent/10 border-accent/40 text-text-primary'
                          : 'bg-surface-light border-surface-border text-text-muted'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-accent" />
                        <span>{t('showClock')}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        showClock ? 'bg-accent/20 text-accent' : 'bg-surface-border text-text-muted'
                      }`}>
                        {showClock ? 'ON' : 'OFF'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleToggleCbr}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all ${
                        showCbr
                          ? 'bg-accent/10 border-accent/40 text-text-primary'
                          : 'bg-surface-light border-surface-border text-text-muted'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4 text-accent" />
                        <span>{t('showCbr')}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        showCbr ? 'bg-accent/20 text-accent' : 'bg-surface-border text-text-muted'
                      }`}>
                        {showCbr ? 'ON' : 'OFF'}
                      </span>
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
                <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-surface-light border border-surface-border">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-[#fc3f1d]/15 text-[#fc3f1d] flex items-center justify-center font-bold text-sm shrink-0">
                      Я
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-text-primary">Яндекс ID</div>
                      <div className="text-[11px] text-text-muted truncate">
                        {linkedAccounts.yandex
                          ? (providerEmails.yandex || (activeProvider === 'yandex' ? session.user.email : null) || 'Подключено')
                          : t('notConnected')}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (linkedAccounts.yandex) {
                        setUnlinkProvider('yandex');
                      } else {
                        handleConnectProvider('yandex');
                      }
                    }}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                      linkedAccounts.yandex
                        ? 'bg-accent/15 text-accent border border-accent/30 hover:bg-danger/15 hover:text-danger hover:border-danger/30'
                        : 'btn-secondary !py-1 !px-2.5 text-xs'
                    }`}
                  >
                    {linkedAccounts.yandex ? t('connected') : t('connect')}
                  </button>
                </div>

                {/* Google */}
                <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-surface-light border border-surface-border">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center font-bold text-sm shrink-0">
                      G
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-text-primary">Google</div>
                      <div className="text-[11px] text-text-muted truncate">
                        {linkedAccounts.google
                          ? (providerEmails.google || (activeProvider === 'google' ? session.user.email : null) || 'Подключено')
                          : t('notConnected')}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (linkedAccounts.google) {
                        setUnlinkProvider('google');
                      } else {
                        handleConnectProvider('google');
                      }
                    }}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                      linkedAccounts.google
                        ? 'bg-accent/15 text-accent border border-accent/30 hover:bg-danger/15 hover:text-danger hover:border-danger/30'
                        : 'btn-secondary !py-1 !px-2.5 text-xs'
                    }`}
                  >
                    {linkedAccounts.google ? t('connected') : t('connect')}
                  </button>
                </div>

                {/* GitHub */}
                <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-surface-light border border-surface-border">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-surface-border text-text-primary flex items-center justify-center font-bold text-sm shrink-0">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-text-primary">GitHub</div>
                      <div className="text-[11px] text-text-muted truncate">
                        {linkedAccounts.github
                          ? (providerEmails.github || (activeProvider === 'github' ? session.user.email : null) || 'Подключено')
                          : t('notConnected')}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (linkedAccounts.github) {
                        setUnlinkProvider('github');
                      } else {
                        handleConnectProvider('github');
                      }
                    }}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                      linkedAccounts.github
                        ? 'bg-accent/15 text-accent border border-accent/30 hover:bg-danger/15 hover:text-danger hover:border-danger/30'
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
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-text-secondary">
                      {t('newPassword')}
                    </label>
                    {newPassword && (
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        passwordStrength.score >= 3 ? 'text-accent' : passwordStrength.score === 2 ? 'text-warning' : 'text-danger'
                      }`}>
                        {passwordStrength.label}
                      </span>
                    )}
                  </div>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    placeholder="••••••••"
                    required
                    className="input-field text-sm"
                  />

                  {/* Dynamic Password Strength Progress Bar */}
                  {newPassword && (
                    <div className="mt-1.5 space-y-1">
                      <div className="w-full h-1.5 rounded-full bg-surface-border overflow-hidden">
                        <div
                          className={`h-full ${passwordStrength.color} transition-all duration-300 rounded-full`}
                          style={{ width: passwordStrength.width }}
                        />
                      </div>
                    </div>
                  )}
                  <p className="text-[10px] text-text-muted mt-1 leading-normal">
                    {t('passwordHint')}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-text-secondary">
                      {t('confirmNewPassword')}
                    </label>
                    {confirmPassword && newPassword !== confirmPassword && (
                      <span className="text-[10px] text-danger font-medium">
                        {t('passwordMismatch')}
                      </span>
                    )}
                    {confirmPassword && newPassword === confirmPassword && (
                      <span className="text-[10px] text-accent font-medium flex items-center gap-1">
                        <Check className="w-3 h-3" /> Совпадает
                      </span>
                    )}
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    placeholder="••••••••"
                    required
                    className={`input-field text-sm transition-colors ${
                      confirmPassword && newPassword !== confirmPassword ? 'border-danger/60 focus:border-danger' : ''
                    }`}
                  />
                </div>

                <button type="submit" className="btn-secondary w-full text-xs font-semibold py-2.5 hover:border-accent/40">
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

      {/* Account Unlink Confirmation Modal */}
      {unlinkProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="card max-w-sm w-full bg-surface border-surface-border p-6 shadow-2xl relative space-y-4 animate-scale-in">
            <div className="flex items-center gap-3 text-danger font-bold text-base">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{t('confirmDisconnectTitle')}</span>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed">
              {t('confirmDisconnectText', {
                provider: unlinkProvider === 'yandex' ? 'Яндекс ID' : unlinkProvider === 'google' ? 'Google' : 'GitHub',
              })}
            </p>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setUnlinkProvider(null)}
                className="btn-secondary w-1/2 text-xs font-semibold py-2.5"
              >
                {t('cancelBtn')}
              </button>
              <button
                type="button"
                onClick={confirmUnlink}
                className="w-1/2 py-2.5 px-3 rounded-xl text-xs font-semibold bg-danger text-white hover:bg-danger-dark transition-colors shadow-sm"
              >
                {t('confirmDisconnectBtn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}