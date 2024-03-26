import mongoose from "mongoose";
import ISearches from "../interfaces/search.interface";

const searchSchema = new mongoose.Schema<ISearches>({
  search: {
    type: String,
    required: false,
  },
  counter: {
    type: Number,
    required: false,
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// eventSchema.plugin(paginate);

// const Event = mongoose.model<
//   IUserDocument,
//   mongoose.PaginateModel<IUserDocument>
// >("event", eventSchema);
const model = mongoose.model("search", searchSchema);
export default model;
