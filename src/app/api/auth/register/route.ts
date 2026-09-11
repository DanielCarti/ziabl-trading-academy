import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, inviteCode } = await req.json();

    if (!email || !password || password.length < 6) {
      return NextResponse.json({ error: 'Email and password (min 6 chars) are required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase();

    // Check whitelist and invite code
    const systemInviteCode = process.env.REGISTRATION_INVITE_CODE || 'ZIABL2026';
    const allowedEmails = (process.env.ALLOWED_EMAILS || '')
      .toLowerCase()
      .split(',')
      .map(e => e.trim())
      .filter(Boolean);

    const isWhitelisted = allowedEmails.includes(normalizedEmail);
    const isValidCode = inviteCode && inviteCode.trim().toUpperCase() === systemInviteCode.trim().toUpperCase();

    if (!isWhitelisted && !isValidCode) {
      return NextResponse.json(
        { error: 'Доступ ограничен. Для регистрации требуется действующий инвайт-код закрытого тестирования.' },
        { status: 403 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      return NextResponse.json({ error: 'Пользователь с таким email уже зарегистрирован' }, { status: 409 });
    }

    const passwordHash = await hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email: normalizedEmail, passwordHash, role: 'USER' },
      select: { id: true, name: true, email: true, role: true },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
