import {createLeaderboardEntry,getLeaderboard,} from "../services/leaderboard.service";
import { Request, Response } from "express";

export const getLeaderboardController = async (req: Request,res: Response) => {
  try {
    const data = await getLeaderboard();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to load leaderboard" });
  }
};

export const createLeaderboardController = async (req: Request,res: Response) => {
  try {
    const { sessionId, playerName } = req.body;

    const entry = await createLeaderboardEntry({
      sessionId,
      playerName,
    });

    res.json(entry);
  } catch (err) {
    
    const message = err instanceof Error ? err.message : "Unknown error";

    res.status(400).json({ error: message });
  }
};