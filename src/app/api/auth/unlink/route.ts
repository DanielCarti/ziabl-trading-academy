import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { provider } = await req.json();
    if (!provider) {
      return NextResponse.json({ error: 'Missing provider' }, { status: 400 });
    }

    const email = session.user.email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Delete account connection for this provider
    await prisma.account.deleteMany({
      where: {
        userId: user.id,
        provider: String(provider).toLowerCase(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Account unlink API error:', error);
    return NextResponse.json({ error: 'Failed to unlink account' }, { status: 500 });
  }
}
