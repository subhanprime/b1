import { Types } from "mongoose";
import { BUSINESS_ACCOUNT_MANEGER } from "../models/index";

const accountManagerRepository = {
  // Create a new account manager
  createAccountManager: (body: Object) => BUSINESS_ACCOUNT_MANEGER.create(body),

  // Find account manager with thier business details
  findAccountManager: (businessId: string) =>
    BUSINESS_ACCOUNT_MANEGER.findOne({ businessId }).lean(),

  // find by id and update
  findByIdAndUpdate: (id: Types.ObjectId, body: Object) =>
    BUSINESS_ACCOUNT_MANEGER.findByIdAndUpdate(id, body),
};
export default accountManagerRepository;
