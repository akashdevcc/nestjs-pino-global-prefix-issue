import { randomUUID } from 'crypto';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
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
            genReqId: function (req, res) {
              const existingID = req.id ?? req.headers['x-request-id'];
              if (existingID) return existingID;
              const id = randomUUID();
              res.setHeader('X-Request-Id', id);
              return id;
            },
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
  providers: [AppService],
})
export class AppModule {}
