import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      const { mockModules } = await import('@/lib/mockData');
      const allLessons = mockModules.flatMap(m => m.lessons);
      return NextResponse.json({
        progress: [],
        totalLessons: allLessons.length,
        completedCount: 2,
        percentage: Math.round((2 / allLessons.length) * 100),
      });
    }

    const progress = await prisma.lessonProgress.findMany({
      where: { userId: user.id },
      include: { lesson: { select: { id: true, slug: true, moduleId: true } } },
    });

    const totalLessons = await prisma.lesson.count({ where: { published: true } });
    const completedCount = progress.filter(p => p.completed).length;

    return NextResponse.json({
      progress,
      totalLessons,
      completedCount,
      percentage: totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0,
    });
  } catch (error) {
    const { mockModules } = await import('@/lib/mockData');
    const allLessons = mockModules.flatMap(m => m.lessons);
    return NextResponse.json({
      progress: [],
      totalLessons: allLessons.length,
      completedCount: 2,
      percentage: Math.round((2 / allLessons.length) * 100),
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { lessonId } = await req.json();
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const progress = await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId: user.id, lessonId } },
      update: { completed: true, completedAt: new Date() },
      create: { userId: user.id, lessonId, completed: true, completedAt: new Date() },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}
