import mongoose, { Schema } from "mongoose";
import IPurchasedTicketDocument from "../interfaces/purchasedTickets.interface";

const purchasedTicketSchema = new mongoose.Schema<IPurchasedTicketDocument>({
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
  ticketId: {
    type: Schema.Types.ObjectId,
    ref: "tickets",
    required: false,
  },
});

// eventSchema.plugin(paginate);

// const Event = mongoose.model<
//   IUserDocument,
//   mongoose.PaginateModel<IUserDocument>
// >("event", eventSchema);
const model = mongoose.model("purchasedTickets", purchasedTicketSchema);
export default model;
