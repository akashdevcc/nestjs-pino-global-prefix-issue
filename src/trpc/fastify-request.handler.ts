import { Injectable } from '@nestjs/common';
import { fastifyRequestHandler } from '@trpc/server/adapters/fastify';
import { FastifyRequest, FastifyReply } from 'fastify';

import { RequestHandler, RequestHandlerOptions } from './request.handler';
import { TrpcRouter } from './trpc.router';

@Injectable()
export class FastifyRequestHandler extends RequestHandler<
  TrpcRouter,
  FastifyRequest,
  FastifyReply
> {
  async handle(
    opts: RequestHandlerOptions<TrpcRouter, FastifyRequest, FastifyReply>,
  ) {
    await fastifyRequestHandler(opts);
  }
}
