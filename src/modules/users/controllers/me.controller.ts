import { Response } from "express";

import { AuthenticatedRequest } from "../../../shared/middlewares/auth.middleware";
import { asyncHandler } from "../../../shared/utils/async-handler";
import { AppError } from "../../../shared/errors/AppError";
import { PrismaUserRepository } from "../repositories/UserRepository";

export const meController = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userRepository = new PrismaUserRepository();

    const user = await userRepository.findById(req.userId);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404, "NOT_FOUND");
    }

    return res.status(200).json({
      id: user.id,
      username: user.username,
      name: user.name ?? undefined,
      email: user.email ?? undefined,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    });
  },
);
