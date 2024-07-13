import { Router } from "express";
import { login, renewLogin } from "../controllers/auth";
import { validateJWT } from "../helpers/validate-jwt";

const router = Router();

router.post('/login', login);
router.get('/renew', validateJWT, renewLogin);

export default router;