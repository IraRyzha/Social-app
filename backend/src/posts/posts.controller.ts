import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
// import { AuthHeaderInterceptor } from 'src/interceptors/auth-header.interceptor';
import { CreatePostDto } from './dto/post.dto';

@Controller('posts')
// @UseInterceptors(AuthHeaderInterceptor)
export class PostsController {
  constructor(private readonly userService: PostsService) {}

  @Post()
  createPost(@Body() postDto: CreatePostDto) {
    this.userService.createPost(postDto);
  }

  @Get()
  async getPosts() {
    return await this.userService.getAllPosts();
  }

  @Get('post/:id')
  getPost(@Param('id') id: number) {
    this.userService.getPost(id);
  }
}
