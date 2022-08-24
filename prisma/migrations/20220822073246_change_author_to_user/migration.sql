/*
  Warnings:

  - You are about to drop the column `authorId` on the `Wishlist` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_authorId_fkey";

-- AlterTable
ALTER TABLE "Wishlist" DROP COLUMN "authorId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
