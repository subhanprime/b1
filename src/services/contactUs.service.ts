/* eslint-disable @typescript-eslint/comma-dangle */
import AppError from "../Errors";
import HTTPSTATUS from "../constants/httpstatus";
import MESSAGES from "../constants/messages";
import ContactUsRepository from "../repositories/contactUs.repository";
import FeedbackRepository from "../repositories/feedback.repository";
import SubscriptionRepository from "../repositories/subscription.repository";
import UserRepository from "../repositories/user.repository";

/* eslint-disable import/prefer-default-export */
/**
 * ----------------------------------------------------------------
 * Adding a new enquiry to Database
 * ----------------------------------------------------------------
 */
const addEnquiryService = async (
  contact: string,
  enquiry: string
): Promise<string> => {
  const user = await UserRepository.findOneByQuery({ email: contact });

  if (user && user.firstName && user.lastName) {
    await ContactUsRepository.addEnquiry({
      contact,
      enquiry,
      fullName: `${user.firstName} ${user.lastName}`,
    });
  } else {
    throw new AppError(
      MESSAGES.USER_NOT_FOUND.error,
      MESSAGES.USER_NOT_FOUND.code,
      HTTPSTATUS.BADREQUEST
    );
  }

  return "Your Enquiry has been recieved successfully";
};

/**
 * ----------------------------------------------------------------
 * Adding a new subscription into the database
 * ----------------------------------------------------------------
 */
const addSubscriptionService = async (
  email: string
): Promise<{ message: string }> => {
  await SubscriptionRepository.addSubscription({ email });

  return { message: "Subsciption added successfully!" };
};

/**
 * ----------------------------------------------------------------
 * Adding a new feedback into the database
 * ----------------------------------------------------------------
 */
const addFeedbackService = async (
  userId: string,
  feedback: string
): Promise<{ message: string }> => {
  await FeedbackRepository.addFeedback({ userId, feedback });

  return { message: "Feedback recorded successfully!" };
};

export { addEnquiryService, addSubscriptionService, addFeedbackService };
