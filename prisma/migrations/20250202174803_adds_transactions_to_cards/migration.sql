-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "cardId" TEXT;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;
