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

    return NextResponse.json({ users, lessons, quizzes, terms });
  } catch (error) {
    return NextResponse.json({ users: 0, lessons: 0, quizzes: 0, terms: 0 });
  }
}
