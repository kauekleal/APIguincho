import { Prisma, prisma, type Expenses } from "../../../prisma/client";

export interface ExpensesRepository {
  findAll(filters?: { category?: string }): Promise<Expenses[]>;
  findById(id: string): Promise<Expenses | null>;
  create(data: {
    category: string;
    value: Prisma.Decimal | number | string;
    description: string;
    createdById?: string;
  }): Promise<Expenses>;
  update(
    id: string,
    data: {
      category?: string;
      value?: Prisma.Decimal | number | string;
      description?: string;
      updatedById?: string;
    },
  ): Promise<Expenses>;
  delete(id: string): Promise<void>;
}

export class PrismaExpensesRepository implements ExpensesRepository {
  async findAll(filters?: { category?: string }): Promise<Expenses[]> {
    return prisma.expenses.findMany({
      where: filters?.category ? { category: filters.category } : undefined,
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string): Promise<Expenses | null> {
    return prisma.expenses.findUnique({ where: { id } });
  }

  async create(data: {
    category: string;
    value: Prisma.Decimal | number | string;
    description: string;
    createdById?: string;
  }): Promise<Expenses> {
    return prisma.expenses.create({
      data: {
        category: data.category,
        value: data.value,
        description: data.description,
        createdById: data.createdById,
      },
    });
  }

  async update(
    id: string,
    data: {
      category?: string;
      value?: Prisma.Decimal | number | string;
      description?: string;
      updatedById?: string;
    },
  ): Promise<Expenses> {
    return prisma.expenses.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await prisma.expenses.delete({ where: { id } });
  }
}
