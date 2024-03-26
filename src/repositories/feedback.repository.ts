import { FEEDBACK } from "../models/index";

const FeedbackRepository = {
  // Add a new enquiry to database
  addFeedback: (body: Object) => FEEDBACK.create(body),
};

export default FeedbackRepository;
