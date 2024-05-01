import { Injectable } from '@nestjs/common';
import { AnyTRPCRouter } from '@trpc/server';
import { NodeHTTPCreateContextOption } from '@trpc/server/adapters/node-http';
import { HTTPBaseHandlerOptions } from '@trpc/server/http';

export type RequestHandlerOptions<
  TRouter extends AnyTRPCRouter,
  TRequest,
  TResponse,
> = HTTPBaseHandlerOptions<TRouter, TRequest> &
  NodeHTTPCreateContextOption<TRouter, TRequest, TResponse> & {
    req: TRequest;
    res: TResponse;
    path: string;
  };

@Injectable()
export abstract class RequestHandler<
  TRouter extends AnyTRPCRouter,
  TRequest,
  TResponse,
> {
  abstract handle(opts: RequestHandlerOptions<TRouter, TRequest, TResponse>);
}
