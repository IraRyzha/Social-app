import { IGetPostsResponse } from "../model/types";

export const getUserFriendsPosts = async (
  userId: string,
  { page = 1, pageSize = 10 }: { page?: number; pageSize?: number }
): Promise<IGetPostsResponse> => {
  try {
    const queryParams = new URLSearchParams({
      userId,
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/friends?${queryParams}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch friends' posts: ${response.status} ${response.statusText}`
      );
    }

    const data: IGetPostsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error during fetching friends' posts:", error);
    throw error;
  }
};
