import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Витяг токена з заголовка Authorization
      ignoreExpiration: false, // Враховувати термін дії токена
      secretOrKey: process.env.JWT_SECRET || 'like_coding', // Секретна фраза
    });
  }

  async validate(payload: any) {
    // payload.sub — це user_id, який ви передаєте в токен під час логіну
    return { user_id: payload.sub }; // Повертаємо user_id
  }
}
