import { PrismaClient } from "@prisma/client";

// PrismaClientのインスタンスをグローバルに保持
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// 開発環境では複数のPrismaClientインスタンスを作成しないように
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
