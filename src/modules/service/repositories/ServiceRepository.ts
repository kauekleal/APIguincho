import { Prisma, prisma, type Service } from "../../../prisma/client";

export interface ServiceRepository {
  findAll(filters?: { description?: string }): Promise<Service[]>;
  findById(id: string): Promise<Service | null>;
  create(data: {
    value: Prisma.Decimal | number | string;
    description: string;
    date?: Date | string;
    createdById?: string;
  }): Promise<Service>;
  update(
    id: string,
    data: {
      value?: Prisma.Decimal | number | string;
      description?: string;
      date?: Date | string;
      updatedById?: string;
    },
  ): Promise<Service>;
  delete(id: string): Promise<void>;
}

export class PrismaServiceRepository implements ServiceRepository {
  async findAll(filters?: { description?: string }): Promise<Service[]> {
    return prisma.service.findMany({
      where: filters?.description
        ? { description: filters.description }
        : undefined,
      orderBy: { date: "desc" },
    });
  }

  async findById(id: string): Promise<Service | null> {
    return prisma.service.findUnique({ where: { id } });
  }

  async create(data: {
    value: Prisma.Decimal | number | string;
    description: string;
    date?: Date | string;
    createdById?: string;
  }): Promise<Service> {
    return prisma.service.create({
      data: {
        value: data.value,
        description: data.description,
        date: data.date ? new Date(data.date) : undefined,
        createdById: data.createdById,
      },
    });
  }

  async update(
    id: string,
    data: {
      value?: Prisma.Decimal | number | string;
      description?: string;
      date?: Date | string;
      updatedById?: string;
    },
  ): Promise<Service> {
    return prisma.service.update({
      where: { id },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
    });
  }


  async delete(id: string): Promise<void> {
    await prisma.service.delete({ where: { id } });
  }
}
