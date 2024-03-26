/* eslint-disable import/no-named-as-default */
import dotenv from "dotenv";
import IConfig from "../interfaces/config.interface";

dotenv.config();

const config: IConfig = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  endpoint: process.env.DB_URL,
  dockerDBendpoint: process.env.DOCKER_DB_URL,
  clinturl: process.env.CLINT_URL,
  ip: process.env.IP,
  emailService: process.env.EMAIL_SERVICE,
  emailAuthUser: process.env.EMAIL_AUTH_USER,
  emailAuthPass: process.env.EMAIL_AUTH_PASS,
  accessTokenKey: process.env.ACCESS_TOKEN_KEY,
  refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
  twilioAccountSID: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioVerifyServiceSID: process.env.TWILIO_VERIFY_SERVICE_SID,
  twilioEmailVerifyServiceSID: process.env.TWILIO_EMAIL_VERIFY_SERVICE_SID,
  expoAccessToken: process.env.EXPO_ACCESS_TOKEN,
  s3AccessKeyId: process.env.S3_ACCESS_KEY_ID,
  s3AccessKey: process.env.S3_ACCESS_KEY,
  s3BucketName: process.env.S3_BUCKET_NAME,
};

export default config;
