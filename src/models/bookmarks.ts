import mongoose, { Schema } from "mongoose";
import IBookmarks from "../interfaces/bookmarks.interface";

const bookmarksSchema = new mongoose.Schema<IBookmarks>({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "events",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: false,
  },
});

// eventSchema.plugin(paginate);

// const Event = mongoose.model<
//   IUserDocument,
//   mongoose.PaginateModel<IUserDocument>
// >("event", eventSchema);
const model = mongoose.model("bookmarks", bookmarksSchema);
export default model;
