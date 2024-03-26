import Joi from "joi";

const uploadImageValidationSchema = Joi.object({
  id: Joi.string().required(),
  type: Joi.string()
    .valid("Events", "Users", "Locations", "Businesses")
    .required(),
});

// eslint-disable-next-line import/prefer-default-export
export { uploadImageValidationSchema };
