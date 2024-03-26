/* eslint-disable @typescript-eslint/comma-dangle */
import { Request, Response, NextFunction } from "express";
import HTTPSTATUS from "../../constants/httpstatus";
import MESSAGES from "../../constants/messages";
import logger from "../../utils/winstonLogging";
import EventRepository from "../../repositories/event.repository";
import AppError from "../../Errors";
import errorHandler from "../../utils/errorHandler";
/**
 * ----------------------------------------------------------------
 * Check if Event exists in the database
 * ----------------------------------------------------------------
 */
const noEventExistsValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
  // eslint-disable-next-line consistent-return
) => {
  try {
    const { eventId } = req.body;
    const event = await EventRepository.findOneById(eventId);

    if (event === null) {
      throw new AppError(
        MESSAGES.NO_EVENT_EXISTS.error,
        MESSAGES.INVALID_BODY.code,
        HTTPSTATUS.BADREQUEST
      );
    }
    next();
  } catch (error: any) {
    console.log(error);
    logger.error(`Error Message: ${error.message}`);
    errorHandler(error, res);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { noEventExistsValidation };
