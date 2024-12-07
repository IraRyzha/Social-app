import { IProfile } from "../model/types";

export const getProfilesByFilters = async ({
  keywords,
  sortBy = "date", // Сортування за замовчуванням
  page = 1,
  pageSize = 10,
}: {
  keywords?: string;
  sortBy?: "date" | "popularity";
  page?: number;
  pageSize?: number;
}): Promise<{ profiles: IProfile[]; total: number }> => {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/by-filters`
    );

    // Додаємо параметри до URL
    if (keywords) {
      url.searchParams.append("keywords", keywords);
    }
    url.searchParams.append("sortBy", sortBy);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("pageSize", pageSize.toString());

    console.log("Fetching profiles from URL:", url.toString());

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch profiles: ${response.status} ${response.statusText}`
      );
    }

    const data: { profiles: IProfile[]; total: number } = await response.json();
    return data;
  } catch (error) {
    console.error("Error during fetching profiles:", error);
    throw error;
  }
};
