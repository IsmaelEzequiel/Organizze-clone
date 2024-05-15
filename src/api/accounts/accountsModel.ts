import { z } from 'zod';

export const CreditCardSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  is_deleted: z.date().optional(),
  userId: z.string(),
  title: z.string(),
  limit: z.number(),
  currency_code: z.string(),
  buy_limit: z.number(),
  exp_day: z.number(),
  icon: z.string().nullable(),
});

export const AccountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  balance: z.number(),
  icon: z.string(),
  is_deleted: z.date().optional(),
  sum_balance: z.boolean().default(false),
  currency_code: z.string(),
  creditCards: z.array(CreditCardSchema),
});

const CreateAccountSchema = AccountSchema.pick({
  title: true,
  icon: true,
  sum_balance: true,
  userId: true,
  currency_code: true,
});

export type Account = z.infer<typeof AccountSchema>;

export type CreateAccount = z.infer<typeof CreateAccountSchema>;
