import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
// import { AuthHeaderInterceptor } from 'src/interceptors/auth-header.interceptor';
import { CreatePostDto } from './dto/post.dto';

@Controller('posts')
// @UseInterceptors(AuthHeaderInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(@Body() postDto: CreatePostDto) {
    this.postsService.createPost(postDto);
  }

  @Get()
  async getPosts() {
    return await this.postsService.getAllPosts();
  }

  @Get('friends')
  async getFriendsPosts(@Query('userId') userId: string) {
    return this.postsService.getFriendsPosts(userId);
  }

  @Get('post/:id')
  getPost(@Param('id') id: number) {
    this.postsService.getPost(id);
  }
}
