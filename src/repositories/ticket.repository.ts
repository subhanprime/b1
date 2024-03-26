import { TICKET } from "../models/index";

const TicketRepository = {
  // add array of tickets to database
  insetMany: (body: Object) => TICKET.insertMany(body),
  // Sort tickets by eventId, then determine
  // the ticket price ranges by returning the
  // minimum and maximum prices for each event
  getTicketPriceRanges: () =>
    TICKET.aggregate([
      {
        $group: {
          _id: "$eventId",
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $project: {
          eventId: "$_id",
          priceRange: {
            $cond: {
              if: { $eq: ["$minPrice", "$maxPrice"] },
              then: { $toString: "$minPrice" },
              else: {
                $concat: [
                  { $toString: "$minPrice" },
                  " - ",
                  { $toString: "$maxPrice" },
                ],
              },
            },
          },
        },
      },
    ]),
  // Return the available tickets and the purchased tickets counts
  getTicketQuantities: () =>
    TICKET.aggregate([
      {
        $group: {
          _id: "$eventId",
          totalQuantityAvailable: { $sum: "$quantityAvailable" },
          totalQuantityRedeemed: { $sum: "$quantityRedeemed" },
        },
      },
    ]),
};

export default TicketRepository;
