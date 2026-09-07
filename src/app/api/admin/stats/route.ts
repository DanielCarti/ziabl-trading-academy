import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [users, lessons, quizzes, terms] = await Promise.all([
      prisma.user.count(),
      prisma.lesson.count(),
      prisma.quiz.count(),
      prisma.glossaryTerm.count(),
    ]);

    if (lessons === 0 && terms === 0) {
      const { mockModules, mockGlossaryTerms } = await import('@/lib/mockData');
      const allLessons = mockModules.reduce((acc: number, m: any) => acc + m.lessons.length, 0);
      return NextResponse.json({
        users: users > 0 ? users : 1,
        lessons: allLessons,
        quizzes: allLessons,
        terms: mockGlossaryTerms.length,
      });
    }

    return NextResponse.json({ users, lessons, quizzes, terms });
  } catch (error) {
    const { mockModules, mockGlossaryTerms } = await import('@/lib/mockData');
    const allLessons = mockModules.reduce((acc: number, m: any) => acc + m.lessons.length, 0);
    return NextResponse.json({
      users: 1,
      lessons: allLessons,
      quizzes: allLessons,
      terms: mockGlossaryTerms.length,
    });
  }
}
