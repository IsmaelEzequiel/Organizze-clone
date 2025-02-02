import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

import { Cards, CreateCards } from './cardsModel';
import { cardsRepository } from './cardsRepository';

export const cardsService = {
  findAll: async (): Promise<ServiceResponse<Cards[] | null>> => {
    try {
      const data = await cardsRepository.findAllAsync();
      return new ServiceResponse<Cards[]>(ResponseStatus.Success, 'Success', data, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error creating card: $${(error as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  findUnique: async (id: string): Promise<ServiceResponse<Cards | null>> => {
    try {
      const data = await cardsRepository.findAsync(id);
      if (!data) {
        return new ServiceResponse<Cards | null>(ResponseStatus.Failed, 'Not found', data, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Cards>(ResponseStatus.Success, 'Success', data, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error creating card: $${(error as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  create: async (params: CreateCards): Promise<ServiceResponse<Cards | null>> => {
    try {
      const data = await cardsRepository.createAsync(params);
      return new ServiceResponse<Cards>(ResponseStatus.Success, 'Success', data, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error creating card: $${(error as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  archive: async (id: string): Promise<ServiceResponse<Cards | null>> => {
    try {
      const info = await cardsRepository.archiveAsync(id);
      return new ServiceResponse<Cards>(ResponseStatus.Success, 'Success', info, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error while archive: $${(error as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  delete: async (params: string): Promise<ServiceResponse<Cards | null>> => {
    try {
      const info = await cardsRepository.deleteAsync(params);
      return new ServiceResponse<Cards>(ResponseStatus.Success, 'Success', info, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error while deleting: $${(error as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  update: async (id: string, params: Cards): Promise<ServiceResponse<Cards | null>> => {
    try {
      const info = await cardsRepository.updateAsync(id, params);
      return new ServiceResponse<Cards>(ResponseStatus.Success, 'Success', info, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error while editing: $${(error as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
