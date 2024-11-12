export const checkLike = async (
  userId: string,
  postId: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postId}/is-like`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId, postId: postId }),
      }
    );
    const data = await response.json();
    console.log("checkLike");
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error during check like:", error);
    throw error;
  }
};
