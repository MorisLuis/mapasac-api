import { Router } from "express";
import { getProducByCodebar, getProductByClave, getProductById, getProducts, updateProduct } from "../controllers/product";

const router = Router();

router.get('/', getProducts);

router.get('/byclave', getProductByClave);

router.get('/byid', getProductById);

router.get('/bycodebar', getProducByCodebar);

router.put('/', updateProduct);

router.put('/:id', updateProduct);

export default router;