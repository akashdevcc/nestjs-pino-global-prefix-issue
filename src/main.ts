import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

// Comment if using fastify
import { NestExpressApplication } from '@nestjs/platform-express';
import { getExpressTrpcPlaygroundHandler } from './trpc-playground';

// Comment if using express
// import {
//   FastifyAdapter,
//   NestFastifyApplication,
// } from '@nestjs/platform-fastify';
// import { getFastifyTrpcPlaygroundHandler } from './trpc-playground';

import { AppModule } from './app.module';
import { TRPC_PLAYGROUND_ENDPOINT } from './constants';
import { TrpcRouterFactory } from './trpc';

async function bootstrap() {
  // Comment if using fastify
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  if (process.env.NODE_ENV !== 'production') {
    const router = app.get(TrpcRouterFactory).create();
    app.use(
      `/${TRPC_PLAYGROUND_ENDPOINT}`,
      await getExpressTrpcPlaygroundHandler(router),
    );
  }

  // Comment if using express
  // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter(),
  //   { bufferLogs: true },
  // );
  // if (process.env.NODE_ENV !== 'production') {
  //   const router = app.get(TrpcRouterFactory).create();
  //   const fastifyTrpcPlaygroundHandler =
  //     await getFastifyTrpcPlaygroundHandler(router);
  //   await app.register(fastifyTrpcPlaygroundHandler, {
  //     prefix: `/${TRPC_PLAYGROUND_ENDPOINT}`,
  //   });
  // }

  app.useLogger(app.get(Logger));
  await app.listen(3000);
}

bootstrap();
