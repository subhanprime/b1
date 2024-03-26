/* eslint-disable function-paren-newline */
/* eslint-disable @typescript-eslint/comma-dangle */
import AppError from "../Errors";
import HTTPSTATUS from "../constants/httpstatus";
import MESSAGES from "../constants/messages";
import { uploadToS3Bucket } from "../utils/fileUpload.handler";

const uploadFileService = async (
  files: Express.Multer.File[],
  id: string,
  type: string
): Promise<string[]> => {
  try {
    if (!files || files.length === 0) {
      throw new AppError(
        MESSAGES.NO_FILES_UPLOADED.error,
        MESSAGES.NO_FILES_UPLOADED.code,
        HTTPSTATUS.BADREQUEST
      );
    }

    const folderPath = `${type}/${id}`;
    const uploadPromise = files.map((file) =>
      uploadToS3Bucket(file, folderPath)
    );
    const urls = await Promise.all(uploadPromise);

    return urls;
  } catch (err: any) {
    throw new AppError(
      err.message,
      MESSAGES.INTERNAL_SERVER_ERROR.code,
      HTTPSTATUS.SERVERERROR
    );
  }
};

export default uploadFileService;
