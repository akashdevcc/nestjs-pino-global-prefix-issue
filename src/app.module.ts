import { Module } from '@nestjs/common';
// import { randomUUID } from 'crypto';
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
            autoLogging: false,
            // FIXME: `genReqId` does not work with fastify, instead send `header['request-id']` or with custom fastify `requestIdHeader` option.
            // genReqId: function (req, res) {
            //   const existingID = req.id ?? req.headers['request-id'];
            //   if (existingID) return existingID;
            //   const id = randomUUID();
            //   res.setHeader('x-request-id', id);
            //   return id;
            // },
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
  controllers: [AppController],
  providers: [AppRouterFactory, AppService],
  exports: [AppRouterFactory],
})
export class AppModule {}
