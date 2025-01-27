/*
  Warnings:

  - You are about to drop the column `menuId` on the `weekdays` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[weekdayId]` on the table `menus` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "weekdays" DROP CONSTRAINT "weekdays_menuId_fkey";

-- AlterTable
ALTER TABLE "menus" ADD COLUMN     "weekdayId" TEXT;

-- AlterTable
ALTER TABLE "weekdays" DROP COLUMN "menuId";

-- CreateIndex
CREATE UNIQUE INDEX "menus_weekdayId_key" ON "menus"("weekdayId");

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_weekdayId_fkey" FOREIGN KEY ("weekdayId") REFERENCES "weekdays"("id") ON DELETE SET NULL ON UPDATE CASCADE;
