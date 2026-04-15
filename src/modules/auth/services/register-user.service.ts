import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";

import { env } from "../../../config/env";
import { AppError } from "../../../shared/errors/AppError";
import {
  CreateUserData,
  UserRepository,
} from "../../users/repositories/UserRepository";

interface RegisterRequest {
  username: string;
  password: string;
  name: string;
  email: string;
}

interface RegisterResponse {
  token: string;
  user: {
    id: string;
    username: string;
    name?: string;
    email?: string;
  };
}

export class RegisterUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    username,
    password,
    name,
    email,
  }: RegisterRequest): Promise<RegisterResponse> {
    const passwordHash = await bcrypt.hash(password, 10);

    let user;

    try {
      user = await this.userRepository.create({
        username,
        password: passwordHash,
        name,
        email,
      });
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as { code?: string }).code === "P2002"
      ) {
        throw new AppError("Usuário já existe", 400, "USER_ALREADY_EXISTS");
      }

      throw error;
    }

    const signOptions: SignOptions = {
      subject: user.id,
      expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
    };

    const token = jwt.sign({ username: user.username }, env.JWT_SECRET, signOptions);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        ...(user.name ? { name: user.name } : {}),
        ...(user.email ? { email: user.email } : {}),
      },
    };
  }
}
