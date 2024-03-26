import { Document } from "mongoose";
/**
 * ----------------------------------------------------------------
 * Interface for search model
 * ----------------------------------------------------------------
 */
interface ISubscriptions extends Document {
  email: string;
  dateCreated?: Date;
}

export default ISubscriptions;
