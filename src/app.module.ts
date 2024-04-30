import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrpcModule } from './trpc.module';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: async () => {
        const level = 'trace';
        const isPretty = true;
        return {
          pinoHttp: {
            level: level,
            transport: isPretty
              ? {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                  },
                }
              : undefined,
          },
        };
      },
    }),
    TrpcModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
