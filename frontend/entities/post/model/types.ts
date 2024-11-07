interface IPost {
  id: string;
  user: {
    id: string;
    name: string;
    photo: string;
  };
  text: string; // Основний текст поста
  date: string; // Дата публікації, можна використовувати Date, якщо потрібне форматування
  flashs: number;
}

export type { IPost };
