'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { CheckCircle2, Circle } from 'lucide-react';

interface CompleteButtonProps {
  lessonId: string;
}

export default function LessonCompleteButton({ lessonId }: CompleteButtonProps) {
  const { data: session } = useSession();
  const t = useTranslations('lesson');
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize and listen for completion from localStorage and custom events
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check localStorage
    try {
      const stored = localStorage.getItem('ziabl_completed_lessons');
      if (stored) {
        const list: string[] = JSON.parse(stored);
        if (list.includes(lessonId)) {
          setCompleted(true);
        }
      }
    } catch (e) {}

    // Check server if logged in
    if (session?.user) {
      fetch('/api/progress')
        .then((r) => r.json())
        .then((data) => {
          if (data && data.progress && Array.isArray(data.progress)) {
            const found = data.progress.find((p: any) => p.lessonId === lessonId && p.completed);
            if (found) setCompleted(true);
          }
        })
        .catch(() => {});
    }

    // Event listener for automatic quiz completion
    const onLessonCompleted = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail && (custom.detail.lessonId === lessonId || custom.detail.lessonSlug === lessonId)) {
        setCompleted(true);
      }
    };

    window.addEventListener('lesson-completed', onLessonCompleted);
    return () => window.removeEventListener('lesson-completed', onLessonCompleted);
  }, [lessonId, session]);

  const handleToggle = async () => {
    if (completed || loading) return;

    setLoading(true);

    // Save to localStorage immediately
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('ziabl_completed_lessons');
        const list: string[] = stored ? JSON.parse(stored) : [];
        if (!list.includes(lessonId)) {
          list.push(lessonId);
          localStorage.setItem('ziabl_completed_lessons', JSON.stringify(list));
        }
        window.dispatchEvent(
          new CustomEvent('lesson-completed', { detail: { lessonId } })
        );
      } catch (e) {}
    }

    setCompleted(true);

    // If signed in, sync with server
    if (session) {
      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lessonId }),
        });
      } catch (err) {
        console.error('Failed to mark lesson complete', err);
      }
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={completed || loading}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
        completed
          ? 'bg-accent/10 border border-accent/30 text-accent cursor-default shadow-sm'
          : 'bg-surface-light hover:bg-surface border border-surface-border text-text-primary active:scale-[0.98]'
      }`}
    >
      {completed ? (
        <>
          <CheckCircle2 className="w-4 h-4 text-accent animate-scale-in" />
          <span>{t('completed')}</span>
        </>
      ) : (
        <>
          <Circle className="w-4 h-4 text-text-muted" />
          <span>{loading ? '...' : t('markComplete')}</span>
        </>
      )}
    </button>
  );
}
