import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';

import { AuthLoginSchema, AuthLoginSchemAPI } from '@/api/v1/auth/authModel';
import { createApiRequest, createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

import { CreateUserSchema, CreateUserSchemaAPI } from '../user/userModel';
import { convertBirthDate } from '../user/utils';
import { authService } from './authService';

export const authRegistry = new OpenAPIRegistry();

// reset password - later
// confirm account - later

authRegistry.register('Authentication', AuthLoginSchema);

export const authRouter: Router = (() => {
  const router = express.Router();

  authRegistry.registerPath({
    method: 'post',
    path: '/v1/auth/login',
    tags: ['Authentication'],
    request: createApiRequest(AuthLoginSchemAPI.shape.body, 'Success'),
    responses: createApiResponse(AuthLoginSchema, 'Success'),
  });

  router.post('/login', validateRequest(AuthLoginSchemAPI), async (req: Request, res: Response) => {
    const authResponse = await authService.signIn(req.body);
    handleServiceResponse(authResponse, res);
  });

  authRegistry.registerPath({
    method: 'post',
    path: '/v1/auth/signup',
    tags: ['Authentication'],
    request: createApiRequest(CreateUserSchema, 'Success'),
    responses: createApiResponse(AuthLoginSchema, 'Success'),
  });

  router.post(
    '/signup',
    convertBirthDate,
    validateRequest(CreateUserSchemaAPI),
    async (req: Request, res: Response) => {
      const authResponse = await authService.signUp(req.body);
      handleServiceResponse(authResponse, res);
    }
  );

  authRegistry.registerPath({
    method: 'post',
    path: '/v1/auth/logout',
    tags: ['Authentication'],
    responses: createApiRequest(AuthLoginSchema, 'Success'),
  });

  router.post('/logout', async (_req: Request, res: Response) => {
    res.json({ authenticated: false, token: null });
  });

  return router;
})();
