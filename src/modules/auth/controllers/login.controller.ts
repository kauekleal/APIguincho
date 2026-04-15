import { Request, Response } from "express";

import { asyncHandler } from "../../../shared/utils/async-handler";
import { PrismaUserRepository } from "../../users/repositories/UserRepository";
import { loginSchema } from "../dtos/login.dto";
import { AuthenticateUserService } from "../services/authenticate-user.service";

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = loginSchema.parse(req.body);

    const userRepository = new PrismaUserRepository();
    const authService = new AuthenticateUserService(userRepository);

    const result = await authService.execute(body);

    return res.status(200).json(result);
  },
);
