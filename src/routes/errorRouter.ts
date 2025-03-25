import { Router } from "express";
import { handleErrorsBackend, handleErrorsFrontend } from "../controllers/errors";

const router = Router();

router.post('/front', handleErrorsFrontend);
router.post('/back', handleErrorsBackend);

export default router;