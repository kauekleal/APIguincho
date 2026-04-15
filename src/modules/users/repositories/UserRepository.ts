import { prisma, type User } from "../../../prisma/client";

export interface CreateUserData {
  username: string;
  password: string;
  name?: string;
  email?: string | null;
}

export interface UserRepository {
  findByUsername(username: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(data: CreateUserData): Promise<User>;
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

  async create(data: CreateUserData): Promise<User> {
    return prisma.user.create({ data });
  }
}
