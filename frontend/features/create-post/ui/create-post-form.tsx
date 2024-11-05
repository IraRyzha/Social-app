"use client";
import { useAuth } from "@/config/AuthProvider";
import { useState } from "react";
import { createPost } from "../model/create-post";

interface Props {
  toggleCreate?: () => void;
}

export default function CreatePostForm({ toggleCreate }: Props) {
  const [text, setText] = useState("");
  const { isAuthenticated, profile } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Логіка для обробки нового поста, наприклад, відправка даних на сервер
    if (!isAuthenticated) {
      throw new Error("cannot create post without auth");
    }
    if (profile) {
      createPost({ user_id: profile.user_id, content: text });
    }
    console.log("New post:", text);
    setText(""); // Очищення поля після відправки
    if (toggleCreate) {
      toggleCreate();
    }
  };

  return (
    <div className="bg-white px-8 pt-5 pb-3 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border border-gray-300 text-sm rounded-md resize-none"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
        />
        <div className="flex items-center justify-end gap-2 mt-1">
          <button
            onClick={toggleCreate}
            className="bg-gray-400 text-white font-semibold px-4 py-1 rounded-lg text-sm hover:bg-gray-300 hover:scale-[1.02]"
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-main-blue text-white font-semibold px-4 py-1 rounded-lg text-sm hover:bg-main-blue-dark hover:scale-[1.02]"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
