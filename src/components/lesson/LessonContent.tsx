'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import dynamic from 'next/dynamic';

const CandlestickChart = dynamic(() => import('@/components/charts/CandlestickChart'), { ssr: false });

interface LessonContentProps {
  content: string;
  hasChart?: boolean;
  chartType?: string | null;
}

export default function LessonContent({ content, hasChart, chartType }: LessonContentProps) {
  return (
    <div>
      <article className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </article>

      {hasChart && (
        <div className="mt-8 p-4 bg-surface-light rounded-xl border border-surface-border">
          <CandlestickChart chartType={chartType || 'default'} />
        </div>
      )}
    </div>
  );
}
