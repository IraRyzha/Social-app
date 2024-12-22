"use client";
import { useAppSelector } from "@/config/hooks";
import { Chat } from "@/entities/chat";
import { getUserChats } from "@/entities/chat/api/get-user-chats";
import { IChat } from "@/entities/chat/model/types";
import authSlice from "@/features/auth/model/authSlice";
import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useRouter } from "next/navigation";

export default function Messages() {
  const [chats, setChats] = useState<IChat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const profile = useAppSelector(authSlice.selectors.profile);
  const router = useRouter();

  // Завантаження чатів

  const fetchChats = async () => {
    if (!profile) {
      router.push("auth");
      return;
    }

    const response = await getUserChats(profile.user_id);
    setChats(response);
    setLoading(false);
  };

  useEffect(() => {
    console.log("Profile in Messages component:", profile);
    fetchChats();
  }, [profile]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-start overflow-hidden">
      <ul className="w-[90%] space-y-3 mt-5">
        {chats?.map((chat) => (
          <Chat key={chat.chat_id} chat={chat} />
        ))}
      </ul>
    </div>
  );
}
