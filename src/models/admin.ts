import mongoose from "mongoose";
import IAdmin from "../interfaces/admin.interface";

const adminSchema = new mongoose.Schema<IAdmin>({
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  accessToken: {
    type: String,
    required: false,
  },
  refreshToken: {
    type: String,
    required: false,
  },
});

// eventSchema.plugin(paginate);

// const Event = mongoose.model<
//   IUserDocument,
//   mongoose.PaginateModel<IUserDocument>
// >("event", eventSchema);
const model = mongoose.model("admins", adminSchema);
export default model;
