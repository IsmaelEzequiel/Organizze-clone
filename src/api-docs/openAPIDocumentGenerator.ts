import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { accountRegistry } from '@/api/v1/accounts/accountsRouter';
import { authRegistry } from '@/api/v1/auth/authRouter';
import { cardsRegistry } from '@/api/v1/Cards/cardsRouter';
import { healthCheckRegistry } from '@/api/v1/healthCheck/healthCheckRouter';
import { userRegistry } from '@/api/v1/user/userRouter';

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([
    healthCheckRegistry,
    userRegistry,
    authRegistry,
    accountRegistry,
    cardsRegistry,
  ]);

  const bearerAuth = registry.registerComponent('securitySchemes', 'Authorization', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    in: 'header',
  });

  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Organize Clone API',
    },
    externalDocs: {
      description: 'View the raw OpenAPI Specification in JSON format',
      url: '/swagger.json',
    },
    security: [
      {
        [bearerAuth.name]: [],
      },
    ],
  });
}
