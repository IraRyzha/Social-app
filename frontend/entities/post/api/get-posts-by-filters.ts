import { TCategory } from "@/shared/types/types";
import { IPost } from "../model/types";

export const getPostsByFilters = async (
  categories: TCategory | TCategory[],
  keywords?: string,
  sortBy: "date" | "popularity" = "date" // Додаємо параметр сортування
): Promise<IPost[]> => {
  try {
    let categoriesQuery;
    if (Array.isArray(categories)) {
      categoriesQuery = categories.join(",");
    } else {
      categoriesQuery = categories;
    }

    const url = new URL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/by-filters`
    );

    // Додаємо параметри до URL
    url.searchParams.append("categories", categoriesQuery);
    if (keywords) {
      url.searchParams.append("keywords", keywords);
    }
    url.searchParams.append("sortBy", sortBy); // Додаємо параметр сортування

    console.log("Fetching posts from URL:", url.toString());

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch posts: ${response.status} ${response.statusText}`
      );
    }

    const data: IPost[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error during fetching posts:", error);
    throw error;
  }
};
