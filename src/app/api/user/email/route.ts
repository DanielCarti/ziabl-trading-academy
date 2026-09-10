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

    const { newEmail } = await req.json();

    if (!newEmail || typeof newEmail !== 'string' || !newEmail.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const currentEmail = session.user.email.toLowerCase().trim();
    const targetEmail = newEmail.toLowerCase().trim();

    if (currentEmail === targetEmail) {
      return NextResponse.json({ success: true, email: targetEmail });
    }

    // Check if new email is already taken
    const existing = await prisma.user.findUnique({
      where: { email: targetEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Email is already in use by another account' },
        { status: 409 }
      );
    }

    const updated = await prisma.user.update({
      where: { email: currentEmail },
      data: { email: targetEmail },
      select: { id: true, email: true },
    });

    return NextResponse.json({ success: true, email: updated.email });
  } catch (error) {
    console.error('Email change error:', error);
    return NextResponse.json(
      { error: 'Failed to update email' },
      { status: 500 }
    );
  }
}
