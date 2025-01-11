// src/utils/logger.ts
import * as winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

export default logger;
