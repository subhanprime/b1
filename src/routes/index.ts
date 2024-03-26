import { Router } from "express";
import {
  ADMIN_BASE_ROUTE,
  API_BASE_ROUTE,
  EVENT_BASE_ROUTE,
  BUSINESS_BASE_ROUTE,
  ACCESS_BASE_ROUTE,
} from "../constants/routes";
import metadataRouter from "./metadata.router";
import uploadFileRouter from "./uploadFiles.router";
import eventRouter from "./event.routes";
import adminAuthRouter from "./auth.routes";
import businessRouter from "./business.routes";
import contactUsRouter from "./contactus.routes";

const router = Router();

// Router for all Apis
const apiRouter = Router();
apiRouter.use(EVENT_BASE_ROUTE, metadataRouter);
apiRouter.use(EVENT_BASE_ROUTE, uploadFileRouter);
apiRouter.use(EVENT_BASE_ROUTE, eventRouter);
apiRouter.use(ADMIN_BASE_ROUTE, adminAuthRouter);
apiRouter.use(BUSINESS_BASE_ROUTE, businessRouter);
apiRouter.use(EVENT_BASE_ROUTE, contactUsRouter);

// prefixing routes with /access
const accessRouter = Router();
accessRouter.use(ACCESS_BASE_ROUTE, apiRouter);

// All api routes prefixed with /api
router.use(API_BASE_ROUTE, accessRouter);

export default router;
