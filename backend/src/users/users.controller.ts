import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() registerDto: RegisterDto) {
    this.usersService.createUser(registerDto);
  }

  @Get()
  getUsers() {
    this.usersService.getAllUsers();
  }

  @Get('user/:id')
  async getUser(@Param('id') id: string) {
    console.log('UserId:', id);
    return await this.usersService.getProfile(id);
  }

  @Get('by-filters')
  async getUsersByFilters(
    @Query('keywords') keywords: string,
    @Query('sortBy') sortBy: 'date' | 'popularity',
    @Query('page') page: number = 1, // Параметр сторінки
    @Query('pageSize') pageSize: number = 10 // Параметр кількості записів на сторінку
  ) {
    console.log('Keywords:', keywords);
    console.log('SortBy:', sortBy);
    console.log('Page:', page);
    console.log('PageSize:', pageSize);

    return await this.usersService.getUsersByFilters(
      keywords,
      sortBy,
      page,
      pageSize
    );
  }
  @Get(':id/posts')
  async getUserPosts(@Param('id') id: string) {
    return await this.usersService.getPostsByUserId(id);
  }

  @Get(':id/is-following')
  async isFollowing(
    @Param('id') userId: string,
    @Query('followerId') followerId: string
  ) {
    return await this.usersService.checkIsFollowing(userId, followerId);
  }

  @Post(':id/follow')
  async followUser(
    @Param('id') userId: string,
    @Body('followerId') followerId: string
  ) {
    return await this.usersService.followUser(userId, followerId);
  }

  @Delete(':userId/unfollow')
  async unfollowUser(
    @Param('userId') userId: string,
    @Body('followerId') followerId: string
  ) {
    return await this.usersService.unfollowUser(userId, followerId);
  }
}
