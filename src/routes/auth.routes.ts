import { Router } from "express";
import routeHandler from "../utils/routeHandler";
import { BASIC_ROUTE, LOGIN_ROUTE } from "../constants/routes";
import { createAdmin, login } from "../controllers/auth.controller";

const router: Router = Router();

// "/api/admin"
router.post(BASIC_ROUTE, routeHandler(createAdmin));

// /api/admin/login
router.post(LOGIN_ROUTE, routeHandler(login));

export default router;
