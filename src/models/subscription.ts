import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import ISubscriptions from "../interfaces/subscription.interface";

const subscriptionSchema = new mongoose.Schema<ISubscriptions>({
  email: {
    type: "string",
    require: false,
    // unique: false,
  },
  dateCreated: {
    type: "Date",
    require: false,
    default: Date.now,
  },
});

subscriptionSchema.plugin(paginate);

const Subscription = mongoose.model<
  ISubscriptions,
  mongoose.PaginateModel<ISubscriptions>
>("subscriptions", subscriptionSchema);

export default Subscription;
