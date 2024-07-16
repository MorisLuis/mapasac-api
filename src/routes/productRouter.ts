import { Router } from "express";
import { getProducByCodebar, getProductByClave, getProductById, getProducts, getTotalProducts, updateProduct } from "../controllers/product";

const router = Router();

router.get('/', getProducts);

router.get('/total', getTotalProducts);


router.get('/byid', getProductById);

router.get('/byclave', getProductByClave);

router.get('/bycodebar', getProducByCodebar);

router.put('/:id', updateProduct);

export default router;