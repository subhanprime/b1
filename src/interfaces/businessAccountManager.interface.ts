import { Types } from "mongoose";
/**
 * ----------------------------------------------------------------
 * Interface for Business Account Manager Model
 * ----------------------------------------------------------------
 */
interface IBusinessAccountManage {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  jobTitle?: string[];
  businessId?: Types.ObjectId | string;
}

export default IBusinessAccountManage;
