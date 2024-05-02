import { AnyTRPCRouter } from '@trpc/server';
import { expressHandler } from 'trpc-playground/handlers/express';
import { getFastifyPlugin } from 'trpc-playground/handlers/fastify';

import { zodResolveTypes } from 'trpc-playground';
// import { zodResolveTypes } from './trpc-playground-fix';
import { TRPC_ENDPOINT, TRPC_PLAYGROUND_ENDPOINT } from './constants';

const getFastifyTrpcPlaygroundHandler = (router: AnyTRPCRouter) =>
  getFastifyPlugin({
    trpcApiEndpoint: `${TRPC_ENDPOINT}`,
    playgroundEndpoint: `${TRPC_PLAYGROUND_ENDPOINT}`,
    router: router,
    resolveTypes: zodResolveTypes,
    // uncomment this if you're using superjson
    // request: {
    //   superjson: true,
    // },
  });

const getExpressTrpcPlaygroundHandler = (router: AnyTRPCRouter) =>
  expressHandler({
    trpcApiEndpoint: `${TRPC_ENDPOINT}`,
    playgroundEndpoint: `${TRPC_PLAYGROUND_ENDPOINT}`,
    router: router,
    // uncomment this if you're using superjson
    // request: {
    //   superjson: true,
    // },
  });

export { getExpressTrpcPlaygroundHandler, getFastifyTrpcPlaygroundHandler };
