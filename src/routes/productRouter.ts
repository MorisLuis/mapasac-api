import { Router } from "express";
import { getProducByCodebar, getProductByClave, getProductById, getProducts, getProductsSells, getProductsSellsFromFamily, getTotalProducts, getTotalProductsSells, updateProduct, updateProductCodebar } from "../controllers/product";
import { validateJWT } from "../helpers/validate-jwt";

const router = Router();

// Module 1 - Inventory
router.get('/', validateJWT, getProducts);
router.get('/total', validateJWT, getTotalProducts);
router.get('/byid', validateJWT, getProductById);
router.get('/byclave', validateJWT, getProductByClave);
router.get('/bycodebar', validateJWT, getProducByCodebar);
router.put('/:idinvearts', validateJWT, updateProduct);
router.put('/codebar/:idinvearts', validateJWT, updateProductCodebar);


// Module 2 - Sells
router.get('/sells', validateJWT, getProductsSells);
router.get('/sells/total', validateJWT, getTotalProductsSells);
router.get('/sells/byfamily', validateJWT, getProductsSellsFromFamily);


export default router;