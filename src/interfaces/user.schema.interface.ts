import { Document } from "mongoose";
import MembershipStatus from "../utils/membershipStatus.enum";
import ApplicationStatus from "../utils/applicationStatus.enum";
import MembershipType from "../constants/enums/membershipType.enum";
import IPaymentMethod from "./paymentMethod.interface";

interface IUserDocument extends Document {
  username: string;
  // password: string;
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  dob?: string;
  primaryCity?: string;
  industry?: string;
  job?: string;
  salary?: string;
  phoneNo?: string;
  accessToken?: string;
  refreshToken?: string;
  applicationStep?: ApplicationStatus;
  expoToken?: string[];
  membershipStatus?: MembershipStatus;
  membershipType?: MembershipType;
  instagram?: string;
  instagramId: string;
  linkedin?: string;
  linkedinImage?: string;
  flag?: boolean;
  dateCreated?: Date;
  approvedDate?: Date;
  image?: string;
  eventsNotif?: boolean;
  recomendationsNotif?: boolean;
  accessNotif?: boolean;
  paymentMethod?: IPaymentMethod;
  channel?: string;
  about?: string;
}

export default IUserDocument;
