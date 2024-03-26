/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/comma-dangle */
import { Request, Response } from "express";
import HTTPSTATUS from "../constants/httpstatus";
import errorHandler from "../utils/errorHandler";
import {
  addLocationService,
  getCategoriesService,
  getCookieService,
  getEventFilterDatesService,
  getEventStatusService,
  getEventTypeService,
  getLocationsService,
  getMembershipPageService,
  getMembershipTypeService,
  getPopularSearchesService,
  getPrivacyNoticeService,
  getPrivaryPolicyService,
  getTermsService,
  getUserTermsService,
} from "../services/metadata.service";

/**
 * ----------------------------------------------------------------
 * Returns Event Status from eventStatus enum [Live, Draft, Paused]
 * ----------------------------------------------------------------
 */
const getEventStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = getEventStatusService();
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Returns Event Type from eventType enum [Ticketed, Guest List]
 * ----------------------------------------------------------------
 */
const getEventType = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = getEventTypeService();
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Returns Membership Type from membershipType enum [Black, Standard, Platinum]
 * ----------------------------------------------------------------
 */
const getMembershipType = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = getMembershipTypeService();
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Returns Categories from eventCategories enum [Fashion, Sports, Music]
 * ----------------------------------------------------------------
 */
const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = getCategoriesService();
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Gets the values for fitlering events by dates and time periods from eventFilterDate enum
 * ----------------------------------------------------------------
 */
const getEventFilterDates = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = getEventFilterDatesService();
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Gets the cities and their associated image from the database
 * ----------------------------------------------------------------
 */
const getLocations = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await getLocationsService();
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Add a location and its image to the database
 * ----------------------------------------------------------------
 */
const addLocations = async (req: Request, res: Response): Promise<void> => {
  try {
    const location = req.body;
    const data = await addLocationService(location);
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Returns the Privacy Policy page from the database
 * ----------------------------------------------------------------
 */
const getPrivacyPolicy = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await getPrivaryPolicyService();
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Returns the Terms & conditions page from database
 * ----------------------------------------------------------------
 */
const getTermsConditions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await getTermsService();
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Returns the User Terms page from database
 * ----------------------------------------------------------------
 */
const getUserTerms = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await getUserTermsService();
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Returns the Privacy Policy page from database
 * ----------------------------------------------------------------
 */
const getPrivacyNotice = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await getPrivacyNoticeService();
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Returns the Cookie Notice page from the database
 * ----------------------------------------------------------------
 */
const getCookienotice = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await getCookieService();
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Returns the Membership page from the database
 * ----------------------------------------------------------------
 */
const getMembershipPages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { type } = req.query;
    const data = await getMembershipPageService(type as string);
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Returns the top searches from the search database
 * ----------------------------------------------------------------
 */
const getPopularSearches = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await getPopularSearchesService();
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

export {
  getEventStatus,
  getEventType,
  getMembershipType,
  getCategories,
  getEventFilterDates,
  getLocations,
  addLocations,
  getTermsConditions,
  getPrivacyPolicy,
  getUserTerms,
  getPrivacyNotice,
  getCookienotice,
  getPopularSearches,
  getMembershipPages,
};
