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

    // Check whitelist (env + DB)
    const systemInviteCode = (process.env.REGISTRATION_INVITE_CODE || 'ZIABL2026').trim().toUpperCase();
    const allowedEnvEmails = (process.env.ALLOWED_EMAILS || '')
      .toLowerCase()
      .split(',')
      .map(e => e.trim())
      .filter(Boolean);

    let isAllowed = allowedEnvEmails.includes(normalizedEmail);

    if (!isAllowed) {
      const dbWhitelist = await prisma.whitelistEmail.findUnique({
        where: { email: normalizedEmail },
      });
      if (dbWhitelist) {
        isAllowed = true;
      }
    }

    let matchedDbInvite: any = null;
    const formattedCode = inviteCode ? inviteCode.trim().toUpperCase() : '';

    if (!isAllowed && formattedCode) {
      if (formattedCode === systemInviteCode) {
        isAllowed = true;
      } else {
        const dbInvite = await prisma.inviteCode.findUnique({
          where: { code: formattedCode },
        });
        if (dbInvite && dbInvite.isActive && dbInvite.usedCount < dbInvite.maxUses) {
          isAllowed = true;
          matchedDbInvite = dbInvite;
        }
      }
    }

    if (!isAllowed) {
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

    if (matchedDbInvite) {
      try {
        await prisma.inviteCode.update({
          where: { id: matchedDbInvite.id },
          data: { usedCount: { increment: 1 } },
        });
      } catch (err) {
        console.error('Failed to increment invite count:', err);
      }
    }

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
