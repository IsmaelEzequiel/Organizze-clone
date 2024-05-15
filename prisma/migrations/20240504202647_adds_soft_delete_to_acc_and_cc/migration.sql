-- AlterTable
ALTER TABLE "Accounts" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "CreditCards" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;
