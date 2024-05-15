/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "icon" TEXT,
    "sum_balance" BOOLEAN NOT NULL DEFAULT false,
    "currency_code" TEXT NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCards" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "limit" INTEGER NOT NULL,
    "currency_code" TEXT NOT NULL,
    "buy_limit" INTEGER NOT NULL,
    "exp_day" INTEGER NOT NULL,
    "icon" TEXT,

    CONSTRAINT "CreditCards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCards" ADD CONSTRAINT "CreditCards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCards" ADD CONSTRAINT "CreditCards_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
