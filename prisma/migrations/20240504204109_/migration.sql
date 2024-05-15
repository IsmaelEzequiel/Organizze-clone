/*
  Warnings:

  - The `is_deleted` column on the `Accounts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `is_deleted` column on the `CreditCards` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `icon` on table `Accounts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Accounts" ALTER COLUMN "balance" SET DEFAULT 0,
ALTER COLUMN "icon" SET NOT NULL,
DROP COLUMN "is_deleted",
ADD COLUMN     "is_deleted" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "CreditCards" ALTER COLUMN "limit" SET DEFAULT 0,
DROP COLUMN "is_deleted",
ADD COLUMN     "is_deleted" TIMESTAMP(3);
