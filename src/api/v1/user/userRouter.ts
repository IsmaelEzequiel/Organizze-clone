import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { GetUserSchemaAPI, UserSchema } from '@/api/v1/user/userModel';
import { userService } from '@/api/v1/user/userService';
import { createApiResponse, createApiResponses } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

export const userRegistry = new OpenAPIRegistry();

userRegistry.register('User', UserSchema);

export const userRouter: Router = (() => {
  const router = express.Router();

  userRegistry.registerPath({
    method: 'get',
    path: '/v1/users',
    tags: ['User'],
    responses: createApiResponses([
      { schema: z.array(UserSchema), description: 'Success', statusCode: StatusCodes.OK },
      { schema: z.literal(null), description: 'Unauthorized', statusCode: StatusCodes.UNAUTHORIZED },
    ]),
  });

  router.get('/', async (_req: Request, res: Response) => {
    const serviceResponse = await userService.findAll();
    handleServiceResponse(serviceResponse, res);
  });

  userRegistry.registerPath({
    method: 'get',
    path: '/v1/users/{id}',
    tags: ['User'],
    request: { params: GetUserSchemaAPI.shape.params },
    responses: createApiResponse(UserSchema, 'Success'),
  });

  router.get('/:id', validateRequest(GetUserSchemaAPI), async (req: Request, res: Response) => {
    const id = req.params.id;
    const serviceResponse = await userService.findById(id);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
