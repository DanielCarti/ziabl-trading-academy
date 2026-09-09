'use client';

import { useEffect } from 'react';
import { X, BookOpen, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export interface GlossaryModalTerm {
  id?: string;
  termRu: string;
  termEn: string;
  definitionRu: string;
  definitionEn: string;
  category?: string | null;
  relatedLessonSlug?: string | null;
}

interface GlossaryModalProps {
  term: GlossaryModalTerm | null;
  locale: string;
  onClose: () => void;
}

export default function GlossaryModal({ term, locale, onClose }: GlossaryModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (term) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [term, onClose]);

  if (!term) return null;

  const isRu = locale === 'ru';
  const termTitle = isRu ? term.termRu : term.termEn;
  const definition = isRu ? term.definitionRu : term.definitionEn;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog / Bottom Sheet on Mobile */}
      <div className="relative w-full sm:max-w-lg bg-surface border-t sm:border border-surface-border rounded-t-3xl sm:rounded-2xl p-5 sm:p-7 shadow-2xl z-10 animate-scale-in text-left max-h-[85vh] flex flex-col">
        {/* Mobile drag handle indicator */}
        <div className="sm:hidden w-12 h-1.5 bg-surface-border rounded-full mx-auto mb-4 shrink-0" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-accent" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 truncate">
                  {term.category || (isRu ? 'Термин' : 'Term')}
                </span>
                <span className="text-xs text-text-muted uppercase tracking-wider hidden xs:inline">Глоссарий</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-text-primary mt-1 truncate">{termTitle}</h3>
              {term.termEn && term.termRu && term.termEn !== term.termRu && (
                <p className="text-xs text-text-muted truncate">
                  {isRu ? term.termEn : term.termRu}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary rounded-xl hover:bg-surface-light transition-colors shrink-0 -mr-1 -mt-1"
            title={isRu ? 'Закрыть (Esc)' : 'Close (Esc)'}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Definition Content (scrollable) */}
        <div className="p-4 rounded-xl bg-surface-light border border-surface-border/60 text-sm text-text-secondary leading-relaxed mb-4 overflow-y-auto max-h-60 sm:max-h-72">
          {definition}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-surface-border shrink-0">
          <Link
            href={`/${locale}/glossary`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent hover:text-accent-hover inline-flex items-center gap-1.5 transition-colors font-medium self-start sm:self-center"
          >
            <span>{isRu ? 'Открыть полный глоссарий' : 'Open full glossary'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={onClose}
            className="btn-primary w-full sm:w-auto px-6 py-2.5 sm:py-2 text-xs font-medium"
          >
            {isRu ? 'Понятно' : 'Got it'}
          </button>
        </div>
      </div>
    </div>
  );
}
