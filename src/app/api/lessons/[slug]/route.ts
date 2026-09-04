import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { slug: params.slug },
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
          include: { questions: { orderBy: { order: 'asc' } } },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    return NextResponse.json(lesson);
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return NextResponse.json({ error: 'Failed to fetch lesson' }, { status: 500 });
  }
}
