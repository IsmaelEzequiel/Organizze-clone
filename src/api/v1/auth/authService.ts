import { StatusCodes } from 'http-status-codes';

import { AuthLogin, LoginSchemaType } from '@/api/v1/auth/authModel';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

import { CreateUser } from '../user/userModel';
import { authRepository } from './authRepository';

export const authService = {
  signIn: async (params: LoginSchemaType): Promise<ServiceResponse<AuthLogin | null>> => {
    try {
      const info = await authRepository.signInAsync(params);
      if (!info) {
        return new ServiceResponse(ResponseStatus.Failed, 'Email or password incorrect', null, StatusCodes.BAD_REQUEST);
      }
      return new ServiceResponse<AuthLogin>(ResponseStatus.Success, 'Success', info, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error while signIn: $${(error as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  signUp: async (params: CreateUser): Promise<ServiceResponse<string | null>> => {
    try {
      const info = await authRepository.signUpAsync(params);
      if (!info) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          'Something went wrong, please try again later',
          null,
          StatusCodes.BAD_REQUEST
        );
      }
      return new ServiceResponse<string | null>(ResponseStatus.Success, 'Success', info, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error while sign up: $${(error as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
