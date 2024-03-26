/* eslint-disable @typescript-eslint/comma-dangle */
import { Router } from "express";
import routeHandler from "../utils/routeHandler";
import { FIND_BUSINESS, BASIC_ROUTE, EVENT_IMAGES } from "../constants/routes";
import {
  getAllBusiness,
  createBusiness,
  updateBusiness,
  updateBusinessImages,
} from "../controllers/business.controllers";
import { validateData } from "../middleware/Validation/validations.middleware";
import {
  getAllBusinessValidationSchema,
  createBusinessValidator,
  updateBusinessImagesValidationSchema,
} from "../validators/business.validators";
import { verifyToken } from "../middleware/auth/auth.middleware";
// import { verifyToken } from "../middleware/auth/auth.middleware";

const router: Router = Router();

// "/api/bussiness/find"
router.post(
  FIND_BUSINESS,
  verifyToken,
  validateData(getAllBusinessValidationSchema),
  routeHandler(getAllBusiness)
);

// /api/business/
router.post(
  BASIC_ROUTE,
  verifyToken,
  validateData(createBusinessValidator),
  routeHandler(createBusiness)
);

// /api/business/
router.patch(
  BASIC_ROUTE,
  verifyToken,
  validateData(createBusinessValidator),
  updateBusiness
);

// /api/business/images
router.post(
  EVENT_IMAGES,
  verifyToken,
  validateData(updateBusinessImagesValidationSchema),
  updateBusinessImages
);
export default router;
