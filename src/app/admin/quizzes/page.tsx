'use client';

import { useState } from 'react';
import { mockLessonsBySlug, mockModules } from '@/lib/mockData';
import { HelpCircle, CheckCircle, Plus, Edit2, Trash2, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface QuestionItem {
  id: string;
  questionRu: string;
  questionEn: string;
  optionsRu: string[];
  optionsEn: string[];
  correctIndices: number[];
  explanationRu?: string;
  explanationEn?: string;
}

interface QuizItem {
  id: string;
  lessonSlug: string;
  lessonTitle: string;
  passingScore: number;
  questions: QuestionItem[];
}

export default function AdminQuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizItem[]>(() => {
    return Object.entries(mockLessonsBySlug)
      .filter(([_, data]) => data.quiz)
      .map(([slug, data]) => ({
        id: (data.quiz.id as string) || (`quiz-${slug}`),
        lessonSlug: slug,
        lessonTitle: data.titleRu,
        passingScore: data.quiz.passingScore || 70,
        questions: data.quiz.questions || [],
      }));
  });

  const allAvailableLessons = mockModules.flatMap((m) =>
    m.lessons.map((l) => ({ slug: l.slug, title: l.titleRu }))
  );

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);

  // Form states
  const [selectedLessonSlug, setSelectedLessonSlug] = useState(allAvailableLessons[0]?.slug || '');
  const [passingScore, setPassingScore] = useState(70);
  
  // Single question editor states (for adding question or primary question)
  const [questionRu, setQuestionRu] = useState('');
  const [opt0, setOpt0] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [correctIndex, setCorrectIndex] = useState(0);
  const [explanationRu, setExplanationRu] = useState('');

  const openAddModal = () => {
    setEditingQuizId(null);
    setSelectedLessonSlug(allAvailableLessons[0]?.slug || '');
    setPassingScore(70);
    setQuestionRu('');
    setOpt0('');
    setOpt1('');
    setOpt2('');
    setOpt3('');
    setCorrectIndex(0);
    setExplanationRu('');
    setShowModal(true);
  };

  const openEditModal = (q: QuizItem) => {
    setEditingQuizId(q.id);
    setSelectedLessonSlug(q.lessonSlug);
    setPassingScore(q.passingScore);

    const firstQ = q.questions[0] || {
      questionRu: '',
      optionsRu: ['', '', '', ''],
      correctIndices: [0],
      explanationRu: '',
    };

    setQuestionRu(firstQ.questionRu || '');
    setOpt0(firstQ.optionsRu[0] || '');
    setOpt1(firstQ.optionsRu[1] || '');
    setOpt2(firstQ.optionsRu[2] || '');
    setOpt3(firstQ.optionsRu[3] || '');
    setCorrectIndex(firstQ.correctIndices[0] ?? 0);
    setExplanationRu(firstQ.explanationRu || '');
    setShowModal(true);
  };

  const handleSaveQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionRu.trim()) return;

    const lessonObj = allAvailableLessons.find((l) => l.slug === selectedLessonSlug);
    const lessonTitle = lessonObj ? lessonObj.title : selectedLessonSlug;

    const newQuestion: QuestionItem = {
      id: `q-${Date.now()}`,
      questionRu,
      questionEn: questionRu,
      optionsRu: [opt0 || 'Вариант 1', opt1 || 'Вариант 2', opt2 || 'Вариант 3', opt3 || 'Вариант 4'],
      optionsEn: [opt0 || 'Option 1', opt1 || 'Option 2', opt2 || 'Option 3', opt3 || 'Option 4'],
      correctIndices: [Number(correctIndex)],
      explanationRu,
      explanationEn: explanationRu,
    };

    if (editingQuizId) {
      setQuizzes((prev) =>
        prev.map((item) =>
          item.id === editingQuizId
            ? {
                ...item,
                lessonSlug: selectedLessonSlug,
                lessonTitle,
                passingScore: Number(passingScore),
                questions: [newQuestion, ...(item.questions.slice(1))],
              }
            : item
        )
      );
    } else {
      const newQuiz: QuizItem = {
        id: `quiz-${Date.now()}`,
        lessonSlug: selectedLessonSlug,
        lessonTitle,
        passingScore: Number(passingScore),
        questions: [newQuestion],
      };
      setQuizzes((prev) => [newQuiz, ...prev]);
    }

    setShowModal(false);
  };

  const handleDeleteQuiz = (id: string, title: string) => {
    if (!confirm(`Удалить тест к уроку «${title}»?`)) return;
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
  };

  const handleDeleteQuestion = (quizId: string, qId: string) => {
    if (!confirm('Удалить этот вопрос из квиза?')) return;
    setQuizzes((prev) =>
      prev.map((quiz) => {
        if (quiz.id === quizId) {
          return {
            ...quiz,
            questions: quiz.questions.filter((q) => q.id !== qId),
          };
        }
        return quiz;
      })
    );
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-accent" />
            Управление квизами
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Всего тестов: {quizzes.length} | Вопросов в базе: {quizzes.reduce((acc, q) => acc + q.questions.length, 0)}
          </p>
        </div>

        <button onClick={openAddModal} className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          Создать квиз
        </button>
      </div>

      <div className="space-y-6">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="card space-y-4 hover:border-accent/30 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-border pb-3">
              <div>
                <span className="text-xs text-accent font-mono uppercase tracking-wider block">Урок: {quiz.lessonSlug}</span>
                <h3 className="text-lg font-bold text-text-primary">{quiz.lessonTitle}</h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="badge bg-accent/10 text-accent font-mono text-xs">
                  Порог: {quiz.passingScore}%
                </span>
                <button
                  onClick={() => openEditModal(quiz)}
                  className="p-2 rounded-lg hover:bg-surface-light text-text-secondary hover:text-accent transition-colors"
                  title="Редактировать квиз"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteQuiz(quiz.id, quiz.lessonTitle)}
                  className="p-2 rounded-lg hover:bg-surface-light text-danger/70 hover:text-danger transition-colors"
                  title="Удалить весь квиз"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {quiz.questions.map((q, qi) => (
                <div key={q.id} className="p-3.5 rounded-lg bg-surface-light border border-surface-border text-xs relative group">
                  <div className="flex items-center justify-between font-semibold text-text-primary mb-2.5">
                    <span className="flex items-center gap-2">
                      <span className="text-accent font-mono">#{qi + 1}</span>
                      <span>{q.questionRu}</span>
                    </span>
                    <button
                      onClick={() => handleDeleteQuestion(quiz.id, q.id)}
                      className="opacity-0 group-hover:opacity-100 text-danger/70 hover:text-danger transition-opacity p-1"
                      title="Удалить вопрос"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-3 border-l-2 border-accent/40">
                    {q.optionsRu.map((opt, oi) => {
                      const isCorrect = q.correctIndices.includes(oi);
                      return (
                        <div
                          key={oi}
                          className={`flex items-center gap-2 p-1.5 rounded ${
                            isCorrect ? 'text-accent bg-accent/5 font-medium' : 'text-text-secondary'
                          }`}
                        >
                          {isCorrect ? (
                            <CheckCircle className="w-4 h-4 shrink-0 text-accent" />
                          ) : (
                            <span className="w-4 text-center text-text-muted">•</span>
                          )}
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {q.explanationRu && (
                    <p className="mt-2.5 text-text-muted italic border-t border-surface-border pt-2 text-[11px]">
                      💡 Пояснение: {q.explanationRu}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="card w-full max-w-2xl my-8 animate-fade-in shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-surface-border pb-3 mb-4 shrink-0">
              <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-accent" />
                {editingQuizId ? 'Редактировать квиз' : 'Создать новый квиз к уроку'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuiz} className="space-y-4 overflow-y-auto pr-2 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">К какому уроку привязать *</label>
                  <select
                    value={selectedLessonSlug}
                    onChange={(e) => setSelectedLessonSlug(e.target.value)}
                    className="input-field"
                  >
                    {allAvailableLessons.map((l) => (
                      <option key={l.slug} value={l.slug}>
                        {l.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">Проходной балл (%)</label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    step="5"
                    value={passingScore}
                    onChange={(e) => setPassingScore(Number(e.target.value))}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Вопрос теста (RU) *</label>
                <input
                  type="text"
                  value={questionRu}
                  onChange={(e) => setQuestionRu(e.target.value)}
                  placeholder="Например: Что происходит с ценой облигации при росте ставки ЦБ?"
                  required
                  className="input-field"
                />
              </div>

              <div className="space-y-2 pt-1">
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                  Варианты ответов (отметьте правильный переключателем) *
                </label>

                {[
                  { val: opt0, setVal: setOpt0, idx: 0, placeholder: 'Вариант 1 (например: Цена падает)' },
                  { val: opt1, setVal: setOpt1, idx: 1, placeholder: 'Вариант 2 (например: Цена растёт)' },
                  { val: opt2, setVal: setOpt2, idx: 2, placeholder: 'Вариант 3 (например: Цена не меняется)' },
                  { val: opt3, setVal: setOpt3, idx: 3, placeholder: 'Вариант 4 (например: Облигации сгорают)' },
                ].map((item) => (
                  <div key={item.idx} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="correctOption"
                      checked={correctIndex === item.idx}
                      onChange={() => setCorrectIndex(item.idx)}
                      className="w-4 h-4 text-accent focus:ring-accent cursor-pointer"
                      title="Сделать этот ответ правильным"
                    />
                    <input
                      type="text"
                      value={item.val}
                      onChange={(e) => item.setVal(e.target.value)}
                      placeholder={item.placeholder}
                      required={item.idx < 2}
                      className="input-field flex-1 text-xs"
                    />
                    {correctIndex === item.idx && (
                      <span className="text-xs text-accent font-semibold shrink-0">✓ Верный</span>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                  Пояснение к правильному ответу
                </label>
                <textarea
                  value={explanationRu}
                  onChange={(e) => setExplanationRu(e.target.value)}
                  placeholder="Объяснение, которое увидит студент после прохождения теста..."
                  rows={2}
                  className="input-field resize-none text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6 border-t border-surface-border pt-4 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-ghost text-sm"
                >
                  Отмена
                </button>
                <button type="submit" className="btn-primary text-sm gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {editingQuizId ? 'Сохранить квиз' : 'Создать квиз'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
