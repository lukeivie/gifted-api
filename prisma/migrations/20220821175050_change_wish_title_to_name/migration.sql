/*
  Warnings:

  - You are about to drop the column `title` on the `Wish` table. All the data in the column will be lost.
  - Added the required column `name` to the `Wish` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wish" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;
