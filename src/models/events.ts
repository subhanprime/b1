import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import IEventDocument from "../interfaces/event.schema.interface";

const eventSchema = new mongoose.Schema<IEventDocument>({
  name: {
    type: String,
    required: false,
    text: true,
    index: true,
  },
  description: {
    type: String,
    required: false,
    text: true,
    index: true,
  },
  eventDate: {
    type: Date,
    required: false,
  },
  eventTime: {
    type: String,
    required: false,
  },
  startTime: {
    type: Date,
    required: false,
  },
  endTime: {
    type: Date,
    required: false,
  },
  addressLine1: {
    type: String,
    required: false,
    text: true,
  },
  addressLine2: {
    type: String,
    required: false,
    text: true,
  },
  city: {
    type: String,
    required: false,
    text: true,
  },
  country: {
    type: String,
    required: false,
    text: true,
  },
  postalCode: {
    type: String,
    required: false,
  },
  latitudes: {
    type: Number,
    required: false,
  },
  longitudes: {
    type: Number,
    required: false,
  },
  pageImage: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  feedImage: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
    text: true,
  },
  category: {
    type: String,
    required: false,
    text: true,
  },
  type: {
    type: String,
    required: false,
  },
  availableTo: {
    type: [String],
    required: false,
  },
  topEvent: {
    type: Boolean,
    required: false,
  },
  displayOnAccess: {
    type: Boolean,
    required: false,
  },
  membershipType: {
    type: String,
    required: false,
    default: "Pendulum Black Exclusive",
  },
});

eventSchema.index({ name: "text", description: "text" });
eventSchema.plugin(paginate);

const Event = mongoose.model<
  IEventDocument,
  mongoose.PaginateModel<IEventDocument>
>("event", eventSchema);
export default Event;
