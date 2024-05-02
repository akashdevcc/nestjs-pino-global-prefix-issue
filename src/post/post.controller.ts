import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePost } from './post.schema';

@Controller('api/post')
export class PostController {
  private readonly logger: Logger = new Logger(PostController.name);

  constructor(private readonly postService: PostService) {}

  @Get()
  getAll() {
    this.logger.log('in PostController::getAll() method');
    return this.postService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    this.logger.log('in PostController::getById() method');
    return this.postService.getById(id);
  }

  @Post()
  create(@Body() post: CreatePost) {
    this.logger.log('in PostController::create() method');
    return this.postService.create(post);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    this.logger.log('in PostController::deleteById() method');
    return this.postService.deleteById(id);
  }
}
