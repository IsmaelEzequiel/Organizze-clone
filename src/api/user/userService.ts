import { StatusCodes } from 'http-status-codes';

import { CreateUser, UserWithoutPasswordType } from '@/api/user/userModel';
import { userRepository } from '@/api/user/userRepository';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

export const userService = {
  // Retrieves all users from the database
  findAll: async (): Promise<ServiceResponse<UserWithoutPasswordType[] | null>> => {
    try {
      const users = await userRepository.findAllAsync();
      if (!users.length) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Users found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<UserWithoutPasswordType[]>(
        ResponseStatus.Success,
        'Users found',
        users,
        StatusCodes.OK
      );
    } catch (error) {
      const errorMessage = `Error finding all users: $${(error as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  // Retrieves a single user by their ID
  findById: async (id: number): Promise<ServiceResponse<UserWithoutPasswordType | null>> => {
    try {
      const user = await userRepository.findByIdAsync(id);
      if (!user) {
        return new ServiceResponse(ResponseStatus.Failed, 'User not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<UserWithoutPasswordType>(ResponseStatus.Success, 'User found', user, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error finding user with id ${id}:, ${(error as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  createUser: async (params: CreateUser): Promise<ServiceResponse<UserWithoutPasswordType | null>> => {
    try {
      const user = await userRepository.createUserAsync(params);
      if (!user) {
        return new ServiceResponse(ResponseStatus.Failed, 'Failed to create user', null, StatusCodes.BAD_REQUEST);
      }
      return new ServiceResponse<UserWithoutPasswordType>(
        ResponseStatus.Success,
        'User created',
        user,
        StatusCodes.CREATED
      );
    } catch (error) {
      const errorMessage = `Error creating a user, ${(error as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
