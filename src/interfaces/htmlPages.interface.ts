import { Document } from "mongoose";
/**
 * ----------------------------------------------------------------
 * Interface for the Html pages model
 * ----------------------------------------------------------------
 */
interface IHtmlPagesDocument extends Document {
  privacyPolicy: string;
  termsCondition: string;
  userTerms: string;
  privacyNotice: string;
  cookieNotice: string;
  blackMembershipPage: string;
  standardMembershipPage: string;
  pausedMembershipPage: string;
  platinumMembershipPage: string;
}

export default IHtmlPagesDocument;
