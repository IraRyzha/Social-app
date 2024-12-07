import { IChat } from "../model/types";

export const getUserChats = async (userId: string): Promise<IChat[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/chats/user/${userId}`,
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
      throw new Error("Failed to fetch user chats");
    }
    return await response.json();
  } catch (error) {
    console.error("Error during get chats:", error);
    throw error;
  }
};
