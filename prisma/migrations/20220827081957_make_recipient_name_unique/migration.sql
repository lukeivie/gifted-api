/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Recipient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Recipient_name_key" ON "Recipient"("name");
