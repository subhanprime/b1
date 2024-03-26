import { Document } from "mongoose";
/**
 * ----------------------------------------------------------------
 * Interface for Admin Model
 * ----------------------------------------------------------------
 */
interface IAdmin extends Document {
  password: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export default IAdmin;
