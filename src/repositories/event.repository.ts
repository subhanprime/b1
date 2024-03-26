/* eslint-disable @typescript-eslint/comma-dangle */
import { EVENT } from "../models/index";

const EventRepository = {
  // Create a new Event
  createEvent: (body: Object) => EVENT.create(body),
  // Get Events through a custom query
  getEventsByQuery: (query: Object) => EVENT.find(query),
  // Get Events through a custom query
  getEventsByQueryLimit: (query: Object, limit: number) =>
    EVENT.find(query).limit(limit || 0),
  // Get events tagged as topEvents from the database
  getTopEvents: (limit: number) =>
    EVENT.find({ topEvent: true }).limit(limit || 0),
  // Get events with access view toggle true
  getAccessViewEvents: (limit: number) =>
    EVENT.find({ displayOnAccess: true })
      .select(["_id", "membershipType", "name", "image", "eventDate", "city"])
      .limit(limit || 0),
  // Get the cities in which the most events are being held
  getTopCities: () =>
    EVENT.aggregate([
      { $group: { _id: "$city", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]),
  // Get all Events
  getAllEvents: () => EVENT.find({}).lean(),
  // Get all Events with pagination,
  // Sorting and searching
  getALLEventsPaginated: (
    query: { [key: string]: any },
    pageNumber: number,
    pageLimit: number,
    sortBy: string,
    sortOn: string,
    sorting: { [key: string]: number }
  ) =>
    EVENT.paginate(query, {
      page: pageNumber,
      limit: pageLimit,
      sort:
        sortBy && sortOn && sorting[sortBy] !== undefined
          ? { [sortOn]: sorting[sortBy] }
          : {},
      collation: { locale: "en", strength: 2 },
      lean: true,
    }),
  // Search for an event
  searchEvents: (search: string) =>
    EVENT.find({
      $or: [
        { name: { $regex: new RegExp(`.*${search}.*`, "i") } },
        { description: { $regex: new RegExp(`.*${search}.*`, "i") } },
        { city: { $regex: new RegExp(`.*${search}.*`, "i") } },
        { category: { $regex: new RegExp(`.*${search}.*`, "i") } },
      ],
    }),
  // Get an event through its _id
  findOneById: (id: string) => EVENT.findById(id),
  // Find By Id and Update
  findByIdAndUpdate: (id: string, query: object) =>
    EVENT.findByIdAndUpdate(id, query),
};

export default EventRepository;
