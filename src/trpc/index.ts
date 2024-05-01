import { TrpcRouterFactory } from './trpc.router';
import { ContextFactory } from './context.factory';
import { ExpressRequestHandler } from './express-request.handler';
import { FastifyRequestHandler } from './fastify-request.handler';

export const getTrpcProviders = () => [
  ContextFactory,
  TrpcRouterFactory,
  ExpressRequestHandler,
  FastifyRequestHandler,
];

export * from './trpc';
export { TrpcController } from './trpc.controller';
