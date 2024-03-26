/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/comma-dangle */
import { Request, Response } from "express";
import HTTPSTATUS from "../constants/httpstatus";
import errorHandler from "../utils/errorHandler";
import {
  createBusinessService,
  getAllBusinessService,
  updateBusinessImagesService,
  updateBusinessService,
} from "../services/business.service";

/**
 * ----------------------------------------------------------------
 * Get all business data for admin site
 * Pagination Impemented
 * Search implemented :
 * search -> the value searched by user
 * searchOn -> the field user wants to search on e.g firstName, lastName
 * Sorting Implemented :
 * sortBy -> asc or desc
 * sortOn -> the field user wants to sort on e.g firstName, lastName
 * ----------------------------------------------------------------
 */
const getAllBusiness = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pageNumber, pageLimit, search, searchOn, sortBy, sortOn } =
      req.body;
    const data = await getAllBusinessService(
      pageNumber,
      pageLimit,
      search,
      searchOn,
      sortBy,
      sortOn
    );
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Add a new business to database
 * ----------------------------------------------------------------
 */
const createBusiness = async (req: Request, res: Response): Promise<void> => {
  try {
    const { business, accountManager } = req.body;
    const data = await createBusinessService(business, accountManager);
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Update Business with account manager
 * ----------------------------------------------------------------
 */
const updateBusiness = async (req: Request, res: Response): Promise<void> => {
  try {
    const { business, accountManager } = req.body;
    const { id } = req.query;
    const data = await updateBusinessService(
      id as string,
      business,
      accountManager
    );
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Update Business Image URLs
 * ----------------------------------------------------------------
 */
const updateBusinessImages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { businessId, logo } = req.body;
    const data = await updateBusinessImagesService(businessId, logo);
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

export { getAllBusiness, createBusiness, updateBusiness, updateBusinessImages };
