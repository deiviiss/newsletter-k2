-- DropForeignKey
ALTER TABLE "newsletters" DROP CONSTRAINT "newsletters_socialSkillId_fkey";

-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_newsletterId_fkey";

-- DropForeignKey
ALTER TABLE "topics" DROP CONSTRAINT "topics_newsletterId_fkey";

-- DropForeignKey
ALTER TABLE "videos" DROP CONSTRAINT "videos_newsletterId_fkey";

-- DropForeignKey
ALTER TABLE "vocabularies" DROP CONSTRAINT "vocabularies_newsletterId_fkey";

-- AddForeignKey
ALTER TABLE "newsletters" ADD CONSTRAINT "newsletters_socialSkillId_fkey" FOREIGN KEY ("socialSkillId") REFERENCES "social_skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_newsletterId_fkey" FOREIGN KEY ("newsletterId") REFERENCES "newsletters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vocabularies" ADD CONSTRAINT "vocabularies_newsletterId_fkey" FOREIGN KEY ("newsletterId") REFERENCES "newsletters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topics" ADD CONSTRAINT "topics_newsletterId_fkey" FOREIGN KEY ("newsletterId") REFERENCES "newsletters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_newsletterId_fkey" FOREIGN KEY ("newsletterId") REFERENCES "newsletters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
