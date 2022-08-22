/*
  Warnings:

  - You are about to drop the column `authZeroId` on the `User` table. All the data in the column will be lost.
  - Added the required column `externalId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "authZeroId",
ADD COLUMN     "externalId" TEXT NOT NULL;
