"use client";
import { useAuth } from "@/config/AuthProvider";
import { getPosts, getUserFriendsPosts } from "@/entities/post/index";
import { IPost } from "@/entities/post/model/types";
import { Post } from "@/entities/post/index";
import CreatePostForm from "@/features/create-post/ui/create-post-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Button from "@/shared/ui/button/button"; // Додайте компонент пагінації
import Pagination from "@/features/pagination/pagination";

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"all" | "friends">("all");
  const [total, setTotal] = useState(0); // Загальна кількість постів
  const router = useRouter();
  const searchParams = useSearchParams(); // Для роботи з URL-параметрами
  const { profile, isAuthenticated } = useAuth();

  const pageSize = 8;
  const currentPage = Math.max(1, Number(searchParams.get("page") || "1")); // Отримуємо номер сторінки з URL

  const handleCreating = () => {
    if (!isAuthenticated) {
      router.push("auth");
      return;
    }
    setIsCreating((prev) => !prev);
  };

  const fetchAllPosts = async (page: number) => {
    try {
      const response = await getPosts({ page, pageSize });
      setPosts(response.posts);
      setTotal(response.total);
    } catch (error) {
      console.error("Error fetching all posts:", error);
    }
  };

  const fetchFriendsPosts = useCallback(
    async (page: number) => {
      try {
        if (!profile) {
          router.push("auth");
          return;
        }
        const response = await getUserFriendsPosts(profile.user_id, {
          page,
          pageSize,
        });
        setPosts(response.posts);
        setTotal(response.total);
      } catch (error) {
        console.error("Error fetching friends' posts:", error);
      }
    },
    [profile, router, pageSize] // Додаємо залежності
  );

  useEffect(() => {
    if (activeTab === "all") {
      fetchAllPosts(currentPage);
    } else {
      fetchFriendsPosts(currentPage);
    }
  }, [activeTab, currentPage, fetchFriendsPosts]); // Залежить від вкладки та сторінки

  const handlePageChange = (page: number) => {
    router.push(`/?page=${page}`); // Додаємо номер сторінки до URL
  };

  return (
    <div className="w-full h-auto flex flex-col gap-5">
      {!isCreating && (
        <div className="flex items-center justify-center">
          <Button
            size="small"
            color="white"
            text="small"
            onClick={handleCreating}
          >
            Create new post
          </Button>
        </div>
      )}
      {isCreating && <CreatePostForm toggleCreate={() => handleCreating()} />}

      <div className="w-full flex justify-center mb-2">
        <div className="flex w-full bg-gray-200 overflow-hidden">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 py-1 text-center text-xs md:text-sm rounded-lg ${
              activeTab === "all"
                ? "bg-main-blue-light text-white"
                : "bg-gray-200"
            }`}
          >
            all
          </button>
          <button
            onClick={() => setActiveTab("friends")}
            className={`flex-1 py-1 text-center text-xs md:text-sm rounded-lg ${
              activeTab === "friends"
                ? "bg-main-blue-light text-white"
                : "bg-gray-200"
            }`}
          >
            friends
          </button>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col gap-5">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">have not any post</p>
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              user={post.user}
              text={post.text}
              date={post.date}
              likes={post.likes}
              categories={post.categories}
            />
          ))
        )}
      </div>

      {/* Компонент пагінації */}
      {total > pageSize && (
        <Pagination
          total={total}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
