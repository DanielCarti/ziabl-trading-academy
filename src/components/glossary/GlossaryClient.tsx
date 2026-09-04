'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { getLocalizedField } from '@/lib/utils';
import { Search, BookOpen, Tag } from 'lucide-react';
import Link from 'next/link';

interface GlossaryTerm {
  id: string;
  termRu: string;
  termEn: string;
  definitionRu: string;
  definitionEn: string;
  category: string | null;
  relatedLessonSlug: string | null;
}

export default function GlossaryClient({ terms, locale }: { terms: GlossaryTerm[]; locale: string }) {
  const t = useTranslations('glossary');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(terms.map((t) => t.category).filter(Boolean))] as string[];

  const filtered = terms.filter((term) => {
    const termText = getLocalizedField(term, 'term', locale).toLowerCase();
    const defText = getLocalizedField(term, 'definition', locale).toLowerCase();
    const matchesSearch = !search || termText.includes(search.toLowerCase()) || defText.includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('search')}
          className="input-field pl-12"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`badge ${!selectedCategory ? 'badge-green' : 'bg-surface-light text-text-secondary hover:text-text-primary'} cursor-pointer transition-all`}
        >
          {t('allCategories')}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
            className={`badge ${cat === selectedCategory ? 'badge-green' : 'bg-surface-light text-text-secondary hover:text-text-primary'} cursor-pointer transition-all`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Terms grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-text-muted">{t('noResults')}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((term) => (
            <div key={term.id} className="card-hover">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <span className="text-accent font-bold text-sm">
                    {getLocalizedField(term, 'term', locale).charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary">
                    {getLocalizedField(term, 'term', locale)}
                  </h3>
                  <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                    {getLocalizedField(term, 'definition', locale)}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    {term.category && (
                      <span className="badge bg-surface-light text-text-muted text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {term.category}
                      </span>
                    )}
                    {term.relatedLessonSlug && (
                      <Link
                        href={`/${locale}/lesson/${term.relatedLessonSlug}`}
                        className="badge badge-green text-xs hover:bg-accent/20 transition-colors"
                      >
                        <BookOpen className="w-3 h-3 mr-1" />
                        {t('relatedLesson')}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
