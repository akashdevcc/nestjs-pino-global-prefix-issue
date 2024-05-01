import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { RestController } from './rest.controller';
import { TrpcController } from './trpc.controller';
import { AppRouterFactory } from './app.router';
import { AppService } from './app.service';

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
  ],
  controllers: [RestController, TrpcController],
  providers: [AppRouterFactory, AppService],
  exports: [],
})
export class AppModule {}
