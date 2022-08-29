-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Relationship" ADD VALUE 'GIRLFRIEND';
ALTER TYPE "Relationship" ADD VALUE 'BOYFRIEND';
ALTER TYPE "Relationship" ADD VALUE 'WIFE';
ALTER TYPE "Relationship" ADD VALUE 'HUSBAND';
ALTER TYPE "Relationship" ADD VALUE 'PARTNER';
ALTER TYPE "Relationship" ADD VALUE 'MUSE';
