import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/post.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PostsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createPost(postDto: CreatePostDto) {
    const { user_id, content } = postDto;
    await this.databaseService.query(
      'INSERT INTO posts (user_id, content) VALUES ($1, $2)',
      [user_id, content]
    );
    await this.databaseService.query(
      'UPDATE profiles SET posts_count = posts_count + 1 WHERE user_id = $1',
      [user_id]
    );
    return { message: 'Post created successfully' };
  }
  async getAllPosts() {
    // Отримуємо дані з бази з приєднанням до таблиць users та profiles
    const postResult = await this.databaseService.query(
      `
      SELECT 
        posts.id,
        posts.user_id,
        posts.content AS text,
        posts.created_at AS date,
        users.id AS user_id,
        profiles.user_name AS name,
        profiles.avatar_name AS photo,
        profiles.posts_count AS flashs
      FROM posts
      JOIN users ON posts.user_id = users.id
      JOIN profiles ON profiles.user_id = users.id
      ORDER BY posts.created_at DESC
      `
    );

    // Трансформуємо дані в масив об'єктів, які відповідають структурі IPost
    return postResult.rows.map((row) => ({
      id: row.id,
      user: {
        id: row.user_id,
        name: row.name,
        photo: row.photo,
      },
      text: row.text,
      date: row.date,
      flashs: row.flashs || 0, // значення за замовчуванням, якщо немає
    }));
  }

  async getFriendsPosts(userId: string) {
    // Виконуємо запит на отримання ID друзів
    const friendIdsResult = await this.databaseService.query(
      `SELECT follower_id FROM followers WHERE user_id = $1`,
      [userId]
    );

    // Перевіряємо, чи friendIdsResult має властивість rows
    const friendIds = friendIdsResult.rows
      ? friendIdsResult.rows.map((row: any) => row.follower_id)
      : [];

    if (friendIds.length === 0) {
      return []; // Якщо немає друзів, повертаємо порожній масив
    }

    // Отримуємо пости друзів
    const posts = await this.databaseService.query(
      `SELECT * FROM posts WHERE user_id = ANY($1) ORDER BY created_at DESC`,
      [friendIds]
    );

    return posts;
  }

  async getPost(id: number) {
    return id;
  }
}
