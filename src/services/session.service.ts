import { prisma } from "../lib/prisma";


//Handles game start/end + scoring.
export const startSession = async (imageId: string) => {
  return prisma.gameSession.create({
    data: {
      imageId,
      startedAt: new Date(),
    },
  });
};

//mark character found
export const markCharacterFound = async (
  sessionId: string,
  characterId: string
) => {
  return prisma.foundCharacter.create({
    data: {
      sessionId,
      characterId,
    },
  });
};

export const isCharacterFound = async (
  sessionId: string,
  characterId: string
) => {
  const found = await prisma.foundCharacter.findUnique({
    where: {
      sessionId_characterId: {
        sessionId,
        characterId,
      },
    },
  });

  return !!found;
};

export const getSession = async (sessionId: string) => {
  return prisma.gameSession.findUnique({
    where: {
      id: sessionId,
    },
  });
};

//Finish session + score
export const completeSession = async (sessionId: string) => {
  const session = await prisma.gameSession.findUnique({
    where: { id: sessionId },
    include: {
      foundCharacters: true,
      image: {
        include: { characters: true },
      },
    },
  });

  if (!session) throw new Error("Session not found");

  const totalCharacters = session.image.characters.length;
  const foundCount = session.foundCharacters.length;

  if (foundCount !== totalCharacters) {
    throw new Error("Game not complete yet");
  }

  const completedAt = new Date();
  const scoreMs =
    completedAt.getTime() - session.startedAt.getTime();

  return prisma.gameSession.update({
    where: { id: sessionId },
    data: {
      completedAt,
      scoreMs,
    },
  });
};

//helper for completion check
export const checkSessionCompletion = async (sessionId: string) => {
  const session = await prisma.gameSession.findUnique({
    where: { id: sessionId },
    include: {
      image: {
        include: { characters: true },
      },
      foundCharacters: true,
    },
  });

  if (!session) return false;

  return (
    session.foundCharacters.length === session.image.characters.length
  );
};