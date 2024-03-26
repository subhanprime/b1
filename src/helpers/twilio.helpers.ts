/* eslint-disable import/no-named-as-default */
import Twilio from "twilio";
import config from "../config/config";

const accountSid = config.twilioAccountSID;
const authToken = config.twilioAuthToken;
const client = Twilio(accountSid, authToken);

export default client;
