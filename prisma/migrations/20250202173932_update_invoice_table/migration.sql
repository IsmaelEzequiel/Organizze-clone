/*
  Warnings:

  - Changed the type of `exp_day` on the `Cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "exp_day",
ADD COLUMN     "exp_day" INTEGER NOT NULL;
