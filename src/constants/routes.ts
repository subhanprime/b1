// Base Routes
const API_BASE_ROUTE = "/api";
const USER_BASE_ROUTE = "/users";
const authBaseRoute = "/auth";
const EVENT_BASE_ROUTE = "/events";
const BASIC_ROUTE = "/";
const ADMIN_BASE_ROUTE = "/admin";
const BUSINESS_BASE_ROUTE = "/businesses";
const ACCESS_BASE_ROUTE = "/access";

// User Routes
const ADD_EXPO_TOKEN = "/expo/token";
const UPDATE_USER_STATUS = "/status";
const APPLICATION_STATUS = "/application/status";
const APPLICATION_DATA = "/application/data";
// Twilio Routes
const TWILIO_SEND_OTP = "/send/otp";
const TWILIO_VERIFY_OTP = "/verify/otp";
// Auth Routes
const LOGIN_ROUTE = "/login";

// Metadata Routes
const EVENT_STATUS = "/status";
const EVENT_TYPE = "/type";
const MEMBERSHIP_TYPE = "/membership/type";
const CATEGORIES = "/category";
const EVENT_FILTER_DATE = "/dates";
const EVENT_LOCATIONS = "/locations";
const PRIVACY_POLICY = "/privacy";
const TERMS_CONDITION = "/terms";
const USER_TERMS = "/userterms";
const PRIVACY_NOTICE = "/notice";
const COOKIE_NOTICE = "/cookie";

// Upload Files
const UPLOAD_FILES = "/upload";

// Contact Us
const CONTACT_US = "/contactus";

// Feedbacks
const FEEDBACKS = "/feedback";

// Subscriptions
const SUBSCRIPTIONS = "/subscriptions";

// Event Routes
const GET_EVENT_BY_DATES = "/dates";
const TOP_EVENTS = "/top";
const ACCESS_EVENTS = "/access";
const HOME_EVENTS = "/home";
const FILTER_EVENTS = "/filter";
const FIND_EVENTS = "/find";
const SEARCH_EVENTS = "/search";
const POPULAR_SEARCHES = "/search/popular";
const INDIVIDUAL_EVENT = "/individual";
const ATTENDEES = "/attending";
const ALL_ATTENDESS = "/attending/all";
const EVENT_IMAGES = "/images";
const BOOKMARK = "/bookmark";

// Business Routes
const FIND_BUSINESS = "/find";
export {
  API_BASE_ROUTE,
  ADMIN_BASE_ROUTE,
  EVENT_BASE_ROUTE,
  BUSINESS_BASE_ROUTE,
  BASIC_ROUTE,
  USER_BASE_ROUTE,
  ADD_EXPO_TOKEN,
  TWILIO_SEND_OTP,
  TWILIO_VERIFY_OTP,
  authBaseRoute,
  LOGIN_ROUTE,
  UPDATE_USER_STATUS,
  APPLICATION_STATUS,
  APPLICATION_DATA,
  EVENT_STATUS,
  EVENT_TYPE,
  MEMBERSHIP_TYPE,
  CATEGORIES,
  UPLOAD_FILES,
  GET_EVENT_BY_DATES,
  EVENT_FILTER_DATE,
  TOP_EVENTS,
  ACCESS_EVENTS,
  HOME_EVENTS,
  FILTER_EVENTS,
  FIND_EVENTS,
  EVENT_LOCATIONS,
  FIND_BUSINESS,
  SEARCH_EVENTS,
  PRIVACY_POLICY,
  TERMS_CONDITION,
  USER_TERMS,
  PRIVACY_NOTICE,
  COOKIE_NOTICE,
  POPULAR_SEARCHES,
  INDIVIDUAL_EVENT,
  ATTENDEES,
  ALL_ATTENDESS,
  CONTACT_US,
  EVENT_IMAGES,
  BOOKMARK,
  ACCESS_BASE_ROUTE,
  SUBSCRIPTIONS,
  FEEDBACKS,
};
