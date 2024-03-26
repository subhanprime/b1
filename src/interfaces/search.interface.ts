import { Document } from "mongoose";
/**
 * ----------------------------------------------------------------
 * Interface for search model
 * ----------------------------------------------------------------
 */
interface ISearches extends Document {
  search?: string;
  counter?: number;
  dateCreated?: Date;
}

export default ISearches;
