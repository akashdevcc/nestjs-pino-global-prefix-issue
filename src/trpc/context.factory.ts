import { Injectable } from '@nestjs/common';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { NodeHTTPCreateContextFn } from '@trpc/server/adapters/node-http';
import { Request, Response } from 'express';
import { FastifyRequest, FastifyReply } from 'fastify';

import { TrpcRouter } from './trpc.router';
import { createInnerContext } from './context';

export type CreateContext = NodeHTTPCreateContextFn<
  TrpcRouter,
  Request | FastifyRequest,
  Response | FastifyReply
>;

@Injectable()
export class ContextFactory {
  create(): CreateContext {
    return ({
      req,
    }: CreateExpressContextOptions | CreateFastifyContextOptions) => {
      const username = this.getHeaderValue(req, 'username', 'anonymous');
      return createInnerContext({ username });
    };
  }

  getHeaderValue(
    req: Request | FastifyRequest,
    key: string,
    defaultValue: string,
  ): string {
    const source = req.headers[key];
    if (!source) {
      return defaultValue;
    } else if (typeof source === 'string') {
      return source;
    } else if (source.length > 0) {
      return source[0] ?? defaultValue;
    } else {
      return defaultValue;
    }
  }
}
