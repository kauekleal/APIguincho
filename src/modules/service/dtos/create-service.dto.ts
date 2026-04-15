import { z } from "zod";

export const createServiceSchema = z.object({
  value: z.number().positive(),
  description: z.string().max(11),
});

export type CreateServiceDto = z.infer<typeof createServiceSchema>;
