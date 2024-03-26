import mongoose from "mongoose";
import IHtmlPagesDocument from "../interfaces/htmlPages.interface";

const htmlPagesSchema = new mongoose.Schema<IHtmlPagesDocument>({
  privacyPolicy: {
    type: String,
    required: false,
  },
  termsCondition: {
    type: String,
    required: false,
  },
  userTerms: {
    type: String,
    required: false,
  },
  privacyNotice: {
    type: String,
    required: false,
  },
  cookieNotice: {
    type: String,
    required: false,
  },
  blackMembershipPage: {
    type: String,
    required: false,
  },
  standardMembershipPage: {
    type: String,
    required: false,
  },
  pausedMembershipPage: {
    type: String,
    required: false,
  },
  platinumMembershipPage: {
    type: String,
    required: false,
  },
});

const model = mongoose.model("htmlPages", htmlPagesSchema);
export default model;
