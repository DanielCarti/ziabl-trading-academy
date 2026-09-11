'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import AuthProvider from '@/components/providers/AuthProvider';
import { LayoutDashboard, BookOpen, GraduationCap, BookMarked, HelpCircle, TrendingUp, ShieldCheck } from 'lucide-react';
import ThemeToggle from '@/components/layout/ThemeToggle';
import NavigationProgress from '@/components/layout/NavigationProgress';

const adminLinks = [
  { href: '/admin', label: 'Дашборд', icon: LayoutDashboard },
  { href: '/admin/courses', label: 'Курсы и модули', icon: BookOpen },
  { href: '/admin/lessons', label: 'Уроки', icon: GraduationCap },
  { href: '/admin/glossary', label: 'Глоссарий', icon: BookMarked },
  { href: '/admin/quizzes', label: 'Квизы', icon: HelpCircle },
  { href: '/admin/access', label: 'Доступ и Инвайты', icon: ShieldCheck },
];

function AdminContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      router.push('/ru/auth/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center text-text-muted">Загрузка...</div>;
  }

  if (!session || (session.user as any)?.role !== 'ADMIN') return null;

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-surface-border shrink-0">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-accent/30 flex-shrink-0 shadow-sm shadow-accent/20 bg-surface-light flex items-center justify-center">
              <img src="/logo.jpg" alt="Ziabl Trade Academy" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold gradient-text text-base tracking-wider">ZIABL</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-accent/10 text-accent font-semibold">Admin</span>
          </Link>

          <nav className="space-y-1">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-surface-border mt-auto flex items-center justify-between gap-2">
          <Link href="/ru" className="btn-ghost text-sm flex-1">← На сайт</Link>
          <ThemeToggle />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <NavigationProgress />
      <AdminContent>{children}</AdminContent>
    </AuthProvider>
  );
}
