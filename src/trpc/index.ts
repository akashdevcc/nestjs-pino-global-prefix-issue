import { ContextFactory } from './context.factory';
import { ExpressRequestHandler } from './express-request.handler';
import { FastifyRequestHandler } from './fastify-request.handler';

export const getTrpcProviders = () => [
  ContextFactory,
  ExpressRequestHandler,
  FastifyRequestHandler,
];

export * from './trpc';
export { TrpcRouterFactory } from './trpc.router';
export { ExpressTrpcController } from './express-trpc.controller';
export { FastifyTrpcController } from './fastify-trpc.controller';
