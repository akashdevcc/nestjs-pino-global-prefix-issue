import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

// Comment if using fastify
import { NestExpressApplication } from '@nestjs/platform-express';

// Comment if using express
// import {
//   FastifyAdapter,
//   NestFastifyApplication,
// } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  // Comment if using fastify
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  // Comment if using express
  // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter(),
  //   { bufferLogs: true },
  // );

  app.useLogger(app.get(Logger));
  await app.listen(3000);
}

bootstrap();
