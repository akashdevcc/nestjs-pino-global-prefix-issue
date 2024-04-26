import { Injectable, Logger } from '@nestjs/common';
import { initTRPC } from '@trpc/server';

import { AppService } from './app.service';

@Injectable()
export class AppRouterFactory {
  private readonly logger: Logger = new Logger(AppRouterFactory.name);

  constructor(private readonly appService: AppService) {}

  create() {
    const t = initTRPC.create();
    return t.router({
      greet: t.procedure.query(() => {
        this.logger.log('in AppRouterFactory::greet() trpc path');
        return this.appService.greet();
      }),
    });
  }
}

export type AppRouter = ReturnType<AppRouterFactory['create']>;
