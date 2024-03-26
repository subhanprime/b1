/* eslint-disable @typescript-eslint/comma-dangle */
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import HTTPSTATUS from "../../constants/httpstatus";
import MESSAGES from "../../constants/messages";
import errorHandler from "../../utils/errorHandler";
import AppError from "../../Errors";
import logger from "../../utils/winstonLogging";

/**
 * ----------------------------------------------------------------
 * Middleware for checking if no file was uploaded to the server
 * ----------------------------------------------------------------
 */
const noFileUploadMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
  // eslint-disable-next-line consistent-return
) => {
  try {
    if (!req.files || req.files.length === 0) {
      throw new AppError(
        MESSAGES.NO_FILES_UPLOADED.error,
        MESSAGES.NO_FILES_UPLOADED.code,
        HTTPSTATUS.BADREQUEST
      );
    }
    next();
  } catch (err: any) {
    errorHandler(err, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Dynamic function to validate any validtion schema
 * ----------------------------------------------------------------
 */
const validateData =
  (validatorSchema: Joi.ObjectSchema<any>) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
    // eslint-disable-next-line consistent-return
  ) => {
    const { error } = validatorSchema.validate(req.body);
    if (error) {
      console.log(error);
      logger.error(`Error Message: ${error.message}`);

      return res
        .status(HTTPSTATUS.BADREQUEST)
        .json({ message: error.message, code: MESSAGES.INVALID_BODY.code });
    }
    next();
  };

export { noFileUploadMiddleware, validateData };
