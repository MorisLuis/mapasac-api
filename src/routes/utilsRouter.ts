import { Router } from "express";
import { validateJWT } from "../helpers/validate-jwt";
import { getClients, getPaymentType, utilsController } from "../controllers/utils";

const router = Router();

router.get('/', utilsController);
router.get('/paymentType', validateJWT, getPaymentType);
router.get('/clients', validateJWT, getClients);

export default router;