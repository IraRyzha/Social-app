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

  @Get('user/:id')
  getUser(@Param('id') id: number) {
    this.userService.getUser(id);
  }
}
