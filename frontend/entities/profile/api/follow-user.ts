export const followUser = async (followerId: string, userId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/follow`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch profile: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during follow user:", error);
    throw error;
  }
};
