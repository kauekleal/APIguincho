import { Router } from "express";

import { loginController } from "./controllers/login.controller";

export const authRoutes = Router();

authRoutes.post("/login", loginController);
