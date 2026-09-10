import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = session.user.email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        theme: true,
        locale: true,
        timezone: true,
        avatar: true,
        showClock: true,
        showCbr: true,
        twoFactorEnabled: true,
        accounts: {
          select: {
            provider: true,
            providerAccountId: true,
            id_token: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const providerEmails: Record<string, string> = {};
    if (user.accounts && Array.isArray(user.accounts)) {
      for (const acc of user.accounts) {
        if (acc.id_token) {
          try {
            const parts = acc.id_token.split('.');
            if (parts.length >= 2) {
              const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
              if (payload.email) {
                providerEmails[acc.provider] = payload.email;
              }
            }
          } catch (e) {}
        }
      }
    }

    return NextResponse.json({ ...user, providerEmails });
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = session.user.email.toLowerCase().trim();
    const body = await req.json();

    const allowedFields: Record<string, any> = {};
    if (typeof body.name === 'string') allowedFields.name = body.name.trim();
    if (body.theme === 'light' || body.theme === 'dark') allowedFields.theme = body.theme;
    if (body.locale === 'ru' || body.locale === 'en') allowedFields.locale = body.locale;
    if (typeof body.timezone === 'string') allowedFields.timezone = body.timezone;
    if (typeof body.avatar === 'string') allowedFields.avatar = body.avatar;
    if (typeof body.showClock === 'boolean') allowedFields.showClock = body.showClock;
    if (typeof body.showCbr === 'boolean') allowedFields.showCbr = body.showCbr;
    if (typeof body.twoFactorEnabled === 'boolean') allowedFields.twoFactorEnabled = body.twoFactorEnabled;

    const updated = await prisma.user.update({
      where: { email },
      data: allowedFields,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        theme: true,
        locale: true,
        timezone: true,
        avatar: true,
        showClock: true,
        showCbr: true,
        twoFactorEnabled: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
