import { type Expenses } from "../../../prisma/client";
import { AppError } from "../../../shared/errors/AppError";
import { ExpensesRepository } from "../repositories/ExpensesRepository";

interface UpdateExpenseRequest {
  id: string;
  category?: string;
  value?: number;
  description?: string;
  updatedById: string;
}

export class UpdateExpenseService {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async execute(data: UpdateExpenseRequest): Promise<Expenses> {
    const expense = await this.expensesRepository.findById(data.id);

    if (!expense) {
      throw new AppError("Despesa não encontrada", 404, "NOT_FOUND");
    }

    return this.expensesRepository.update(data.id, {
      category: data.category,
      value: data.value,
      description: data.description,
      updatedById: data.updatedById,
    });
  }
}
