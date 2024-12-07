import { IChatInfo } from "../model/types";

export const getChatInfo = async (
  chatId: string,
  userId: string
): Promise<IChatInfo> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/chats/${chatId}/info`, // Використовуємо GET-запит до конкретного чату
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch chat info");
    }

    // Отримуємо інформацію про чат (наприклад, ім'я та аватар співрозмовника)
    const chatInfo = await response.json();
    return chatInfo;
  } catch (error) {
    console.error("Error during fetching chat info:", error);
    throw error;
  }
};
