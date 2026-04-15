import { Router } from "express";

import { loginController } from "./controllers/login.controller";
import { registerController } from "./controllers/register.controller";

export const authRoutes = Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
