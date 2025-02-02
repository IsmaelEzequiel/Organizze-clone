import { StatusCodes } from 'http-status-codes';

import { CreateUser, UserWithoutPasswordType } from '@/api/v1/user/userModel';
import { userRepository } from '@/api/v1/user/userRepository';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

export const userService = {
  // Retrieves all users from the database
  findAll: async (): Promise<ServiceResponse<UserWithoutPasswordType[] | null>> => {
    try {
      const users = await userRepository.findAllAsync();
      if (!users.length) {
        return ServiceResponse.failure('No Users found', null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<UserWithoutPasswordType[]>('Users found', users);
    } catch (error) {
      const errorMessage = `Error finding all users: $${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(errorMessage, null);
    }
  },

  // Retrieves a single user by their ID
  findById: async (id: string): Promise<ServiceResponse<UserWithoutPasswordType | null>> => {
    try {
      const user = await userRepository.findByIdAsync(id);
      if (!user) {
        return ServiceResponse.failure('User not found', null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<UserWithoutPasswordType>('User found', user);
    } catch (error) {
      const errorMessage = `Error finding user with id ${id}:, ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(errorMessage, null);
    }
  },

  createUser: async (params: CreateUser): Promise<ServiceResponse<UserWithoutPasswordType | null>> => {
    try {
      const user = await userRepository.createUserAsync(params);
      if (!user) {
        return ServiceResponse.failure('Failed to create user', null, StatusCodes.BAD_REQUEST);
      }
      return ServiceResponse.success<UserWithoutPasswordType>('User created', user);
    } catch (error) {
      const errorMessage = `Error creating a user, ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(errorMessage, null);
    }
  },
};
