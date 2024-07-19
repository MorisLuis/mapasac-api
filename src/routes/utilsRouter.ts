import { Router } from "express";
import { login, renewLogin } from "../controllers/auth";
import { validateJWT } from "../helpers/validate-jwt";
import { utilsController } from "../controllers/utils";

const router = Router();

router.get('/', utilsController);

export default router;