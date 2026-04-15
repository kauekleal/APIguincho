import { Response } from "express";

import { AuthenticatedRequest } from "../../../shared/middlewares/auth.middleware";
import { asyncHandler } from "../../../shared/utils/async-handler";
import { PrismaServiceRepository } from "../repositories/ServiceRepository";
import { DeleteServiceService } from "../services/delete-service.service";

export const deleteServiceController = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = String(req.params.id);

    const serviceRepository = new PrismaServiceRepository();
    const service = new DeleteServiceService(serviceRepository);

    await service.execute(id);

    return res.status(204).send();
  },
);
