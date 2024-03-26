/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/comma-dangle */
import ICreateUser from "../interfaces/createUser.interface";
import { USER } from "../models/index";

const UserRepository = {
  // Create User
  createUser: (body: Object) => USER.create(body),
  //   Find One User
  findOneByEmail: (email: string) => USER.findOne({ email }),

  // Find user by custom query
  findOneByQuery: (query: { [key: string]: any }) => USER.findOne(query),

  // Store Tokens
  storeTokens: (
    id: string,
    { accessToken, refreshToken }: { accessToken: string; refreshToken: string }
  ) =>
    USER.findByIdAndUpdate(id, {
      accessToken: accessToken,
      refreshToken: refreshToken,
    }),
  // Find By Query and update
  findOneAndUpdate: (id: string, body: Object) =>
    USER.findByIdAndUpdate(id, body),

  // Paginate Get Users
  getUsersPaginate: (
    query: { [key: string]: any },
    pageNumber: number,
    pageLimit: number,
    sortBy: string,
    sortOn: string,
    sorting: { [key: string]: number }
  ) =>
    USER.paginate(query, {
      page: pageNumber,
      limit: pageLimit,
      sort: { [sortOn]: sorting[sortBy] },
      collation: { locale: "en", strength: 2 },
    }),

  // Insert many Users
  // This is only for testing, will be removed in the future
  createManyUsers: (usersData: ICreateUser[]) => USER.insertMany(usersData),

  // Find User by userId Array
  findUserInArray: (userIds: string[]) =>
    USER.find({ _id: { $in: userIds } }).select([
      "firstName",
      "lastName",
      "image",
    ]),
};

export default UserRepository;
