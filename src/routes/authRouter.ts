import { Router } from "express";
import { getModules, login, logout, renewLogin } from "../controllers/auth";
import { validateJWT } from "../helpers/validate-jwt";

const router = Router();

router.post('/login', login);
router.get('/renew', validateJWT, renewLogin);
router.get('/logout', validateJWT, logout);

router.get('/modules', validateJWT, getModules);

export default router;