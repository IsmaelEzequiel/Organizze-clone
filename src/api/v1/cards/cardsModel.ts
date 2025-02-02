import { z } from 'zod';
import { TransactionSchema } from '../transactions/transactionsModel';

export const CardSchema = z.object({
  id: z.string(),
  deletedAt: z.date().nullish(),
  userId: z.string(),
  title: z.string(),
  limit: z.number(),
  currency_code: z.string(),
  buy_limit: z.number(),
  exp_day: z.number(),
  icon: z.string().nullable(),
});

export const CreateCardSchema = CardSchema.pick({
  userId: true,
  title: true,
  limit: true,
  currency_code: true,
  buy_limit: true,
  exp_day: true,
  icon: true,
});

export const CardSchemAPI = z.object({
  body: z.object({
    id: z.string().optional(),
    deletedAt: z.date().nullish(),
    userId: z.string(),
    title: z.string(),
    limit: z.number(),
    currency_code: z.string(),
    buy_limit: z.number(),
    exp_day: z.number(),
    icon: z.string().nullable(),
  }),
});

export const InvoiceSchema = z.object({
  id: z.string(),
  cardId: z.string(),
  month: z.number(),
  year: z.number(),
  due_date: z.date(),
  close_date: z.date(),
  paid: z.boolean(),
  amount_due: z.number(),
  amount_paid: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  transactions: z.array(TransactionSchema).optional(),
});

export const GetCardSchemaAPI = z.object({
  params: z.object({ id: z.string() }),
});

export const GetInvoiceSchemaAPI = z.object({
  query: z.object({
    month: z.string(),
    year: z.string(),
  }),
});

export type Invoices = z.infer<typeof InvoiceSchema>;

export type Cards = z.infer<typeof CardSchema>;

export type CreateCardsDto = z.infer<typeof CreateCardSchema>;
