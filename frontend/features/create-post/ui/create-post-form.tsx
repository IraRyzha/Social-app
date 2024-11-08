"use client";
import { useAuth } from "@/config/AuthProvider";
import { useState } from "react";
import { createPost } from "../model/create-post";
import Button from "@/shared/ui/button/button";

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
          <Button size="small" color="gray" text="small" onClick={toggleCreate}>
            Close
          </Button>
          <Button buttonType="submit" size="small" color="blue" text="small">
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}
