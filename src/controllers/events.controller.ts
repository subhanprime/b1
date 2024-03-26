/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/comma-dangle */
import { Request, Response } from "express";
import HTTPSTATUS from "../constants/httpstatus";
import errorHandler from "../utils/errorHandler";
import {
  bookmarkEventService,
  checkBookmarkService,
  createEventService,
  getAccessViewEventsService,
  getAllEventsService,
  getAllPeopleAttendingService,
  getEventsByCategoryService,
  getEventsByDateService,
  getEventsByLocationService,
  getIndividualEventService,
  getPeopleAttendingService,
  getTopEventsService,
  purchaseTicketService,
  searchEventService,
  updateEventImagesService,
} from "../services/event.service";
import { getCategoriesService } from "../services/metadata.service";
import { HOMEPAGE_EVENT_LIMIT, NO_LIMIT_EVENT } from "../constants/eventLimits";

/**
 * ----------------------------------------------------------------
 * Create Event with Event & Tickets
 * ----------------------------------------------------------------
 */
const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { event, tickets } = req.body;
    const data = await createEventService(event, tickets);
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Get Events by time period [Today, This month, Next month, This week, Choose Dates]
 * ----------------------------------------------------------------
 */
const getEventsByDate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { period, range } = req.body;

    const { fromDate = "", toDate = "" } = range || {};

    const data = await getEventsByDateService(
      period,
      fromDate,
      toDate,
      NO_LIMIT_EVENT
    );

    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Get Top Events
 * ----------------------------------------------------------------
 */
const getTopEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await getTopEventsService(0);
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Homepage Events [Categories, Top events, Access View Events, this month events, benefits]
 * ----------------------------------------------------------------
 */
const getHomePageEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const period = "This month";
    const fromDate = new Date();
    const toDate = new Date();
    const categories = await getCategoriesService();
    const topEvents = await getTopEventsService(HOMEPAGE_EVENT_LIMIT);
    const accessViewEvents =
      await getAccessViewEventsService(HOMEPAGE_EVENT_LIMIT);
    const thisMonthEvents = await getEventsByDateService(
      period,
      fromDate,
      toDate,
      HOMEPAGE_EVENT_LIMIT
    );
    const benefits = await getAccessViewEventsService(HOMEPAGE_EVENT_LIMIT);
    res.status(HTTPSTATUS.OK).json({
      categories: categories,
      topEvents: topEvents,
      accessViewEvents: accessViewEvents,
      benefits: benefits,
      thisMonthEvents: thisMonthEvents,
    });
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Get All Access View Events
 * ----------------------------------------------------------------
 */
const getAccessViewEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await getAccessViewEventsService(0);
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Get all events for Admin site
 * ----------------------------------------------------------------
 */
const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pageNumber, pageLimit, search, searchOn, sortBy, sortOn } =
      req.body;
    const data = await getAllEventsService(
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
 * Filter events by Categories, Locations and Dates
 * ----------------------------------------------------------------
 */
const filterEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, location, dates } = req.body;
    let data = {};
    if (category) {
      data = await getEventsByCategoryService(category);
    } else if (location) {
      data = await getEventsByLocationService(location);
    } else if (dates) {
      const { period, range } = dates;

      const { fromDate = "", toDate = "", endTime = "" } = range || {};
      // Convert endTime string to a Date object
      const endTimeParts = endTime.split(":");
      const endTimeDate = new Date();
      endTimeDate.setHours(parseInt(endTimeParts[0], 10));
      endTimeDate.setMinutes(parseInt(endTimeParts[1], 10));

      // Set the date part of endDate to the previous day
      const endDate = new Date(toDate);
      endDate.setDate(endDate.getDate() - 1);
      data = await getEventsByDateService(
        period,
        fromDate,
        endDate,
        NO_LIMIT_EVENT,
        endTimeDate
      );
    }
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Search Events on every field
 * ----------------------------------------------------------------
 */
const searchEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search } = req.body;
    const data = await searchEventService(search);
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Get Individual Event from its eventId
 * ----------------------------------------------------------------
 */
const getIndividualEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.body;
    const userId = req.user;

    let bookmarked;
    const event = await getIndividualEventService(id);
    const attendees = await getPeopleAttendingService(id);
    if (userId) {
      bookmarked = await checkBookmarkService(id, userId!);
    } else {
      bookmarked = false;
    }
    res.status(HTTPSTATUS.OK).json({ ...event, ...attendees, bookmarked });
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Get People Attending an Event
 * ----------------------------------------------------------------
 */
const getPeopleAttending = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { eventId } = req.body;
    const data = await getPeopleAttendingService(eventId);
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Get All people attending an event
 * ----------------------------------------------------------------
 */
const getAllPeopleAttending = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { eventId } = req.body;
    const data = await getAllPeopleAttendingService(eventId);
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Test API for Purchasing a ticket
 * ----------------------------------------------------------------
 */
const purchaseTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventId, userId, ticketId } = req.body;
    const data = await purchaseTicketService(eventId, userId, ticketId);
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Update Event Image URLs
 * ----------------------------------------------------------------
 */
const updateEventImages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { eventId, image, pageImage, feedImage } = req.body;
    const data = await updateEventImagesService(
      eventId,
      image,
      pageImage,
      feedImage
    );
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/**
 * ----------------------------------------------------------------
 * Bookmark Events
 * ----------------------------------------------------------------
 */
const bookmarkEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventId } = req.body;
    const userId = req.user;

    const data = await bookmarkEventService(eventId, userId!);
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

export {
  createEvent,
  getEventsByDate,
  getTopEvents,
  getAccessViewEvents,
  getHomePageEvents,
  getAllEvents,
  filterEvents,
  searchEvents,
  getIndividualEvent,
  getPeopleAttending,
  getAllPeopleAttending,
  purchaseTicket,
  updateEventImages,
  bookmarkEvent,
};
