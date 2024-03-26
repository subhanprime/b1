import { Document } from "mongoose";
/**
 * ----------------------------------------------------------------
 * Interface for contact us model
 * ----------------------------------------------------------------
 */
interface IContactUsDocument extends Document {
  contact?: string;
  enquiry?: string;
  fullName?: string;
  dateCreated?: Date;
}

export default IContactUsDocument;
