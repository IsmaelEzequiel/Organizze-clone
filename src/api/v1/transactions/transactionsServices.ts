import { ServiceResponse } from '@/common/models/serviceResponse';
import { Transactions } from './transactionsModel';
import { TransactionsRepository } from './transactionsRepository';
import { logger } from '@/server';

class TransactionsService {
  private repository: TransactionsRepository;

  constructor(repository: TransactionsRepository) {
    this.repository = repository;
  }

  async createTransaction(params: Transactions): Promise<ServiceResponse<Transactions | null>> {
    try {
      const data = await this.repository.create(params);
      return ServiceResponse.success('success', data);
    } catch (error) {
      const errorMessage = `Error search for invoice: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(errorMessage, null);
    }
  }
}

const transactionsService = new TransactionsService(new TransactionsRepository());

export { transactionsService, TransactionsService };
