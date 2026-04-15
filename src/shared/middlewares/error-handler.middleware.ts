import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { AppError } from "../errors/AppError";
import { logger } from "../utils/logger";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- assinatura do middleware Express
  _next: NextFunction,
): Response {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      ...(err.code ? { code: err.code } : {}),
    });
  }

  if (err instanceof ZodError) {
    const first = err.issues[0];
    return res.status(400).json({
      message: first?.message ?? "Dados inválidos",
      code: "VALIDATION_ERROR",
    });
  }

  logger.base.error({ err }, "Unhandled error");

  return res.status(500).json({
    message: "Erro interno do servidor",
    code: "INTERNAL_ERROR",
  });
}
