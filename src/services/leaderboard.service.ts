import { prisma } from "../lib/prisma";

export const createLeaderboardEntry = async (data: {
  sessionId: string;
  playerName: string;
}) => {
  const session = await prisma.gameSession.findUnique({
    where: { id: data.sessionId },
  });

  if (!session || !session.scoreMs) {
    throw new Error("Invalid session or score not ready");
  }

  return prisma.leaderboardEntry.create({
    data: {
      playerName: data.playerName,
      scoreMs: session.scoreMs,
      sessionId: data.sessionId,
    },
  });
};

export const getLeaderboard = async () => {
  return prisma.leaderboardEntry.findMany({
    orderBy: {
      scoreMs: "asc",
    },
    take: 10,
  });
};