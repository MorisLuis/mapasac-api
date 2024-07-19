import { Router } from "express";
import { validateJWT } from "../helpers/validate-jwt";
import { postInventory, postSell } from "../controllers/inveart";

const router = Router();

router.post('/inventory', validateJWT, postInventory);
router.post('/sell', validateJWT, postSell);


export default router;