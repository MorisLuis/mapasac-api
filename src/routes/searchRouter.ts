import { Router } from "express";
import { searchClients, searchProduct, searchProductInBag } from "../controllers/search";
import { validateJWT } from "../helpers/validate-jwt";

const router = Router();

router.get('/product', validateJWT, searchProduct);
router.get('/productInBag', validateJWT, searchProductInBag);
router.get('/clients', validateJWT, searchClients);

export default router;