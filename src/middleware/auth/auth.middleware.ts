/* eslint-disable @typescript-eslint/comma-dangle */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import HTTPSTATUS from "../../constants/httpstatus";
import MESSAGES from "../../constants/messages";
import config from "../../config/config";
import { decryptAccessToken } from "../../helpers/auth.helpers";

/**
 * ----------------------------------------------------------------
 * Authentication Middleware for verifying access Token for Protective routes
 * ----------------------------------------------------------------
 */
const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
  // eslint-disable-next-line consistent-return
): void => {
  const { accessTokenKey } = config;
  console.log("Node_Env", config.node_env);

  // If NODE_ENV is set to 'production', then authenticate token
  // otherwise in development mode, don't authenticate token
  if (config.node_env === "production") {
    if (!accessTokenKey) {
      throw new Error("Access token key is undefined or null");
    }

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(HTTPSTATUS.UNAUTHORIZED).send({
        message: MESSAGES.NO_ACCESS.error,
        code: MESSAGES.NO_ACCESS.code,
      });
      return;
    }

    jwt.verify(token, accessTokenKey, (err): void => {
      if (err) {
        res.status(HTTPSTATUS.FORBIDDEN).send({
          message: MESSAGES.INVALID_TOKEN.error,
          code: MESSAGES.INVALID_TOKEN.code,
        });
        return;
      }

      // Attach userId to req.user
      const id = decryptAccessToken(token);
      req.user = id;

      next();
    });
  } else {
    next();
  }
};

// eslint-disable-next-line import/prefer-default-export
export { verifyToken };
