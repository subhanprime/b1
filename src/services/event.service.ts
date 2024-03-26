/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/comma-dangle */
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  addMonths,
} from "date-fns";
import mongoose from "mongoose";
import EventRepository from "../repositories/event.repository";
import TicketRepository from "../repositories/ticket.repository";
import { formatDateFull, formatEventArray } from "../utils/formatDate.util";
import logger from "../utils/winstonLogging";
import SearchRepository from "../repositories/search.repository";
import AppError from "../Errors";
import MESSAGES from "../constants/messages";
import HTTPSTATUS from "../constants/httpstatus";
import PurchasedTicketsRepository from "../repositories/purchasedTickets.repository";
import UserRepository from "../repositories/user.repository";
import BookmarksRepository from "../repositories/bookmarks.repository";

/**
 * ----------------------------------------------------------------
 * Create a new Event with its Tickets
 * ----------------------------------------------------------------
 */
const createEventService = async (
  event: Object,
  tickets: Object[]
): Promise<{ message: string; eventId: string }> => {
  // Creating the event
  const newEvent = await EventRepository.createEvent(event);

  // Pairing the ticket with the newly created Event
  const tempTickets = tickets.map((ticket) => ({
    ...ticket,
    eventId: newEvent._id,
  }));

  // Bulk creating Tickets
  await TicketRepository.insetMany(tempTickets);

  return { message: "Created New Event Successfully", eventId: newEvent._id };
};

/**
 * ----------------------------------------------------------------
 * Get events by different time period
 * ----------------------------------------------------------------
 */
const getEventsByDateService = async (
  period: string,
  fromDate: Date,
  toDate: Date,
  limit: number,
  endTime: Date = endOfDay(toDate)
): Promise<Object> => {
  let query = {};

  // Defining Queries for different time periods to get events
  switch (period) {
    case "Today":
      const todayStart = startOfDay(new Date());
      const todayEnd = endOfDay(new Date());
      query = { eventDate: { $gte: todayStart, $lt: todayEnd } };
      break;

    case "This week":
      const thisWeekStart = startOfWeek(new Date());
      const thisWeekEnd = endOfWeek(new Date());
      query = { eventDate: { $gte: thisWeekStart, $lt: thisWeekEnd } };
      break;

    case "This month":
      const thisMonthStart = startOfMonth(new Date());
      const thisMonthEnd = endOfMonth(new Date());
      query = { eventDate: { $gte: thisMonthStart, $lt: thisMonthEnd } };
      break;

    case "Next month":
      const nextMonthStart = startOfMonth(addMonths(new Date(), 1));
      const nextMonthEnd = endOfMonth(addMonths(new Date(), 1));
      query = { eventDate: { $gte: nextMonthStart, $lt: nextMonthEnd } };
      break;

    case "Choose dates":
      toDate.setHours(endTime.getHours());
      toDate.setMinutes(endTime.getMinutes());
      query = {
        eventDate: {
          $gte: startOfDay(fromDate),
          $lt: toDate,
        },
      };
      break;

    default:
      // Handle invalid or unsupported periods
      throw new Error("Invalid time period");
  }

  console.log("Query:", query);

  // Getting the events with the query defined above
  const events = await EventRepository.getEventsByQueryLimit(query, limit);

  return formatEventArray(events);
};

/**
 * ----------------------------------------------------------------
 * Get Top Events
 * ----------------------------------------------------------------
 */
const getTopEventsService = async (limit: number): Promise<Object> => {
  const data = await EventRepository.getTopEvents(limit);
  // console.log("Top Events", data);

  return formatEventArray(data);
};

/**
 * ----------------------------------------------------------------
 * Get events for access view scroller
 * ----------------------------------------------------------------
 */
const getAccessViewEventsService = async (limit: number): Promise<Object> => {
  const data = await EventRepository.getAccessViewEvents(limit);
  return formatEventArray(data);
};

/**
 * ----------------------------------------------------------------
 * Get ticket price ranges of an event (for admin panel, displayed as $100-$200)
 * ----------------------------------------------------------------
 */
const getTicketPriceRanges = async (): Promise<
  { eventId: mongoose.Types.ObjectId; priceRange: string }[]
> => {
  try {
    const ticketPriceRanges = await TicketRepository.getTicketPriceRanges();

    return ticketPriceRanges;
  } catch (error) {
    console.error("Error fetching ticket price ranges:", error);
    throw error;
  }
};

/**
 * ----------------------------------------------------------------
 * Get all events for admin panel, with search, sort and pagination
 * ----------------------------------------------------------------
 */
const getAllEventsService = async (
  pageNumber: number,
  pageLimit: number,
  search: string,
  searchOn: string,
  sortBy: string,
  sortOn: string
): Promise<Object> => {
  // Creating Query for Searching Results on Fields
  const regex = new RegExp(search, "i");
  const query =
    searchOn && searchOn.trim() !== "" ? { [searchOn]: { $regex: regex } } : {};

  console.log("Query : ", query);

  // Defining Sorts for query
  const sorting = { asc: 1, desc: -1 };

  // Getting Paginated Events with lean true
  const events = await EventRepository.getALLEventsPaginated(
    query,
    pageNumber,
    pageLimit,
    sortBy,
    sortOn,
    sorting
  );

  if (!events || !events.docs) {
    return [];
  }

  // Getting Ticket Price ranges for all Events
  const ticketPriceRanges = await getTicketPriceRanges();

  const priceRangesMap = new Map<string, string>();

  // Mapping each Event to it's Ticket Price Range
  ticketPriceRanges.forEach(({ eventId, priceRange }) => {
    priceRangesMap.set(eventId.toString(), priceRange);
  });

  // Getting Ticket Quantities for all events grouped by their event ids
  const ticketQuantities = await TicketRepository.getTicketQuantities();
  logger.info("Ticket Quantities: ", ticketQuantities);

  // Mapping the ticket quantities to their respective Events
  const eventsWithTicketPrice = events.docs.map((event) => {
    // Mapping ticket quantities event Id to Event returned from pagination event ids
    const totalTickets = ticketQuantities.find(
      (item) => item._id.toString() === event._id.toString()
    );

    return {
      // Event Object
      ...event,
      // Price ranges for that Event
      ticketPrice: priceRangesMap.get(event._id.toString()) || "N/A",
      // Ticket Quantities for that Event
      totalTickets:
        totalTickets !== undefined
          ? {
              totalQuantityAvailable: totalTickets.totalQuantityAvailable,
              totalQuantityRedeemed: totalTickets.totalQuantityRedeemed,
            }
          : {},
    };
  });

  return {
    events: eventsWithTicketPrice,
    totalPages: events.totalPages,
    totalDocs: events.totalDocs,
  };
};

/**
 * ----------------------------------------------------------------
 * Getting events by category
 * ----------------------------------------------------------------
 */
const getEventsByCategoryService = async (
  category: string
): Promise<Object> => {
  const events = await EventRepository.getEventsByQuery({ category: category });
  return events;
};

/**
 * ----------------------------------------------------------------
 * Getting events by location
 * ----------------------------------------------------------------
 */
const getEventsByLocationService = async (
  location: string
): Promise<Object> => {
  const events = await EventRepository.getEventsByQuery({ city: location });
  return events;
};

/**
 * ----------------------------------------------------------------
 * Search Events on fields [name, category, description, city, country]
 * ----------------------------------------------------------------
 */
const searchEventService = async (search: string): Promise<Object> => {
  const events = await EventRepository.searchEvents(search);

  // Looking for the search field in the database
  const existingSearch = await SearchRepository.findSearch(search);

  // Incrementing counter if search exists otherwies adding to DB
  if (existingSearch) {
    await SearchRepository.updateSearchCounter(search);
  } else {
    await SearchRepository.addSearch(search);
  }

  return events;
};

/**
 * ----------------------------------------------------------------
 * Get a single event through its Event._id
 * ----------------------------------------------------------------
 */
const getIndividualEventService = async (id: string): Promise<Object> => {
  const event = await EventRepository.findOneById(id);
  if (event) {
    const formatedDate = formatDateFull(event.eventDate?.toDateString()!);

    return { event, formatedDate };
  }
  throw new AppError(
    MESSAGES.NO_EVENT_EXISTS.error,
    MESSAGES.NO_EVENT_EXISTS.code,
    HTTPSTATUS.BADREQUEST
  );
};

/**
 * ----------------------------------------------------------------
 * Get people attending for an event
 * ----------------------------------------------------------------
 */
const getPeopleAttendingService = async (eventId: string): Promise<Object> => {
  const attendees = await PurchasedTicketsRepository.getAttendees(eventId);

  const userIds: string[] = attendees.length > 0 ? attendees[0].users : [];

  const displayedUsers = userIds.slice(0, 4);

  const userData = await UserRepository.findUserInArray(displayedUsers);
  return { attendees: userData, total: userIds.length };
};

/**
 * ----------------------------------------------------------------
 * Get ALl attendess for an event
 * ----------------------------------------------------------------
 */
const getAllPeopleAttendingService = async (
  eventId: string
): Promise<Object> => {
  const attendees = await PurchasedTicketsRepository.getAttendees(eventId);

  const userIds: string[] = attendees.length > 0 ? attendees[0].users : [];

  const userData = await UserRepository.findUserInArray(userIds);
  return { attendees: userData, total: userIds.length };
};

/**
 * ----------------------------------------------------------------
 * Purchase Ticket (Temporary Service)
 * ----------------------------------------------------------------
 */
const purchaseTicketService = async (
  eventId: string,
  userId: string,
  ticketId: string
): Promise<String> => {
  await PurchasedTicketsRepository.purchaseTicket({
    eventId,
    userId,
    ticketId,
  });
  return "Succesfully purchased Ticket";
};

/**
 * ----------------------------------------------------------------
 * Update Event Images
 * ----------------------------------------------------------------
 */
const updateEventImagesService = async (
  eventId: string,
  image: string,
  pageImage: string,
  feedImage: string
): Promise<{ message: string }> => {
  await EventRepository.findByIdAndUpdate(eventId, {
    image,
    pageImage,
    feedImage,
  });

  return { message: "Image Updated succesfully" };
};

/**
 * ----------------------------------------------------------------
 * Bookmark Events
 * ----------------------------------------------------------------
 */
const bookmarkEventService = async (
  eventId: string,
  userId: string
): Promise<{ message: string; bookmarked: boolean }> => {
  // Check if Bookmark already exists
  const bookmarkedEvent = await BookmarksRepository.findByQuery({
    eventId,
    userId,
  });

  let message = "Event Bookmarked!";
  let bookmarked = true;
  // If bookmark exists then delete bookmark to toggle bookmark off
  if (bookmarkedEvent !== null) {
    await BookmarksRepository.unBookmarkEvent({ eventId, userId });
    message = "Event unbookmarked!";
    bookmarked = false;
  } else {
    await BookmarksRepository.bookmarkEvent({
      eventId,
      userId,
    });
  }

  return { message: message, bookmarked };
};

/**
 * ----------------------------------------------------------------
 * Check if event is bookmarked by user
 * ----------------------------------------------------------------
 */
const checkBookmarkService = async (
  eventId: string,
  userId: string
): Promise<boolean> => {
  const bookmark = await BookmarksRepository.findByQuery({ eventId, userId });

  if (bookmark === null) {
    return false;
  }

  return true;
};

export {
  createEventService,
  getEventsByDateService,
  getTopEventsService,
  getAccessViewEventsService,
  getAllEventsService,
  getEventsByCategoryService,
  getEventsByLocationService,
  searchEventService,
  getIndividualEventService,
  getPeopleAttendingService,
  purchaseTicketService,
  getAllPeopleAttendingService,
  updateEventImagesService,
  bookmarkEventService,
  checkBookmarkService,
};
