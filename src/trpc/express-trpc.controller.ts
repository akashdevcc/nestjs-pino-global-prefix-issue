import { Controller, Get, Logger, Param, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

import { ExpressRequestHandler } from './express-request.handler';
import { CreateContext, ContextFactory } from './context.factory';
import { TrpcRouter, TrpcRouterFactory } from './trpc.router';

@Controller('api/trpc')
export class ExpressTrpcController {
  private readonly logger: Logger = new Logger(ExpressTrpcController.name);

  private readonly createContext: CreateContext;

  private readonly router: TrpcRouter;

  constructor(
    private readonly requestHandler: ExpressRequestHandler,
    contextFactory: ContextFactory,
    routerFactory: TrpcRouterFactory,
  ) {
    this.createContext = contextFactory.create();
    this.router = routerFactory.create();
  }

  @Get(':path')
  async get(@Req() req: Request, @Res() res: Response, @Param() params: any) {
    this.logger.log('in ExpressTrpcController::get() method');
    await this.requestHandler.handle({
      router: this.router,
      createContext: this.createContext,
      req,
      res,
      path: params.path,
    });
  }

  @Post(':path')
  async post(@Req() req: Request, @Res() res: Response, @Param() params: any) {
    this.logger.log('in ExpressTrpcController::post() method');
    await this.requestHandler.handle({
      router: this.router,
      createContext: this.createContext,
      req,
      res,
      path: params.path,
    });
  }
}
