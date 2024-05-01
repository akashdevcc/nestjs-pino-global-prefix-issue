import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

// FIXME: Order of import affects NestJS DI. Make sure to keep `trpc` imports before other internal imports.

// Comment if using fastify
import { ExpressTrpcController } from './trpc';

// Comment if using express
// import { FastifyTrpcController } from './trpc';

import { getTrpcProviders } from './trpc';

import { GreetingModule } from './greeting';
import { PostModule } from './post';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'trace',
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    GreetingModule,
    PostModule,
  ],
  // Comment if using fastify
  controllers: [ExpressTrpcController],
  // Comment if using express
  // controllers: [FastifyTrpcController],
  providers: [...getTrpcProviders()],
  exports: [],
})
export class AppModule {}
