/* eslint-disable @typescript-eslint/comma-dangle */
import { Router } from "express";
import routeHandler from "../utils/routeHandler";
import {
  ACCESS_EVENTS,
  ALL_ATTENDESS,
  ATTENDEES,
  BASIC_ROUTE,
  BOOKMARK,
  EVENT_IMAGES,
  FILTER_EVENTS,
  FIND_EVENTS,
  GET_EVENT_BY_DATES,
  HOME_EVENTS,
  INDIVIDUAL_EVENT,
  SEARCH_EVENTS,
  TOP_EVENTS,
} from "../constants/routes";
import {
  bookmarkEvent,
  createEvent,
  filterEvents,
  getAccessViewEvents,
  getAllEvents,
  getAllPeopleAttending,
  getEventsByDate,
  getHomePageEvents,
  getIndividualEvent,
  getPeopleAttending,
  getTopEvents,
  purchaseTicket,
  searchEvents,
  updateEventImages,
} from "../controllers/events.controller";
import { validateData } from "../middleware/Validation/validations.middleware";
import {
  bookmarkEventValidationSchema,
  createEventValidator,
  filterEventsValidationSchema,
  getAllEventsValidationSchema,
  getEventsByDateValidationSchema,
  getIndividualEventValidationSchema,
  searchEventsFilterValidatonSchema,
  updateEventImagesValidation,
} from "../validators/event.validators";
import { verifyToken } from "../middleware/auth/auth.middleware";
import { noEventExistsValidation } from "../middleware/Validation/eventValidation.middleware";

const router: Router = Router();

// "/api/event/" create Event
router.post(
  BASIC_ROUTE,
  verifyToken,
  validateData(createEventValidator),
  routeHandler(createEvent)
);

// "/api/event/dates"
router.post(
  GET_EVENT_BY_DATES,
  verifyToken,
  validateData(getEventsByDateValidationSchema),
  routeHandler(getEventsByDate)
);

// "/api/events/top"
router.get(TOP_EVENTS, verifyToken, routeHandler(getTopEvents));

// "/api/events/access"
router.get(ACCESS_EVENTS, verifyToken, routeHandler(getAccessViewEvents));

// "api/events/home"
router.get(HOME_EVENTS, verifyToken, routeHandler(getHomePageEvents));

// "api/events/find"
router.post(
  FIND_EVENTS,
  verifyToken,
  validateData(getAllEventsValidationSchema),
  routeHandler(getAllEvents)
);

// "api/events/filter"
router.post(
  FILTER_EVENTS,
  verifyToken,
  validateData(filterEventsValidationSchema),
  routeHandler(filterEvents)
);

// "/api/events/search"
router.post(
  SEARCH_EVENTS,
  verifyToken,
  validateData(searchEventsFilterValidatonSchema),
  routeHandler(searchEvents)
);

// "/api/events/individual"
router.post(
  INDIVIDUAL_EVENT,
  verifyToken,
  validateData(getIndividualEventValidationSchema),
  routeHandler(getIndividualEvent)
);

// Get the users to display on Event page (Top 4 Attendees)
router.post(ATTENDEES, verifyToken, routeHandler(getPeopleAttending));

// Get All attendees for an Event
router.post(ALL_ATTENDESS, verifyToken, routeHandler(getAllPeopleAttending));

// Temporary testing API
router.post("/purchase", routeHandler(purchaseTicket));

// Update Event Images
router.post(
  EVENT_IMAGES,
  validateData(updateEventImagesValidation),
  noEventExistsValidation,
  updateEventImages
);

// Bookmark an event
router.post(
  BOOKMARK,
  verifyToken,
  validateData(bookmarkEventValidationSchema),
  noEventExistsValidation,
  bookmarkEvent
);

export default router;
