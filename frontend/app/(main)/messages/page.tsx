"use client";
import { useAuth } from "@/config/AuthProvider";
import { Chat } from "@/entities/chat";
import { getUserChats } from "@/entities/chat/api/get-user-chats";
import { IChat } from "@/entities/chat/model/types";
import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";

export default function Messages() {
  const [chats, setChats] = useState<IChat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { profile } = useAuth();
  // const router = useRouter();

  // Завантаження чатів

  const fetchChats = async () => {
    if (!profile) return;
    const response = await getUserChats(profile.user_id);
    setChats(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start">
      <ul className="w-[90%] space-y-3 mt-5">
        {chats?.map((chat) => (
          <Chat key={chat.chat_id} chat={chat} />
        ))}
      </ul>
    </div>
  );
}
