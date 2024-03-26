import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import IUserDocument from "../interfaces/user.schema.interface";
import MembershipStatus from "../utils/membershipStatus.enum";
import ApplicationStatus from "../utils/applicationStatus.enum";
import MembershipType from "../constants/enums/membershipType.enum";

const userSchema = new mongoose.Schema<IUserDocument>({
  // username: {
  //   type: String,
  //   required: false,
  // },
  // password: {
  //   type: String,
  //   required: true,
  // },
  email: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  dob: {
    type: String,
    required: false,
  },
  primaryCity: {
    type: String,
    required: false,
  },
  industry: {
    type: String,
    required: false,
  },
  job: {
    type: String,
    required: false,
  },
  salary: {
    type: String,
    required: false,
  },
  phoneNo: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
  },
  // accessToken: {
  //   type: String,
  //   required: false,
  // },
  // refreshToken: {
  //   type: String,
  //   required: false,
  // },
  applicationStep: {
    type: String,
    enum: ApplicationStatus,
    default: "Verification",
  },
  expoToken: {
    type: [String],
    required: false,
  },
  membershipStatus: {
    type: String,
    enum: MembershipStatus,
    default: "Pending",
  },
  membershipType: {
    type: String,
    enum: MembershipType,
    default: "Standard",
  },
  instagram: {
    type: String,
    required: false,
  },
  instagramId: {
    type: String,
    required: false,
  },
  linkedin: {
    type: String,
    required: false,
  },
  linkedinImage: {
    type: String,
    required: false,
  },
  flag: {
    type: Boolean,
    required: false,
  },
  dateCreated: {
    type: Date,
    required: false,
    default: Date.now,
  },
  approvedDate: {
    type: Date,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  eventsNotif: {
    type: Boolean,
    required: false,
    default: false,
  },
  recomendationsNotif: {
    type: Boolean,
    required: false,
    default: false,
  },
  accessNotif: {
    type: Boolean,
    required: false,
    default: false,
  },
  paymentMethod: {
    type: {
      pid: { type: String, nullable: true },
      paymentType: { type: String, required: true, default: "applePay" },
    },
    required: false,
  },
  channel: {
    type: String,
    default: "Mobile",
  },
  about: {
    type: String,
    required: false,
  },
});

userSchema.plugin(paginate);

const User = mongoose.model<
  IUserDocument,
  mongoose.PaginateModel<IUserDocument>
>("user", userSchema);

export default User;
