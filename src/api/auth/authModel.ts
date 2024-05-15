import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export type AuthLogin = z.infer<typeof AuthLoginSchema>;

export type LoginSchemaType = z.infer<typeof AuthLoginSchemAPI.shape.body>;

export type TokenType = z.infer<typeof TokenSchema>;

export const AuthLoginSchema = z.object({
  authenticated: z.boolean(),
  token: z.string(),
});

export const AuthLoginSchemAPI = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

export const TokenSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  permission: z.enum(['USER', 'PLUS', 'ADMIN']),
});
