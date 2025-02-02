import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Router } from 'express';

import { createApiRequest, createApiResponse } from '@/api-docs/openAPIResponseBuilders';

import { TransactionSchema, TransactionSchemAPI } from './transactionsModel';
import { transactionsController } from './transactionsController';
import { validateRequest } from '@/common/utils/httpHandlers';

export const transactionsRegistry = new OpenAPIRegistry();

transactionsRegistry.register('Transactions', TransactionSchema);

export const transactionsRouter: Router = (() => {
  const router = express.Router();

  transactionsRegistry.registerPath({
    method: 'post',
    path: '/v1/transactions',
    tags: ['Transactions'],
    request: createApiRequest(TransactionSchema, 'Success'),
    responses: createApiResponse(TransactionSchema, 'Success'),
  });

  router.post('/', validateRequest(TransactionSchemAPI), transactionsController.handleCreateTransaction);

  return router;
})();
