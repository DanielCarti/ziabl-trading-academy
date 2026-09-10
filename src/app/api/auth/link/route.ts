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

    const { targetEmail, provider } = await req.json();
    if (!targetEmail || !provider) {
      return NextResponse.json({ error: 'Missing targetEmail or provider' }, { status: 400 });
    }

    const currentEmail = session.user.email.toLowerCase().trim();
    const cleanTargetEmail = String(targetEmail).toLowerCase().trim();

    // Find master user (current user)
    const masterUser = await prisma.user.findUnique({
      where: { email: currentEmail },
      include: { accounts: true },
    });

    if (!masterUser) {
      return NextResponse.json({ error: 'Current user not found' }, { status: 404 });
    }

    // Find secondary user (the one just signed in via OAuth)
    const secondaryUser = await prisma.user.findUnique({
      where: { email: cleanTargetEmail },
      include: { accounts: true },
    });

    if (secondaryUser && secondaryUser.id !== masterUser.id) {
      // Re-assign all accounts of secondaryUser to masterUser
      for (const acc of secondaryUser.accounts) {
        // Check if master already has this provider
        const exists = masterUser.accounts.some(
          (a) => a.provider === acc.provider && a.providerAccountId === acc.providerAccountId
        );
        if (!exists) {
          await prisma.account.update({
            where: { id: acc.id },
            data: { userId: masterUser.id },
          });
        }
      }
      // Delete temporary secondary user record since it is now merged
      try {
        await prisma.user.delete({ where: { id: secondaryUser.id } });
      } catch (e) {}
    }

    return NextResponse.json({ success: true, masterEmail: currentEmail });
  } catch (error) {
    console.error('Account linking API error:', error);
    return NextResponse.json({ error: 'Failed to link account' }, { status: 500 });
  }
}
