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
    const profileResult = await this.databaseService.query(
      `INSERT INTO profiles (user_id, user_name, bio) VALUES ($1, $2, $3) RETURNING *`,
      [userId, username, bio]
    );

    // 3. Перевірка, чи записано профіль правильн

    console.log(profileResult.rows[0]); // в консолі на сервері тут undefined

    const profile = {
      id: profileResult.rows[0].id,
      user_id: userId,
      user_name: profileResult.rows[0].user_name,
      avatar_url: profileResult.rows[0].avatar_url || null, // за замовчуванням може бути null, якщо не встановлено
      status: profileResult.rows[0].status || 'offline', // статус за замовчуванням
      bio: profileResult.rows[0].bio,
      followers_count: profileResult.rows[0].followers_count || 0,
      following_count: profileResult.rows[0].following_count || 0,
      posts_count: profileResult.rows[0].posts_count || 0,
      points: profileResult.rows[0].points || 0,
      created_at: profileResult.rows[0].created_at,
      updated_at: profileResult.rows[0].updated_at,
    };

    return profile;
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
