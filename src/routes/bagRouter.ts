import { Router } from "express";
import { validateJWT } from "../helpers/validate-jwt";
import { deleteAllProductsInBag, deleteProductFromBag, getBag, getTotalPriceBag, getTotalProductsInBag, insertPoductToBag, updateProductFromBag } from "../controllers/bag";

const router = Router();

router.get('/', validateJWT, getBag);
router.post('/', validateJWT, insertPoductToBag);
router.put('/', validateJWT, updateProductFromBag);
router.delete('/all', validateJWT, deleteAllProductsInBag);
router.delete('/:idenlacemob', validateJWT, deleteProductFromBag);
router.get('/total', validateJWT, getTotalProductsInBag);
router.get('/price', validateJWT, getTotalPriceBag);

export default router;