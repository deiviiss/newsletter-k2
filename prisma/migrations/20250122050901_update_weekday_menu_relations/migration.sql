/*
  Warnings:

  - You are about to drop the column `day` on the `menus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "menus" DROP COLUMN "day",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "weekdays" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "menuId" TEXT,

    CONSTRAINT "weekdays_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "weekdays_name_key" ON "weekdays"("name");

-- AddForeignKey
ALTER TABLE "weekdays" ADD CONSTRAINT "weekdays_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
