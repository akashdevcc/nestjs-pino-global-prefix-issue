import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { createContext } from './context';
import { AppRouterFactory } from './app.router';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  const appRouterFactory = app.get(AppRouterFactory);
  const appRouter = appRouterFactory.create();

  await app.register(fastifyTRPCPlugin, {
    prefix: '/api/trpc',
    trpcOptions: { router: appRouter, createContext },
  });

  app.useLogger(app.get(Logger));
  await app.listen(3000);
}
bootstrap();
