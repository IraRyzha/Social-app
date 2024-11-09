import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/post.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PostsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createPost(postDto: CreatePostDto) {
    const { user_id, content, categories } = postDto;

    // Використання транзакції для збереження поста та категорій
    await this.databaseService.query('BEGIN');
    try {
      // Створення поста та отримання його ID
      const postResult = await this.databaseService.query(
        'INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING id',
        [user_id, content]
      );
      const postId = postResult.rows[0].id;

      // Додавання категорій до таблиці post_categories
      if (categories && categories.length > 0) {
        // Отримуємо ID категорій, використовуючи їхні назви
        const categoryIdsResult = await this.databaseService.query(
          `SELECT id FROM categories WHERE name = ANY($1::text[])`,
          [categories]
        );

        const categoryIds = categoryIdsResult.rows.map((row) => row.id);

        // Додаємо кожен зв'язок поста з категорією до таблиці post_categories
        for (const categoryId of categoryIds) {
          await this.databaseService.query(
            `INSERT INTO post_categories (post_id, category_id) VALUES ($1, $2)`,
            [postId, categoryId]
          );
        }
      }

      // Оновлення лічильника постів у профілі
      await this.databaseService.query(
        'UPDATE profiles SET posts_count = posts_count + 1 WHERE user_id = $1',
        [user_id]
      );

      // Завершення транзакції
      await this.databaseService.query('COMMIT');
      return { message: 'Post created successfully' };
    } catch (error) {
      await this.databaseService.query('ROLLBACK');
      throw error;
    }
  }

  async getAllPosts() {
    // Отримання постів з приєднанням категорій
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
        profiles.posts_count AS flashs,
        ARRAY_AGG(categories.name) AS categories
      FROM posts
      JOIN users ON posts.user_id = users.id
      JOIN profiles ON profiles.user_id = users.id
      LEFT JOIN post_categories ON posts.id = post_categories.post_id
      LEFT JOIN categories ON post_categories.category_id = categories.id
      GROUP BY posts.id, users.id, profiles.user_name, profiles.avatar_name, profiles.posts_count
      ORDER BY posts.created_at DESC
      `
    );

    // Формування відповіді
    return postResult.rows.map((row) => ({
      id: row.id,
      user: {
        id: row.user_id,
        name: row.name,
        photo: row.photo,
      },
      text: row.text,
      date: row.date,
      flashs: row.flashs || 0,
      categories: row.categories || [], // Список категорій
    }));
  }

  async getFriendsPosts(userId: string) {
    // Отримання ID користувачів, на яких підписаний `userId`
    const friendIdsResult = await this.databaseService.query(
      `SELECT user_id FROM followers WHERE follower_id = $1`,
      [userId]
    );
    const friendIds = friendIdsResult.rows.map((row) => row.user_id);

    if (friendIds.length === 0) {
      return [];
    }

    // Отримання постів друзів
    const postsResult = await this.databaseService.query(
      `
      SELECT 
        posts.id,
        posts.user_id,
        posts.content AS text,
        posts.created_at AS date,
        users.id AS user_id,
        profiles.user_name AS name,
        profiles.avatar_name AS photo,
        profiles.posts_count AS flashs,
        ARRAY_AGG(categories.name) AS categories
      FROM posts
      JOIN users ON posts.user_id = users.id
      JOIN profiles ON profiles.user_id = users.id
      LEFT JOIN post_categories ON posts.id = post_categories.post_id
      LEFT JOIN categories ON post_categories.category_id = categories.id
      WHERE posts.user_id = ANY($1)
      GROUP BY posts.id, users.id, profiles.user_name, profiles.avatar_name, profiles.posts_count
      ORDER BY posts.created_at DESC
      `,
      [friendIds]
    );

    return postsResult.rows.map((row) => ({
      id: row.id,
      user: {
        id: row.user_id,
        name: row.name,
        photo: row.photo,
      },
      text: row.text,
      date: row.date,
      flashs: row.flashs || 0,
      categories: row.categories || [],
    }));
  }

  async getPost(id: number) {
    // Отримання конкретного поста з категоріями
    const postResult = await this.databaseService.query(
      `
      SELECT 
        posts.id,
        posts.user_id,
        posts.content AS text,
        posts.created_at AS date,
        ARRAY_AGG(categories.name) AS categories
      FROM posts
      LEFT JOIN post_categories ON posts.id = post_categories.post_id
      LEFT JOIN categories ON post_categories.category_id = categories.id
      WHERE posts.id = $1
      GROUP BY posts.id
      `,
      [id]
    );

    const post = postResult.rows[0];
    if (!post) {
      return null;
    }

    return {
      id: post.id,
      user_id: post.user_id,
      text: post.text,
      date: post.date,
      categories: post.categories || [],
    };
  }
}
