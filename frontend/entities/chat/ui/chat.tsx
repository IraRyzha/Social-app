"use client";
import Image from "next/image";
import flashLogo from "@/shared/images/flashLogo.webp";
import userImage from "@/shared/images/userImage.png";
import sunImage from "@/shared/images/sunImage.jpeg";
import sproutImage from "@/shared/images/sproutImage.jpeg";
import fireImage from "@/shared/images/fireImage.jpeg";
import rainbowImage from "@/shared/images/rainbowImage.jpeg";
import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
import { IChat } from "../model/types";

const avatars = [
  { name: "flash", image: flashLogo },
  { name: "user", image: userImage },
  { name: "sun", image: sunImage },
  { name: "sprout", image: sproutImage },
  { name: "fire", image: fireImage },
  { name: "rainbow", image: rainbowImage },
];

export const Chat = ({ chat }: { chat: IChat }) => {
  const router = useRouter();
  //   const formatTimeAgo = (date: string | number) => {
  //     const dateInMillis = new Date(date).getTime();

  //     const seconds = Math.floor((Date.now() - dateInMillis) / 1000);
  //     const minutes = Math.floor(seconds / 60);

  //     if (minutes < 1) return `${seconds} seconds ago`;
  //     else if (minutes < 60) return `${minutes} minutes ago`;

  //     const hours = Math.floor(minutes / 60);
  //     if (hours < 24) return `${hours} hours ago`;

  //     const days = Math.floor(hours / 24);
  //     return `${days} days ago`;
  //   };
  const handleChatClick = (chatId: string) => {
    router.push(`/messages/${chatId}`); // Перехід до сторінки конкретного чату
  };

  return (
    <li
      className="flex items-center p-5 bg-white shadow-lg rounded-xl cursor-pointer hover:bg-gray-100 transition-all duration-200"
      onClick={() => handleChatClick(chat.chat_id)}
    >
      <Image
        src={avatars[1].image}
        alt={chat?.user?.name || "user Avatar"}
        className="w-12 h-12 rounded-full mr-4"
        width={100}
        height={100}
      />
      <div className="flex-1 flex flex-col items-start">
        <p className="text-base font-semibold text-gray-900">
          {chat.user.name}
        </p>
        <p className="text-sm text-gray-500 truncate">{chat.last_message}</p>
      </div>
      <div className="h-full flex flex-col gap-1 items-end">
        <p className="text-sm text-gray-500 ">
          {/* {chat.updated_at} */}
          15:31
        </p>
        {chat.unread_count > 0 && (
          <span className="ml-4 bg-gray-500 text-white text-xs font-bold rounded-full px-2 py-[1px]">
            {chat.unread_count}
          </span>
        )}
      </div>
    </li>
  );
};
