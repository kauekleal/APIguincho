import { Response } from "express";

import { AuthenticatedRequest } from "../../../shared/middlewares/auth.middleware";
import { asyncHandler } from "../../../shared/utils/async-handler";
import { PrismaServiceRepository } from "../repositories/ServiceRepository";
import { updateServiceSchema } from "../dtos/update-service.dto";
import { UpdateServiceService } from "../services/update-service.service";

export const updateServiceController = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = String(req.params.id);
    const body = updateServiceSchema.parse(req.body);

    const serviceRepository = new PrismaServiceRepository();
    const service = new UpdateServiceService(serviceRepository);

    const updatedService = await service.execute({
      id,
      ...body,
      updatedById: req.userId,
    });

    return res.status(200).json({
      id: updatedService.id,
      value: updatedService.value.toString(),
      description: updatedService.description,
      createdById: updatedService.createdById,
      updatedById: updatedService.updatedById,
      createdAt: updatedService.createdAt.toISOString(),
      updatedAt: updatedService.updatedAt.toISOString(),
    });
  },
);
