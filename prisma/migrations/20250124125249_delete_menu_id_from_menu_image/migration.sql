/*
  Warnings:

  - You are about to drop the column `menuId` on the `menu_images` table. All the data in the column will be lost.
  - Made the column `menuImageId` on table `menus` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "menu_images" DROP COLUMN "menuId";

-- AlterTable
ALTER TABLE "menus" ALTER COLUMN "menuImageId" SET NOT NULL;
