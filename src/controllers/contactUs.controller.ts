import { Request, Response } from "express";
import HTTPSTATUS from "../constants/httpstatus";
import errorHandler from "../utils/errorHandler";
import {
  addEnquiryService,
  addFeedbackService,
  addSubscriptionService,
} from "../services/contactUs.service";

/**
 * ----------------------------------------------------------------
 * Adding a new enquiry to Database
 * ----------------------------------------------------------------
 */
const addEnquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, enquiry } = req.body;
    const result = await addEnquiryService(data, enquiry);
    res.status(HTTPSTATUS.OK).json(result);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Adding a new enquiry to Database
 * ----------------------------------------------------------------
 */
const addSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const result = await addSubscriptionService(email);
    res.status(HTTPSTATUS.OK).json(result);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Adding a new Feedback to Database
 * ----------------------------------------------------------------
 */
const addFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { feedback } = req.body;
    const userId = req.user;
    const result = await addFeedbackService(userId!, feedback);
    res.status(HTTPSTATUS.OK).json(result);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

export { addEnquiry, addSubscription, addFeedback };
