import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from 'src/users/users.service';
import { DatabaseModule } from 'src/database/database.module';
// import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    // JwtModule.register({
    //   secret: 'your_jwt_secret', // Змініть на ваш секретний ключ або використовуйте .env
    //   signOptions: { expiresIn: '1h' },
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
