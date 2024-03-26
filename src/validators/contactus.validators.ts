import Joi from "joi";

const contactUsValidationSchema = Joi.object({
  data: Joi.string().required(),
  enquiry: Joi.string().required(),
});

const feedbackValidationSchema = Joi.object({
  // userId: Joi.string().required(),
  feedback: Joi.string().required(),
});

// eslint-disable-next-line import/prefer-default-export
export { contactUsValidationSchema, feedbackValidationSchema };
