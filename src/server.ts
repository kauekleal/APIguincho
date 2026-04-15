import { createServer } from "http";

import { createApp } from "./app";
import { env } from "./config/env";
import { logger } from "./shared/utils/logger";

const app = createApp();
const server = createServer(app);

server.listen(env.PORT, () => {
  logger.base.info(
    { port: env.PORT, environment: env.NODE_ENV },
    "🚀 Servidor iniciado",
  );
});
