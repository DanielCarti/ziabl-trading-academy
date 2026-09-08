'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { getLocalizedField } from '@/lib/utils';

interface LessonSidebarProps {
  moduleTitle: string;
  moduleLessons: Array<{
    id: string;
    slug: string;
    titleRu: string;
    titleEn: string;
    order: number;
  }>;
  currentSlug: string;
  locale: string;
  contentsLabel: string;
  backToCoursesLabel: string;
}

export default function LessonSidebar({
  moduleTitle,
  moduleLessons,
  currentSlug,
  locale,
  contentsLabel,
  backToCoursesLabel,
}: LessonSidebarProps) {
  const [completedList, setCompletedList] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadCompleted = () => {
      try {
        const stored = localStorage.getItem('ziabl_completed_lessons');
        if (stored) {
          setCompletedList(JSON.parse(stored));
        }
      } catch (e) {}
    };

    loadCompleted();

    const onLessonCompleted = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail) {
        const id = custom.detail.lessonId;
        const slug = custom.detail.lessonSlug;
        setCompletedList((prev) => {
          const next = [...prev];
          if (id && !next.includes(id)) next.push(id);
          if (slug && !next.includes(slug)) next.push(slug);
          return next;
        });
      }
    };

    window.addEventListener('lesson-completed', onLessonCompleted);
    return () => window.removeEventListener('lesson-completed', onLessonCompleted);
  }, []);

  return (
    <div className="lg:sticky lg:top-24">
      <div className="card">
        <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
          {contentsLabel}
        </h3>
        <p className="text-sm text-text-primary font-medium mb-4">{moduleTitle}</p>
        <div className="space-y-1">
          {moduleLessons.map((l) => {
            const isCompleted =
              completedList.includes(l.id) || completedList.includes(l.slug);
            const isCurrent = l.slug === currentSlug;

            return (
              <Link
                key={l.id}
                href={`/${locale}/lesson/${l.slug}`}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                  isCurrent
                    ? 'bg-accent/10 text-accent font-medium'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-light'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                ) : (
                  <span
                    className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ${
                      isCurrent
                        ? 'border-accent text-accent font-bold'
                        : 'border-surface-border text-text-muted'
                    }`}
                  >
                    {l.order}
                  </span>
                )}
                <span className="line-clamp-1">{getLocalizedField(l, 'title', locale)}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <Link href={`/${locale}/courses`} className="btn-ghost w-full mt-4 text-sm">
        <ArrowLeft className="w-4 h-4" />
        {backToCoursesLabel}
      </Link>
    </div>
  );
}
