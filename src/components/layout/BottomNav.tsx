'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { BookOpen, LineChart, BookMarked, User, Home } from 'lucide-react';
import { startNavigationProgress } from '@/components/layout/NavigationProgress';

export default function BottomNav() {
  const pathname = usePathname();
  const locale = useLocale();

  const isRu = locale === 'ru';

  const navItems = [
    {
      label: isRu ? 'Главная' : 'Home',
      href: `/${locale}`,
      icon: Home,
      exact: true,
    },
    {
      label: isRu ? 'Курсы' : 'Courses',
      href: `/${locale}/courses`,
      icon: BookOpen,
      matchPrefix: `/${locale}/lesson`,
    },
    {
      label: isRu ? 'Симулятор' : 'Trading',
      href: `/${locale}/simulator`,
      icon: LineChart,
    },
    {
      label: isRu ? 'Глоссарий' : 'Glossary',
      href: `/${locale}/glossary`,
      icon: BookMarked,
    },
    {
      label: isRu ? 'Профиль' : 'Profile',
      href: `/${locale}/profile`,
      icon: User,
    },
  ];

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    if (pathname === item.href || (item.matchPrefix && pathname.startsWith(item.matchPrefix))) {
      return true;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-surface-border/80 px-2 py-1.5 shadow-[0_-8px_24px_rgba(0,0,0,0.45)]"
      style={{ paddingBottom: 'calc(0.4rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                if (!active) startNavigationProgress();
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 relative ${
                active
                  ? 'text-accent font-semibold scale-105'
                  : 'text-text-muted hover:text-text-secondary active:scale-95'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${active ? 'stroke-[2.4px]' : 'stroke-[1.8px]'}`} />
                {active && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,229,179,0.8)]" />
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
