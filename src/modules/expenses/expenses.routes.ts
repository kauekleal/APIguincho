import { Router } from "express";

import { ensureAuthenticated } from "../../shared/middlewares/auth.middleware";
import { createExpenseController } from "./controllers/create-expense.controller";
import { listExpensesController } from "./controllers/list-expenses.controller";
import { getExpenseController } from "./controllers/get-expense.controller";
import { updateExpenseController } from "./controllers/update-expense.controller";
import { deleteExpenseController } from "./controllers/delete-expense.controller";

export const expensesRoutes = Router();

expensesRoutes.use(ensureAuthenticated);

expensesRoutes.get("/", listExpensesController);
expensesRoutes.get("/:id", getExpenseController);
expensesRoutes.post("/", createExpenseController);
expensesRoutes.patch("/:id", updateExpenseController);
expensesRoutes.delete("/:id", deleteExpenseController);
