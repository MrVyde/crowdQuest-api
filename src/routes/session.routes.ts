import { Router } from "express";
import { startSessionController } from "../controllers/session.controller";

const router = Router();

router.post("/start", startSessionController);

export default router;

    