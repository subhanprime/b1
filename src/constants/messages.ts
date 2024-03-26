const MESSAGES = {
  USER_NAME_TAKEN: { error: "User name taken!", code: 10000 },
  UNPROCESSABLE: { error: "No data to process", code: 10001 },
  USER_NOT_FOUND: { error: "User not found", code: 10002 },
  ACCOUNT_UNREGISTERED: {
    error:
      "No account found with this email/phone number. Please apply for membership.",
    code: 10023,
  },
  INCORRECT_PASSWORD: { error: "Incorrect password", code: 10003 },
  USER_DELETED: { error: "User deleted successfully", code: 10004 },
  PASSWORD_UPDATED: {
    error: "User password updated successfully",
    code: 10005,
  },
  NO_ACCESS: { error: "No access token", code: 10006 },
  ACCESS_TOKEN_GENERATED: {
    error: "Access token generated",
    code: 10007,
  },
  SECRET_GENERATED: {
    error: "Secret generated successfully",
    code: 10008,
  },
  INVALID_TOKEN: {
    error: "Session expired! Please sign-in again",
    code: 10009,
  },
  PASSWORD_RESET: { error: "Password reset successfull", code: 10010 },
  INTERNAL_SERVER_ERROR: { error: "Something went wrong", code: 10011 },
  MEMBERSHIP_CREATED: {
    error: "Membership created successfully",
    code: 10012,
  },
  CONTACT_US: { error: "Contact stored successfully", code: 10013 },
  SUBSCRIPTION_CREATED: {
    error: "Subscription created successfully",
    code: 10014,
  },
  USER_ALREADY_EXIST: {
    error: "A user with this email/phone number already exists",
    code: 10015,
  },
  INVALID_BODY: { error: "Invalid body parameters", code: 10016 },
  INVALID_EMAIL: { error: "Invalid email provided", code: 10017 },
  INVALID_OTP: { error: "Invalid otp provided", code: 10018 },
  INVALID_APPLICATION_STEP: {
    error: "User has not yet reached this step",
    code: 10019,
  },
  INVALID_PHONE_NO: { error: "Invalid phone number provided", code: 10020 },
  NO_FILES_UPLOADED: { error: "No files were uploaded", code: 10021 },
  NO_EVENT_EXISTS: { error: "No event with that id exists", code: 10022 },
};

export default MESSAGES;
