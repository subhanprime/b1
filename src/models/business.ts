/* eslint-disable @typescript-eslint/comma-dangle */
import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import IBusiness from "../interfaces/business.interface";

const businessSchema = new mongoose.Schema<IBusiness>({
  logo: {
    type: String,
    required: false,
  },
  businessName: {
    type: String,
    required: true,
  },
  businessWebsite: {
    type: String,
    required: true,
  },
  primaryEmailAddress: {
    type: String,
    required: true,
  },
  businessCategory: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instagramHandler: {
    type: String,
    required: true,
  },
  linkedInURL: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
});

businessSchema.plugin(paginate);

const BUSINESS = mongoose.model<IBusiness, mongoose.PaginateModel<IBusiness>>(
  "businesses",
  businessSchema
);
// const model = mongoose.model("businesses", businessSchema);

export default BUSINESS;
