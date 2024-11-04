interface IProfile {
  id: string;
  user_id: string; // ID користувача, що з'єднаний з профілем
  user_name: string; // Ім'я користувача
  avatar_url: string; // URL аватара користувача
  status: string; // Статус користувача, наприклад "online" або "offline"
  bio: string; // Біографія користувача
  followers_count: number; // Кількість підписників
  following_count: number; // Кількість підписок
  posts_count: number; // Кількість постів користувача
  points: number; // Кількість балів користувача
  created_at: string; // Дата створення профілю, можна використовувати Date, якщо потрібне форматування
  updated_at: string; // Дата останнього оновлення профілю
}

export type { IProfile };
