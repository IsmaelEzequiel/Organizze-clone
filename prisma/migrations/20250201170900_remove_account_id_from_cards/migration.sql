/*
  Warnings:

  - You are about to drop the column `accountId` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `Cards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "accountId",
DROP COLUMN "is_deleted";
