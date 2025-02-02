import { z } from 'zod';

export const AccountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  balance: z.number(),
  icon: z.string(),
  deletedAt: z.date().nullish(),
  sum_balance: z.boolean().default(false),
  currency_code: z.string(),
});

export const CreateAccountSchema = AccountSchema.pick({
  title: true,
  icon: true,
  sum_balance: true,
  userId: true,
  balance: true,
  currency_code: true,
});

export const AccountSchemaAPI = z.object({
  body: z.object({
    userId: z.string(),
    title: z.string(),
    balance: z.number(),
    icon: z.string(),
    deletedAt: z.date().nullish(),
    sum_balance: z.boolean().default(false),
    currency_code: z.string(),
  }),
});

export const CreateAccountSchemaAPI = z.object({
  body: CreateAccountSchema,
});

export const GetAccountSchemaAPI = z.object({
  params: z.object({ userId: z.string() }),
});

export const ArchiveSchemaAPI = z.object({
  params: z.object({ id: z.string() }),
});

export type Account = z.infer<typeof AccountSchema>;

export type CreateAccount = z.infer<typeof CreateAccountSchema>;
