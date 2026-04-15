import { Response } from "express";

import { AuthenticatedRequest } from "../../../shared/middlewares/auth.middleware";
import { asyncHandler } from "../../../shared/utils/async-handler";
import { PrismaExpensesRepository } from "../repositories/ExpensesRepository";

export const listExpensesController = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const category =
      typeof req.query.category === "string" ? req.query.category : undefined;

    const expensesRepository = new PrismaExpensesRepository();
    const expenses = await expensesRepository.findAll({ category });

    return res.status(200).json(
      expenses.map((e) => ({
        id: e.id,
        category: e.category,
        value: e.value.toString(),
        description: e.description,
        createdById: e.createdById,
        updatedById: e.updatedById,
        createdAt: e.createdAt.toISOString(),
        updatedAt: e.updatedAt.toISOString(),
      })),
    );
  },
);
