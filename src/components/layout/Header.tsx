'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useSession, signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import {
  TrendingUp, BookOpen, GraduationCap, Calculator, PlayCircle,
  Menu, X, User, LogOut, LayoutDashboard
} from 'lucide-react';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { startNavigationProgress } from '@/components/layout/NavigationProgress';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const otherLocale = locale === 'ru' ? 'en' : 'ru';
  const switchLocale = () => {
    startNavigationProgress();
    const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
    router.push(newPath);
  };

  const navLinks = [
    { href: `/${locale}`, label: t('home'), icon: TrendingUp },
    { href: `/${locale}/courses`, label: t('courses'), icon: BookOpen },
    { href: `/${locale}/simulator`, label: t('simulator'), icon: PlayCircle },
    { href: `/${locale}/glossary`, label: t('glossary'), icon: GraduationCap },
    { href: `/${locale}/calculators`, label: t('calculators'), icon: Calculator },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}`;
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-accent/40 shadow-[0_0_12px_rgba(0,229,179,0.3)] group-hover:scale-105 group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(0,229,179,0.5)] transition-all">
              <img
                src="/logo.jpg"
                alt="Ziabl Trade Academy Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold tracking-tight gradient-text">ZIABL</span>
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider hidden sm:inline">Trade Academy</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive(link.href)
                    ? 'text-accent bg-accent/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-light'
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Language Switcher (SVG flag with logical label & tooltip) */}
            <button
              onClick={switchLocale}
              title={locale === 'ru' ? 'Переключить на английский язык (English)' : 'Переключить на русский язык (Русский)'}
              aria-label={locale === 'ru' ? 'Переключить на английский язык' : 'Переключить на русский язык'}
              className="flex items-center gap-1.5 px-2.5 h-10 rounded-xl bg-surface-light hover:bg-surface border border-surface-border hover:border-accent/40 text-xs font-semibold text-text-secondary hover:text-text-primary transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-[0_0_12px_rgba(0,229,179,0.2)]"
            >
              {locale === 'ru' ? (
                <>
                  <svg className="w-5 h-3.5 rounded-sm shadow-sm overflow-hidden flex-shrink-0" viewBox="0 0 640 480">
                    <g fillRule="evenodd" strokeWidth="1pt">
                      <path fill="#fff" d="M0 0h640v160H0z"/>
                      <path fill="#0039a6" d="M0 160h640v160H0z"/>
                      <path fill="#d52b1e" d="M0 320h640v160H0z"/>
                    </g>
                  </svg>
                  <span>RU</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-3.5 rounded-sm shadow-sm overflow-hidden flex-shrink-0" viewBox="0 0 640 480">
                    <path fill="#012169" d="M0 0h640v480H0z"/>
                    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 240l240 178v62h-80L320 301 81 480H0v-60l239-180L0 64V0h75z"/>
                    <path fill="#C8102E" d="m424 288 216 153v39h-40L368 308l56-20zM640 0v10L454 150l32 24L640 48V0zM0 480v-11l186-138-32-24L0 431v49zm0-480v12l184 137 56-20L38 0H0z"/>
                    <path fill="#FFF" d="M256 0h128v480H256zM0 176h640v128H0z"/>
                    <path fill="#C8102E" d="M280 0h80v480h-80zM0 200h640v80H0z"/>
                  </svg>
                  <span>EN</span>
                </>
              )}
            </button>

            {/* Auth */}
            {session?.user ? (
              <div className="flex items-center gap-2">
                {(session.user as any).role === 'ADMIN' && (
                  <Link href="/admin" className="btn-ghost text-sm">
                    <LayoutDashboard className="w-4 h-4" />
                    {t('admin')}
                  </Link>
                )}
                <div className="flex items-center gap-2 px-3 py-2 bg-surface-light rounded-lg border border-surface-border">
                  <User className="w-4 h-4 text-accent" />
                  <span className="text-sm text-text-primary max-w-[120px] truncate">{session.user.name || session.user.email}</span>
                </div>
                <button onClick={() => signOut()} className="btn-ghost text-sm text-danger hover:bg-danger/10">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href={`/${locale}/auth/signin`} className="btn-ghost text-sm">
                  {t('signin')}
                </Link>
                <Link href={`/${locale}/auth/signup`} className="btn-primary text-sm !py-2 !px-4">
                  {t('signup')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right Bar (ThemeToggle + Hamburger) */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={switchLocale}
              title={locale === 'ru' ? 'Переключить на английский язык' : 'Переключить на русский язык'}
              className="flex items-center gap-1.5 px-2.5 h-10 rounded-xl bg-surface-light border border-surface-border text-xs font-semibold active:scale-95"
            >
              {locale === 'ru' ? (
                <>
                  <svg className="w-5 h-3.5 rounded-sm shadow-sm overflow-hidden flex-shrink-0" viewBox="0 0 640 480">
                    <path fill="#fff" d="M0 0h640v160H0z"/>
                    <path fill="#0039a6" d="M0 160h640v160H0z"/>
                    <path fill="#d52b1e" d="M0 320h640v160H0z"/>
                  </svg>
                  <span>RU</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-3.5 rounded-sm shadow-sm overflow-hidden flex-shrink-0" viewBox="0 0 640 480">
                    <path fill="#012169" d="M0 0h640v480H0z"/>
                    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 240l240 178v62h-80L320 301 81 480H0v-60l239-180L0 64V0h75z"/>
                    <path fill="#C8102E" d="m424 288 216 153v39h-40L368 308l56-20zM640 0v10L454 150l32 24L640 48V0zM0 480v-11l186-138-32-24L0 431v49zm0-480v12l184 137 56-20L38 0H0z"/>
                    <path fill="#FFF" d="M256 0h128v480H256zM0 176h640v128H0z"/>
                    <path fill="#C8102E" d="M280 0h80v480h-80zM0 200h640v80H0z"/>
                  </svg>
                  <span>EN</span>
                </>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="btn-ghost !p-2"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-surface-border animate-fade-in shadow-xl">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                  isActive(link.href)
                    ? 'text-accent bg-accent/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-light'
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            ))}
            <hr className="border-surface-border my-2" />
            <button 
              onClick={() => { switchLocale(); setMobileOpen(false); }} 
              className="flex items-center justify-between px-4 py-3 rounded-lg text-sm text-text-secondary w-full hover:bg-surface-light"
            >
              <span className="flex items-center gap-3">
                <span className="text-xl">{locale === 'ru' ? '🇬🇧' : '🇷🇺'}</span>
                <span>{locale === 'ru' ? 'English' : 'Русский'}</span>
              </span>
              <span className="text-xs text-text-muted">Сменить язык</span>
            </button>
            {session?.user ? (
              <button onClick={() => signOut()} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-danger w-full hover:bg-surface-light">
                <LogOut className="w-5 h-5" />
                {t('signout')}
              </button>
            ) : (
              <>
                <Link href={`/${locale}/auth/signin`} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-text-secondary w-full hover:bg-surface-light">
                  <User className="w-5 h-5" />
                  {t('signin')}
                </Link>
                <Link href={`/${locale}/auth/signup`} onClick={() => setMobileOpen(false)} className="btn-primary w-full text-sm mt-2">
                  {t('signup')}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
