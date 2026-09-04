'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import AuthProvider from '@/components/providers/AuthProvider';
import { LayoutDashboard, BookOpen, GraduationCap, BookMarked, HelpCircle, TrendingUp } from 'lucide-react';

const adminLinks = [
  { href: '/admin', label: 'Дашборд', icon: LayoutDashboard },
  { href: '/admin/courses', label: 'Курсы и модули', icon: BookOpen },
  { href: '/admin/lessons', label: 'Уроки', icon: GraduationCap },
  { href: '/admin/glossary', label: 'Глоссарий', icon: BookMarked },
  { href: '/admin/quizzes', label: 'Квизы', icon: HelpCircle },
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
          <Link href="/admin" className="flex items-center gap-2 mb-8">
            <TrendingUp className="w-6 h-6 text-accent" />
            <span className="font-bold gradient-text">ZIABL</span>
            <span className="text-xs text-text-muted">Admin</span>
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

        <div className="p-6 border-t border-surface-border mt-auto">
          <Link href="/ru" className="btn-ghost w-full text-sm">← На сайт</Link>
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
      <AdminContent>{children}</AdminContent>
    </AuthProvider>
  );
}
