import { Document } from "mongoose";
/**
 * ----------------------------------------------------------------
 * Interface for Bookmark Model
 * ----------------------------------------------------------------
 */
interface IBookmarks extends Document {
  userId?: string;
  eventId?: string;
}

export default IBookmarks;
