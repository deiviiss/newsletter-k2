/*
  Warnings:

  - You are about to drop the column `socialSkill` on the `newsletters` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `newsletters` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[socialSkillId]` on the table `newsletters` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "newsletters" DROP COLUMN "socialSkill",
ADD COLUMN     "socialSkillId" TEXT;

-- CreateTable
CREATE TABLE "social_skills" (
    "id" TEXT NOT NULL,
    "skill" TEXT NOT NULL,
    "activity" TEXT NOT NULL,

    CONSTRAINT "social_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notes" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "newsletterId" TEXT NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "newsletters_title_key" ON "newsletters"("title");

-- CreateIndex
CREATE UNIQUE INDEX "newsletters_socialSkillId_key" ON "newsletters"("socialSkillId");

-- AddForeignKey
ALTER TABLE "newsletters" ADD CONSTRAINT "newsletters_socialSkillId_fkey" FOREIGN KEY ("socialSkillId") REFERENCES "social_skills"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_newsletterId_fkey" FOREIGN KEY ("newsletterId") REFERENCES "newsletters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
