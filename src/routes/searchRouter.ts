import { Router } from "express";
import { searchProduct, searchProductInBag } from "../controllers/search";
import { validateJWT } from "../helpers/validate-jwt";

const router = Router();

router.get('/product', validateJWT, searchProduct);
router.get('/productInBag', validateJWT, searchProductInBag);

export default router;