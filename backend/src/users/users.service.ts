import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createUser(registerDto) {
    const { email, password, username, bio } = registerDto;

    // 1. Створення користувача в таблиці users
    const userResult = await this.databaseService.query(
      `INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id`,
      [email, password] // Використовуємо хешований пароль у значенні password_hash
    );
    const userId = userResult.rows[0].id;

    // 2. Створення профілю для користувача в таблиці profiles
    await this.databaseService.query(
      `INSERT INTO profiles (user_id, user_name, bio) VALUES ($1, $2, $3)`,
      [userId, username, bio]
    );

    // 3. Перевірка, чи записано профіль правильно
    console.log(await this.databaseService.query(`SELECT * FROM profiles`));

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
