import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() registerDto: RegisterDto) {
    this.userService.createUser(registerDto);
  }

  @Get()
  getUsers() {
    this.userService.getAllUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getProfile(id);
  }

  @Get(':id/posts')
  getUserPosts(@Param('id') id: string) {
    return this.userService.getPostsByUserId(id);
  }
}
