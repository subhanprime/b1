import { Document } from "mongoose";
/**
 * ----------------------------------------------------------------
 * Interface for Location model
 * ----------------------------------------------------------------
 */
interface ILocation extends Document {
  city?: string;
  image?: string;
}

export default ILocation;
