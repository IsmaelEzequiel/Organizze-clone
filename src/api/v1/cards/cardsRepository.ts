import prisma from '@/config/prisma';

import { Cards, CreateCardsDto } from './cardsModel';

export class CardsRepository {
  async findAllByUserId(id: string) {
    const acc = await prisma.cards.findMany({
      where: {
        userId: id,
        deletedAt: null,
      },
    });
    return acc;
  }

  async findById(id: string) {
    const acc = await prisma.cards.findUnique({
      where: { id },
    });
    return acc;
  }

  async create(params: CreateCardsDto) {
    const acc = await prisma.cards.create({ data: params });
    return acc;
  }

  async softDelete(id: string) {
    const acc = await prisma.cards.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date().toISOString(),
      },
    });
    return acc;
  }

  async deleteById(id: string) {
    const acc = await prisma.cards.delete({
      where: {
        id: id,
      },
    });
    return acc;
  }

  async updateById(id: string, params: Cards) {
    const acc = await prisma.cards.update({
      where: {
        id: id,
      },
      data: {
        title: params.title,
        limit: params.limit,
        currency_code: params.currency_code,
        buy_limit: params.buy_limit,
        exp_day: params.exp_day,
        icon: params.icon,
      },
    });
    return acc;
  }

  async getInvoices(params: InvoicesParams) {
    const data = await prisma.invoice.findFirst({
      where: { cardId: params.cardId, month: params.month, year: params.year },
      include: { transactions: true },
    });

    return data;
  }

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
}
