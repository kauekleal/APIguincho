import { Response } from "express";

import { AuthenticatedRequest } from "../../../shared/middlewares/auth.middleware";
import { asyncHandler } from "../../../shared/utils/async-handler";
import { PrismaExpensesRepository } from "../repositories/ExpensesRepository";
import { DeleteExpenseService } from "../services/delete-expense.service";

export const deleteExpenseController = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    const expensesRepository = new PrismaExpensesRepository();
    const service = new DeleteExpenseService(expensesRepository);

    await service.execute(id);

    return res.status(204).send();
  },
);
