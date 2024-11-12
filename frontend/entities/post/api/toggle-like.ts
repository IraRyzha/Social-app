export const toggleLike = async (
  userId: string,
  postId: string
): Promise<{ success: boolean; operation: "add" | "delete" }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postId}/toggle-like`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId, postId: postId }),
      }
    );

    // Перевірка статусу відповіді
    if (!response.ok) {
      throw new Error(`Failed to toggle like: ${response.statusText}`);
    }

    // Очікуємо JSON-об'єкт з success полем
    const data = await response.json();
    console.log("toggleLike");
    console.log(data);
    return data as { success: boolean; operation: "add" | "delete" };
  } catch (error) {
    console.error("Error during check like:", error);
    throw error;
  }
};
