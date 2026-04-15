import { PrismaClient, Prisma } from "@prisma/client";

export const prisma = new PrismaClient();

export type User = Prisma.UserGetPayload<Record<string, never>>;
export type Expenses = Prisma.ExpensesGetPayload<Record<string, never>>;

export { Prisma };
