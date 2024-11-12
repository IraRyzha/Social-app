import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createUser(registerDto) {
    const { email, password, username, bio, avatar_name } = registerDto;

    const existingUserResult = await this.databaseService.query(
      `SELECT id FROM users WHERE email = $1`,
      [email]
    );
    if (existingUserResult.rows.length > 0) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(hashedPassword);

    // 1. Створення користувача в таблиці users
    const userResult = await this.databaseService.query(
      `INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id`,
      [email, hashedPassword] // Використовуємо хешований пароль у значенні password_hash
    );
    const userId = userResult.rows[0].id;

    // 2. Створення профілю для користувача в таблиці profiles
    const profileResult = await this.databaseService.query(
      `INSERT INTO profiles (user_id, user_name, bio, avatar_name) VALUES ($1, $2, $3, $4) RETURNING *`,
      [userId, username, bio, avatar_name]
    );

    // 3. Перевірка, чи записано профіль правильн

    console.log(profileResult.rows[0]); // в консолі на сервері тут undefined

    const profile = {
      id: profileResult.rows[0].id,
      user_id: userId,
      user_name: profileResult.rows[0].user_name,
      avatar_name: profileResult.rows[0].avatar_url || null, // за замовчуванням може бути null, якщо не встановлено
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

  async loginUser(loginDto) {
    const { email, password } = loginDto;

    const userResult = await this.databaseService.query(
      `SELECT id, password_hash FROM users WHERE email = $1`,
      [email]
    );

    if (userResult.rows.length === 0) {
      throw new Error('User not found');
    }

    const { id, password_hash } = userResult.rows[0];

    const isPasswordValid = await bcrypt.compare(password, password_hash);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const profileResult = await this.databaseService.query(
      `SELECT * FROM profiles WHERE user_id = $1`,
      [id]
    );

    if (profileResult.rows.length === 0) {
      throw new Error('Profile not found');
    }
    const profile = profileResult.rows[0];

    return { profile, message: 'Login successful' };
  }

  async getAllUsers() {
    const result = await this.databaseService.query('SELECT * FROM users');
    return result.rows;
  }

  async getProfile(id: string) {
    const result = await this.databaseService.query(
      'SELECT * FROM profiles WHERE user_id = $1',
      [id]
    );
    return result.rows[0];
  }

  async getPostsByUserId(id: string) {
    const postResult = await this.databaseService.query(
      `
      SELECT 
        posts.id AS post_id,
        posts.content AS text,
        posts.created_at AS date,
        users.id AS user_id,
        profiles.user_name AS name,
        profiles.avatar_name AS photo,
        COUNT(likes.post_id) AS likes, -- Підрахунок лайків для кожного поста
        ARRAY_AGG(DISTINCT categories.name) AS categories
      FROM posts
      JOIN users ON posts.user_id = users.id
      JOIN profiles ON profiles.user_id = users.id
      LEFT JOIN post_categories ON posts.id = post_categories.post_id
      LEFT JOIN categories ON post_categories.category_id = categories.id
      LEFT JOIN likes ON posts.id = likes.post_id -- З'єднання з таблицею likes
      WHERE users.id = $1
      GROUP BY posts.id, users.id, profiles.user_name, profiles.avatar_name
      ORDER BY posts.created_at DESC;
      `,
      [id]
    );

    return postResult.rows.map((row) => ({
      id: row.post_id,
      user: {
        id: row.user_id,
        name: row.name,
        photo: row.photo,
      },
      text: row.text,
      date: row.date,
      likes: row.likes || 0, // Повертаємо кількість лайків
      categories: row.categories || [],
    }));
  }

  async checkIsFollowing(userId: string, followerId: string) {
    const result = await this.databaseService.query(
      `SELECT 1 FROM followers WHERE user_id = $1 AND follower_id = $2`,
      [userId, followerId]
    );
    return { isFollowing: result.rows.length > 0 };
  }

  async followUser(userId: string, followerId: string) {
    if (userId === followerId) {
      throw new Error('User cannot follow themselves.');
    }

    // Перевіряємо, чи вже існує підписка
    const existingFollow = await this.databaseService.query(
      `SELECT * FROM followers WHERE user_id = $1 AND follower_id = $2`,
      [userId, followerId]
    );

    if (existingFollow.rows.length > 0) {
      throw new Error('Already following this user.');
    }

    // Додаємо запис у таблицю followers
    await this.databaseService.query(
      `INSERT INTO followers (user_id, follower_id) VALUES ($1, $2)`,
      [userId, followerId]
    );

    // Оновлюємо кількість підписників у профілі користувача
    await this.databaseService.query(
      `UPDATE profiles SET followers_count = followers_count + 1 WHERE user_id = $1`,
      [userId]
    );

    // Оновлюємо кількість підписок у профілі підписника
    await this.databaseService.query(
      `UPDATE profiles SET following_count = following_count + 1 WHERE user_id = $1`,
      [followerId]
    );

    return { message: 'Successfully followed user.' };
  }

  async unfollowUser(userId: string, followerId: string) {
    await this.databaseService.query(
      `DELETE FROM followers WHERE user_id = $1 AND follower_id = $2`,
      [userId, followerId]
    );

    // Оновлюємо лічильники
    await this.databaseService.query(
      `UPDATE profiles SET followers_count = followers_count - 1 WHERE user_id = $1`,
      [userId]
    );
    await this.databaseService.query(
      `UPDATE profiles SET following_count = following_count - 1 WHERE user_id = $1`,
      [followerId]
    );

    return { message: 'Successfully unfollowed user.' };
  }
}
