import { Document, Types } from "mongoose";
/**
 * ----------------------------------------------------------------
 * Interface for feedback model
 * ----------------------------------------------------------------
 */
interface IFeedbackDocument extends Document {
  userId?: Types.ObjectId;
  feedback?: string;
}

export default IFeedbackDocument;
