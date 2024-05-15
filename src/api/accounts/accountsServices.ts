export const accountsService = {
  create: async () => {
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

  archive: async () => {
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

  delete: async () => {
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

  edit: async () => {
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
};
