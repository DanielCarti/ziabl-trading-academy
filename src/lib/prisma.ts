import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// If DATABASE_URL does not have connect_timeout, append connect_timeout=1 to prevent 4-5s hang when PostgreSQL is offline
const rawDbUrl = process.env.DATABASE_URL || '';
let dbUrl = rawDbUrl;
if (rawDbUrl && !rawDbUrl.includes('connect_timeout')) {
  const separator = rawDbUrl.includes('?') ? '&' : '?';
  dbUrl = `${rawDbUrl}${separator}connect_timeout=1`;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: dbUrl ? { db: { url: dbUrl } } : undefined,
    log: process.env.NODE_ENV === 'development' ? ['error'] : [],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
