import { z } from "zod";

export const updateServiceSchema = z.object({
  value: z.number().positive().optional(),
  description: z.string().max(11).optional(),
});

export type UpdateServiceDto = z.infer<typeof updateServiceSchema>;
