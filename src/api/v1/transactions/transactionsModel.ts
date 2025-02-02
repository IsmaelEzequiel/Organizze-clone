import { z } from 'zod';
import { Interval } from '@prisma/client';

export const TransactionSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  accountId: z.string().optional().nullable(),
  cardId: z.string().optional().nullable(),
  invoiceId: z.string().optional().nullable(),
  amount: z.number().positive(),
  description: z.string().default(''),
  category: z.string().min(1, 'Category is required'),
  date: z.string().transform((val) => new Date(val)),
  tags: z.array(z.string()),
  isExpense: z.boolean().default(true),
  installments: z.number().int().positive().nullable(),
  installmentIndex: z.number().int().positive().nullable(),
  paid: z.boolean().default(false),
  recurring: z.boolean().default(false),
  recurringInterval: z.nativeEnum(Interval).nullable().optional(),
  nextPaymentDate: z.string().transform((val) => (val ? new Date(val) : null)),
});

export const TransactionSchemAPI = z.object({
  body: TransactionSchema,
});

export const GetTransactionSchemaAPI = z.object({
  params: z.object({
    userId: z.string().optional(),
    cardId: z.string().optional(),
    accountId: z.string().optional(),
    invoiceId: z.string().optional(),
  }),
});

export type Transactions = z.infer<typeof TransactionSchema>;
