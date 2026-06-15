import { validateCharacterClick } from "../services/validation.service";
import * as sessionService from "../services/session.service";
import { Request, Response } from "express";


export const validateClickController = async (
  req: Request,
  res: Response
) => {
  try {
    const { sessionId, characterId, x, y } = req.body;

    const session = await sessionService.getSession(sessionId);

    if (!session || session.completedAt) {
      return res.status(400).json({
        success: false,
        message: "Invalid or completed session",
      });
    }

    const alreadyFound = await sessionService.isCharacterFound(
      sessionId,
      characterId
    );

    if (alreadyFound) {
      return res.json({
        success: true,
        alreadyFound: true,
      });
    }

    const isCorrect = await validateCharacterClick({
      characterId,
      x,
      y,
    });

    if (!isCorrect) {
      return res.json({
        success: false,
      });
    }

    await sessionService.markCharacterFound(
      sessionId,
      characterId
    );

    const gameCompleted =
      await sessionService.checkSessionCompletion(sessionId);

    if (gameCompleted) {
      await sessionService.completeSession(sessionId);
    }

    return res.json({
      success: true,
      alreadyFound: false,
      gameCompleted,
    });
  } catch {
    return res.status(500).json({
      error: "Validation failed",
    });
  }
};

export const completeSessionController = async (req: Request,res: Response) => {
  try {
    const { sessionId } = req.body;

    const session = await sessionService.completeSession(sessionId);

    res.json(session);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";

    res.status(400).json({ error: message });
  }
};