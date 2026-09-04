import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { quizId, answers } = await req.json();

    if (!quizId || !answers) {
      return NextResponse.json({ error: 'quizId and answers are required' }, { status: 400 });
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    });

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    let correctCount = 0;
    const total = quiz.questions.length;
    const details: Record<string, boolean> = {};

    quiz.questions.forEach((q) => {
      const userSelected: number[] = (answers[q.id] || []).slice().sort();
      const correctSelected: number[] = q.correctIndices.slice().sort();

      const isCorrect =
        userSelected.length === correctSelected.length &&
        userSelected.every((val, idx) => val === correctSelected[idx]);

      details[q.id] = isCorrect;
      if (isCorrect) correctCount++;
    });

    const score = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const passed = score >= quiz.passingScore;

    // Persist attempt if user is signed in
    const session = await getServerSession();
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({ where: { email: session.user.email } });
      if (user) {
        await prisma.quizAttempt.create({
          data: {
            userId: user.id,
            quizId: quiz.id,
            score,
            passed,
            answers: answers,
          },
        });
      }
    }

    return NextResponse.json({
      score,
      total,
      passed,
      correctCount,
      details,
    });
  } catch (error) {
    console.error('Quiz submission error:', error);
    return NextResponse.json({ error: 'Failed to process quiz' }, { status: 500 });
  }
}
