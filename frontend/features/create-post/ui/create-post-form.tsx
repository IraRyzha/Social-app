"use client";
import { useAuth } from "@/config/AuthProvider";
import { useState } from "react";
import { createPost } from "../model/create-post";
import Button from "@/shared/ui/button/button";
import { categories } from "@/shared/constants/categories";
import { TCategory } from "@/shared/types/types";

interface Props {
  toggleCreate?: () => void;
}

export default function CreatePostForm({ toggleCreate }: Props) {
  const [text, setText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<TCategory[]>([]);
  const { isAuthenticated, profile } = useAuth();

  const handleCategoryClick = (category: TCategory) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      throw new Error("cannot create post without auth");
    }
    if (profile) {
      createPost({
        user_id: profile.user_id,
        content: text,
        categories: selectedCategories,
      });
    }
    setText("");
    setSelectedCategories([]); // очищення вибраних категорій
    if (toggleCreate) {
      toggleCreate();
    }
  };

  return (
    <div className="bg-white px-4 md:px-8 pt-5 pb-3 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border border-gray-300 text-sm rounded-lg resize-none"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
        />

        {/* Вибір категорій через клікабельні "круги" */}
        <div className="flex flex-wrap gap-2 mt-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryClick(category)}
              className={`px-2 md:px-4 py-1 text-sm rounded-full transition-colors duration-200 ${
                selectedCategories.includes(category)
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 mt-3">
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
