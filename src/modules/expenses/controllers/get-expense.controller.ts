import { Response } from "express";

import { AuthenticatedRequest } from "../../../shared/middlewares/auth.middleware";
import { asyncHandler } from "../../../shared/utils/async-handler";
import { AppError } from "../../../shared/errors/AppError";
import { PrismaExpensesRepository } from "../repositories/ExpensesRepository";

export const getExpenseController = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = String(req.params.id);

    const expensesRepository = new PrismaExpensesRepository();
    const expense = await expensesRepository.findById(id);

    if (!expense) {
      throw new AppError("Despesa não encontrada", 404, "NOT_FOUND");
    }

    return res.status(200).json({
      id: expense.id,
      category: expense.category,
      value: expense.value.toString(),
      description: expense.description,
      createdById: expense.createdById,
      updatedById: expense.updatedById,
      createdAt: expense.createdAt.toISOString(),
      updatedAt: expense.updatedAt.toISOString(),
    });
  },
);
