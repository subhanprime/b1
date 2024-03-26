import { Response } from "express";
import logger from "./winstonLogging";

const errorHandler = (error: any, res: Response): void => {
  console.log("Error", error);
  logger.error(`${error.message}, Error Code : ${error.code}`);
  res.status(error.httpCode).json({ message: error.message, code: error.code });
};

export default errorHandler;
