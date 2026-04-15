import express, { Application } from "express";
import cors from "cors";

import { env } from "./config/env";
import { errorHandler } from "./shared/middlewares/error-handler.middleware";
import { healthRoutes } from "./shared/health/health.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/users/users.routes";
import { expensesRoutes } from "./modules/expenses/expenses.routes";
import { serviceRoutes } from "./modules/service/service.routes";

export function createApp(): Application {
  const app = express();

  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );

  app.use(express.json());

  app.use("/health", healthRoutes);
  app.use("/auth", authRoutes);
  app.use("/users", userRoutes);
  app.use("/expenses", expensesRoutes);
  app.use("/service", serviceRoutes);

  app.use(errorHandler);

  return app;
}
