import { Types } from "mongoose";
import { PURCHASED_TICKETS } from "../models/index";

const PurchasedTicketsRepository = {
  // Get the people attending an Event
  getAttendees: (eventId: string) =>
    PURCHASED_TICKETS.aggregate([
      {
        $match: { eventId: new Types.ObjectId(eventId) },
      },
      {
        $group: {
          _id: "$eventId",
          users: { $push: "$userId" },
        },
      },
    ]),
  // Add the userId and ticketId in database
  purchaseTicket: (body: Object) => PURCHASED_TICKETS.create(body),
};

export default PurchasedTicketsRepository;
