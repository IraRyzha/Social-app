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

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getProfile(id);
  }

  @Get(':id/posts')
  getUserPosts(@Param('id') id: string) {
    return this.usersService.getPostsByUserId(id);
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
