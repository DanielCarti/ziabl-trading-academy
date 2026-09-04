import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      where: { published: true },
      include: {
        modules: {
          where: { published: true },
          orderBy: { order: 'asc' },
          include: {
            _count: { select: { lessons: { where: { published: true } } } },
            lessons: {
              where: { published: true },
              orderBy: { order: 'asc' },
              select: { id: true, slug: true, titleRu: true, titleEn: true, order: true },
            },
          },
        },
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
