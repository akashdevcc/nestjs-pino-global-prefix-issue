import { NestFactory } from '@nestjs/core';
import * as trpcExpress from '@trpc/server/adapters/express';
import {
  Logger,
  PARAMS_PROVIDER_TOKEN,
  createLoggerMiddlewares,
} from 'nestjs-pino';

import { AppModule } from './app.module';
import { createContext } from './context';
import { AppRouterFactory } from './app.router';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const appRouterFactory = app.get(AppRouterFactory);
  const appRouter = appRouterFactory.create();

  app.use(createLoggerMiddlewares(app.get(PARAMS_PROVIDER_TOKEN)['pinoHttp']));
  const logger = app.get(Logger);
  app.useLogger(logger);

  app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );

  await app.listen(3000);
}
bootstrap();
