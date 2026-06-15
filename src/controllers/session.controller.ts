import {startSession,} from "../services/session.service";
import { Request, Response } from "express";


export const startSessionController = async (req: Request,res: Response) => {
  try {
    const { imageId } = req.body;

    const session = await startSession(imageId);

    res.json({
      id: session.id,
      imageId: session.imageId,
      startedAt: session.startedAt
    });
  } catch(err) {
    res.status(500).json({ 
      error: "Could not start session",
    });
  }
};