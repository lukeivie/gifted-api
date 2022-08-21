/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ImagesOnWishes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wish` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wishlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ImagesOnWishes" DROP CONSTRAINT "ImagesOnWishes_imageId_fkey";

-- DropForeignKey
ALTER TABLE "ImagesOnWishes" DROP CONSTRAINT "ImagesOnWishes_wishId_fkey";

-- DropForeignKey
ALTER TABLE "Wish" DROP CONSTRAINT "Wish_wishlistId_fkey";

-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_authorId_fkey";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "ImagesOnWishes";

-- DropTable
DROP TABLE "Wish";

-- DropTable
DROP TABLE "Wishlist";

-- CreateTable
CREATE TABLE "wishlist" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wish" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(8,2),
    "brand" TEXT,
    "url" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isComplete" BOOLEAN NOT NULL DEFAULT false,
    "wishlistId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images_on_wishes" (
    "imageId" TEXT NOT NULL,
    "wishId" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "images_on_wishes_pkey" PRIMARY KEY ("imageId","wishId")
);

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL,
    "alt" TEXT,
    "url" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wish" ADD CONSTRAINT "wish_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "wishlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images_on_wishes" ADD CONSTRAINT "images_on_wishes_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images_on_wishes" ADD CONSTRAINT "images_on_wishes_wishId_fkey" FOREIGN KEY ("wishId") REFERENCES "wish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
