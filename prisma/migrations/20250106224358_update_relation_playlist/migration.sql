/*
  Warnings:

  - You are about to drop the column `newsletterId` on the `playlists` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playlistId]` on the table `newsletters` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "playlists" DROP CONSTRAINT "playlists_newsletterId_fkey";

-- AlterTable
ALTER TABLE "newsletters" ADD COLUMN     "playlistId" TEXT;

-- AlterTable
ALTER TABLE "playlists" DROP COLUMN "newsletterId";

-- CreateIndex
CREATE UNIQUE INDEX "newsletters_playlistId_key" ON "newsletters"("playlistId");

-- AddForeignKey
ALTER TABLE "newsletters" ADD CONSTRAINT "newsletters_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "playlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
