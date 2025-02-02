import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { TokenType } from '@/api/v1/auth/authModel';

import { ServiceResponse } from '../models/serviceResponse';
import { env } from '../utils/envConfig';
import { handleServiceResponse } from '../utils/httpHandlers';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    const response = ServiceResponse.failure('No token provided', null, StatusCodes.UNAUTHORIZED);
    handleServiceResponse(response, res);
  } else {
    jwt.verify(token, env.SECRET_KEY, (err, decoded) => {
      if (err) {
        const response = ServiceResponse.failure(
          'Failed to authenticate token',
          { authenticated: false },
          StatusCodes.INTERNAL_SERVER_ERROR
        );
        handleServiceResponse(response, res);
      }

      req.userId = (decoded as TokenType).id;
      next();
    });
  }
};
