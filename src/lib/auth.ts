import { type AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import YandexProvider from 'next-auth/providers/yandex';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

const adminEmail = (process.env.ADMIN_EMAIL || 'admin@ziabl.ru').toLowerCase();

export const authOptions: AuthOptions = {
  // Pure JWT strategy allows social logins (Yandex, Google, GitHub) to work instantly
  // even without an active local PostgreSQL server
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/ru/auth/signin',
    error: '/ru/auth/signin',
  },
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET
      ? [
          GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
          }),
        ]
      : []),
    ...(process.env.YANDEX_CLIENT_ID && process.env.YANDEX_CLIENT_SECRET
      ? [
          YandexProvider({
            clientId: process.env.YANDEX_CLIENT_ID,
            clientSecret: process.env.YANDEX_CLIENT_SECRET,
          }),
        ]
      : []),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const email = credentials.email.toLowerCase();
        let user: any = null;
        try {
          user = await prisma.user.findUnique({
            where: { email },
          });
        } catch (e) {
          user = null;
        }

        // Local development demo fallback
        if (!user) {
          if (email === adminEmail && credentials.password === (process.env.ADMIN_PASSWORD || 'admin123')) {
            return {
              id: 'admin-local',
              email: adminEmail,
              name: 'Администратор',
              role: 'ADMIN',
            };
          }
          if (credentials.password === 'demo123') {
            return {
              id: 'demo-local',
              email: email,
              name: 'Студент Ziabl',
              role: 'USER',
            };
          }
          throw new Error('Invalid email or password');
        }

        if (!user.passwordHash) {
          throw new Error('Please sign in with social provider');
        }

        const isValid = await compare(credentials.password, user.passwordHash);
        if (!isValid) {
          throw new Error('Invalid email or password');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (user?.email && user.email.toLowerCase() === adminEmail) {
        (user as any).role = 'ADMIN';
        try {
          await prisma.user.updateMany({
            where: { email: user.email },
            data: { role: 'ADMIN' },
          });
        } catch (ignore) {}
      }
      return true;
    },
    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = (user as any).role || (user.email?.toLowerCase() === adminEmail ? 'ADMIN' : 'USER');
      }
      if (account?.provider) {
        token.provider = account.provider;
      }
      if (trigger === 'update' && session?.name) {
        token.name = session.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        if (token.name) session.user.name = token.name as string;
        (session.user as any).role = token.role;
        (session.user as any).provider = token.provider || 'credentials';
      }
      return session;
    },
  },
};
