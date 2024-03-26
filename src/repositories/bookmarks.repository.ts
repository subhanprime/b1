/* eslint-disable @typescript-eslint/comma-dangle */
import { BOOKMARKS } from "../models/index";

const BookmarksRepository = {
  // Adding bookmark to database
  bookmarkEvent: (body: Object) => BOOKMARKS.create(body),

  // Adding bookmark to database
  unBookmarkEvent: (body: Object) => BOOKMARKS.deleteOne(body),

  //   Find an event bookmarked by a user
  findByQuery: (query: Object) => BOOKMARKS.findOne(query),
};

export default BookmarksRepository;
