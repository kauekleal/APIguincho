import { Response } from "express";

import { AuthenticatedRequest } from "../../../shared/middlewares/auth.middleware";
import { asyncHandler } from "../../../shared/utils/async-handler";
import { PrismaExpensesRepository } from "../repositories/ExpensesRepository";
import { updateExpenseSchema } from "../dtos/update-expense.dto";
import { UpdateExpenseService } from "../services/update-expense.service";

export const updateExpenseController = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const body = updateExpenseSchema.parse(req.body);

    const expensesRepository = new PrismaExpensesRepository();
    const service = new UpdateExpenseService(expensesRepository);

    const expense = await service.execute({
      id,
      ...body,
      updatedById: req.userId,
    });

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
