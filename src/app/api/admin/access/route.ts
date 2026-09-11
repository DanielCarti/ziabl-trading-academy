import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [whitelist, invites] = await Promise.all([
      prisma.whitelistEmail.findMany({
        orderBy: { createdAt: 'desc' },
      }),
      prisma.inviteCode.findMany({
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return NextResponse.json({ whitelist, invites });
  } catch (error) {
    console.error('Failed to fetch access data:', error);
    return NextResponse.json({ error: 'Failed to fetch access data' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'add_email') {
      const { email, note } = body;
      if (!email) {
        return NextResponse.json({ error: 'Email обязателен' }, { status: 400 });
      }
      const normalizedEmail = email.trim().toLowerCase();

      const created = await prisma.whitelistEmail.upsert({
        where: { email: normalizedEmail },
        update: { note },
        create: { email: normalizedEmail, note },
      });
      return NextResponse.json(created, { status: 201 });
    }

    if (action === 'create_invite') {
      const { code, note, maxUses } = body;
      if (!code) {
        return NextResponse.json({ error: 'Код инвайта обязателен' }, { status: 400 });
      }
      const normalizedCode = code.trim().toUpperCase();

      const created = await prisma.inviteCode.create({
        data: {
          code: normalizedCode,
          note,
          maxUses: maxUses ? parseInt(maxUses, 10) : 1,
        },
      });
      return NextResponse.json(created, { status: 201 });
    }

    if (action === 'toggle_invite') {
      const { id, isActive } = body;
      const updated = await prisma.inviteCode.update({
        where: { id },
        data: { isActive },
      });
      return NextResponse.json(updated);
    }

    return NextResponse.json({ error: 'Неизвестное действие' }, { status: 400 });
  } catch (error: any) {
    console.error('Access control POST error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Такая запись уже существует' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message || 'Ошибка сервера' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!id || !type) {
      return NextResponse.json({ error: 'Параметры id и type обязательны' }, { status: 400 });
    }

    if (type === 'whitelist') {
      await prisma.whitelistEmail.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }

    if (type === 'invite') {
      await prisma.inviteCode.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Некорректный тип' }, { status: 400 });
  } catch (error) {
    console.error('Failed to delete:', error);
    return NextResponse.json({ error: 'Ошибка при удалении' }, { status: 500 });
  }
}
