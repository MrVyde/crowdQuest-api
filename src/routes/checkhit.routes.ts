import { Router } from "express";
import {
  checkHit,
} from "../controllers/check-hit.controller";

const router = Router();

router.post("/check-hit", checkHit);

export default router;