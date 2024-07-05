import { Router } from "express";
import { getInveart, getInveartByClave, getInveartById, insertInventoryDetails } from "../controllers/inveart";

const router = Router();

router.get('/', getInveart);

router.get('/byclave', getInveartByClave);

router.get('/byid', getInveartById);

router.post('/', insertInventoryDetails);


export default router;