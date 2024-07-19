import { Router } from "express";
import { validateJWT } from "../helpers/validate-jwt";
import { deletePoductFromBag, getBag, inserPoductToBag, updatePoductFromBag } from "../controllers/bag";

const router = Router();

router.get('/', validateJWT, getBag);
router.post('/', validateJWT, inserPoductToBag);
router.put('/', validateJWT, updatePoductFromBag);
router.delete('/', validateJWT, deletePoductFromBag);

export default router;