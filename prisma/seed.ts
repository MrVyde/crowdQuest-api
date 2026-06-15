import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { gameImages } from "./seed-data";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


async function main() {
//  await prisma.foundCharacter.deleteMany();
//  await prisma.leaderboardEntry.deleteMany();
//  await prisma.gameSession.deleteMany();
//  await prisma.character.deleteMany();
//  await prisma.gameImage.deleteMany();


  for (const image of gameImages) {
    await prisma.gameImage.create({
      data: {
        title: image.title,
        imageUrl: image.imageUrl,

        characters: {
          create: image.characters,
        },
      },
    });
  }

  console.log("Seed completed");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });