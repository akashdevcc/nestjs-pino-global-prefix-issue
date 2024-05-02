import { Injectable, Logger } from '@nestjs/common';
import { CreatePost } from './post.schema';

type Post = {
  id: number;
  title: string;
  content: string;
};

const posts = [
  {
    id: 1,
    title: 'test title 1',
    content: 'test content 1',
  },
  {
    id: 2,
    title: 'test title 2',
    content: 'test content 2',
  },
  {
    id: 3,
    title: 'test title 3',
    content: 'test content 3',
  },
];

@Injectable()
export class PostService {
  private readonly logger: Logger = new Logger(PostService.name);

  public getAll(): Post[] {
    this.logger.log('in PostService::getAll() method');
    return posts;
  }

  public getById(id: number): Post | undefined {
    this.logger.log('in PostService::getById() method');
    return posts.find((p) => p.id === id);
  }

  public create(input: CreatePost): Post['id'] {
    this.logger.log('in PostService::create() method');
    const id = (posts[posts.length - 1]?.id || 0) + 1;
    posts.push({ id, ...input });
    return id;
  }

  public deleteById(id: number): Post | null {
    this.logger.log('in PostService::deleteById() method');
    for (let i = posts.length - 1; i >= 0; --i) {
      const post = posts[i];
      if (post && post.id == id) {
        const deletedPost = posts.splice(i, 1);
        this.logger.log('Post deleted', deletedPost[0]);
        return deletedPost[0];
      }
    }
    return null;
  }
}
