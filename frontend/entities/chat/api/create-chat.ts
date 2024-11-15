export const createChat = async (isGroup: boolean, memberIds: string[]) => {
  console.log(memberIds);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/chats`,
      {
        method: "POST",
        // headers: getHeaders(),
        headers: {
          "Content-Type": "application/json", // Обов'язково!
        },
        body: JSON.stringify({ isGroup: isGroup, memberIds: memberIds }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to create chat");
    }
    const { chatId } = await response.json();
    return chatId;
  } catch (error) {
    console.error("Error during post chat:", error);
    throw error;
  }
};
