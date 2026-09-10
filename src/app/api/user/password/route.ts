import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { compare, hash } from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const email = session.user.email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, passwordHash: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // If user already has a password, verify current password
    if (user.passwordHash) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: 'Current password is required' },
          { status: 400 }
        );
      }

      const isMatch = await compare(currentPassword, user.passwordHash);
      if (!isMatch) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 403 }
        );
      }
    }

    // Hash and update the new password
    const newPasswordHash = await hash(newPassword, 12);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newPasswordHash },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json(
      { error: 'Failed to update password' },
      { status: 500 }
    );
  }
}
