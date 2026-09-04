'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { getLocalizedField } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, RotateCcw, PartyPopper, AlertCircle } from 'lucide-react';

interface QuizQuestion {
  id: string;
  questionRu: string;
  questionEn: string;
  optionsRu: string[];
  optionsEn: string[];
  correctIndices: number[];
  explanationRu: string | null;
  explanationEn: string | null;
  order: number;
}

interface QuizProps {
  quizId: string;
  questions: QuizQuestion[];
  locale: string;
  passingScore: number;
}

export default function Quiz({ quizId, questions, locale, passingScore }: QuizProps) {
  const t = useTranslations('quiz');
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<{
    score: number;
    total: number;
    passed: boolean;
    details: Record<string, boolean>;
  } | null>(null);

  const handleSelect = (questionId: string, optionIndex: number, isMulti: boolean) => {
    if (submitted) return;
    setAnswers((prev) => {
      const current = prev[questionId] || [];
      if (isMulti) {
        const exists = current.includes(optionIndex);
        return {
          ...prev,
          [questionId]: exists ? current.filter((i) => i !== optionIndex) : [...current, optionIndex],
        };
      }
      return { ...prev, [questionId]: [optionIndex] };
    });
  };

  const handleSubmit = async () => {
    let correct = 0;
    const details: Record<string, boolean> = {};

    questions.forEach((q) => {
      const userAnswer = (answers[q.id] || []).slice().sort();
      const correctAnswer = q.correctIndices.slice().sort();
      const isCorrect =
        userAnswer.length === correctAnswer.length &&
        userAnswer.every((v, i) => v === correctAnswer[i]);
      details[q.id] = isCorrect;
      if (isCorrect) correct++;
    });

    const score = Math.round((correct / questions.length) * 100);
    setResults({ score, total: questions.length, passed: score >= passingScore, details });
    setSubmitted(true);

    try {
      await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizId, answers }),
      });
    } catch (e) {
      console.error('Failed to sync quiz attempt', e);
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setResults(null);
  };

  const getOptions = (q: QuizQuestion) => locale === 'ru' ? q.optionsRu : q.optionsEn;
  const getQuestion = (q: QuizQuestion) => locale === 'ru' ? q.questionRu : q.questionEn;
  const getExplanation = (q: QuizQuestion) => locale === 'ru' ? q.explanationRu : q.explanationEn;

  return (
    <div>
      <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-accent" />
        {t('title')}
      </h3>

      {/* Results Banner */}
      {results && (
        <div className={cn(
          'mb-6 p-6 rounded-xl border text-center',
          results.passed
            ? 'bg-accent/5 border-accent/30'
            : 'bg-danger/5 border-danger/30'
        )}>
          {results.passed && <PartyPopper className="w-10 h-10 text-accent mx-auto mb-3" />}
          <div className="text-3xl font-bold mb-2">
            <span className={results.passed ? 'text-accent' : 'text-danger'}>{results.score}%</span>
          </div>
          <p className={cn('text-lg font-medium', results.passed ? 'text-accent' : 'text-danger')}>
            {results.passed ? t('passed') : t('failed')}
          </p>
          <p className="text-sm text-text-muted mt-1">
            {Object.values(results.details).filter(Boolean).length} / {results.total} {t('correct').toLowerCase()}
          </p>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, qi) => {
          const isMulti = q.correctIndices.length > 1;
          const isCorrect = results?.details[q.id];
          const options = getOptions(q);

          return (
            <div
              key={q.id}
              className={cn(
                'p-5 rounded-xl border transition-all',
                submitted && isCorrect !== undefined
                  ? isCorrect ? 'border-accent/30 bg-accent/5' : 'border-danger/30 bg-danger/5'
                  : 'border-surface-border bg-surface-light'
              )}
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-surface border border-surface-border flex items-center justify-center text-xs font-bold text-text-muted shrink-0">
                  {qi + 1}
                </span>
                <p className="text-text-primary font-medium">{getQuestion(q)}</p>
              </div>

              <div className="space-y-2 ml-10">
                {options.map((opt, oi) => {
                  const isSelected = (answers[q.id] || []).includes(oi);
                  const isCorrectOption = q.correctIndices.includes(oi);

                  return (
                    <button
                      key={oi}
                      onClick={() => handleSelect(q.id, oi, isMulti)}
                      disabled={submitted}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all text-sm',
                        submitted
                          ? isCorrectOption
                            ? 'border-accent/50 bg-accent/10 text-accent'
                            : isSelected
                              ? 'border-danger/50 bg-danger/10 text-danger'
                              : 'border-surface-border text-text-muted'
                          : isSelected
                            ? 'border-accent bg-accent/10 text-text-primary'
                            : 'border-surface-border hover:border-accent/30 text-text-secondary hover:text-text-primary'
                      )}
                    >
                      <div className={cn(
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
                        isSelected ? 'border-accent' : 'border-surface-border'
                      )}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                      </div>
                      <span className="flex-1">{opt}</span>
                      {submitted && isCorrectOption && <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />}
                      {submitted && isSelected && !isCorrectOption && <XCircle className="w-4 h-4 text-danger shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {submitted && getExplanation(q) && (
                <div className="mt-3 ml-10 p-3 rounded-lg bg-surface text-sm text-text-secondary border border-surface-border">
                  <span className="font-medium text-accent">{t('explanation')}:</span> {getExplanation(q)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4 mt-8">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length}
            className="btn-primary"
          >
            {t('submit')}
          </button>
        ) : (
          <button onClick={handleRetry} className="btn-secondary">
            <RotateCcw className="w-4 h-4" />
            {t('tryAgain')}
          </button>
        )}
      </div>
    </div>
  );
}
