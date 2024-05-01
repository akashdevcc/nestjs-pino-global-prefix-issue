import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { TrpcController, getTrpcProviders } from './trpc';
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
  controllers: [TrpcController],
  providers: [...getTrpcProviders()],
  exports: [],
})
export class AppModule {}
