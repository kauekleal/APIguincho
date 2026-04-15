import { z } from "zod";

export const createExpenseSchema = z.object({
  category: z.string().min(1),
  value: z.number().positive(),
  description: z.string().max(11),
});

export type CreateExpenseDto = z.infer<typeof createExpenseSchema>;
