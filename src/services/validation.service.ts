import { prisma } from "../lib/prisma";

export const validateCharacterClick = async (data: {
  characterId: string;
  x: number;
  y: number;
}) => {
  console.log("Validating:", data);
  const character = await prisma.character.findUnique({
    where: { id: data.characterId },
  });

  console.log("Character:", character);
  if (!character) {
    return false;
  }

  return (
    data.x >= character.minX &&
    data.x <= character.maxX &&
    data.y >= character.minY &&
    data.y <= character.maxY
  );
};