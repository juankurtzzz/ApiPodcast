import fs from "fs";
import path from "path";
import prisma from "../services/prismaClient";

interface podcastJsonModel {
  podcastNAME: string;
  episode: string;
  videoID: string;
  categories: string[];
}

const writePodcast = path.join(__dirname, "../data/podcast.json");

export const podcastData = async (
  podcastName?: string
): Promise<podcastJsonModel[]> => {
  try {
    const where: any = podcastName ? { podcastNAME: podcastName } : undefined;
    const records = await prisma.podcast.findMany({ where });
    if (records && records.length > 0) {
      return records.map((r: any) => ({
        podcastNAME: r.podcastNAME,
        episode: r.episode,
        videoID: r.videoID,
        categories: JSON.parse(r.categories || "[]") as string[],
      }));
    }
  } catch (e) {
    // if any DB error happens, fallback to JSON file
  }

  const data = fs.readFileSync(writePodcast, "utf-8");
  let jsonFile = JSON.parse(data);

  if (podcastName) {
    jsonFile = jsonFile.filter(
      (podcast: podcastJsonModel) => podcast.podcastNAME === podcastName
    );
  }

  return jsonFile;
};
