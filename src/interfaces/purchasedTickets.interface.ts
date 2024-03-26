import { Document, Types } from "mongoose";
/**
 * ----------------------------------------------------------------
 * Interface for Purchased Ticket model
 * ----------------------------------------------------------------
 */
interface IPurchasedTicketDocument extends Document {
  eventId?: Types.ObjectId | string;
  userId?: Types.ObjectId | string;
  ticketId?: Types.ObjectId | string;
}

export default IPurchasedTicketDocument;
