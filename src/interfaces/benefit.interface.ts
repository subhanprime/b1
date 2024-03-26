import { Document } from "mongoose";
/**
 * ----------------------------------------------------------------
 * Interface for Benefits Model
 * ----------------------------------------------------------------
 */
interface IBenefits extends Document {
  name?: string;
  status?: string;
  description?: string;
  category?: string;
  type?: string;
  feedImage?: string;
  pageImage?: string;
}

export default IBenefits;
