import mongoose, { Schema } from "mongoose";
import IFeedbackDocument from "../interfaces/feedback.interface";

const feedbackSchema = new mongoose.Schema<IFeedbackDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  feedback: {
    type: String,
    required: true,
  },
});

// eventSchema.plugin(paginate);

// const Event = mongoose.model<
//   IUserDocument,
//   mongoose.PaginateModel<IUserDocument>
// >("event", eventSchema);
const model = mongoose.model("feedbacks", feedbackSchema);
export default model;
