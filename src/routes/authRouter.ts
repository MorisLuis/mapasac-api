import { Router } from "express";
import { login, logout, renewLogin } from "../controllers/auth";
import { validateJWT } from "../helpers/validate-jwt";
import { getModules } from "../controllers/utils";

const router = Router();

router.post('/login', login);
router.get('/renew', validateJWT, renewLogin);
router.get('/logout', validateJWT, logout);

router.get('/modules', validateJWT, getModules);

export default router;