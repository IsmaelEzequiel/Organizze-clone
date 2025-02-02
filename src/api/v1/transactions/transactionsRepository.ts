import prisma from '@/config/prisma';
import { Transactions } from './transactionsModel';

export class TransactionsRepository {
  async getTransactions(cardId: string, startDate: Date, endDate: Date) {
    const data = await prisma.transactions.findMany({
      where: {
        invoiceId: null,
        cardId,
        date: { gte: startDate, lte: endDate },
      },
    });

    return data;
  }

  async create(transactions: Transactions) {
    const data = await prisma.transactions.create({
      data: transactions,
    });
    return data;
  }
}
