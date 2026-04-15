import { z } from "zod";

export const updateExpenseSchema = z.object({
  category: z.string().min(1).optional(),
  value: z.number().positive().optional(),
  description: z.string().max(11).optional(),
});

export type UpdateExpenseDto = z.infer<typeof updateExpenseSchema>;
