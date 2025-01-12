import * as winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// If we're testing, silence the console output
if (process.env.NODE_ENV === 'test') {
  logger.silent = true;
}

export default logger;