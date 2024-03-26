/* eslint-disable @typescript-eslint/indent */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import { Request, Response } from "express";
import HTTPSTATUS from "../constants/httpstatus";

// Generic Function For handling controller calls in Routes
const routeHandler =
  (controllerFunction: (req: Request, res: Response) => Promise<any>) =>
  async (req: Request, res: Response) => {
    try {
      //   const data = await controllerFunction(req, res);
      //   if (!res.headersSent) {
      //     res.status(HTTPSTATUS.OK).json(data);
      //   }
      await controllerFunction(req, res);
    } catch (error) {
      console.error("Error: ", error);
      if (!res.headersSent) {
        res
          .status(HTTPSTATUS.SERVERERROR)
          .json({ error: "Internal Server Error" });
      }
    }
  };

export default routeHandler;
