import { Response } from "express";

import { AuthenticatedRequest } from "../../../shared/middlewares/auth.middleware";
import { asyncHandler } from "../../../shared/utils/async-handler";
import { AppError } from "../../../shared/errors/AppError";
import { PrismaServiceRepository } from "../repositories/ServiceRepository";

export const getServiceController = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = String(req.params.id);

    const serviceRepository = new PrismaServiceRepository();
    const service = await serviceRepository.findById(id);

    if (!service) {
      throw new AppError("Serviço não encontrado", 404, "NOT_FOUND");
    }

    return res.status(200).json({
      id: service.id,
      value: service.value.toString(),
      description: service.description,
      createdById: service.createdById,
      updatedById: service.updatedById,
      createdAt: service.createdAt.toISOString(),
      updatedAt: service.updatedAt.toISOString(),
    });
  },
);
