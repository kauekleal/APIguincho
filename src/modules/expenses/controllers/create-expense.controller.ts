import { Response } from "express";

import { AuthenticatedRequest } from "../../../shared/middlewares/auth.middleware";
import { asyncHandler } from "../../../shared/utils/async-handler";
import { PrismaExpensesRepository } from "../repositories/ExpensesRepository";
import { createExpenseSchema } from "../dtos/create-expense.dto";
import { CreateExpenseService } from "../services/create-expense.service";

export const createExpenseController = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const body = createExpenseSchema.parse(req.body);

    const expensesRepository = new PrismaExpensesRepository();
    const service = new CreateExpenseService(expensesRepository);

    const expense = await service.execute({
      ...body,
      createdById: req.userId,
    });

    return res.status(201).json({
      id: expense.id,
      category: expense.category,
      value: expense.value.toString(),
      description: expense.description,
      createdById: expense.createdById,
      createdAt: expense.createdAt.toISOString(),
      updatedAt: expense.updatedAt.toISOString(),
    });
  },
);
