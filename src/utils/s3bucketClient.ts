import AWS from "aws-sdk";
import config from "../config/config";

const s3Bucket = new AWS.S3({
  accessKeyId: config.s3AccessKeyId,
  secretAccessKey: config.s3AccessKey,
});

export default s3Bucket;
