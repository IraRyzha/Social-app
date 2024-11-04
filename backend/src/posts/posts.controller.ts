import { Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthHeaderInterceptor } from 'src/interceptors/auth-header.interceptor';

@Controller('posts')
@UseInterceptors(AuthHeaderInterceptor)
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
