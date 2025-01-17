import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export type User = z.infer<typeof UserSchema>;

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  birth_date: z.date().max(new Date(), { message: 'Too young!' }),
  password: z.string().min(8),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  permissons: z.enum(['USER', 'PLUS', 'ADMIN']),
});

export const CreateUserSchema = UserSchema.omit({ id: true, createdAt: true, updatedAt: true, permissons: true });

export const UserWithoutPassword = UserSchema.omit({ password: true });

export const SignUpSchema = UserSchema.omit({ id: true, createdAt: true, updatedAt: true });

export type CreateUser = z.infer<typeof CreateUserSchema>;

export type UserWithoutPasswordType = z.infer<typeof UserWithoutPassword>;

export type SignUp = z.infer<typeof SignUpSchema>;

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchemaAPI = z.object({
  params: z.object({ id: commonValidations.id }),
});

// Input Validation for 'POST users/new' endpoint
export const CreateUserSchemaAPI = z.object({
  body: CreateUserSchema,
});
