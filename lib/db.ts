import { PrismaClient } from "./generated/prisma";

/**
 * Prisma Client Instance
 * 
 * Global singleton to prevent multiple instances in development
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

