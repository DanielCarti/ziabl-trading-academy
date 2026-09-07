'use client';

import { useState } from 'react';
import { mockGlossaryTerms } from '@/lib/mockData';
import { BookMarked, Plus, Search, Edit2, Trash2, Check, X } from 'lucide-react';

interface GlossaryTerm {
  id: string;
  termRu: string;
  termEn: string;
  definitionRu: string;
  definitionEn: string;
  category: string;
  relatedLessonSlug?: string;
}

export default function AdminGlossaryPage() {
  const [terms, setTerms] = useState<GlossaryTerm[]>(mockGlossaryTerms);
  const [search, setSearch] = useState('');
  
  // Modal state (for add & edit)
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form fields
  const [termRu, setTermRu] = useState('');
  const [termEn, setTermEn] = useState('');
  const [definitionRu, setDefinitionRu] = useState('');
  const [definitionEn, setDefinitionEn] = useState('');
  const [category, setCategory] = useState('Трейдинг');

  const filtered = terms.filter(
    (t) =>
      t.termRu.toLowerCase().includes(search.toLowerCase()) ||
      t.termEn.toLowerCase().includes(search.toLowerCase()) ||
      t.definitionRu.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingId(null);
    setTermRu('');
    setTermEn('');
    setDefinitionRu('');
    setDefinitionEn('');
    setCategory('Трейдинг');
    setShowModal(true);
  };

  const openEditModal = (term: GlossaryTerm) => {
    setEditingId(term.id);
    setTermRu(term.termRu);
    setTermEn(term.termEn);
    setDefinitionRu(term.definitionRu);
    setDefinitionEn(term.definitionEn || term.definitionRu);
    setCategory(term.category);
    setShowModal(true);
  };

  const handleSaveTerm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termRu.trim() || !definitionRu.trim()) return;

    if (editingId) {
      // Update existing
      setTerms((prev) =>
        prev.map((t) =>
          t.id === editingId
            ? {
                ...t,
                termRu,
                termEn: termEn || termRu,
                definitionRu,
                definitionEn: definitionEn || definitionRu,
                category,
              }
            : t
        )
      );
    } else {
      // Add new
      const newTerm: GlossaryTerm = {
        id: `g-${Date.now()}`,
        termRu,
        termEn: termEn || termRu,
        definitionRu,
        definitionEn: definitionEn || definitionRu,
        category,
        relatedLessonSlug: 'stocks-long-short',
      };
      setTerms((prev) => [newTerm, ...prev]);
    }

    setShowModal(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Удалить термин «${name}» из словаря?`)) return;
    setTerms((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
            <BookMarked className="w-8 h-8 text-accent" />
            Управление глоссарием
          </h1>
          <p className="text-sm text-text-secondary mt-1">Всего финансовых терминов: {terms.length}</p>
        </div>

        <button onClick={openAddModal} className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          Добавить термин
        </button>
      </div>

      {/* Search */}
      <div className="card mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по термину, категории или определению..."
            className="input-field pl-11"
          />
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-surface-border text-text-muted text-xs uppercase tracking-wider">
              <th className="pb-3 pl-2">Термин (RU)</th>
              <th className="pb-3">Термин (EN)</th>
              <th className="pb-3">Категория</th>
              <th className="pb-3">Определение</th>
              <th className="pb-3 text-right pr-2">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-surface-light transition-colors">
                <td className="py-3 pl-2 font-bold text-text-primary">{t.termRu}</td>
                <td className="py-3 font-mono text-xs text-text-muted">{t.termEn}</td>
                <td className="py-3">
                  <span className="badge bg-accent/10 text-accent text-xs font-medium">{t.category}</span>
                </td>
                <td className="py-3 text-text-secondary max-w-md line-clamp-2 text-xs">
                  {t.definitionRu}
                </td>
                <td className="py-3 text-right pr-2">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => openEditModal(t)}
                      className="p-2 rounded-lg hover:bg-surface text-text-secondary hover:text-accent transition-colors"
                      title="Редактировать"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id, t.termRu)}
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

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card w-full max-w-lg animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between border-b border-surface-border pb-3 mb-4">
              <h3 className="text-xl font-bold text-text-primary">
                {editingId ? 'Редактировать термин' : 'Новый термин глоссария'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTerm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">Термин (RU) *</label>
                  <input
                    type="text"
                    value={termRu}
                    onChange={(e) => setTermRu(e.target.value)}
                    placeholder="Например: Волатильность"
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">Термин (EN)</label>
                  <input
                    type="text"
                    value={termEn}
                    onChange={(e) => setTermEn(e.target.value)}
                    placeholder="Например: Volatility"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Категория</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-field"
                >
                  <option value="Трейдинг">Трейдинг</option>
                  <option value="Макроэкономика">Макроэкономика</option>
                  <option value="Облигации">Облигации</option>
                  <option value="Фонды">Фонды</option>
                  <option value="Анализ">Анализ</option>
                  <option value="Теханализ">Теханализ</option>
                  <option value="Инвестиции">Инвестиции</option>
                  <option value="Общее">Общее</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Определение (RU) *</label>
                <textarea
                  value={definitionRu}
                  onChange={(e) => setDefinitionRu(e.target.value)}
                  placeholder="Понятное определение термина на русском..."
                  rows={3}
                  required
                  className="input-field resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Определение (EN)</label>
                <textarea
                  value={definitionEn}
                  onChange={(e) => setDefinitionEn(e.target.value)}
                  placeholder="English definition (optional)..."
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
                <button type="submit" className="btn-primary text-sm">
                  {editingId ? 'Сохранить изменения' : 'Добавить термин'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
