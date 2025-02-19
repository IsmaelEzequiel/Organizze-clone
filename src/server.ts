import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';

import { healthCheckRouter } from '@/api/v1/healthCheck/healthCheckRouter';
import { userRouter } from '@/api/v1/user/userRouter';
import { openAPIRouter } from '@/api-docs/openAPIRouter';
import errorHandler from '@/common/middleware/errorHandler';
import rateLimiter from '@/common/middleware/rateLimiter';
import requestLogger from '@/common/middleware/requestLogger';
import { env } from '@/common/utils/envConfig';

import { accountRouter } from './api/v1/accounts/accountsRouter';
import { authRouter } from './api/v1/auth/authRouter';
import { cardsRouter } from './api/v1/cards/cardsRouter';
import { verifyJWT } from './common/middleware/verifyJWT';
import { transactionsRouter } from './api/v1/transactions/transactionsRouter';

const logger = pino({ name: 'server start' });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use('/health-check', healthCheckRouter);
app.use('/v1/auth', authRouter);
app.use('/v1/users', verifyJWT, userRouter);
app.use('/v1/accounts', verifyJWT, accountRouter);
app.use('/v1/cards', verifyJWT, cardsRouter);
app.use('/v1/transactions', verifyJWT, transactionsRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
