import { Injectable } from '@nestjs/common';

import { GreetingRouter } from '../greeting';
import { PostRouter } from '../post';
import { mergeRouters } from './trpc';

@Injectable()
export class TrpcRouterFactory {
  constructor(
    private readonly greetingRouter: GreetingRouter,
    private readonly postRouter: PostRouter,
  ) {}

  create() {
    return mergeRouters(this.greetingRouter.create(), this.postRouter.create());
  }
}

export type TrpcRouter = ReturnType<TrpcRouterFactory['create']>;
