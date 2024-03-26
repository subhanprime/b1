import mongoose, { Schema } from "mongoose";
import IBusinessAccountManage from "../interfaces/businessAccountManager.interface";

const businessSchema = new mongoose.Schema<IBusinessAccountManage>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  businessId: {
    type: Schema.Types.ObjectId,
    ref: "businesses",
    required: true,
  },
});

// eventSchema.plugin(paginate);

// const Event = mongoose.model<
//   IUserDocument,
//   mongoose.PaginateModel<IUserDocument>
// >("event", eventSchema);
const model = mongoose.model("accountmanagers", businessSchema);

export default model;
