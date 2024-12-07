import { IMessage } from "../model/types";

export const getChatMessages = async (chatId: string): Promise<IMessage[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/chats/${chatId}/messages`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Обов'язково!
          Authorization: `Bearer ${token}`,
        },
        // headers: getHeaders(),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch chat messages");
    }
    return await response.json();
  } catch (error) {
    console.error("Error during get chats:", error);
    throw error;
  }
};
