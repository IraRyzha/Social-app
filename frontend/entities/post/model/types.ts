import { TCategory } from "@/shared/types/types";

interface IPost {
  id: string;
  user: {
    id: string;
    name: string;
    photo: string;
  };
  text: string; // Основний текст поста
  date: string; // Дата публікації, можна використовувати Date, якщо потрібне форматування
  likes: number;
  categories: TCategory[] | [];
}

interface IGetPostsResponse {
  posts: IPost[]; // Масив постів
  total: number; // Загальна кількість постів
}

export type { IPost, IGetPostsResponse };
