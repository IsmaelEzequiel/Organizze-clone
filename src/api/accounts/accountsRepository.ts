import prisma from '@/config/prisma';

import { Account, CreateAccount, EditAccount } from './accountsModel';

export const accountsRepository = {
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

  editAsync: async (params: Account) => {
    const acc = await prisma.accounts.update({
      where: {
        id: params.id,
      },
      data: {
        title: params.title,
        userId: params.userId,
        balance: params.balance,
        icon: params.icon,
        sum_balance: params.sum_balance,
        currency_code: params.currency_code,
      },
    });
    return acc;
  },
};
