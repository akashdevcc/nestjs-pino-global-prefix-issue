import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import Fastify from 'fastify';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { createContext } from './context';
import { AppRouterFactory } from './app.router';
import { Store, storage } from './app.storage';

async function bootstrap() {
  const fastify = Fastify();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fastify.addHook('onRequest', (_request, _reply, done) => {
    console.log('in onRequest hook');
    storage.run(new Store(7), () => {
      const store = storage.getStore();
      console.log('store = ', store);

      done();
    });
  });

  const fastifyAdapter = new FastifyAdapter(fastify);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
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
