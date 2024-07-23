import { Router } from "express";
import { getProducByCodebar, getProductByClave, getProductById, getProducts, getTotalProducts, updateProduct, updateProductCodebar } from "../controllers/product";
import { validateJWT } from "../helpers/validate-jwt";

const router = Router();

router.get('/', validateJWT, getProducts);

router.get('/total', validateJWT, getTotalProducts);


router.get('/byid', validateJWT, getProductById);

router.get('/byclave', validateJWT, getProductByClave);

router.get('/bycodebar', validateJWT, getProducByCodebar);

router.put('/:idinvearts', validateJWT, updateProduct);

router.put('/codebar/:idinvearts', validateJWT, updateProductCodebar);


export default router;