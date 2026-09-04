import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    let terms = [];
    try {
      terms = await prisma.glossaryTerm.findMany({
        where: {
          AND: [
            category ? { category } : {},
            search ? {
              OR: [
                { termRu: { contains: search, mode: 'insensitive' } },
                { termEn: { contains: search, mode: 'insensitive' } },
                { definitionRu: { contains: search, mode: 'insensitive' } },
                { definitionEn: { contains: search, mode: 'insensitive' } },
              ],
            } : {},
          ],
        },
        orderBy: { termRu: 'asc' },
      });
    } catch (dbErr) {
      const { mockGlossaryTerms } = await import('@/lib/mockData');
      terms = mockGlossaryTerms.filter((term: any) => {
        const matchesCategory = !category || term.category === category;
        const matchesSearch = !search ||
          term.termRu.toLowerCase().includes(search.toLowerCase()) ||
          term.termEn.toLowerCase().includes(search.toLowerCase()) ||
          term.definitionRu.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      }) as any;
    }

    return NextResponse.json(terms);
  } catch (error) {
    console.error('Error fetching glossary:', error);
    return NextResponse.json({ error: 'Failed to fetch glossary' }, { status: 500 });
  }
}
