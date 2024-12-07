import { IGetPostsResponse } from "../model/types";

export const getPosts = async ({
  page = 1,
  pageSize = 10,
  keywords = "",
  categories = "",
  sortBy = "date",
}: {
  page?: number;
  pageSize?: number;
  keywords?: string;
  categories?: string;
  sortBy?: "date" | "popularity";
} = {}): Promise<IGetPostsResponse> => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      keywords: keywords || "", // Якщо keywords не передано, передаємо порожній рядок
      categories: categories || "", // Якщо categories не передано, передаємо порожній рядок
      sortBy,
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts?${queryParams}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch posts: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during fetching posts:", error);
    throw error;
  }
};
