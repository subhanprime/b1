/* eslint-disable @typescript-eslint/comma-dangle */
import Joi from "joi";
import EventStatus from "../constants/enums/eventStatus.enum";
import EventType from "../constants/enums/eventType.enum";
import EventCategories from "../constants/enums/eventCategory.enum";
import MembershipType from "../constants/enums/membershipType.enum";
import {
  DATE_REGEX,
  SPECIAL_CHARACTERS_SPACE_REGEX,
  TIME_REGEX,
} from "../constants/regex";
import eventFilterDates from "../constants/enums/eventFilterDates.constant";
import EVENT_FIELDS from "../constants/eventFields";

const createEventValidator = Joi.object({
  event: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    pageImage: Joi.string().required(),
    feedImage: Joi.string().required(),
    // image: Joi.string()
    //   .uri()
    //   .required()
    //   .messages({ "string.uri": "Image must be a valid URI!" }),
    eventDate: Joi.string()
      .regex(DATE_REGEX)
      .required()
      .messages({ "string.pattern.base": "Date must be in format MM-DD-YYYY" }),
    eventTime: Joi.string().regex(TIME_REGEX).required().messages({
      "string.pattern.base": "Time must be in 24 hours Pattern: HH:MM",
    }),
    addressLine1: Joi.string().required(),
    addressLine2: Joi.string(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    postalCode: Joi.string().required(),
    latitudes: Joi.number().required(),
    longitudes: Joi.number().required(),
    status: Joi.string()
      .valid(...Object.values(EventStatus))
      .required(),
    category: Joi.string()
      .valid(...Object.values(EventCategories))
      .required(),
    type: Joi.string()
      .valid(...Object.values(EventType))
      .required(),
  }).required(),
  tickets: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        availableTo: Joi.array()
          .items(Joi.string().valid(...Object.values(MembershipType)))
          .required(),
        price: Joi.number().required(),
        quantityAvailable: Joi.number().required(),
      })
    )
    .required(),
});

const getEventsByDateValidationSchema = Joi.object({
  period: Joi.string()
    .valid(...Object.values(eventFilterDates))
    .required(),
  range: Joi.object({
    fromDate: Joi.string()
      .regex(DATE_REGEX)
      .required()
      .messages({ "string.pattern.base": "Date must be in format MM-DD-YYYY" }),
    toDate: Joi.string()
      .regex(DATE_REGEX)
      .required()
      .messages({ "string.pattern.base": "Date must be in format MM-DD-YYYY" }),
  }),
});

const getAllEventsValidationSchema = Joi.object({
  pageNumber: Joi.number().required(),
  pageLimit: Joi.number().required(),
  search: Joi.string(),
  searchOn: Joi.string().valid(...Object.values(EVENT_FIELDS)),
});

const filterEventsValidationSchema = Joi.object({
  category: Joi.string().valid(...Object.keys(EventCategories)),
  location: Joi.string(),
  dates: Joi.object({
    period: Joi.string()
      .valid(...Object.values(eventFilterDates))
      .required(),
    range: Joi.object({
      fromDate: Joi.string().regex(DATE_REGEX).required().messages({
        "string.pattern.base": "Date must be in format MM-DD-YYYY",
      }),
      toDate: Joi.string().regex(DATE_REGEX).required().messages({
        "string.pattern.base": "Date must be in format MM-DD-YYYY",
      }),
      endTime: Joi.string().regex(TIME_REGEX),
    }),
  }),
})
  .xor("category", "location", "dates")
  .messages({
    "object.xor":
      "Can select either Categories, Locations or Dates, not Mulitple",
  });

const searchEventsFilterValidatonSchema = Joi.object({
  search: Joi.string()
    .min(1)
    .regex(SPECIAL_CHARACTERS_SPACE_REGEX)
    .required()
    .messages({
      "string.pattern.base": "Please do not search for special characters",
      "string.empty": "Please type something",
    }),
});

const getIndividualEventValidationSchema = Joi.object({
  id: Joi.string().required(),
});

const updateEventImagesValidation = Joi.object({
  eventId: Joi.string().required(),
  pageImage: Joi.string()
    .uri()
    .required()
    .messages({ "string.uri": "Image must be a valid URI!" }),
  image: Joi.string()
    .uri()
    .required()
    .messages({ "string.uri": "Image must be a valid URI!" }),
  feedImage: Joi.string()
    .uri()
    .required()
    .messages({ "string.uri": "Image must be a valid URI!" }),
});

const bookmarkEventValidationSchema = Joi.object({
  eventId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .min(24),
  // userId: Joi.string().required(),
});

export {
  createEventValidator,
  getEventsByDateValidationSchema,
  getAllEventsValidationSchema,
  filterEventsValidationSchema,
  searchEventsFilterValidatonSchema,
  getIndividualEventValidationSchema,
  updateEventImagesValidation,
  bookmarkEventValidationSchema,
};
