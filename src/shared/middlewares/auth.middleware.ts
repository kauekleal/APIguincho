import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "../../config/env";
import { AppError } from "../errors/AppError";

export interface AuthenticatedRequest extends Request {
  userId: string;
}

export function ensureAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token de autenticação ausente", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { sub: string };

    if (!decoded.sub) {
      throw new AppError("Token inválido", 401);
    }

    (req as AuthenticatedRequest).userId = decoded.sub;

    next();
  } catch {
    throw new AppError("Token inválido ou expirado", 401);
  }
}
