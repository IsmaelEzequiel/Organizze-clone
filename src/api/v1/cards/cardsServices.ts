import { StatusCodes } from 'http-status-codes';
import { addMonths, endOfMonth, startOfMonth } from 'date-fns';

import { ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

import { Cards, CreateCardsDto, Invoices } from './cardsModel';
import { CardsRepository } from './cardsRepository';

class CardsService {
  private repository: CardsRepository;

  constructor(repository: CardsRepository) {
    this.repository = repository;
  }

  getInvoice = async (params: InvoicesParams): Promise<ServiceResponse<Invoices | null>> => {
    try {
      let invoice = await this.repository.getInvoices(params);

      if (!invoice) {
        invoice = await this.generateTemporaryInvoice(params);
      }

      return ServiceResponse.success('success', invoice);
    } catch (error) {
      const errorMessage = `Error search for invoice: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(errorMessage, null);
    }
  };

  private generateTemporaryInvoice = async (params: InvoicesParams) => {
    const card = await this.repository.findById(params.cardId);

    if (!card) throw new Error('Cartão não encontrado');

    const closingDate = new Date(params.year, params.month - 1, card.exp_day); // fechamento da fatura
    const dueDate = addMonths(closingDate, 1); // vence no próximo mês

    const startDate = startOfMonth(closingDate);
    const endDate = endOfMonth(closingDate);

    const transactions = await this.repository.getTransactions(card.id, startDate, endDate);

    const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);

    // fatura temporária
    return {
      id: 'temporary',
      cardId: params.cardId,
      month: params.month,
      year: params.year,
      due_date: dueDate,
      close_date: closingDate,
      paid: false,
      amount_due: totalAmount,
      amount_paid: 0,
      transactions,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  findAllByUserId = async (id: string): Promise<ServiceResponse<Cards[] | null>> => {
    try {
      const data = await this.repository.findAllByUserId(id);
      return ServiceResponse.success<Cards[]>('Success', data);
    } catch (error) {
      const errorMessage = `Error creating card: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(errorMessage, null);
    }
  };

  findUnique = async (id: string): Promise<ServiceResponse<Cards | null>> => {
    try {
      const data = await this.repository.findById(id);
      if (!data) {
        return ServiceResponse.failure<Cards | null>('Not found', data, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Cards>('Success', data);
    } catch (error) {
      const errorMessage = `Error creating card: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(errorMessage, null);
    }
  };

  create = async (params: CreateCardsDto): Promise<ServiceResponse<Cards | null>> => {
    try {
      const data = await this.repository.create(params);
      return ServiceResponse.success<Cards>('Success', data);
    } catch (error) {
      const errorMessage = `Error creating card: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(errorMessage, null);
    }
  };

  archive = async (id: string): Promise<ServiceResponse<Cards | null>> => {
    try {
      const info = await this.repository.softDelete(id);
      return ServiceResponse.success<Cards>('Success', info);
    } catch (error) {
      const errorMessage = `Error while archive: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(errorMessage, null);
    }
  };

  delete = async (params: string): Promise<ServiceResponse<Cards | null>> => {
    try {
      const info = await this.repository.deleteById(params);
      return ServiceResponse.success<Cards>('Success', info);
    } catch (error) {
      const errorMessage = `Error while deleting: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(errorMessage, null);
    }
  };

  update = async (id: string, params: Cards): Promise<ServiceResponse<Cards | null>> => {
    try {
      const info = await this.repository.updateById(id, params);
      return ServiceResponse.success<Cards>('Success', info);
    } catch (error) {
      const errorMessage = `Error while editing: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(errorMessage, null);
    }
  };
}

const cardsService = new CardsService(new CardsRepository());

export { cardsService, CardsService };
