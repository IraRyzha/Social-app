import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
// import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    const profile = await this.usersService.createUser(registerDto);
    return { message: 'User registered successfully', profile };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.loginUser(loginDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      message: 'Login successful',
      profile: user.profile,
      access_token: this.jwtService.sign({
        sub: user.profile.user_id,
        username: user.profile.user_name,
      }),
    };
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new Error('Invalid token' + error);
    }
  }
}
