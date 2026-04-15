import { prisma, type User } from "../../../prisma/client";

export interface UserRepository {
  findByUsername(username: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}

export class PrismaUserRepository implements UserRepository {
  async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { username } });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany({ orderBy: { username: "asc" } });
  }
}
