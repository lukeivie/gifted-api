/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Wishlist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_title_key" ON "Wishlist"("title");
