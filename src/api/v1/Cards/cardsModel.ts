import { z } from 'zod';

export const CardSchema = z.object({
  id: z.string(),
  deletedAt: z.date().nullish(),
  userId: z.string(),
  title: z.string(),
  limit: z.number(),
  currency_code: z.string(),
  buy_limit: z.number(),
  exp_day: z.date(),
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
    id: z.string(),
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

export const CreateCardSchemaAPI = z.object({
  body: CardSchemAPI,
});

export const GetCardSchemaAPI = z.object({
  params: z.object({ id: z.string() }),
});

export type Cards = z.infer<typeof CardSchema>;

export type CreateCards = z.infer<typeof CreateCardSchema>;
