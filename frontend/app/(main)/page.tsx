"use client";
import { getPosts, getUserFriendsPosts } from "@/entities/post/index";
import { IPost } from "@/entities/post/model/types";
import { Post } from "@/entities/post/index";
import CreatePostForm from "@/features/create-post/ui/create-post-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Button from "@/shared/ui/button/button";
import Pagination from "@/features/pagination/pagination";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/config/hooks";
import authSlice, { fetchUser } from "@/features/auth/model/authSlice";

export default function Home() {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"all" | "friends">("all");
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAuthenticated = useAppSelector(authSlice.selectors.isAuthenticated);
  const profile = useAppSelector(authSlice.selectors.profile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("useEffect dispatch(fetchUser());");
    dispatch(fetchUser());
  }, [dispatch]);

  console.log("isAuthenticated from selectors: " + isAuthenticated);
  console.log("profile from selectors");
  console.log(profile);

  const pageSize = 8;
  const currentPage = Math.max(1, Number(searchParams.get("page") || "1"));

  const {
    data: { posts = [], total = 0 } = {},
    isLoading,
    isError,
  } = useQuery<{ posts: IPost[]; total: number }>({
    queryKey: ["posts"],
    queryFn: async () => {
      console.log("Fetching data from API...");
      if (activeTab === "all") {
        return await getPosts({ page: currentPage, pageSize: pageSize });
      }
      if (activeTab === "friends" && profile?.user_id) {
        return await getUserFriendsPosts(profile.user_id, {
          page: currentPage,
          pageSize,
        });
      }
      return Promise.reject(
        new Error("Profile is required for friends' posts")
      );
    },
    enabled:
      activeTab === "all" || (activeTab === "friends" && !!profile?.user_id),
  });

  const checkIsAuth = () => {
    if (!isAuthenticated) {
      return false;
    }
    return true;
  };

  const handleCreating = () => {
    if (!checkIsAuth()) {
      router.push("auth");
    } else {
      setIsCreating((prev) => !prev);
    }
  };

  const handlePageChange = (page: number) => {
    router.push(`/?page=${page}`);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
              onClick={() => {
                if (!checkIsAuth()) {
                  router.push("auth");
                } else {
                  setActiveTab("friends");
                }
              }}
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
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error loading posts</p>}
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              user={post.user}
              text={post.text}
              date={post.date}
              likes={post.likes}
              categories={post.categories}
            />
          ))}
        </div>

        {total > pageSize && (
          <Pagination
            total={total}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </Suspense>
  );
}
