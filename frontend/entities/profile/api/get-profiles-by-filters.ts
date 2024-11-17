import { IProfile } from "../model/types";

export const getProfilesByFilters = async (
  keywords?: string,
  sortBy: "date" | "popularity" = "date" // Параметр сортування
): Promise<IProfile[]> => {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/by-filters`
    );

    // Додаємо параметри до URL
    if (keywords) {
      url.searchParams.append("keywords", keywords);
    }
    url.searchParams.append("sortBy", sortBy); // Додаємо параметр сортування

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

    const data: IProfile[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error during fetching profiles:", error);
    throw error;
  }
};
