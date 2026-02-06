-- CreateTable
CREATE TABLE "Podcast" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "podcastNAME" TEXT NOT NULL,
    "episode" TEXT NOT NULL,
    "videoID" TEXT NOT NULL,
    "categories" TEXT NOT NULL
);
