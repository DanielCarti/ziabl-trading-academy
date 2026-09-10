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

    const email = session.user.email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Clean up all related records according to 152-FZ
    // 1. Delete quiz attempts and lesson progress
    await prisma.quizAttempt.deleteMany({ where: { userId: user.id } });
    await prisma.lessonProgress.deleteMany({ where: { userId: user.id } });
    
    // 2. Delete linked OAuth accounts and active sessions
    await prisma.account.deleteMany({ where: { userId: user.id } });
    await prisma.session.deleteMany({ where: { userId: user.id } });

    // 3. Delete user record
    await prisma.user.delete({ where: { id: user.id } });

    return NextResponse.json({ success: true, message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Account deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 }
    );
  }
}
