import { z } from "zod";

export const updateServiceSchema = z.object({
  value: z.number().positive().optional(),
  description: z.string().max(100).optional(),
  date: z.string().optional(),
});


export type UpdateServiceDto = z.infer<typeof updateServiceSchema>;
