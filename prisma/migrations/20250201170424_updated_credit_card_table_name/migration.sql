/*
  Warnings:

  - You are about to drop the `CreditCards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CreditCards" DROP CONSTRAINT "CreditCards_userId_fkey";

-- DropTable
DROP TABLE "CreditCards";

-- CreateTable
CREATE TABLE "Cards" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "is_deleted" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "limit" INTEGER NOT NULL DEFAULT 0,
    "currency_code" TEXT NOT NULL,
    "buy_limit" INTEGER NOT NULL,
    "exp_day" INTEGER NOT NULL,
    "icon" TEXT,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
