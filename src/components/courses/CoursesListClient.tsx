'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle2, ChevronRight, Check } from 'lucide-react';
import { getLocalizedField } from '@/lib/utils';

interface CourseLesson {
  id: string;
  slug: string;
  titleRu: string;
  titleEn: string;
  order: number;
}

interface CourseModule {
  id: string;
  slug: string;
  titleRu: string;
  titleEn: string;
  descRu: string;
  descEn: string;
  icon?: string | null;
  order: number;
  _count: { lessons: number };
  lessons: CourseLesson[];
}

interface CoursesListClientProps {
  modules: CourseModule[];
  locale: string;
  moduleLabel: string;
  lessonsLabel: string;
  completedBadgeLabel: string;
}

const defaultModuleIcons = ['💡', '📊', '🏛️', '📈', '💎', '🌪️', '🏦', '📉', '⚡', '🔍'];

export default function CoursesListClient({
  modules,
  locale,
  moduleLabel,
  lessonsLabel,
  completedBadgeLabel,
}: CoursesListClientProps) {
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
    <div className="space-y-6">
      {modules.map((mod, i) => {
        // Check if all lessons in this module are completed
        const totalInMod = mod.lessons.length;
        const completedInMod = mod.lessons.filter(
          (l) => completedList.includes(l.id) || completedList.includes(l.slug)
        ).length;
        const isModuleComplete = totalInMod > 0 && completedInMod === totalInMod;

        return (
          <div
            key={mod.id}
            className={`card-hover transition-all duration-300 ${
              isModuleComplete ? 'border-accent/40 bg-accent/[0.02]' : ''
            }`}
          >
            {/* Module Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="text-3xl">{mod.icon || defaultModuleIcons[i] || '📘'}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs text-accent font-semibold uppercase tracking-wider">
                    {moduleLabel} {i + 1}
                  </span>
                  {isModuleComplete && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-bold animate-fade-in shadow-sm">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{completedBadgeLabel}</span>
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-text-primary">
                  {getLocalizedField(mod, 'title', locale)}
                </h2>
                <p className="text-sm text-text-secondary mt-1">
                  {getLocalizedField(mod, 'desc', locale)}
                </p>

                <div className="flex items-center gap-4 mt-2 text-xs text-text-muted">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-text-muted" />
                    <span>
                      {mod._count.lessons} {lessonsLabel}
                    </span>
                  </div>
                  {completedInMod > 0 && (
                    <div className="flex items-center gap-1.5 text-accent font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        {completedInMod} / {totalInMod}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Lessons List */}
            <div className="ml-12 space-y-1">
              {mod.lessons.map((lesson) => {
                const isLessonComplete =
                  completedList.includes(lesson.id) || completedList.includes(lesson.slug);

                return (
                  <Link
                    key={lesson.id}
                    href={`/${locale}/lesson/${lesson.slug}`}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                      isLessonComplete
                        ? 'bg-accent/5 hover:bg-accent/10 border border-accent/10'
                        : 'hover:bg-surface-light border border-transparent'
                    }`}
                  >
                    {isLessonComplete ? (
                      <div className="w-6 h-6 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center text-accent shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-surface-light border border-surface-border flex items-center justify-center text-xs text-text-muted group-hover:border-accent group-hover:text-accent transition-colors shrink-0">
                        {lesson.order}
                      </div>
                    )}

                    <span
                      className={`flex-1 text-sm transition-colors ${
                        isLessonComplete
                          ? 'text-text-primary font-medium'
                          : 'text-text-secondary group-hover:text-text-primary'
                      }`}
                    >
                      {getLocalizedField(lesson, 'title', locale)}
                    </span>

                    <ChevronRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
