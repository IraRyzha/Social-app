export const unfollowUser = async (followerId: string, userId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/unfollow`,
      {
        method: "DELETE", // Використовуємо DELETE для видалення підписки
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to unfollow user: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during unfollow user:", error);
    throw error;
  }
};
