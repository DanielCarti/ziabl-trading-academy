'use client';

import { useState } from 'react';
import { mockModules } from '@/lib/mockData';
import { BookOpen, Layers, Plus, Edit2, Trash2, X, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface CourseModule {
  id: string;
  slug: string;
  titleRu: string;
  titleEn: string;
  descRu: string;
  descEn: string;
  order: number;
  published: boolean;
  lessons: any[];
}

export default function AdminCoursesPage() {
  const [modules, setModules] = useState<CourseModule[]>(mockModules as CourseModule[]);
  const [showModal, setShowModal] = useState(false);
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);

  // Form fields
  const [titleRu, setTitleRu] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descRu, setDescRu] = useState('');
  const [descEn, setDescEn] = useState('');
  const [order, setOrder] = useState(1);

  const openAddModal = () => {
    setEditingModuleId(null);
    setTitleRu('');
    setTitleEn('');
    setDescRu('');
    setDescEn('');
    setOrder(modules.length + 1);
    setShowModal(true);
  };

  const openEditModal = (m: CourseModule) => {
    setEditingModuleId(m.id);
    setTitleRu(m.titleRu);
    setTitleEn(m.titleEn);
    setDescRu(m.descRu);
    setDescEn(m.descEn);
    setOrder(m.order);
    setShowModal(true);
  };

  const handleSaveModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleRu.trim()) return;

    if (editingModuleId) {
      setModules((prev) =>
        prev.map((m) =>
          m.id === editingModuleId
            ? {
                ...m,
                titleRu,
                titleEn: titleEn || titleRu,
                descRu,
                descEn: descEn || descRu,
                order: Number(order),
              }
            : m
        )
      );
    } else {
      const newModule: CourseModule = {
        id: `mod-${Date.now()}`,
        slug: titleRu
          .toLowerCase()
          .replace(/[^a-z0-9а-яё]/gi, '-')
          .replace(/-+/g, '-'),
        titleRu,
        titleEn: titleEn || titleRu,
        descRu,
        descEn: descEn || descRu,
        order: Number(order),
        published: true,
        lessons: [],
      };
      setModules((prev) => [...prev, newModule]);
    }

    setShowModal(false);
  };

  const handleDeleteModule = (id: string, name: string) => {
    if (!confirm(`Удалить модуль «${name}» и все привязанные к нему данные?`)) return;
    setModules((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
            <Layers className="w-8 h-8 text-accent" />
            Курсы и модули
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Всего модулей: {modules.length} | Уроков во всех модулях: {modules.reduce((acc, m) => acc + m.lessons.length, 0)}
          </p>
        </div>

        <button onClick={openAddModal} className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          Создать модуль
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((m, index) => (
          <div key={m.id} className="card space-y-4 hover:border-accent/30 transition-all flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-accent/10 text-accent font-mono text-xs font-semibold">
                  Модуль {m.order || index + 1}
                </span>
                <span className="text-xs text-text-muted font-mono">ID: {m.id}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(m)}
                  className="p-2 rounded-lg hover:bg-surface-light text-text-secondary hover:text-accent transition-colors"
                  title="Редактировать модуль"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteModule(m.id, m.titleRu)}
                  className="p-2 rounded-lg hover:bg-surface-light text-danger/70 hover:text-danger transition-colors"
                  title="Удалить модуль"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text-primary">{m.titleRu}</h3>
              <p className="text-xs text-text-muted font-mono mt-0.5">{m.titleEn}</p>
              <p className="text-sm text-text-secondary mt-2 leading-relaxed">{m.descRu}</p>
            </div>

            {/* Attached Lessons List */}
            <div className="border-t border-surface-border pt-3 mt-auto space-y-2">
              <div className="flex items-center justify-between text-xs text-text-muted uppercase tracking-wider font-semibold">
                <span>Список уроков ({m.lessons.length})</span>
                <Link href="/admin/lessons" className="text-accent hover:underline lowercase font-normal">
                  управлять в уроках →
                </Link>
              </div>

              {m.lessons.length === 0 ? (
                <div className="p-3 rounded-lg bg-surface-light text-xs text-text-muted text-center">
                  В этом модуле пока нет уроков
                </div>
              ) : (
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {m.lessons.map((l: any, li: number) => (
                    <div key={l.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-surface-light border border-surface-border/60">
                      <span className="truncate pr-2 text-text-primary font-medium">
                        {index + 1}.{li + 1} {l.titleRu}
                      </span>
                      <a href={`/ru/lesson/${l.slug}`} target="_blank" rel="noreferrer" className="text-accent hover:underline shrink-0 text-xs flex items-center gap-0.5">
                        <span>Смотреть</span>
                        <ChevronRight className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Module Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card w-full max-w-md animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between border-b border-surface-border pb-3 mb-4">
              <h3 className="text-xl font-bold text-text-primary">
                {editingModuleId ? 'Редактировать модуль' : 'Создать новый модуль'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModule} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Порядковый номер</label>
                <input
                  type="number"
                  min={1}
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Название модуля (RU) *</label>
                <input
                  type="text"
                  value={titleRu}
                  onChange={(e) => setTitleRu(e.target.value)}
                  placeholder="Например: Психология и риск-менеджмент"
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Название модуля (EN)</label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="Например: Psychology and Risk Management"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Описание модуля (RU)</label>
                <textarea
                  value={descRu}
                  onChange={(e) => setDescRu(e.target.value)}
                  placeholder="Краткое описание того, чему научится студент..."
                  rows={3}
                  className="input-field resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Описание модуля (EN)</label>
                <textarea
                  value={descEn}
                  onChange={(e) => setDescEn(e.target.value)}
                  placeholder="Module description in English..."
                  rows={2}
                  className="input-field resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6 border-t border-surface-border pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-ghost text-sm"
                >
                  Отмена
                </button>
                <button type="submit" className="btn-primary text-sm gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {editingModuleId ? 'Сохранить модуль' : 'Создать модуль'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
