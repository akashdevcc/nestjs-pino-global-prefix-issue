import { Injectable } from '@nestjs/common';
import { z } from 'zod';

import { createRouter, procedure } from '../trpc';

import { PostService } from './post.service';
import { CreatePostSchema } from './post.schema';

@Injectable()
export class PostRouter {
  constructor(private readonly postService: PostService) {}

  create() {
    return createRouter({
      post: {
        // eslint-disable-next-line no-empty-pattern
        all: procedure.query(({}) => {
          return this.postService.getAll();
        }),

        byId: procedure
          .input(z.object({ id: z.number() }))
          .query(({ input }) => {
            const id = input.id;
            return this.postService.getById(id);
          }),

        create: procedure.input(CreatePostSchema).mutation(({ input }) => {
          return this.postService.create(input);
        }),

        delete: procedure.input(z.number()).mutation(({ input }) => {
          return this.postService.deleteById(input);
        }),
      },
    });
  }
}
