"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getChatMessages } from "@/entities/chat/api/get-chat-messages";
// import { sendMessage } from "@/entities/chat/api/send-message";
import { IChatInfo, IMessage } from "@/entities/chat/model/types";
import Image from "next/image";
import { getChatInfo } from "@/entities/chat/api/get-chat-info";
import authSlice from "@/features/auth/model/authSlice";
import { useAppSelector } from "@/config/hooks";
import flashLogo from "@/shared/images/flashLogo.webp";
import userImage from "@/shared/images/userImage.png";
import sunImage from "@/shared/images/sunImage.jpeg";
import sproutImage from "@/shared/images/sproutImage.jpeg";
import fireImage from "@/shared/images/fireImage.jpeg";
import rainbowImage from "@/shared/images/rainbowImage.jpeg";
import { io, Socket } from "socket.io-client";

const avatars = [
  { name: "flash", image: flashLogo },
  { name: "user", image: userImage },
  { name: "sun", image: sunImage },
  { name: "sprout", image: sproutImage },
  { name: "fire", image: fireImage },
  { name: "rainbow", image: rainbowImage },
];

export default function Chat() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [chatInfo, setChatInfo] = useState<IChatInfo>();
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<undefined | Socket>(undefined);
  // const [error, setError] = useState(null);
  const profile = useAppSelector(authSlice.selectors.profile);

  const params = useParams();
  // const router = useRouter();

  const fetchChatInfo = async () => {
    const response = await getChatInfo(params.id as string, profile!.user_id);
    setChatInfo(response);
    setLoading(false);
  };

  const fetchChatMessages = async () => {
    if (!params.id) return;
    console.log("fetchChatMessages");
    const response = await getChatMessages(params.id as string);
    setMessages(response);
    setLoading(false);
  };

  useEffect(() => {
    if (profile && profile.user_id) {
      const newSocket = io("https://social-app-20jv.onrender.com/chat", {
        transports: ["websocket"],
        query: { chatId: params.id },
      });

      setSocket(newSocket);

      // Слухання нових повідомлень
      newSocket.on("newMessage", (message: IMessage) => {
        setMessages((prev) => [...prev, message]);
      });

      fetchChatInfo();
      fetchChatMessages();

      // Закриваємо WebSocket-з'єднання при розмонтуванні компонента
      return () => {
        newSocket.disconnect();
      };
    }
  }, [params.id, profile]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !profile || !params.id || !socket) return;

    console.log("handleSendMessage work");

    const message = {
      chatId: params.id,
      senderId: profile.user_id,
      content: newMessage,
    };

    // Надсилання повідомлення через WebSocket
    socket.emit("sendMessage", message);

    // Оновлюємо локальний список повідомлень
    // setMessages((prev) => [...prev, { ...message, id: Date.now().toString() }]);
    fetchChatMessages();
    setNewMessage(""); // Очищуємо поле вводу
  };

  const getAvatarImage = () => {
    if (!chatInfo) return userImage;
    const avatarObj = avatars.find(
      (avatar) => avatar.name === chatInfo.user.avatar
    );
    if (!avatarObj) {
      console.warn(`Avatar not found for name: ${chatInfo.user.avatar}`);
    }
    return avatarObj ? avatarObj.image : userImage;
  };

  if (loading) return <div className="text-center mt-10">Завантаження...</div>;
  // if (error)
  //   return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="flex flex-col h-[83vh] w-full inset-y-0 bg-white shadow-lg rounded-lg overflow-hidden">
      {chatInfo && (
        <div className="flex items-center space-x-3 p-3">
          <Image
            src={getAvatarImage()}
            width={100}
            height={100}
            alt={`${chatInfo.user.name} avatar`}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h1 className="text-lg font-semibold">{chatInfo.user.name}</h1>
            {/* <p className="text-sm text-gray-200">status</p> */}
          </div>
        </div>
      )}

      {/* Повідомлення */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender_id === profile?.user_id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                message.sender_id === profile?.user_id
                  ? "bg-main-blue-light text-white"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Поле вводу */}
      <div className="p-4 border-t border-gray-300 bg-gray-100">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Напишіть повідомлення..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-main-blue-light"
          />
          <button
            onClick={handleSendMessage}
            className="px-6 py-2 bg-main-blue text-white rounded-full hover:bg-main-blue-light transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
