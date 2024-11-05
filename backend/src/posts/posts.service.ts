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
    return { message: 'Post created successfully' };
  }
  async getAllPosts() {
    // Отримуємо дані з бази з приєднанням до таблиць users та profiles
    const postResult = await this.databaseService.query(
      `
      SELECT 
        posts.id,
        posts.content AS text,
        posts.created_at AS date,
        users.id AS user_id,
        profiles.user_name AS name,
        profiles.avatar_url AS photo,
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
        name: row.name,
        photo: row.photo,
      },
      text: row.text,
      date: row.date,
      flashs: row.flashs || 0, // значення за замовчуванням, якщо немає
    }));
  }
  async getPost(id: number) {
    return id;
  }
}
