import { IncomingMessage, ServerResponse } from "http";
import { serListEpisodes } from "../services/listepisodes";
import { filterEpisodes } from "../services/filterepisodes";
import { podcastData } from "../data/datapodcast";
import prisma from "../services/prismaClient";

export const getListEpisodes = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  res.writeHead(200, { "Content-Type": "aplication/json" });
  res.end(JSON.stringify(await serListEpisodes(req, res)));
};

export const getFilterEpisodes = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const content = await filterEpisodes(req, res, "Fala, Dev!");
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(content));
};

export const createPodcast = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    const chunks: Uint8Array[] = [];
    for await (const chunk of req) {
      chunks.push(chunk as Uint8Array);
    }
    const body = Buffer.concat(chunks).toString();
    const payload = JSON.parse(body || "{}");

    const { podcastNAME, episode, videoID, categories } = payload;
    if (!podcastNAME || !episode || !videoID) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Missing required fields" }));
      return;
    }

    const created = await prisma.podcast.create({
      data: {
        podcastNAME,
        episode,
        videoID,
        categories: JSON.stringify(categories || []),
      },
    });

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        id: created.id,
        podcastNAME: created.podcastNAME,
        episode: created.episode,
        videoID: created.videoID,
        categories: JSON.parse(created.categories || "[]"),
      })
    );
  } catch (e) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
};
