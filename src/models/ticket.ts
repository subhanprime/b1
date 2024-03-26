import mongoose, { Schema } from "mongoose";
import ITicketDocument from "../interfaces/ticket.schema";

const ticketSchema = new mongoose.Schema<ITicketDocument>({
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  availableTo: {
    type: [String],
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  quantityAvailable: {
    type: Number,
    required: false,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "events",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: false,
  },
  quantityRedeemed: {
    type: Number,
    required: false,
  },
});

// eventSchema.plugin(paginate);

// const Event = mongoose.model<
//   IUserDocument,
//   mongoose.PaginateModel<IUserDocument>
// >("event", eventSchema);
const model = mongoose.model("tickets", ticketSchema);
export default model;
