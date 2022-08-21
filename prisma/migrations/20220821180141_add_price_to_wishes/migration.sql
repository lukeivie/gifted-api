/*
  Warnings:

  - Added the required column `price` to the `Wish` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wish" ADD COLUMN     "price" DECIMAL(8,2) NOT NULL;
