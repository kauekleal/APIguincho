import { z } from "zod";

export const createServiceSchema = z.object({
  value: z.number().positive(),
  description: z.string().max(100),
  date: z.string().optional(),
});


export type CreateServiceDto = z.infer<typeof createServiceSchema>;
