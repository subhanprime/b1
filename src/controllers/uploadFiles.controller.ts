import { Request, Response } from "express";
import HTTPSTATUS from "../constants/httpstatus";
import errorHandler from "../utils/errorHandler";
import uploadFileService from "../services/uploadFiles.service";

/**
 * ----------------------------------------------------------------
 * Uploads the image to S3 bucket, currently to /events folder
 * ----------------------------------------------------------------
 */
const uploadFiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];
    const { id, type } = req.body;
    const data = await uploadFileService(files, id, type);
    res.status(HTTPSTATUS.OK).json(data);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

export default uploadFiles;
