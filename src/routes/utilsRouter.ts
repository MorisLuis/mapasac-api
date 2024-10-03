import { Router } from "express";
import { validateJWT } from "../helpers/validate-jwt";
import { getAddressDirection, getClients, getModules, getPaymentType } from "../controllers/utils";

const router = Router();

router.get('/address', validateJWT, getAddressDirection);
router.get('/paymentType', validateJWT, getPaymentType);
router.get('/clients', validateJWT, getClients);
router.get('/modules', validateJWT, getModules);

export default router;