import { Document, Types } from "mongoose";
/**
 * ----------------------------------------------------------------
 * Interface for Ticket Model
 * ----------------------------------------------------------------
 */
interface ITicketDocument extends Document {
  name?: string;
  description?: string;
  availableTo?: string[];
  price?: number;
  quantityAvailable?: number;
  quantityRedeemed?: number;
  eventId?: Types.ObjectId | string;
  userId?: Types.ObjectId | string;
}

export default ITicketDocument;
