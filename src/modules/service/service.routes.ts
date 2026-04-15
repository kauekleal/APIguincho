import { Router } from "express";

import { ensureAuthenticated } from "../../shared/middlewares/auth.middleware";
import { createServiceController } from "./controllers/create-service.controller";
import { listServicesController } from "./controllers/list-services.controller";
import { getServiceController } from "./controllers/get-service.controller";
import { updateServiceController } from "./controllers/update-service.controller";
import { deleteServiceController } from "./controllers/delete-service.controller";

export const serviceRoutes = Router();

serviceRoutes.use(ensureAuthenticated);

serviceRoutes.get("/", listServicesController);
serviceRoutes.get("/:id", getServiceController);
serviceRoutes.post("/", createServiceController);
serviceRoutes.patch("/:id", updateServiceController);
serviceRoutes.delete("/:id", deleteServiceController);
