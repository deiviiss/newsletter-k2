/*
  Warnings:

  - You are about to drop the column `description` on the `menus` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[menuImageId]` on the table `menus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `menuImageId` to the `menus` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "menu_images" DROP CONSTRAINT "menu_images_menuId_fkey";

-- AlterTable
ALTER TABLE "menus" DROP COLUMN "description",
ADD COLUMN     "menuImageId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "menus_menuImageId_key" ON "menus"("menuImageId");

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_menuImageId_fkey" FOREIGN KEY ("menuImageId") REFERENCES "menu_images"("id") ON DELETE CASCADE ON UPDATE CASCADE;
