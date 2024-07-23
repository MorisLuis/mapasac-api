import { Router } from "express";
import { validateJWT } from "../helpers/validate-jwt";
import { deleteAllProductsInBag, deletePoductFromBag, getBag, getTotalProductsInBag, inserPoductToBag, updatePoductFromBag } from "../controllers/bag";

const router = Router();

router.get('/', validateJWT, getBag);
router.post('/', validateJWT, inserPoductToBag);
router.put('/', validateJWT, updatePoductFromBag);
router.delete('/all', validateJWT, deleteAllProductsInBag);
router.delete('/:idenlacemob', validateJWT, deletePoductFromBag);
router.get('/total', validateJWT, getTotalProductsInBag);

export default router;