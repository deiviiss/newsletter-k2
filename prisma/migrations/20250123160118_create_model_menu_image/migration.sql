/*
  Warnings:

  - You are about to drop the column `image` on the `menus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "menus" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "menu_images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,

    CONSTRAINT "menu_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "menu_images" ADD CONSTRAINT "menu_images_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
