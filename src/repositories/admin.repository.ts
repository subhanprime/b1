/* eslint-disable @typescript-eslint/comma-dangle */
import { ADMIN } from "../models/index";

const AdminRepository = {
  // Create a new admin
  createAdmin: (body: Object) => ADMIN.create(body),
  // Find an admin through a custom query
  findOneByQuery: (query: { [key: string]: any }) => ADMIN.findOne(query),
  // Update jwt tokens for an admin
  storeTokens: (
    id: string,
    { accessToken, refreshToken }: { accessToken: string; refreshToken: string }
  ) =>
    ADMIN.findByIdAndUpdate(id, {
      accessToken: accessToken,
      refreshToken: refreshToken,
    }),
};

export default AdminRepository;
