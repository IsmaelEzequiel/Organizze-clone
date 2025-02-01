import prisma from '@/config/prisma';

import { Account, CreateAccount } from './accountsModel';

export const accountsRepository = {
  findAllAsync: async (userId: string) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return 'User not found';
    }

    const acc = await prisma.accounts.findMany({
      where: {
        userId: userId,
        is_deleted: null,
      },
    });

    return acc;
  },

  createAsync: async (params: CreateAccount) => {
    const acc = await prisma.accounts.create({ data: params });
    return acc;
  },

  archiveAsync: async (id: string) => {
    const acc = await prisma.accounts.update({
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
    const acc = await prisma.accounts.delete({
      where: {
        id: id,
      },
    });

    return acc;
  },

  updateAsync: async (accountId: string, params: Account) => {
    const acc = await prisma.accounts.update({
      where: {
        id: accountId,
      },
      data: {
        title: params.title,
        balance: params.balance,
        icon: params.icon,
        sum_balance: params.sum_balance,
        currency_code: params.currency_code,
      },
    });
    return acc;
  },
};
