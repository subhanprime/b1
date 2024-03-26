import Joi from "joi";
import { BUSINESS_FIELDS } from "../constants/businsessFields";

const getAllBusinessValidationSchema = Joi.object({
  pageNumber: Joi.number().required(),
  pageLimit: Joi.number().required(),
  search: Joi.string(),
  searchOn: Joi.string().valid(...Object.values(BUSINESS_FIELDS)),
});

const createBusinessValidator = Joi.object({
  business: Joi.object({
    // logo: Joi.string()
    //   .uri()
    //   .required()
    //   .messages({ "string.uri": "Image must be a valid URI!" }),
    businessName: Joi.string().required(),
    businessWebsite: Joi.string().required(),
    primaryEmailAddress: Joi.string().required(),
    businessCategory: Joi.string().required(),
    description: Joi.string().required(),
    instagramHandler: Joi.string().required(),
    linkedInURL: Joi.string().required(),
    addressLine1: Joi.string().required(),
    addressLine2: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    postalCode: Joi.string().required(),
  }),
  accountManager: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    jobTitle: Joi.string().required(),
  }),
});

const updateBusinessValidator = Joi.object({
  business: Joi.object({
    logo: Joi.string()
      .uri()
      .messages({ "string.uri": "Image must be a valid URI!" }),
    businessName: Joi.string(),
    businessWebsite: Joi.string(),
    primaryEmailAddress: Joi.string(),
    businessCategory: Joi.string(),
    description: Joi.string(),
    instagramHandler: Joi.string(),
    linkedInURL: Joi.string()
      .uri()
      .messages({ "string.uri": "Image must be a valid URI!" }),
    addressLine1: Joi.string(),
    addressLine2: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
    postalCode: Joi.string(),
  }),
  accountManager: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string(),
    phoneNumber: Joi.string(),
    jobTitle: Joi.string(),
  }),
});

const updateBusinessImagesValidationSchema = Joi.object({
  businessId: Joi.string().required(),
  logo: Joi.string().required(),
});
export {
  getAllBusinessValidationSchema,
  createBusinessValidator,
  updateBusinessValidator,
  updateBusinessImagesValidationSchema,
};
