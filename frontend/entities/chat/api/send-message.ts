export const sendMessage = async (
  chatId: string,
  senderId: string,
  content: string
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/chats/${chatId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Обов'язково!
          Authorization: `Bearer ${token}`,
        },
        //   headers: getHeaders(),
        body: JSON.stringify({ senderId: senderId, content }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to send message");
    }
    return await response.json();
  } catch {}
};
