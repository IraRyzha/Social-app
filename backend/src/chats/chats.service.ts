import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ChatsService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Створення нового чату
  async createChat(
    isGroup: boolean,
    memberIds: string[]
  ): Promise<{ chatId: string }> {
    console.log(memberIds);
    if (!memberIds || memberIds.length < 2) {
      throw new Error('Чат повинен мати хоча б двох учасників.');
    }

    try {
      // Початок транзакції
      await this.databaseService.query('BEGIN');

      // Перевіряємо, чи існує вже приватний чат з цими користувачами
      if (!isGroup) {
        const existingChat = await this.databaseService.query(
          `
          SELECT c.id
          FROM chats c
          JOIN chat_members m1 ON c.id = m1.chat_id
          JOIN chat_members m2 ON c.id = m2.chat_id
          WHERE c.is_group = false
            AND m1.user_id = $1
            AND m2.user_id = $2
          LIMIT 1
          `,
          [memberIds[0], memberIds[1]]
        );

        if (existingChat.rows.length > 0) {
          await this.databaseService.query('ROLLBACK'); // Відкат транзакції
          return { chatId: existingChat.rows[0].id };
        }
      }

      // Створюємо новий чат
      const chatResult = await this.databaseService.query(
        'INSERT INTO chats (is_group, created_at) VALUES ($1, CURRENT_TIMESTAMP) RETURNING id',
        [isGroup]
      );

      if (!chatResult.rows || chatResult.rows.length === 0) {
        throw new Error('Не вдалося створити чат.');
      }

      const chatId = chatResult.rows[0].id;

      // Додаємо учасників чату
      for (const userId of memberIds) {
        await this.databaseService.query(
          'INSERT INTO chat_members (chat_id, user_id, joined_at) VALUES ($1, $2, CURRENT_TIMESTAMP)',
          [chatId, userId]
        );
      }

      // Завершення транзакції
      await this.databaseService.query('COMMIT');

      return { chatId };
    } catch (error) {
      // Відкат транзакції у разі помилки
      await this.databaseService.query('ROLLBACK');
      console.error('Error creating chat:', error.message);
      throw error;
    }
  }

  async getUserChats(userId: string) {
    const result = await this.databaseService.query(
      `
        SELECT 
          c.id AS chat_id,
          u.id AS user_id,
          p.user_name AS name,
          p.avatar_name AS avatar,
          (
            SELECT m.content
            FROM messages m
            WHERE m.chat_id = c.id
            ORDER BY m.created_at DESC
            LIMIT 1
          ) AS last_message,
          (
            SELECT COUNT(*)
            FROM messages m
            WHERE m.chat_id = c.id
              AND m.is_read = FALSE
              AND m.sender_id != $1
          ) AS unread_count,
          GREATEST(
            c.created_at,
            (
              SELECT MAX(m.created_at)
              FROM messages m
              WHERE m.chat_id = c.id
            )
          ) AS updated_at
        FROM chats c
        JOIN chat_members cm ON c.id = cm.chat_id
        JOIN users u ON u.id = cm.user_id
        JOIN profiles p ON p.user_id = u.id
        WHERE cm.chat_id IN (
          SELECT chat_id
          FROM chat_members
          WHERE user_id = $1
        )
          AND cm.user_id != $1
        ORDER BY updated_at DESC
      `,
      [userId]
    );

    // Форматуємо дані згідно з типом IChat
    return result.rows.map((row) => ({
      chat_id: row.chat_id,
      user: {
        id: row.user_id,
        name: row.name,
        avatar: row.avatar,
      },
      last_message: row.last_message || '',
      unread_count: parseInt(row.unread_count, 10) || 0,
      updated_at: row.updated_at,
    }));
  }

  // Отримання всіх повідомлень для конкретного чату
  async getChatMessages(chatId: string) {
    const result = await this.databaseService.query(
      `
      SELECT 
        id, 
        sender_id, 
        content, 
        is_read, 
        created_at
      FROM messages
      WHERE chat_id = $1
      ORDER BY created_at ASC
      `,
      [chatId]
    );

    // Приводимо результат до типу IMessage[]
    return result.rows.map((row) => ({
      id: row.id,
      sender_id: row.sender_id,
      content: row.content,
      is_read: row.is_read,
      created_at: row.created_at,
    }));
  }
  // Відправка нового повідомлення в чат
  async sendMessage(chatId: string, senderId: string, content: string) {
    const result = await this.databaseService.query(
      `
      INSERT INTO messages (chat_id, sender_id, content, is_read, created_at)
      VALUES ($1, $2, $3, FALSE, CURRENT_TIMESTAMP)
      RETURNING id, sender_id, content, is_read, created_at
      `,
      [chatId, senderId, content]
    );

    return {
      id: result.rows[0].id,
      sender_id: result.rows[0].sender_id,
      content: result.rows[0].content,
      is_read: result.rows[0].is_read,
      created_at: result.rows[0].created_at,
    };
  }

  async getChatInfo(chatId: string, userId: string): Promise<any> {
    const result = await this.databaseService.query(
      `
      SELECT 
        c.id AS chat_id,
        u.id AS user_id,
        p.user_name AS name,
        p.avatar_name AS avatar
      FROM chats c
      JOIN chat_members cm ON c.id = cm.chat_id
      JOIN users u ON u.id = cm.user_id
      JOIN profiles p ON p.user_id = u.id
      WHERE c.id = $1 AND u.id != $2
      LIMIT 1
      `,
      [chatId, userId]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      chat_id: row.chat_id,
      user: {
        id: row.user_id,
        name: row.name,
        avatar: row.avatar,
      },
    };
  }
}
