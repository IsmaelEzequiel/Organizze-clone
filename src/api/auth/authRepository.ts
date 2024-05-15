import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { AuthLogin, LoginSchemaType, TokenType } from '@/api/auth/authModel';
import { userRepository } from '@/api/user/userRepository';
import { env } from '@/common/utils/envConfig';

import { CreateUser } from '../user/userModel';

// reset password
// confirm reset password
// send activate account email

export const authRepository = {
  signInAsync: async (params: LoginSchemaType): Promise<AuthLogin | null> => {
    const user = await userRepository.findByEmail(params.email);

    if (!user) {
      return null;
    }

    const passwordValid = await bcrypt.compare(params.password, user.password);

    if (!passwordValid) {
      return null;
    }

    const userToSign: TokenType = {
      id: user.id,
      email: user.email,
      permission: user.permissons,
    };

    const token = jwt.sign(userToSign, env.SECRET_KEY, { expiresIn: '7d' });

    return { authenticated: true, token };
  },

  signUpAsync: async (params: CreateUser): Promise<string | null> => {
    try {
      const { name, email, password, birth_date } = params;

      const userExist = await userRepository.findByEmail(email);

      if (userExist) {
        return 'Email is already associated with an account';
      }

      const SALT_ROUNDS = 10;

      const encryptedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      await userRepository.createUserAsync({
        name,
        email,
        password: encryptedPassword,
        birth_date,
      });

      return 'Registration successful';
    } catch (error) {
      return null;
    }
  },
};
