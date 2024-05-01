import { Injectable } from '@nestjs/common';
import { z } from 'zod';

import { createRouter, procedure } from '../trpc';
import { GreetingService } from './greeting.service';

@Injectable()
export class GreetingRouter {
  constructor(private readonly greetingService: GreetingService) {}

  create() {
    return createRouter({
      greeting: procedure
        .input(
          z.object({
            name: z.string().optional(),
          }),
        )
        .query(({ input }) => {
          const { name } = input;
          return this.greetingService.greeting(name);
        }),
    });
  }
}
