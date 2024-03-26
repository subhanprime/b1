/**
 * ----------------------------------------------------------------
 * Interface for environment variables
 * ----------------------------------------------------------------
 */
interface IConfig {
  node_env?: string;
  port?: string;
  endpoint?: string;
  dockerDBendpoint?: string;
  clinturl?: string;
  ip?: string;
  emailService?: string;
  emailAuthUser?: string;
  emailAuthPass?: string;
  accessTokenKey?: string;
  refreshTokenKey?: string;
  twilioAccountSID?: string;
  twilioAuthToken?: string;
  twilioVerifyServiceSID?: string;
  twilioEmailVerifyServiceSID?: string;
  expoAccessToken?: string;
  s3AccessKeyId?: string;
  s3AccessKey?: string;
  s3BucketName?: string;
}

export default IConfig;
