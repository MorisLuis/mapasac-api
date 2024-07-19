import { Router } from "express";
import { getProducByCodebar, getProductByClave, getProductById, getProducts, getTotalProducts, updateProduct, updateProductCodebar } from "../controllers/product";

const router = Router();

router.get('/', getProducts);

router.get('/total', getTotalProducts);


router.get('/byid', getProductById);

router.get('/byclave', getProductByClave);

router.get('/bycodebar', getProducByCodebar);

router.put('/:idinvearts', updateProduct);

router.put('/codebar/:idinvearts', updateProductCodebar);


export default router;