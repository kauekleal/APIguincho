import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";

import { env } from "../../../config/env";
import { AppError } from "../../../shared/errors/AppError";
import { UserRepository } from "../../users/repositories/UserRepository";

interface AuthenticateRequest {
  username: string;
  password: string;
}

interface AuthenticateResponse {
  token: string;
  user: {
    id: string;
    username: string;
    name?: string;
    email?: string;
  };
}

export class AuthenticateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    username,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new AppError("Credenciais inválidas", 401, "INVALID_CREDENTIALS");
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new AppError("Credenciais inválidas", 401, "INVALID_CREDENTIALS");
    }

    const signOptions: SignOptions = {
      subject: user.id,
      expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
    };

    const token = jwt.sign(
      { username: user.username },
      env.JWT_SECRET,
      signOptions,
    );

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
