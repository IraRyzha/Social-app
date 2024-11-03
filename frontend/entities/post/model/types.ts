interface IPost {
  id: string;
  user: {
    name: string;
    photo: string;
  };
  text: string; // Основний текст поста
  date: string; // Дата публікації, можна використовувати Date, якщо потрібне форматування
  flashs: number;
}

export type { IPost };
