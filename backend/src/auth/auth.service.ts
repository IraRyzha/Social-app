import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
// import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
// import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService
    // private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.createUser(registerDto);
    return { message: 'User registered successfully', user };
  }

  //   async login(loginDto: LoginDto) {
  //     const user = await this.usersService.validateUser(
  //       loginDto.email,
  //       loginDto.password
  //     );

  //     if (!user) {
  //       throw new UnauthorizedException('Invalid credentials');
  //     }

  //     const payload = { userId: user.id, email: user.email };
  //     const token = this.jwtService.sign(payload);

  //     return { accessToken: token };
  //   }
}
