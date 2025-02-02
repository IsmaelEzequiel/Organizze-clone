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
        return ServiceResponse.failure('Email or password incorrect', null, StatusCodes.BAD_REQUEST);
      }
      return ServiceResponse.success<AuthLogin>('Success', info);
    } catch (error) {
      const errorMessage = `Error while signIn: $${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(errorMessage, null);
    }
  },

  signUp: async (params: CreateUser): Promise<ServiceResponse<string | null>> => {
    try {
      const info = await authRepository.signUpAsync(params);
      if (!info) {
        return ServiceResponse.failure(
          ResponseStatus.Failed,
          'Something went wrong, please try again later',
          null,
          StatusCodes.BAD_REQUEST
        );
      }
      return ServiceResponse.success<string | null>('Success', info);
    } catch (error) {
      const errorMessage = `Error while sign up: $${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(errorMessage, null);
    }
  },
};
