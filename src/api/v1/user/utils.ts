import { NextFunction, Request, Response } from 'express';

export const convertBirthDate = (req: Request, res: Response, next: NextFunction) => {
  if (req.body && req.body.birth_date) {
    req.body.birth_date = new Date(req.body.birth_date);
  }
  next();
};
