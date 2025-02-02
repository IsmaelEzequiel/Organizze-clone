import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { createApiRequest, createApiResponse, createApiResponses } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

import {
  AccountSchema,
  AccountSchemaAPI,
  CreateAccountSchema,
  CreateAccountSchemaAPI,
  GetAccountSchemaAPI,
} from './accountsModel';
import { accountsService } from './accountsServices';

export const accountRegistry = new OpenAPIRegistry();

accountRegistry.register('Accounts', AccountSchema);

export const accountRouter: Router = (() => {
  const router = express.Router();

  accountRegistry.registerPath({
    method: 'get',
    path: '/v1/accounts/user/{userId}',
    tags: ['Accounts'],
    request: { params: GetAccountSchemaAPI.shape.params },
    responses: createApiResponses([
      { schema: z.array(AccountSchema), description: 'Success', statusCode: StatusCodes.OK },
      { schema: z.literal(null), description: 'Unauthorized', statusCode: StatusCodes.UNAUTHORIZED },
    ]),
  });

  router.get('/user/:userId', async (req: Request, res: Response) => {
    const authResponse = await accountsService.findAll(req.params.userId);
    handleServiceResponse(authResponse, res);
  });

  accountRegistry.registerPath({
    method: 'get',
    path: '/v1/accounts/{id}',
    tags: ['Accounts'],
    responses: createApiRequest(AccountSchema, 'Success'),
  });

  router.get('/:id', async (req: Request, res: Response) => {
    const authResponse = await accountsService.findUniqueAll(req.params.id);
    handleServiceResponse(authResponse, res);
  });

  accountRegistry.registerPath({
    method: 'post',
    path: '/v1/accounts',
    tags: ['Accounts'],
    request: createApiRequest(CreateAccountSchema, 'Success'),
    responses: createApiResponse(AccountSchema, 'Success'),
  });

  router.post('/', validateRequest(CreateAccountSchemaAPI), async (req: Request, res: Response) => {
    const authResponse = await accountsService.create(req.body);
    handleServiceResponse(authResponse, res);
  });

  accountRegistry.registerPath({
    method: 'post',
    path: '/v1/accounts/archive/{id}',
    tags: ['Accounts'],
    responses: createApiRequest(AccountSchema, 'Success'),
  });

  router.post('/archive/:id', async (req: Request, res: Response) => {
    const authResponse = await accountsService.archive(req.params.id);
    handleServiceResponse(authResponse, res);
  });

  accountRegistry.registerPath({
    method: 'put',
    path: '/v1/accounts/{id}',
    tags: ['Accounts'],
    request: createApiRequest(AccountSchema, 'Success'),
    responses: createApiResponse(AccountSchema, 'Success'),
  });

  router.put('/:id', validateRequest(AccountSchemaAPI), async (req: Request, res: Response) => {
    const authResponse = await accountsService.update(req.params.id, req.body);
    handleServiceResponse(authResponse, res);
  });

  accountRegistry.registerPath({
    method: 'delete',
    path: '/v1/accounts/{id}',
    tags: ['Accounts'],
    responses: createApiResponse(AccountSchema, 'Success'),
  });

  router.delete('/:id', validateRequest(AccountSchemaAPI), async (req: Request, res: Response) => {
    const authResponse = await accountsService.delete(req.params.id);
    handleServiceResponse(authResponse, res);
  });

  return router;
})();
