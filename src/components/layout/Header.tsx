'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useSession, signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import {
  TrendingUp, BookOpen, GraduationCap, Calculator, PlayCircle,
  Globe, Menu, X, User, LogOut, LayoutDashboard
} from 'lucide-react';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const otherLocale = locale === 'ru' ? 'en' : 'ru';
  const switchLocale = () => {
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
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <TrendingUp className="w-7 h-7 text-accent group-hover:scale-110 transition-transform" />
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold gradient-text">ZIABL</span>
              <span className="text-sm text-text-secondary hidden sm:inline">Trade Academy</span>
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
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={switchLocale}
              className="btn-ghost text-sm gap-1"
            >
              <Globe className="w-4 h-4" />
              {locale === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN'}
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
                <div className="flex items-center gap-2 px-3 py-2 bg-surface-light rounded-lg">
                  <User className="w-4 h-4 text-accent" />
                  <span className="text-sm text-text-primary">{session.user.name || session.user.email}</span>
                </div>
                <button onClick={() => signOut()} className="btn-ghost text-sm text-danger">
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

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden btn-ghost"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-surface-border animate-fade-in">
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
            <button onClick={switchLocale} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-text-secondary w-full hover:bg-surface-light">
              <Globe className="w-5 h-5" />
              {locale === 'ru' ? 'English 🇬🇧' : 'Русский 🇷🇺'}
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
