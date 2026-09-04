import { prisma } from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';
import { getLocalizedField } from '@/lib/utils';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import LessonContent from '@/components/lesson/LessonContent';
import LessonCompleteButton from '@/components/lesson/LessonCompleteButton';
import Quiz from '@/components/quiz/Quiz';

export default async function LessonPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const t = await getTranslations('lesson');

  let lesson: any = null;
  try {
    lesson = await prisma.lesson.findUnique({
      where: { slug },
      include: {
        module: {
          include: {
            lessons: {
              where: { published: true },
              orderBy: { order: 'asc' },
              select: { id: true, slug: true, titleRu: true, titleEn: true, order: true },
            },
          },
        },
        quiz: {
          include: {
            questions: { orderBy: { order: 'asc' } },
          },
        },
      },
    });
  } catch (err) {
    const { mockLessonsBySlug } = await import('@/lib/mockData');
    lesson = mockLessonsBySlug[slug] || null;
  }
  if (!lesson) {
    const { mockLessonsBySlug } = await import('@/lib/mockData');
    lesson = mockLessonsBySlug[slug] || null;
  }

  if (!lesson) notFound();

  const moduleLessons = lesson.module.lessons;
  const currentIndex = moduleLessons.findIndex((l) => l.slug === slug);
  const prevLesson = currentIndex > 0 ? moduleLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < moduleLessons.length - 1 ? moduleLessons[currentIndex + 1] : null;

  const content = getLocalizedField(lesson, 'content', locale);
  const title = getLocalizedField(lesson, 'title', locale);
  const moduleTitle = getLocalizedField(lesson.module, 'title', locale);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Module Lessons */}
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="card">
                <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                  {t('contents')}
                </h3>
                <p className="text-sm text-text-primary font-medium mb-4">{moduleTitle}</p>
                <div className="space-y-1">
                  {moduleLessons.map((l) => (
                    <Link
                      key={l.id}
                      href={`/${locale}/lesson/${l.slug}`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                        l.slug === slug
                          ? 'bg-accent/10 text-accent font-medium'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-light'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                        l.slug === slug ? 'border-accent text-accent' : 'border-surface-border text-text-muted'
                      }`}>
                        {l.order}
                      </span>
                      <span className="line-clamp-1">{getLocalizedField(l, 'title', locale)}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link href={`/${locale}/courses`} className="btn-ghost w-full mt-4 text-sm">
                <ArrowLeft className="w-4 h-4" />
                {t('backToCourses')}
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-text-muted mb-6">
              <Link href={`/${locale}/courses`} className="hover:text-accent transition-colors">
                {locale === 'ru' ? 'Курсы' : 'Courses'}
              </Link>
              <span>/</span>
              <span>{moduleTitle}</span>
              <span>/</span>
              <span className="text-text-secondary">{title}</span>
            </div>

            {/* Lesson Title and Completion status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">{title}</h1>
              <div className="shrink-0">
                <LessonCompleteButton lessonId={lesson.id} />
              </div>
            </div>

            {/* Markdown Content */}
            <div className="card mb-8">
              <LessonContent content={content} hasChart={lesson.hasChart} chartType={lesson.chartType} />
            </div>

            {/* Quiz */}
            {lesson.quiz && lesson.quiz.questions.length > 0 && (
              <div className="card mb-8">
                <Quiz
                  quizId={lesson.quiz.id}
                  questions={lesson.quiz.questions}
                  locale={locale}
                  passingScore={lesson.quiz.passingScore}
                />
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center gap-4">
              {prevLesson ? (
                <Link href={`/${locale}/lesson/${prevLesson.slug}`} className="btn-secondary flex-1 max-w-xs">
                  <ArrowLeft className="w-4 h-4" />
                  <div className="text-left">
                    <div className="text-xs text-text-muted">{t('prevLesson')}</div>
                    <div className="text-sm line-clamp-1">{getLocalizedField(prevLesson, 'title', locale)}</div>
                  </div>
                </Link>
              ) : <div />}

              {nextLesson ? (
                <Link href={`/${locale}/lesson/${nextLesson.slug}`} className="btn-primary flex-1 max-w-xs justify-end">
                  <div className="text-right">
                    <div className="text-xs opacity-80">{t('nextLesson')}</div>
                    <div className="text-sm line-clamp-1">{getLocalizedField(nextLesson, 'title', locale)}</div>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : <div />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
