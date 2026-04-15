import { Request, Response } from "express";

import { asyncHandler } from "../../../shared/utils/async-handler";
import { PrismaUserRepository } from "../../users/repositories/UserRepository";
import { registerSchema } from "../dtos/register.dto";
import { RegisterUserService } from "../services/register-user.service";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse(req.body);
console.log(body);
    const userRepository = new PrismaUserRepository();
    const registerService = new RegisterUserService(userRepository);

    const result = await registerService.execute(body);

    return res.status(201).json(result);
  },
);
