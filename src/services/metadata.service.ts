/* eslint-disable @typescript-eslint/comma-dangle */
import CATEGORY_IMAGE_URLS from "../constants/categories.images";
import EventCategories from "../constants/enums/eventCategory.enum";
import eventFilterDates from "../constants/enums/eventFilterDates.constant";
import EventStatus from "../constants/enums/eventStatus.enum";
import EventType from "../constants/enums/eventType.enum";
import MembershipType from "../constants/enums/membershipType.enum";
import EventRepository from "../repositories/event.repository";
import HtmlPageRepository from "../repositories/htmlPages.repository";
import LocationRepository from "../repositories/location.repository";
import SearchRepository from "../repositories/search.repository";

/**
 * ----------------------------------------------------------------
 * Get Event status enums
 * ----------------------------------------------------------------
 */
const getEventStatusService = (): string[] =>
  Object.values(EventStatus)
    .filter((value) => typeof value === "string")
    .map(String);

/**
 * ----------------------------------------------------------------
 * Get Event Types
 * ----------------------------------------------------------------
 */
const getEventTypeService = (): string[] =>
  Object.values(EventType)
    .filter((value) => typeof value === "string")
    .map(String);

/**
 * ----------------------------------------------------------------
 * Get membership Types
 * ----------------------------------------------------------------
 */
const getMembershipTypeService = (): string[] =>
  Object.values(MembershipType)
    .filter((value) => typeof value === "string")
    .map(String);

/**
 * ----------------------------------------------------------------
 * Get Event Time Periods for Filtering
 * ----------------------------------------------------------------
 */
const getEventFilterDatesService = (): string[] => {
  const filteredDates = eventFilterDates.slice(0, -1);
  return filteredDates;
};

/**
 * ----------------------------------------------------------------
 * Get Categories
 * ----------------------------------------------------------------
 */
const getCategoriesService = (): {
  id: number;
  name: string;
  image: string;
}[] => {
  const categoryNames = Object.values(EventCategories)
    .filter((value) => typeof value === "string")
    .map(String);

  const categories = categoryNames.map((name, index) => ({
    id: index,
    name,
    image: CATEGORY_IMAGE_URLS[index],
  }));

  return categories;
};

/**
 * ----------------------------------------------------------------
 * Get Locations of Events stored in database
 * ----------------------------------------------------------------
 */
const getLocationsService = async (): Promise<Object> => {
  const cityCounts: string[] = await EventRepository.getTopCities();
  console.log("cityCounts: ", cityCounts);

  const locations = await LocationRepository.getLocation(cityCounts);

  return locations;
};

/**
 * ----------------------------------------------------------------
 * Add a location to the database
 * ----------------------------------------------------------------
 */
const addLocationService = async (location: {
  city: string;
  image: string;
}): Promise<{ message: string }> => {
  await LocationRepository.addLocation(location);

  return { message: "Location Added Successfully!" };
};

/**
 * ----------------------------------------------------------------
 * Get the Privacy Policy page stored in database
 * ----------------------------------------------------------------
 */
const getPrivaryPolicyService = async (): Promise<string> => {
  const result = await HtmlPageRepository.getHtmlPages();
  return result?.privacyPolicy!;
};

/**
 * ----------------------------------------------------------------
 * Get the Terms and Condiition page stored in database
 * ----------------------------------------------------------------
 */
const getTermsService = async (): Promise<string> => {
  const result = await HtmlPageRepository.getHtmlPages();
  return result?.termsCondition!;
};

/**
 * ----------------------------------------------------------------
 * Get the User Terms page stored in database
 * ----------------------------------------------------------------
 */
const getUserTermsService = async (): Promise<string> => {
  const result = await HtmlPageRepository.getHtmlPages();
  return result?.userTerms!;
};

/**
 * ----------------------------------------------------------------
 * Get the Privacy Notice page stored in database
 * ----------------------------------------------------------------
 */
const getPrivacyNoticeService = async (): Promise<string> => {
  const result = await HtmlPageRepository.getHtmlPages();
  return result?.privacyNotice!;
};

/**
 * ----------------------------------------------------------------
 * Get the Cookie Notice page stored in database
 * ----------------------------------------------------------------
 */
const getCookieService = async (): Promise<string> => {
  const result = await HtmlPageRepository.getHtmlPages();
  return result?.cookieNotice!;
};

/**
 * ----------------------------------------------------------------
 * Get the Membership page stored in database
 * ----------------------------------------------------------------
 */
const getMembershipPageService = async (
  membershipTypeField: string
): Promise<Object> => {
  const result = await HtmlPageRepository.findHtmlPage(membershipTypeField);
  return result!;
};

/**
 * ----------------------------------------------------------------
 * Get the Popular searches for Events stored in the database
 * ----------------------------------------------------------------
 */
const getPopularSearchesService = async (): Promise<Object> => {
  const result = await SearchRepository.popularSearches();
  return result;
};
export {
  getEventStatusService,
  getEventTypeService,
  getMembershipTypeService,
  getCategoriesService,
  getEventFilterDatesService,
  getLocationsService,
  addLocationService,
  getTermsService,
  getPrivaryPolicyService,
  getUserTermsService,
  getPrivacyNoticeService,
  getCookieService,
  getPopularSearchesService,
  getMembershipPageService,
};
