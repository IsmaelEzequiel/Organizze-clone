import { CreateUser, User } from '@/api/v1/user/userModel';
import { UserWithoutPasswordType } from '@/api/v1/user/userModel';
import { excludeFromList, excludeFromObject } from '@/common/utils/excludeField';
import prisma from '@/config/prisma';

export const userRepository = {
  findAllAsync: async (): Promise<UserWithoutPasswordType[]> => {
    const users = await prisma.user.findMany({ orderBy: { id: 'desc' } });
    return excludeFromList(users, ['password']);
  },

  findByIdAsync: async (id: number): Promise<UserWithoutPasswordType | null> => {
    const user = await prisma.user.findUnique({ where: { id: `${id}` } });
    return user ? excludeFromObject(user, ['password']) : null;
  },

  // User internal -> returns user password
  findByEmail: async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { email: email } });
  },

  createUserAsync: async (params: CreateUser): Promise<UserWithoutPasswordType | null> => {
    const user = await prisma.user.create({ data: params });
    return user ? excludeFromObject(user, ['password']) : null;
  },
};
