/* eslint-disable @typescript-eslint/comma-dangle */
import AppError from "../Errors";
import HTTPSTATUS from "../constants/httpstatus";
import MESSAGES from "../constants/messages";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helpers/auth.helpers";
import { comparePassword, hashPassword } from "../helpers/user.helper";
import AdminRepository from "../repositories/admin.repository";

/**
 * ----------------------------------------------------------------
 * Creating an admin account
 * ----------------------------------------------------------------
 */
const createAdminService = async (
  email: string,
  password: string
): Promise<{ message: string }> => {
  const hashedPassword = await hashPassword(password);

  await AdminRepository.createAdmin({ email: email, password: hashedPassword });

  return { message: "Admin Created Successfully!" };
};

/**
 * ----------------------------------------------------------------
 * Login Service for admin accounts
 * ----------------------------------------------------------------
 */
const loginService = async (
  email: string,
  password: string
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const data = await AdminRepository.findOneByQuery({ email: email });
  if (data) {
    const passwordCheck = await comparePassword(password, data.password);
    if (!passwordCheck) {
      throw new AppError(
        MESSAGES.INCORRECT_PASSWORD.error,
        MESSAGES.INCORRECT_PASSWORD.code,
        HTTPSTATUS.BADREQUEST
      );
    }

    const accessToken = generateAccessToken({
      _id: data._id,
    });
    const refreshToken = generateRefreshToken({
      _id: data._id,
    });
    // await AdminRepository.storeTokens(data._id, { accessToken, refreshToken });
    return { accessToken, refreshToken };
  }
  // throw new AppError(HTTPSTATUS.BADREQUEST, MESSAGES.USER_NOT_FOUND, true);
  throw new AppError(
    MESSAGES.INVALID_EMAIL.error,
    MESSAGES.INVALID_EMAIL.code,
    HTTPSTATUS.BADREQUEST
  );
};

export { createAdminService, loginService };
