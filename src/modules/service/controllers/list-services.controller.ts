import { Response } from "express";

import { AuthenticatedRequest } from "../../../shared/middlewares/auth.middleware";
import { asyncHandler } from "../../../shared/utils/async-handler";
import { PrismaServiceRepository } from "../repositories/ServiceRepository";

export const listServicesController = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const description =
      typeof req.query.description === "string"
        ? req.query.description
        : undefined;

    const serviceRepository = new PrismaServiceRepository();
    const services = await serviceRepository.findAll({ description });

    return res.status(200).json(
      services.map((service) => ({
        id: service.id,
        value: service.value.toString(),
        description: service.description,
        createdById: service.createdById,
        updatedById: service.updatedById,
        createdAt: service.createdAt.toISOString(),
        updatedAt: service.updatedAt.toISOString(),
      })),
    );
  },
);
