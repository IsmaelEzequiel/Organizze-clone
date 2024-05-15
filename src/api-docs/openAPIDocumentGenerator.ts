import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { authRegistry } from '@/api/auth/authRouter';
import { healthCheckRegistry } from '@/api/healthCheck/healthCheckRouter';
import { userRegistry } from '@/api/user/userRouter';

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([healthCheckRegistry, userRegistry, authRegistry]);

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
      title: 'Pixel Nomads',
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
