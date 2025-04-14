import { Router } from "express";
import { login, logout, refresh } from "../controllers/auth";
import { validateJWT, validateRefreshJWT } from "../helpers/validate-jwt";
import { getModules } from "../controllers/utils";

const router = Router();

router.post('/login', login);
router.post('/renew', validateRefreshJWT, refresh);
router.get('/logout', validateJWT, logout);
router.get('/modules', validateJWT, getModules);

export default router;