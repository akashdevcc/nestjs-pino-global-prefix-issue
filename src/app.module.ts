import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

// FIXME: Order of import affects NestJS DI. Make sure to keep `trpc` imports before other internal imports.
import { ExpressTrpcController, getTrpcProviders } from './trpc';

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
  controllers: [ExpressTrpcController],
  providers: [...getTrpcProviders()],
  exports: [],
})
export class AppModule {}
