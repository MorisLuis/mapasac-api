import { Router } from "express";
import { validateJWT } from "../helpers/validate-jwt";
import { postInventory, postSell, postSellRestaurant } from "../controllers/inveart";

const router = Router();

router.post('/inventory', validateJWT, postInventory);
router.post('/sell', validateJWT, postSell);
router.post('/sellRestaurant', validateJWT, postSellRestaurant);


export default router;