import { Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly userService: PostsService) {}

  @Post()
  createPost() {
    this.userService.createPost();
  }

  @Get()
  getPosts() {
    this.userService.getAllPosts();
  }

  @Get('post/:id')
  getPosr(@Param('id') id: number) {
    this.userService.getPost(id);
  }
}
