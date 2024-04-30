import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppRouterFactory } from './app.router';
import { AppService } from './app.service';
import { TrpcMiddleware } from './trpc.middleware';

@Module({
  imports: [],
  controllers: [],
  providers: [AppRouterFactory, AppService],
  exports: [],
})
export class TrpcModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TrpcMiddleware).forRoutes('/api/trpc');
  }
}
