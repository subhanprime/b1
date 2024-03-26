/* eslint-disable @typescript-eslint/comma-dangle */
import { Router } from "express";
import { UPLOAD_FILES } from "../constants/routes";
import { uploadToMulter } from "../utils/fileUpload.handler";
import routeHandler from "../utils/routeHandler";
import uploadFiles from "../controllers/uploadFiles.controller";
import {
  noFileUploadMiddleware,
  validateData,
} from "../middleware/Validation/validations.middleware";
import { uploadImageValidationSchema } from "../validators/uploadImage.validator";

const router: Router = Router();

// /api/event/upload
router.post(
  UPLOAD_FILES,
  uploadToMulter.any(),
  noFileUploadMiddleware,
  validateData(uploadImageValidationSchema),
  routeHandler(uploadFiles)
);

export default router;
