import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';

import { createApiRequest, createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

import { CardSchema, CardSchemAPI, GetCardSchemaAPI, GetInvoiceSchemaAPI, InvoiceSchema } from './cardsModel';
import { cardsService } from './cardsServices';
import { cardsController } from './cardsController';

export const cardsRegistry = new OpenAPIRegistry();

cardsRegistry.register('Cards', CardSchema);
cardsRegistry.register('Invoices', InvoiceSchema);

export const cardsRouter: Router = (() => {
  const router = express.Router();

  cardsRegistry.registerPath({
    method: 'get',
    path: '/v1/cards/user/{userId}',
    tags: ['Cards'],
    responses: createApiResponse(CardSchema, 'Success'),
  });

  router.get('/user/:id', async (req: Request, res: Response) => {
    const authResponse = await cardsService.findAllByUserId(req.params.id);
    handleServiceResponse(authResponse, res);
  });

  cardsRegistry.registerPath({
    method: 'get',
    path: '/v1/cards/{id}',
    tags: ['Cards'],
    request: { params: GetCardSchemaAPI.shape.params },
    responses: createApiResponse(CardSchema, 'Success'),
  });

  router.get('/:id', async (req: Request, res: Response) => {
    const authResponse = await cardsService.findUnique(req.params.id);
    handleServiceResponse(authResponse, res);
  });

  cardsRegistry.registerPath({
    method: 'post',
    path: '/v1/cards',
    tags: ['Cards'],
    responses: createApiResponse(CardSchema, 'Success'),
  });

  router.post('/', validateRequest(CardSchemAPI), async (req: Request, res: Response) => {
    const authResponse = await cardsService.create(req.body);
    handleServiceResponse(authResponse, res);
  });

  cardsRegistry.registerPath({
    method: 'post',
    path: '/v1/cards/archive/{id}',
    tags: ['Cards'],
    request: { params: GetCardSchemaAPI.shape.params },
    responses: createApiRequest(CardSchema, 'Success'),
  });

  router.post('/archive', async (req: Request, res: Response) => {
    const authResponse = await cardsService.archive(req.body);
    handleServiceResponse(authResponse, res);
  });

  cardsRegistry.registerPath({
    method: 'put',
    path: '/v1/cards/{id}',
    tags: ['Cards'],
    request: createApiRequest(CardSchema, 'Success'),
    responses: createApiResponse(CardSchema, 'Success'),
  });

  router.put('/:id', validateRequest(CardSchemAPI), async (req: Request, res: Response) => {
    const authResponse = await cardsService.update(req.params.id, req.body);
    handleServiceResponse(authResponse, res);
  });

  cardsRegistry.registerPath({
    method: 'delete',
    path: '/v1/cards/{id}',
    tags: ['Cards'],
    responses: createApiResponse(CardSchema, 'Success'),
  });

  router.delete('/:id', validateRequest(CardSchemAPI), async (req: Request, res: Response) => {
    const authResponse = await cardsService.delete(req.params.id);
    handleServiceResponse(authResponse, res);
  });

  // Invoices
  cardsRegistry.registerPath({
    method: 'get',
    path: '/v1/cards/{cardId}/invoices',
    tags: ['Invoice'],
    request: { query: GetInvoiceSchemaAPI.shape.query, params: GetCardSchemaAPI.shape.params },
    responses: createApiResponse(InvoiceSchema, 'Success'),
  });

  router.get('/:id/invoices', validateRequest(GetInvoiceSchemaAPI), cardsController.getInvoice);

  return router;
})();
