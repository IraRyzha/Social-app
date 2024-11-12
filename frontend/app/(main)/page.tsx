"use client";
import { useAuth } from "@/config/AuthProvider";
import { getPosts, getUserFriendsPosts } from "@/entities/post/index";
import { IPost } from "@/entities/post/model/types";
import { Post } from "@/entities/post/index";
import CreatePostForm from "@/features/create-post/ui/create-post-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/shared/ui/button/button";

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"all" | "friends">("all");

  const { profile, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleCreating = () => {
    if (!isAuthenticated) {
      router.push("auth");
      return;
    }
    setIsCreating((prev) => !prev);
  };

  const fetchAllPosts = async () => {
    const response: IPost[] = await getPosts();
    console.log(response);
    setPosts(response);
  };

  const fetchFriendsPosts = async () => {
    if (!profile) {
      router.push("auth");
      return;
    }
    const response: IPost[] = await getUserFriendsPosts(profile.user_id);
    console.log(response);
    setPosts(response);
  };

  useEffect(() => {
    if (activeTab === "all") {
      fetchAllPosts();
    } else {
      fetchFriendsPosts();
    }
  }, [activeTab]);

  return (
    <div className="w-full h-screen  flex flex-col gap-5 max-h-screen overflow-y-auto">
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
            className={`flex-1 py-1 text-center text-sm rounded-lg ${
              activeTab === "all"
                ? "bg-main-blue-light text-white"
                : "bg-gray-200"
            }`}
          >
            all
          </button>
          <button
            onClick={() => setActiveTab("friends")}
            className={`flex-1 py-1 text-center text-sm rounded-lg ${
              activeTab === "friends"
                ? "bg-main-blue-light text-white"
                : "bg-gray-200"
            }`}
          >
            friends
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5 max-h-screen overflow-y-auto">
        {posts.map((post) => {
          return (
            <Post
              key={post.id}
              id={post.id}
              user={post.user}
              text={post.text}
              date={post.date}
              likes={post.likes}
              categories={post.categories}
            />
          );
        })}
      </div>
    </div>
  );
}
