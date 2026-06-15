import { Request, Response } from "express";
import * as sessionService from "../services/session.service";
import * as validationService from "../services/validation.service";

export const checkHit = async (
  req: Request,
  res: Response
) => {
  try {
    const { sessionId, characterId, x, y } = req.body;

    const session = await sessionService.getSession(
      sessionId
    );

    if (!session || session.completedAt) {
      return res.status(400).json({
        success: false,
        message: "Invalid or completed session",
      });
    }

    const alreadyFound =
      await sessionService.isCharacterFound(
        sessionId,
        characterId
      );

    if (alreadyFound) {
      return res.json({
        success: true,
        alreadyFound: true,
        gameCompleted: false,
      });
    }
    console.log({
      sessionId,
      characterId,
      x,
      y,
    });

    const isCorrect =
      await validationService.validateCharacterClick({
        characterId,
        x,
        y,
      });

    if (!isCorrect) {
      return res.json({
        success: false,
        alreadyFound: false,
        gameCompleted: false,
      });
    }

    await sessionService.markCharacterFound(
      sessionId,
      characterId
    );

    const gameCompleted =
      await sessionService.checkSessionCompletion(
        sessionId
      );

    if (gameCompleted) {
      await sessionService.completeSession(sessionId);
    }

    return res.json({
      success: true,
      alreadyFound: false,
      gameCompleted,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};