import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import Fastify from 'fastify';
import {
  Logger,
  PARAMS_PROVIDER_TOKEN,
  createLoggerMiddlewares,
} from 'nestjs-pino';

import { AppModule } from './app.module';
import { createContext } from './context';
import { AppRouterFactory } from './app.router';

async function bootstrap() {
  const fastify = Fastify();

  const fastifyAdapter = new FastifyAdapter(fastify);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    { bufferLogs: true },
  );

  const appRouterFactory = app.get(AppRouterFactory);
  const appRouter = appRouterFactory.create();

  app.use(createLoggerMiddlewares(app.get(PARAMS_PROVIDER_TOKEN)['pinoHttp']));
  const logger = app.get(Logger);
  app.useLogger(logger);

  await app.register(fastifyTRPCPlugin, {
    prefix: '/api/trpc',
    trpcOptions: { router: appRouter, createContext },
  });

  await app.listen(3000);
}
bootstrap();
