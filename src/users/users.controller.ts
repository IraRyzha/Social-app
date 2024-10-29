import { Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser() {
    this.userService.createUser();
  }

  @Get()
  getUsers() {
    this.userService.getAllUsers();
  }

  @Get('user/:id')
  getUser(@Param('id') id: number) {
    this.userService.getUser(id);
  }
}
