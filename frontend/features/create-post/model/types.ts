import { TCategory } from "@/shared/types/types";

interface PostFormData {
  user_id: string;
  content: string;
  categories: TCategory[] | [];
}

export type { PostFormData };
