import { prisma } from "../lib/prisma";

// Get all playable images
export const getAllImages = async () => {
  return prisma.gameImage.findMany({
    select: {
      id: true,
      title: true,
      imageUrl: true,
    },
  });
};

// Get full image with characters (used when starting game)
export const getImageById = async (id: string) => {
  return prisma.gameImage.findUnique({
    where: { id },
    include: {
      characters: {
        select: {
          id: true,
          name: true,
          thumbnailUrl: true,
          minX: true,
          maxX: true,
          minY: true,
          maxY: true,
        },
      },
    },
  });
};