import { NestFactory } from '@nestjs/core';
import * as trpcExpress from '@trpc/server/adapters/express';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { createContext } from './context';
import { AppRouterFactory } from './app.router';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const appRouterFactory = app.get(AppRouterFactory);
  const appRouter = appRouterFactory.create();

  app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );

  app.useLogger(app.get(Logger));
  await app.listen(3000);
}
bootstrap();
