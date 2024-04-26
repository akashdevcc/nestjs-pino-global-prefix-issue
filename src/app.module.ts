import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller';
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
                    singleLine: false,
                  },
                }
              : undefined,
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppRouterFactory, AppService],
  exports: [AppRouterFactory],
})
export class AppModule {}
