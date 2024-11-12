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
    console.log('search friends post user with id' + userId);
    return this.postsService.getFriendsPosts(userId);
  }

  @Get('post/:id')
  getPost(@Param('id') id: string) {
    this.postsService.getPost(id);
  }

  @Post(':postId/toggle-like')
  async toggleLike(
    @Body('userId') userId: string,
    @Body('postId') postId: string
  ): Promise<{ success: boolean; operation: string }> {
    return await this.postsService.toggleLike(userId, postId);
  }

  @Post(':postId/is-like')
  async checkIfLiked(
    @Body('userId') userId: string,
    @Body('postId') postId: string
  ): Promise<boolean> {
    return await this.postsService.checkIsLike(userId, postId);
  }
}
