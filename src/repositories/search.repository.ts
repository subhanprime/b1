/* eslint-disable @typescript-eslint/comma-dangle */
import { SEARCH } from "../models/index";

const SearchRepository = {
  // Find searches already made by the users & stored in database
  findSearch: (search: string) =>
    SEARCH.findOne({ search: new RegExp(`^${search}$`, "i") }),
  // If search exists then update the search counter
  updateSearchCounter: (search: string) =>
    SEARCH.findOneAndUpdate(
      { search: new RegExp(`^${search}$`, "i") },
      { $inc: { counter: 1 } },
      { new: true }
    ),
  // If a new search is made, add to Database
  addSearch: (search: string) => SEARCH.create({ search, counter: 1 }),
  // Returns the Top 6 search results
  popularSearches: () =>
    SEARCH.find(
      {},
      {
        counter: 0,
        _id: 0,
        dateCreated: 0,
        __v: 0,
      }
    )
      .sort({ counter: -1 })
      .limit(6),
  // SEARCH.aggregate([{ $sort: { counter: -1 } }, { $limit: 6 }]),
};

export default SearchRepository;
