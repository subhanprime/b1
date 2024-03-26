import mongoose from "mongoose";
import IContactUsDocument from "../interfaces/contactUs.interface";

const contactUsSchema = new mongoose.Schema<IContactUsDocument>({
  fullName: {
    type: String,
    required: false,
  },
  contact: {
    type: String,
    required: true,
  },
  enquiry: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

// eventSchema.plugin(paginate);

// const Event = mongoose.model<
//   IUserDocument,
//   mongoose.PaginateModel<IUserDocument>
// >("event", eventSchema);
const model = mongoose.model("contactus", contactUsSchema);
export default model;
