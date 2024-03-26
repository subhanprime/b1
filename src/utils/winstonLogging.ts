/* eslint-disable object-curly-newline */
/* eslint-disable function-paren-newline */
/* eslint-disable @typescript-eslint/comma-dangle */
import winston from "winston";

const { combine, timestamp, json, errors } = winston.format;

const errorFilter = winston.format((info) =>
  info.level === "error" ? info : false
);

const infoFilter = winston.format((info) =>
  info.level === "info" ? info : false
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    errors({ stack: true }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    json()
  ),
  transports: [
    new winston.transports.File({
      filename: "./src/Logs/combined.log",
    }),
    new winston.transports.File({
      filename: "./src/Logs/app-error.log",
      level: "error",
      format: combine(errorFilter(), timestamp(), json()),
    }),
    new winston.transports.File({
      filename: "./src/Logs/app-info.log",
      level: "info",
      format: combine(infoFilter(), timestamp(), json()),
    }),
  ],
});

export default logger;
