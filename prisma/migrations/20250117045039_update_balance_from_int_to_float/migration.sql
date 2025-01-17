-- DropForeignKey
ALTER TABLE "CreditCards" DROP CONSTRAINT "CreditCards_accountId_fkey";

-- AlterTable
ALTER TABLE "Accounts" ALTER COLUMN "balance" SET DEFAULT 0,
ALTER COLUMN "balance" SET DATA TYPE DOUBLE PRECISION;
