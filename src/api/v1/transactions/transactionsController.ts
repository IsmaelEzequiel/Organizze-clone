import { handleServiceResponse } from '@/common/utils/httpHandlers';
import { Request, Response } from 'express';
import { TransactionsService, transactionsService } from './transactionsServices';

class TransactionsController {
  private services: TransactionsService;

  constructor(services: TransactionsService) {
    this.services = services;
  }

  handleCreateTransaction = async (req: Request, res: Response) => {
    const body = {
      ...req.body,
      date: new Date(req.body.date),
      nextPaymentDate: req.body.nextPaymentDate ? new Date(req.body.nextPaymentDate) : null,
    };

    const data = await this.services.createTransaction(body);
    handleServiceResponse(data, res);
  };
}

const transactionsController = new TransactionsController(transactionsService);

export { transactionsController };
