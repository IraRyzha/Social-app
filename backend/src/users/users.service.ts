import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async register(registerDto) {
    const { email, password, fullName, bio } = registerDto;

    // 1. Створення користувача в таблиці users
    const userResult = await this.databaseService.query(
      `INSERT INTO users (email, password, user_name, bio) VALUES ($1, $2) RETURNING id`,
      [email, password]
    );
    const userId = userResult.rows[0].id;

    // 2. Створення профілю для користувача в таблиці profiles
    await this.databaseService.query(
      `INSERT INTO profiles (user_id, user_name, bio) VALUES ($1, $2, $3,)`,
      [userId, fullName, bio]
    );

    return { message: 'User registered successfully', userId };
  }

  async getAllUsers() {
    const result = await this.databaseService.query('SELECT * FROM users');
    return result.rows;
  }

  async getUser(id: number) {
    const result = await this.databaseService.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }
}
