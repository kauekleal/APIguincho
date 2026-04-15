import { AppError } from "../../../shared/errors/AppError";
import { ExpensesRepository } from "../repositories/ExpensesRepository";

export class DeleteExpenseService {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async execute(id: string): Promise<void> {
    const expense = await this.expensesRepository.findById(id);

    if (!expense) {
      throw new AppError("Despesa não encontrada", 404, "NOT_FOUND");
    }

    await this.expensesRepository.delete(id);
  }
}
