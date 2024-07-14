import { Router } from "express";
import { insertInventoryDetails } from "../controllers/inveart";

const router = Router();

router.post('/', insertInventoryDetails);


export default router;