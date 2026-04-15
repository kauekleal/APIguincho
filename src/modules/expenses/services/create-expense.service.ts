import { type Expenses } from "../../../prisma/client";
import { ExpensesRepository } from "../repositories/ExpensesRepository";

interface CreateExpenseRequest {
  category: string;
  value: number;
  description: string;
  createdById: string;
}

export class CreateExpenseService {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async execute(data: CreateExpenseRequest): Promise<Expenses> {
    return this.expensesRepository.create({
      category: data.category,
      value: data.value,
      description: data.description,
      createdById: data.createdById,
    });
  }
}
