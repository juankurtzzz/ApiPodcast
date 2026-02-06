import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const dataPath = path.join(__dirname, "../src/data/podcast.json");
  const raw = fs.readFileSync(dataPath, "utf-8");
  const items = JSON.parse(raw);

  for (const it of items) {
    await prisma.podcast.create({
      data: {
        podcastNAME: it.podcastNAME,
        episode: it.episode,
        videoID: it.videoID,
        categories: JSON.stringify(it.categories),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
