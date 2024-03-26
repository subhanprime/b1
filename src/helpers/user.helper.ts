/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/comma-dangle */
import bcrypt from "bcrypt";
import IUserDocument from "../interfaces/user.schema.interface";
import {
  IStep1Data,
  IStep2Data,
  IVerificationData,
} from "../interfaces/stepData.interface";

const hashPassword = async (password: string): Promise<string> => {
  try {
    return await bcrypt.hash(password, 12);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const comparePassword = async (
  clientPass: string,
  dbPass: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(clientPass, dbPass);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const extractStep1Data = (user: IUserDocument): IStep1Data => {
  const { email, firstName, lastName, gender, dob, phoneNo } = user;
  return {
    email,
    firstName,
    lastName,
    gender,
    dob,
    phoneNo,
  };
};

const extractStep2Data = (user: IUserDocument): IStep2Data => {
  const { primaryCity, industry, job, salary } = user;
  return {
    primaryCity,
    industry,
    job,
    salary,
  };
};

const extractVerficaitonData = (user: IUserDocument): IVerificationData => {
  const { phoneNo, email } = user;
  return { phoneNo, email };
};

export {
  hashPassword,
  comparePassword,
  extractStep1Data,
  extractStep2Data,
  extractVerficaitonData,
};
