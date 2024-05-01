import { Controller, Get, Logger, Param, Post, Req, Res } from '@nestjs/common';
import { AnyRouter } from '@trpc/server';
import {
  NodeHTTPHandlerOptions,
  nodeHTTPRequestHandler,
} from '@trpc/server/adapters/node-http';
import { Response, Request } from 'express';

import { createContext } from './context';
import { AppRouterFactory } from './app.router';

@Controller('api/trpc')
export class TrpcController {
  private readonly logger: Logger = new Logger(TrpcController.name);

  constructor(private readonly appRouterFactory: AppRouterFactory) {}

  @Get(':path')
  async get(@Req() req: Request, @Res() res: Response, @Param() params: any) {
    this.logger.log('in TrpcController::get() method');
    await this.trpcRequestHandler(req, res, params.path);
  }

  @Post(':path')
  async post(@Req() req: Request, @Res() res: Response, @Param() params: any) {
    this.logger.log('in TrpcController::post() method');
    await this.trpcRequestHandler(req, res, params.path);
  }

  async trpcRequestHandler(req: Request, res: Response, path: string) {
    const opts = {
      router: this.appRouterFactory.create(),
      createContext,
    };

    await nodeHTTPRequestHandler({
      // FIXME: no typecasting should be needed here
      ...(opts as NodeHTTPHandlerOptions<AnyRouter, Request, Response>),
      req,
      res,
      path,
    });
  }
}
