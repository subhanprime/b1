/**
 * ----------------------------------------------------------------
 * TInterfaces for steps of Signing in process
 * ----------------------------------------------------------------
 */
interface IStep1Data {
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  dob?: string;
  phoneNo?: string;
}

interface IStep2Data {
  primaryCity?: string;
  industry?: string;
  job?: string;
  salary?: string;
}

interface IVerificationData {
  phoneNo?: string;
  email?: string;
}
export { IStep1Data, IStep2Data, IVerificationData };
