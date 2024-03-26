/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable no-await-in-loop */
import logger from "../utils/winstonLogging";
import businessRepository from "../repositories/business.repository";
import accountManagerRepository from "../repositories/accountManager.repository";
import IBusinessAccountManage from "../interfaces/businessAccountManager.interface";
import AppError from "../Errors";
import MESSAGES from "../constants/messages";
import HTTPSTATUS from "../constants/httpstatus";

const getAllBusinessService = async (
  pageNumber: number,
  pageLimit: number,
  search: string,
  searchOn: string,
  sortBy: string,
  sortOn: string
): Promise<Object> => {
  // Creating Query for Searching Results on Fields
  const regex = new RegExp(search, "i");
  const query =
    searchOn && searchOn.trim() !== "" ? { [searchOn]: { $regex: regex } } : {};

  console.log("Query : ", query);
  logger.info("Query for business found route", query);
  // Defining Sorts for query
  const sorting = { asc: 1, desc: -1 };

  // Getting Paginated Business with lean true
  const businesses = await businessRepository.getALLBusinessPaginated(
    query,
    pageNumber,
    pageLimit,
    sortBy,
    sortOn,
    sorting
  );

  if (!businesses || !businesses.docs) {
    return [];
  }
  for (const obj of businesses.docs) {
    const id = obj._id.toString();
    // eslint-disable-next-line no-await-in-loop
    const accountManagerObject =
      await accountManagerRepository.findAccountManager(id);
    // result=accountManagerObject
    if (accountManagerObject) {
      obj.accountManager = accountManagerObject;
    }
  }
  return { businesses };
};

const createBusinessService = async (
  businessObject: Object,
  accountManager: IBusinessAccountManage
): Promise<{ message: string; businessId: Object }> => {
  const business = await businessRepository.createBusiness(businessObject);
  accountManager.businessId = business._id;
  await accountManagerRepository.createAccountManager(accountManager);
  return {
    message: "Created New Business Successfully",
    businessId: business._id,
  };
};

/**
 * ----------------------------------------------------------------
 * Update Business
 * ----------------------------------------------------------------
 */
const updateBusinessService = async (
  id: string,
  business: Object,
  accountManager: IBusinessAccountManage
): Promise<{ message: string }> => {
  await businessRepository.findByIdAndUpdate(id, business);

  const manager = await accountManagerRepository.findAccountManager(id);

  if (manager) {
    await accountManagerRepository.findByIdAndUpdate(
      manager?._id,
      accountManager
    );
  } else {
    throw new AppError(
      MESSAGES.USER_NOT_FOUND.error,
      MESSAGES.USER_NOT_FOUND.code,
      HTTPSTATUS.BADREQUEST
    );
  }

  return { message: "Sucessfully updated business" };
};

/**
 * ----------------------------------------------------------------
 * Update Business Images
 * ----------------------------------------------------------------
 */
const updateBusinessImagesService = async (
  businessId: string,
  logo: string
): Promise<{ message: string }> => {
  await businessRepository.findByIdAndUpdate(businessId, { logo });

  return { message: "Image Updated succesfully" };
};
export {
  getAllBusinessService,
  createBusinessService,
  updateBusinessService,
  updateBusinessImagesService,
};
