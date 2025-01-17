import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

import { Account, CreateAccount } from './accountsModel';
import { accountsRepository } from './accountsRepository';

export const accountsService = {
  findAll: async (userId: string): Promise<ServiceResponse<Account[] | null>> => {
    try {
      const accounts = await accountsRepository.findAllAsync(userId);
      return new ServiceResponse<Account[]>(ResponseStatus.Success, 'Success', accounts, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error creating account: $${(error as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  create: async (params: CreateAccount): Promise<ServiceResponse<Account | null>> => {
    try {
      const accounts = await accountsRepository.createAsync(params);
      if (!accounts) {
        return new ServiceResponse(ResponseStatus.Failed, 'User not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Account>(ResponseStatus.Success, 'Success', accounts, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error creating account: $${(error as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  archive: async (params: string): Promise<ServiceResponse<Account | null>> => {
    try {
      const info = await accountsRepository.archiveAsync(params);
      return new ServiceResponse<Account>(ResponseStatus.Success, 'Success', info, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error while archive: $${(error as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  delete: async (params: string): Promise<ServiceResponse<Account | null>> => {
    try {
      const info = await accountsRepository.deleteAsync(params);
      return new ServiceResponse<Account>(ResponseStatus.Success, 'Success', info, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error while deleting: $${(error as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  update: async (accountId: string, params: Account): Promise<ServiceResponse<Account | null>> => {
    try {
      const info = await accountsRepository.updateAsync(accountId, params);
      return new ServiceResponse<Account>(ResponseStatus.Success, 'Success', info, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error while editing: $${(error as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
