import prisma from '@/config/prisma';

import { Cards, CreateCards } from './cardsModel';

export const cardsRepository = {
  findAllAsync: async () => {
    const acc = await prisma.cards.findMany({
      where: {
        is_deleted: null,
      },
    });
    return acc;
  },

  findAsync: async (id: string) => {
    const acc = await prisma.cards.findUnique({
      where: {
        id: id,
      },
    });
    return acc;
  },

  createAsync: async (params: CreateCards) => {
    const acc = await prisma.cards.create({ data: params });
    return acc;
  },

  archiveAsync: async (id: string) => {
    const acc = await prisma.cards.update({
      where: {
        id: id,
      },
      data: {
        is_deleted: new Date().toISOString(),
      },
    });

    return acc;
  },

  deleteAsync: async (id: string) => {
    const acc = await prisma.cards.delete({
      where: {
        id: id,
      },
    });

    return acc;
  },

  updateAsync: async (id: string, params: Cards) => {
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
  },
};
