/* eslint-disable @typescript-eslint/comma-dangle */
import { BUSINESS } from "../models/index";

const businessRepository = {
  // Get all business details with pagination,
  // sorting and searching
  getALLBusinessPaginated: (
    query: { [key: string]: any },
    pageNumber: number,
    pageLimit: number,
    sortBy: string,
    sortOn: string,
    sorting: { [key: string]: number }
  ) =>
    BUSINESS.paginate(query, {
      page: pageNumber,
      limit: pageLimit,
      sort:
        sortBy && sortOn && sorting[sortBy] !== undefined
          ? { [sortOn]: sorting[sortBy] }
          : {},
      collation: { locale: "en", strength: 2 },
      lean: true,
    }),
  // Create a new Business
  createBusiness: (body: Object) => BUSINESS.create(body),
  // find event by id and update
  findByIdAndUpdate: (id: string, query: Object) =>
    BUSINESS.findByIdAndUpdate(id, query),
};
export default businessRepository;
