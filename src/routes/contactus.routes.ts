/* eslint-disable @typescript-eslint/comma-dangle */
import { Router } from "express";
import routeHandler from "../utils/routeHandler";
import {
  addEnquiry,
  addFeedback,
  addSubscription,
} from "../controllers/contactUs.controller";
import { CONTACT_US, FEEDBACKS, SUBSCRIPTIONS } from "../constants/routes";
import { validateData } from "../middleware/Validation/validations.middleware";
import {
  contactUsValidationSchema,
  feedbackValidationSchema,
} from "../validators/contactus.validators";
import { verifyToken } from "../middleware/auth/auth.middleware";

const router: Router = Router();

// /api/events/contactus
router.post(
  CONTACT_US,
  validateData(contactUsValidationSchema),
  routeHandler(addEnquiry)
);

// /api/access/events/subscriptions
router.post(SUBSCRIPTIONS, addSubscription);

// /api/access/events/feedback
router.post(
  FEEDBACKS,
  verifyToken,
  validateData(feedbackValidationSchema),
  addFeedback
);

export default router;
