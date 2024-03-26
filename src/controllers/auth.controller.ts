import { Request, Response } from "express";
import HTTPSTATUS from "../constants/httpstatus";
import errorHandler from "../utils/errorHandler";
import { createAdminService, loginService } from "../services/auth.service";

/**
 * ----------------------------------------------------------------
 * Adding a new Admin user to Database
 * ----------------------------------------------------------------
 */
const createAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const data = await createAdminService(email, password);
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Admin Login API
 * ----------------------------------------------------------------
 */
const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

export { createAdmin, login };
