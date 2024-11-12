/*
  Warnings:

  - The values [user] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('K2', 'K3');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('admin', 'teacher');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'admin';
COMMIT;

-- AlterTable
ALTER TABLE "newsletters" ADD COLUMN     "grade" "Grade" NOT NULL DEFAULT 'K2';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;
