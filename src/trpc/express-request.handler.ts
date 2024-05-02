import { Injectable } from '@nestjs/common';
import { nodeHTTPRequestHandler } from '@trpc/server/adapters/node-http';
import { Request, Response } from 'express';

import { RequestHandler, RequestHandlerOptions } from './request.handler';
import { TrpcRouter } from './trpc.router';

@Injectable()
export class ExpressRequestHandler extends RequestHandler<
  TrpcRouter,
  Request,
  Response
> {
  async handle(opts: RequestHandlerOptions<TrpcRouter, Request, Response>) {
    await nodeHTTPRequestHandler(opts);
  }
}
