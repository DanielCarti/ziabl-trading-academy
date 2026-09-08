'use client';

import { useState } from 'react';
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

  // Helper to match a link href or text against known glossary terms
  const findMatchingTerm = (href?: string, linkText?: string) => {
    if (!glossaryTerms || glossaryTerms.length === 0) return null;

    const normalizedHref = (href || '').toLowerCase();
    const cleanHref = normalizedHref.replace(/^#glossary-?|^#term-?|^#/, '').trim();
    const normalizedText = (linkText || '').toLowerCase().trim();

    // 1. Check exact slug or id in href
    let match = glossaryTerms.find(t => {
      const termId = (t.id || '').toLowerCase();
      const termRuSlug = t.termRu.toLowerCase().replace(/[^a-zа-я0-9]+/gi, '-');
      const termEnSlug = t.termEn.toLowerCase().replace(/[^a-zа-я0-9]+/gi, '-');
      return (
        cleanHref === termId ||
        cleanHref === termRuSlug ||
        cleanHref === termEnSlug ||
        normalizedHref.includes(termId)
      );
    });

    if (match) return match;

    // 2. Check by keyword matching on href or link text
    const searchTarget = cleanHref || normalizedText;
    if (searchTarget.includes('fisher') || searchTarget.includes('фишер')) {
      if (searchTarget.includes('ирвинг') || searchTarget.includes('irving')) {
        return glossaryTerms.find(t => t.termRu.includes('Ирвинг') || t.termEn.includes('Irving')) || null;
      }
      return glossaryTerms.find(t => t.termRu.includes('Уравнение Фишера') || t.termEn.includes('Fisher Equation')) || null;
    }
    if (searchTarget.includes('ruonia')) {
      return glossaryTerms.find(t => t.termRu.includes('RUONIA') || t.termEn.includes('RUONIA')) || null;
    }
    if (searchTarget.includes('ebitda')) {
      if (searchTarget.includes('netdebt') || searchTarget.includes('net debt') || searchTarget.includes('долг')) {
        return glossaryTerms.find(t => t.termRu.includes('Net Debt / EBITDA') || t.termEn.includes('Net Debt to EBITDA')) || null;
      }
      return glossaryTerms.find(t => t.termRu === 'EBITDA' || t.termEn === 'EBITDA') || null;
    }
    if (searchTarget.includes('netdebt') || searchTarget.includes('net-debt') || searchTarget.includes('чистый долг')) {
      return glossaryTerms.find(t => t.termRu.includes('Net Debt') && !t.termRu.includes('/')) || null;
    }
    if (searchTarget.includes('ofz-pd') || searchTarget.includes('офз-пд')) {
      return glossaryTerms.find(t => t.termRu.includes('ОФЗ-ПД')) || null;
    }
    if (searchTarget.includes('ofz-pk') || searchTarget.includes('офз-пк') || searchTarget.includes('флоатер')) {
      return glossaryTerms.find(t => t.termRu.includes('ОФЗ-ПК')) || null;
    }
    if (searchTarget.includes('ofz-in') || searchTarget.includes('офз-ин') || searchTarget.includes('линкер')) {
      return glossaryTerms.find(t => t.termRu.includes('ОФЗ-ИН')) || null;
    }
    if (searchTarget.includes('moat') || searchTarget.includes('ров')) {
      return glossaryTerms.find(t => t.termRu.includes('ров')) || null;
    }
    if (searchTarget.includes('fcf')) {
      return glossaryTerms.find(t => t.termRu.includes('FCF')) || null;
    }
    if (searchTarget.includes('cds')) {
      return glossaryTerms.find(t => t.termRu.includes('CDS')) || null;
    }

    // 3. Fallback: match by title text
    return glossaryTerms.find(t => {
      const ru = t.termRu.toLowerCase();
      const en = t.termEn.toLowerCase();
      return (
        normalizedText === ru ||
        normalizedText === en ||
        ru.startsWith(normalizedText) ||
        en.startsWith(normalizedText)
      );
    }) || null;
  };

  return (
    <div>
      <article className="prose prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href, children, ...props }) => {
              const text = String(children);
              const isGlossaryHash = href?.startsWith('#glossary') || href?.startsWith('#term');
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
