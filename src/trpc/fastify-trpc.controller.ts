import { Controller, Get, Logger, Param, Post, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { FastifyRequestHandler } from './fastify-request.handler';
import { CreateContext, ContextFactory } from './context.factory';
import { TrpcRouter, TrpcRouterFactory } from './trpc.router';

@Controller('api/trpc')
export class FastifyTrpcController {
  private readonly logger: Logger = new Logger(FastifyTrpcController.name);

  private readonly createContext: CreateContext;

  private readonly router: TrpcRouter;

  constructor(
    private readonly requestHandler: FastifyRequestHandler,
    contextFactory: ContextFactory,
    routerFactory: TrpcRouterFactory,
  ) {
    this.createContext = contextFactory.create();
    this.router = routerFactory.create();
  }

  @Get(':path')
  async get(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
    @Param() params: any,
  ) {
    this.logger.log('in FastifyTrpcController::get() method');
    await this.requestHandler.handle({
      router: this.router,
      createContext: this.createContext,
      req,
      res,
      path: params.path,
    });
  }

  @Post(':path')
  async post(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
    @Param() params: any,
  ) {
    this.logger.log('in FastifyTrpcController::post() method');
    await this.requestHandler.handle({
      router: this.router,
      createContext: this.createContext,
      req,
      res,
      path: params.path,
    });
  }
}
