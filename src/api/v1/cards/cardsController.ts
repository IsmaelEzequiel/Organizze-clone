import { handleServiceResponse } from '@/common/utils/httpHandlers';
import { CardsService, cardsService } from './cardsServices';
import { Request, Response } from 'express';

class CardsController {
  private services: CardsService;

  constructor(services: CardsService) {
    this.services = services;
  }

  getInvoice = async (req: Request, res: Response) => {
    const { month, year } = req.query;
    const { id: cardId } = req.params;

    const monthInt = parseInt(month as string);
    const yearInt = parseInt(year as string);

    const params = { cardId, month: monthInt, year: yearInt };

    const invoicesResponse = await this.services.getInvoice(params);

    handleServiceResponse(invoicesResponse, res);
  };
}

const cardsController = new CardsController(cardsService);

export { cardsController };
