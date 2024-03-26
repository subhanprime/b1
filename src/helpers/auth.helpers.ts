/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/comma-dangle */
import jwt from "jsonwebtoken";
import config from "../config/config";

const generateAccessToken = (user: { _id: string }): string => {
  const { accessTokenKey } = config;

  console.log("generating access token", user._id);

  return accessTokenKey
    ? jwt.sign(
        {
          id: user._id,
        },
        accessTokenKey,
        {
          expiresIn: "5m",
        }
      )
    : "";
};

const generateRefreshToken = (user: { _id: string }): string => {
  const { refreshTokenKey } = config;
  return refreshTokenKey
    ? jwt.sign(
        {
          id: user._id,
        },
        refreshTokenKey,
        {
          expiresIn: "1w",
        }
      )
    : "";
};

const decryptAccessToken = (token: string): string => {
  const { accessTokenKey } = config;

  if (!accessTokenKey) {
    throw new Error("Access token key is undefined or null");
  }

  let userId: string = "";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const decodedToken = jwt.verify(
    token,
    accessTokenKey,
    (error, decodToken: any) => {
      userId = decodToken.id;
    }
  );
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const id = userId;
  return id;
};

export { generateAccessToken, generateRefreshToken, decryptAccessToken };
