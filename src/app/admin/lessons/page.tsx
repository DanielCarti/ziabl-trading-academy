'use client';

import { useState } from 'react';
import { mockModules, mockLessonsBySlug } from '@/lib/mockData';
import { BookOpen, Plus, Search, Edit2, Trash2, X, Eye, FileText, CheckCircle2 } from 'lucide-react';

interface LessonItem {
  id: string;
  slug: string;
  titleRu: string;
  titleEn: string;
  order: number;
  published: boolean;
  moduleId: string;
  moduleTitle: string;
  contentRu?: string;
  contentEn?: string;
  hasChart?: boolean;
}

export default function AdminLessonsPage() {
  const [modules, setModules] = useState(mockModules);
  const [search, setSearch] = useState('');

  // Lessons state with content attached from mockLessonsBySlug
  const [lessons, setLessons] = useState<LessonItem[]>(() => {
    return mockModules.flatMap((m) =>
      m.lessons.map((l) => {
        const full = mockLessonsBySlug[l.slug] || {};
        return {
          ...l,
          moduleTitle: m.titleRu,
          moduleId: m.id,
          contentRu: full.contentRu || '## Содержание урока\n\nТекст и учебный материал...',
          contentEn: full.contentEn || '## Lesson content\n\nEducational material...',
          hasChart: !!full.hasChart,
        };
      })
    );
  });

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);

  // Form states
  const [titleRu, setTitleRu] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [slug, setSlug] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState(mockModules[0]?.id || '');
  const [contentRu, setContentRu] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [hasChart, setHasChart] = useState(false);
  const [published, setPublished] = useState(true);

  const filteredLessons = lessons.filter(
    (l) =>
      l.titleRu.toLowerCase().includes(search.toLowerCase()) ||
      l.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      l.slug.toLowerCase().includes(search.toLowerCase()) ||
      l.moduleTitle.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingLessonId(null);
    setTitleRu('');
    setTitleEn('');
    setSlug('');
    setSelectedModuleId(modules[0]?.id || '');
    setContentRu('## Новый урок\n\nВведите теоретический материал урока, используя Markdown...\n\n### Основные концепции\n- Пункт 1\n- Пункт 2');
    setContentEn('## New Lesson\n\nEnter theoretical lesson content in Markdown...');
    setHasChart(false);
    setPublished(true);
    setShowModal(true);
  };

  const openEditModal = (lesson: LessonItem) => {
    setEditingLessonId(lesson.id);
    setTitleRu(lesson.titleRu);
    setTitleEn(lesson.titleEn);
    setSlug(lesson.slug);
    setSelectedModuleId(lesson.moduleId);
    setContentRu(lesson.contentRu || '');
    setContentEn(lesson.contentEn || '');
    setHasChart(!!lesson.hasChart);
    setPublished(lesson.published);
    setShowModal(true);
  };

  const handleSaveLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleRu.trim()) return;

    const generatedSlug = slug.trim()
      ? slug.trim()
      : titleRu
          .toLowerCase()
          .replace(/[^a-z0-9а-яё]/gi, '-')
          .replace(/-+/g, '-');

    const parentModule = modules.find((m) => m.id === selectedModuleId);
    const moduleTitle = parentModule ? parentModule.titleRu : 'Модуль';

    if (editingLessonId) {
      // Update
      setLessons((prev) =>
        prev.map((l) =>
          l.id === editingLessonId
            ? {
                ...l,
                titleRu,
                titleEn: titleEn || titleRu,
                slug: generatedSlug,
                moduleId: selectedModuleId,
                moduleTitle,
                contentRu,
                contentEn,
                hasChart,
                published,
              }
            : l
        )
      );
    } else {
      // Add
      const newLesson: LessonItem = {
        id: `les-${Date.now()}`,
        slug: generatedSlug,
        titleRu,
        titleEn: titleEn || titleRu,
        order: lessons.length + 1,
        published,
        moduleId: selectedModuleId,
        moduleTitle,
        contentRu,
        contentEn,
        hasChart,
      };
      setLessons((prev) => [newLesson, ...prev]);
    }

    setShowModal(false);
  };

  const handleDelete = (lessonId: string, title: string) => {
    if (!confirm(`Удалить урок «${title}»?`)) return;
    setLessons((prev) => prev.filter((l) => l.id !== lessonId));
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-accent" />
            Управление уроками
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Всего уроков: {lessons.length} в {modules.length} модулях (с возможностью редактирования теории)
          </p>
        </div>

        <button onClick={openAddModal} className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          Добавить урок
        </button>
      </div>

      {/* Search Bar */}
      <div className="card mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по названию, модулю или slug..."
            className="input-field pl-11"
          />
        </div>
      </div>

      {/* Lessons Table */}
      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-surface-border text-text-muted text-xs uppercase tracking-wider">
              <th className="pb-3 pl-2">№</th>
              <th className="pb-3">Название (RU)</th>
              <th className="pb-3">Модуль</th>
              <th className="pb-3">Slug</th>
              <th className="pb-3">Теория</th>
              <th className="pb-3">Статус</th>
              <th className="pb-3 text-right pr-2">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {filteredLessons.map((l, index) => (
              <tr key={l.id} className="hover:bg-surface-light transition-colors">
                <td className="py-3 pl-2 font-mono text-text-muted">{index + 1}</td>
                <td className="py-3 font-medium text-text-primary">
                  <span className="block">{l.titleRu}</span>
                  <span className="text-xs text-text-muted font-normal">{l.titleEn}</span>
                </td>
                <td className="py-3 text-text-secondary text-xs">{l.moduleTitle}</td>
                <td className="py-3 font-mono text-xs text-text-muted">{l.slug}</td>
                <td className="py-3 text-xs">
                  <span className="inline-flex items-center gap-1 text-accent bg-accent/10 px-2 py-0.5 rounded">
                    <FileText className="w-3 h-3" />
                    {l.contentRu ? `${l.contentRu.length} симв.` : 'Пусто'}
                  </span>
                </td>
                <td className="py-3">
                  {l.published ? (
                    <span className="badge badge-green">Опубликован</span>
                  ) : (
                    <span className="badge bg-warning/10 text-warning">Черновик</span>
                  )}
                </td>
                <td className="py-3 text-right pr-2">
                  <div className="flex items-center justify-end gap-1.5">
                    <a
                      href={`/ru/lesson/${l.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg hover:bg-surface text-text-secondary hover:text-accent transition-colors"
                      title="Открыть на сайте"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => openEditModal(l)}
                      className="p-2 rounded-lg hover:bg-surface text-text-secondary hover:text-accent transition-colors"
                      title="Редактировать урок и содержимое"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(l.id, l.titleRu)}
                      className="p-2 rounded-lg hover:bg-surface text-danger/70 hover:text-danger transition-colors"
                      title="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal: Full Editor for Lesson Content */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="card w-full max-w-3xl my-8 animate-fade-in shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-surface-border pb-3 mb-4 shrink-0">
              <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-accent" />
                {editingLessonId ? 'Редактирование урока и содержимого' : 'Создание нового урока'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLesson} className="space-y-4 overflow-y-auto pr-2 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">Родительский модуль *</label>
                  <select
                    value={selectedModuleId}
                    onChange={(e) => setSelectedModuleId(e.target.value)}
                    className="input-field"
                  >
                    {modules.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.titleRu}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">URL Slug (идентификатор)</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="например: risk-management"
                    className="input-field font-mono text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">Название урока (RU) *</label>
                  <input
                    type="text"
                    value={titleRu}
                    onChange={(e) => setTitleRu(e.target.value)}
                    placeholder="Например: Основы риск-менеджмента"
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">Название урока (EN)</label>
                  <input
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="Например: Risk Management Basics"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 text-xs font-medium text-text-secondary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasChart}
                    onChange={(e) => setHasChart(e.target.checked)}
                    className="rounded border-surface-border text-accent focus:ring-accent"
                  />
                  <span>Встроить интерактивный график котировок</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium text-text-secondary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="rounded border-surface-border text-accent focus:ring-accent"
                  />
                  <span>Опубликован для учеников</span>
                </label>
              </div>

              {/* Lesson Theoretical Content Editor */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-text-secondary">
                    Учебный материал урока (Markdown RU) *
                  </label>
                  <span className="text-xs text-text-muted">Поддерживает # заголовки, списки, таблицы</span>
                </div>
                <textarea
                  value={contentRu}
                  onChange={(e) => setContentRu(e.target.value)}
                  placeholder="Введите учебный материал, теорию, примеры в формате Markdown..."
                  rows={8}
                  required
                  className="input-field font-mono text-xs leading-relaxed resize-y"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                  Учебный материал урока (Markdown EN)
                </label>
                <textarea
                  value={contentEn}
                  onChange={(e) => setContentEn(e.target.value)}
                  placeholder="English lesson markdown content (optional)..."
                  rows={4}
                  className="input-field font-mono text-xs leading-relaxed resize-y"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-surface-border pt-4 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-ghost text-sm"
                >
                  Отмена
                </button>
                <button type="submit" className="btn-primary text-sm gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {editingLessonId ? 'Сохранить изменения' : 'Создать урок'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
