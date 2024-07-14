import { Router } from "express";
import { searchProduct } from "../controllers/search";

const router = Router();

router.get('/product/:term', searchProduct);

export default router;