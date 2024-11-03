import { useState } from "react";

export default function CreatePostForm() {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Логіка для обробки нового поста, наприклад, відправка даних на сервер
    console.log("New post:", text);
    setText(""); // Очищення поля після відправки
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
        <div className="flex items-center justify-end mt-1">
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
