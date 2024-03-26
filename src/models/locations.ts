import mongoose from "mongoose";
import ILocation from "../interfaces/locations.interface";

const locationSchema = new mongoose.Schema<ILocation>({
  city: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
});

// eventSchema.plugin(paginate);

// const Event = mongoose.model<
//   IUserDocument,
//   mongoose.PaginateModel<IUserDocument>
// >("event", eventSchema);
const model = mongoose.model("locations", locationSchema);
export default model;
