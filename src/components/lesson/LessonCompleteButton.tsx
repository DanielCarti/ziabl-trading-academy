'use client';

import { useState } from 'react';
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

  const handleToggle = async () => {
    if (!session || completed || loading) return;

    setLoading(true);
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId }),
      });
      if (res.ok) {
        setCompleted(true);
      }
    } catch (err) {
      console.error('Failed to mark lesson complete', err);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="p-3 bg-surface-light rounded-lg border border-surface-border text-xs text-text-muted text-center">
        {t('loginToTrack')}
      </div>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={completed || loading}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
        completed
          ? 'bg-accent/10 border border-accent/30 text-accent cursor-default'
          : 'bg-surface-light hover:bg-surface border border-surface-border text-text-primary active:scale-[0.98]'
      }`}
    >
      {completed ? (
        <>
          <CheckCircle2 className="w-4 h-4 text-accent" />
          {t('completed')}
        </>
      ) : (
        <>
          <Circle className="w-4 h-4 text-text-muted" />
          {loading ? '...' : t('markComplete')}
        </>
      )}
    </button>
  );
}
