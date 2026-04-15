import { Router } from "express";

import { ensureAuthenticated } from "../../shared/middlewares/auth.middleware";
import { meController } from "./controllers/me.controller";

export const userRoutes = Router();

userRoutes.use(ensureAuthenticated);

userRoutes.get("/me", meController);
