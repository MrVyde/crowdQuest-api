import { Router } from "express";
import {
  getLeaderboardController,
  createLeaderboardController,
} from "../controllers/leaderboard.controller";

const router = Router();

router.get("/", getLeaderboardController);
router.post("/", createLeaderboardController);

export default router;