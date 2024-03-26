import { Router } from "express";
import {
  CATEGORIES,
  COOKIE_NOTICE,
  EVENT_FILTER_DATE,
  EVENT_LOCATIONS,
  EVENT_STATUS,
  EVENT_TYPE,
  MEMBERSHIP_TYPE,
  POPULAR_SEARCHES,
  PRIVACY_NOTICE,
  PRIVACY_POLICY,
  TERMS_CONDITION,
  USER_TERMS,
} from "../constants/routes";
import routeHandler from "../utils/routeHandler";
import {
  addLocations,
  getCategories,
  getCookienotice,
  getEventFilterDates,
  getEventStatus,
  getEventType,
  getLocations,
  getMembershipPages,
  getMembershipType,
  getPopularSearches,
  getPrivacyNotice,
  getPrivacyPolicy,
  getTermsConditions,
  getUserTerms,
} from "../controllers/metadata.controller";
import { verifyToken } from "../middleware/auth/auth.middleware";

const router: Router = Router();

// get Event Status
router.get(EVENT_STATUS, verifyToken, routeHandler(getEventStatus));

// Get Event Types
router.get(EVENT_TYPE, verifyToken, routeHandler(getEventType));

// Get Membership Types
router.get(MEMBERSHIP_TYPE, verifyToken, routeHandler(getMembershipType));

// Get Categories
router.get(CATEGORIES, verifyToken, routeHandler(getCategories));

// Get Event filter dates
router.get(EVENT_FILTER_DATE, verifyToken, routeHandler(getEventFilterDates));

// Get Event Locations
router.get(EVENT_LOCATIONS, verifyToken, routeHandler(getLocations));

// Add Event Locations with Images
router.post(EVENT_LOCATIONS, routeHandler(addLocations));

// Get Privacy Policy Page
router.get(PRIVACY_POLICY, routeHandler(getPrivacyPolicy));

// Get Terms & Conditions page
router.get(TERMS_CONDITION, routeHandler(getTermsConditions));

// Get User Terms  page
router.get(USER_TERMS, routeHandler(getUserTerms));

// Get Privacy Notice page
router.get(PRIVACY_NOTICE, routeHandler(getPrivacyNotice));

// Get Cookie Notice page
router.get(COOKIE_NOTICE, routeHandler(getCookienotice));

// Get Membership page
router.get("/membership", routeHandler(getMembershipPages));

// Get Popular Searches page
router.get(POPULAR_SEARCHES, verifyToken, routeHandler(getPopularSearches));

export default router;
