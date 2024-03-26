/* eslint-disable @typescript-eslint/comma-dangle */
import multer from "multer";
import config from "../config/config";
import s3Bucket from "./s3bucketClient";

const storage = multer.memoryStorage();
const uploadToMulter = multer({ storage: storage });

const uploadToS3Bucket = async (
  file: Express.Multer.File,
  folderPath: string
) => {
  const bucketName = config.s3BucketName || "Default_bukcet_Name";
  const key = `${folderPath}/${file.originalname}`;
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: file.buffer,
  };

  const result = await s3Bucket.upload(params).promise();
  return result.Location;
};

export { uploadToS3Bucket, uploadToMulter };
