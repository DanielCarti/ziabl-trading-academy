'use client';

import { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import dynamic from 'next/dynamic';
import GlossaryModal, { GlossaryModalTerm } from '@/components/glossary/GlossaryModal';

const CandlestickChart = dynamic(() => import('@/components/charts/CandlestickChart'), { ssr: false });

interface LessonContentProps {
  content: string;
  hasChart?: boolean;
  chartType?: string | null;
  locale?: string;
  glossaryTerms?: GlossaryModalTerm[];
}

export default function LessonContent({
  content,
  hasChart,
  chartType,
  locale = 'ru',
  glossaryTerms = [],
}: LessonContentProps) {
  const [activeModalTerm, setActiveModalTerm] = useState<GlossaryModalTerm | null>(null);

  // Pre-build a sorted map of searchable keywords to terms
  const keywordMap = useMemo(() => {
    if (!glossaryTerms || glossaryTerms.length === 0) return [];

    const list: { key: string; term: GlossaryModalTerm }[] = [];
    for (const t of glossaryTerms) {
      // 1. Explicit ID
      if (t.id) list.push({ key: t.id.toLowerCase(), term: t });

      // 2. Full Russian term without brackets
      const cleanRu = t.termRu.replace(/\s*\([^)]*\)/g, '').trim().toLowerCase();
      if (cleanRu.length >= 3) list.push({ key: cleanRu, term: t });

      // 3. Extracted bracket content, e.g. "Opportunity Cost", "EBITDA", "YTM", "Level 2"
      const bracketMatch = t.termRu.match(/\(([^)]+)\)/);
      if (bracketMatch && bracketMatch[1]) {
        const inside = bracketMatch[1].trim().toLowerCase();
        if (inside.length >= 2) list.push({ key: inside, term: t });
      }

      // 4. English term
      if (t.termEn) {
        const cleanEn = t.termEn.replace(/\s*\([^)]*\)/g, '').trim().toLowerCase();
        if (cleanEn.length >= 2) list.push({ key: cleanEn, term: t });
      }

      // 5. Special aliases
      if (t.termRu.includes('Фишер')) {
        list.push({ key: 'уравнение фишера', term: t });
        list.push({ key: 'ирвинг фишер', term: t });
        list.push({ key: 'фишер', term: t });
      }
      if (t.termRu.includes('RUONIA')) {
        list.push({ key: 'ruonia', term: t });
      }
      if (t.termRu.includes('EBITDA')) {
        list.push({ key: 'ebitda', term: t });
        list.push({ key: 'ev / ebitda', term: t });
        list.push({ key: 'net debt / ebitda', term: t });
      }
      if (t.termRu.includes('Net Debt') && !t.termRu.includes('/')) {
        list.push({ key: 'net debt', term: t });
        list.push({ key: 'чистый долг', term: t });
      }
      if (t.termRu.includes('ОФЗ-ПД')) {
        list.push({ key: 'офз-пд', term: t });
      }
      if (t.termRu.includes('ОФЗ-ПК')) {
        list.push({ key: 'офз-пк', term: t });
        list.push({ key: 'флоатер', term: t });
        list.push({ key: 'флоатеры', term: t });
      }
      if (t.termRu.includes('ОФЗ-ИН')) {
        list.push({ key: 'офз-ин', term: t });
        list.push({ key: 'линкер', term: t });
        list.push({ key: 'линкеры', term: t });
      }
      if (t.termRu.includes('Таргет')) {
        list.push({ key: 'таргет по инфляции', term: t });
        list.push({ key: 'таргет', term: t });
      }
      if (t.termRu.includes('ИПЦ')) {
        list.push({ key: 'ипц', term: t });
      }
      if (t.termRu.includes('ИИС-3')) {
        list.push({ key: 'иис-3', term: t });
        list.push({ key: 'иис', term: t });
      }
      if (t.termRu.includes('НКЦ')) {
        list.push({ key: 'нкц', term: t });
      }
      if (t.termRu.includes('НРД')) {
        list.push({ key: 'нрд', term: t });
      }
      if (t.termRu.includes('Т+1')) {
        list.push({ key: 'т+1', term: t });
      }
      if (t.termRu.includes('стакан')) {
        list.push({ key: 'биржевой стакан', term: t });
        list.push({ key: 'order book', term: t });
      }
      if (t.termRu.includes('Спред')) {
        list.push({ key: 'спред', term: t });
        list.push({ key: 'спреды', term: t });
      }
      if (t.termRu.includes('Дюрация')) {
        list.push({ key: 'дюрация', term: t });
        list.push({ key: 'дюрации', term: t });
      }
      if (t.termRu.includes('YTM')) {
        list.push({ key: 'ytm', term: t });
      }
      if (t.termRu.includes('ров')) {
        list.push({ key: 'экономический ров', term: t });
        list.push({ key: 'economic moat', term: t });
        list.push({ key: 'moat', term: t });
      }
      if (t.termRu.includes('безопасности')) {
        list.push({ key: 'маржа безопасности', term: t });
        list.push({ key: 'margin of safety', term: t });
      }
      if (t.termRu.includes('компетенций')) {
        list.push({ key: 'круг компетенций', term: t });
        list.push({ key: 'circle of competence', term: t });
      }
      if (t.termRu.includes('FCF')) {
        list.push({ key: 'fcf', term: t });
      }
      if (t.termRu.includes('P/E')) {
        list.push({ key: 'p/e', term: t });
      }
      if (t.termRu.includes('ROE')) {
        list.push({ key: 'roe', term: t });
      }
      if (t.termRu.includes('CDS')) {
        list.push({ key: 'cds', term: t });
      }
      if (t.termRu.includes('CDO')) {
        list.push({ key: 'cdo', term: t });
      }
      if (t.termRu.includes('Мински')) {
        list.push({ key: 'цикл мински', term: t });
      }
      if (t.termRu.includes('БПИФ')) {
        list.push({ key: 'бпиф', term: t });
      }
      if (t.termRu.includes('ETF')) {
        list.push({ key: 'etf', term: t });
      }
      if (t.termRu.includes('RSI')) {
        list.push({ key: 'rsi', term: t });
      }
      if (t.termRu.includes('Дивергенция')) {
        list.push({ key: 'дивергенция', term: t });
        list.push({ key: 'дивергенции', term: t });
      }
      if (t.termRu.includes('Стоп-лосс')) {
        list.push({ key: 'стоп-лосс', term: t });
        list.push({ key: 'stop-loss', term: t });
      }
      if (t.termRu.includes('Тейк-профит')) {
        list.push({ key: 'тейк-профит', term: t });
        list.push({ key: 'take-profit', term: t });
      }
    }

    // Sort by descending key length so longer phrases match first
    return list.sort((a, b) => b.key.length - a.key.length);
  }, [glossaryTerms]);

  // Helper to match a link href or text against known glossary terms
  const findMatchingTerm = (href?: string, linkText?: string): GlossaryModalTerm | null => {
    if (!keywordMap || keywordMap.length === 0) return null;

    const normalizedHref = (href || '').toLowerCase();
    const cleanHref = normalizedHref.replace(/^#glossary-?|^#term-?|^#/, '').trim();
    const normalizedText = (linkText || '').toLowerCase().trim();

    // 1. Direct match on cleanHref
    for (const item of keywordMap) {
      if (cleanHref && (cleanHref === item.key || cleanHref.includes(item.key))) {
        return item.term;
      }
    }

    // 2. Direct match on linkText
    for (const item of keywordMap) {
      if (normalizedText && (normalizedText === item.key || normalizedText.includes(item.key) || item.key.includes(normalizedText))) {
        return item.term;
      }
    }

    return null;
  };

  return (
    <div>
      <article className="prose prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href, children, ...props }) => {
              const text = String(children);
              const isGlossaryHash = href?.startsWith('#glossary') || href?.startsWith('#term') || href?.startsWith('#');
              const matchingTerm = findMatchingTerm(href, text);

              if (matchingTerm || isGlossaryHash) {
                return (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (matchingTerm) {
                        setActiveModalTerm(matchingTerm);
                      }
                    }}
                    className="inline-flex items-baseline font-semibold text-accent hover:text-accent-hover underline decoration-dotted decoration-accent/60 underline-offset-4 cursor-pointer transition-colors bg-accent/5 px-1 py-0.5 rounded"
                    title={locale === 'ru' ? 'Посмотреть определение термина' : 'View term definition'}
                  >
                    {children}
                  </button>
                );
              }

              // Standard external or internal link
              return (
                <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                  {children}
                </a>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </article>

      {hasChart && (
        <div className="mt-8 p-4 bg-surface-light rounded-xl border border-surface-border">
          <CandlestickChart chartType={chartType || 'default'} />
        </div>
      )}

      {/* Interactive In-Page Glossary Modal */}
      <GlossaryModal
        term={activeModalTerm}
        locale={locale}
        onClose={() => setActiveModalTerm(null)}
      />
    </div>
  );
}
