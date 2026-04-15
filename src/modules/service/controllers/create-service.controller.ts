import { Response } from "express";

import { AuthenticatedRequest } from "../../../shared/middlewares/auth.middleware";
import { asyncHandler } from "../../../shared/utils/async-handler";
import { PrismaServiceRepository } from "../repositories/ServiceRepository";
import { createServiceSchema } from "../dtos/create-service.dto";
import { CreateServiceService } from "../services/create-service.service";

export const createServiceController = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const body = createServiceSchema.parse(req.body);

    const serviceRepository = new PrismaServiceRepository();
    const service = new CreateServiceService(serviceRepository);

    const createdService = await service.execute({
      ...body,
      createdById: req.userId,
    });

    return res.status(201).json({
      id: createdService.id,
      value: createdService.value.toString(),
      description: createdService.description,
      createdById: createdService.createdById,
      updatedById: createdService.updatedById,
      createdAt: createdService.createdAt.toISOString(),
      updatedAt: createdService.updatedAt.toISOString(),
    });
  },
);
