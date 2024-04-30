import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { createContext } from './context';
import { AppRouterFactory } from './app.router';
import { AnyRouter } from '@trpc/server';
import {
  NodeHTTPHandlerOptions,
  nodeHTTPRequestHandler,
} from '@trpc/server/adapters/node-http';

@Injectable()
export class TrpcMiddleware implements NestMiddleware {
  constructor(private readonly appRouterFactory: AppRouterFactory) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const appRouter = this.appRouterFactory.create();
    const opts = {
      router: appRouter,
      createContext,
    };

    const endpoint = req.path.slice(1);

    await nodeHTTPRequestHandler({
      // FIXME: no typecasting should be needed here
      ...(opts as NodeHTTPHandlerOptions<AnyRouter, Request, Response>),
      req,
      res,
      path: endpoint,
    });

    next();
  }
}
