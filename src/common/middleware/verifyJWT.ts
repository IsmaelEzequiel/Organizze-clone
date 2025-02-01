import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { TokenType } from '@/api/v1/auth/authModel';

import { ResponseStatus, ServiceResponse } from '../models/serviceResponse';
import { env } from '../utils/envConfig';
import { handleServiceResponse } from '../utils/httpHandlers';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    const response = new ServiceResponse(ResponseStatus.Failed, 'No token provided', null, StatusCodes.UNAUTHORIZED);
    return handleServiceResponse(response, res);
  }

  jwt.verify(token, env.SECRET_KEY, (err, decoded) => {
    if (err) {
      const response = new ServiceResponse(
        ResponseStatus.Failed,
        'Failed to authenticate token',
        { authenticated: false },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
      return handleServiceResponse(response, res);
    }

    req.userId = (decoded as TokenType).id;
    next();
  });
};
