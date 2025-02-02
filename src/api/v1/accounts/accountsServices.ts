import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

import { Account, CreateAccount } from './accountsModel';
import { accountsRepository } from './accountsRepository';

export const accountsService = {
  findAll: async (userId: string): Promise<ServiceResponse<Account[] | null | string>> => {
    try {
      const accounts = await accountsRepository.findAllAsync(userId);
      if (!accounts) {
        return ServiceResponse.success<Account[]>('Account not found', accounts);
      }
      if (typeof accounts === 'string') {
        return ServiceResponse.success<Account[] | string>('User not found', []);
      }
      return ServiceResponse.success<Account[]>('Success', accounts);
    } catch (error) {
      const errorMessage = `Error creating account: $${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(errorMessage, null);
    }
  },

  findUniqueAll: async (id: string): Promise<ServiceResponse<Account | null>> => {
    try {
      const accounts = await accountsRepository.findUniqueAsync(id);
      return ServiceResponse.success<Account | null>('Success', accounts);
    } catch (error) {
      const errorMessage = `Error creating account: $${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(errorMessage, null);
    }
  },

  create: async (params: CreateAccount): Promise<ServiceResponse<Account | null>> => {
    try {
      const accounts = await accountsRepository.createAsync(params);
      return ServiceResponse.success<Account>('Success', accounts);
    } catch (error) {
      const errorMessage = `Error creating account: $${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(errorMessage, null);
    }
  },

  archive: async (params: string): Promise<ServiceResponse<Account | null>> => {
    try {
      const info = await accountsRepository.archiveAsync(params);
      return ServiceResponse.success<Account>('Success', info);
    } catch (error) {
      const errorMessage = `Error while archive: $${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(errorMessage, null);
    }
  },

  delete: async (params: string): Promise<ServiceResponse<Account | null>> => {
    try {
      const info = await accountsRepository.deleteAsync(params);
      return ServiceResponse.success<Account>('Success', info);
    } catch (error) {
      const errorMessage = `Error while deleting: $${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(errorMessage, null);
    }
  },

  update: async (accountId: string, params: Account): Promise<ServiceResponse<Account | null>> => {
    try {
      const info = await accountsRepository.updateAsync(accountId, params);
      return ServiceResponse.success<Account>('Success', info);
    } catch (error) {
      const errorMessage = `Error while editing: $${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(errorMessage, null);
    }
  },
};
