import { Router } from "express";
import { getProducByCodebar, updateProductCodebar } from "../controllers/codebar";

const router = Router();

router.get('/', getProducByCodebar);

router.put('/', updateProductCodebar);

export default router;