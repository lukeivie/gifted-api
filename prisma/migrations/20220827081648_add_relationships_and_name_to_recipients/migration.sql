/*
  Warnings:

  - You are about to drop the column `externalId` on the `Recipient` table. All the data in the column will be lost.
  - Added the required column `name` to the `Recipient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Relationship" AS ENUM ('FRIEND', 'BROTHER', 'SISTER', 'MOTHER', 'FATHER', 'COWORKER', 'SON', 'DAUGHTER', 'GRANDMOTHER', 'GRANDFATHER', 'STEP_BROTHER', 'STEP_SISTER', 'STEP_MOTHER', 'STEP_FATHER', 'STEP_SON', 'STEP_DAUGHTER', 'BROTHER_IN_LAW', 'SISTER_IN_LAW', 'MOTHER_IN_LAW', 'FATHER_IN_LAW', 'SON_IN_LAW', 'DAUGHTER_IN_LAW');

-- DropIndex
DROP INDEX "Recipient_externalId_key";

-- AlterTable
ALTER TABLE "Recipient" DROP COLUMN "externalId",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "relationship" "Relationship" DEFAULT 'FRIEND';
