"use client";
import { useAuth } from "@/config/AuthProvider";
import { getPosts } from "@/entities/post/index";
import { IPost } from "@/entities/post/model/types";
import { Post } from "@/entities/post/index";
import CreatePostForm from "@/features/create-post/ui/create-post-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleCreating = () => {
    if (!isAuthenticated) {
      router.push("auth");
    }
    setIsCreating((prev) => !prev);
  };

  const fetchPots = async () => {
    const response: IPost[] = await getPosts();
    console.log(response);
    setPosts(response);
  };

  useEffect(() => {
    fetchPots();
  }, [isCreating]);

  return (
    <div className="w-full h-screen  flex flex-col gap-5 max-h-screen overflow-y-auto">
      {!isCreating && (
        <div className="flex items-center justify-center">
          <button
            onClick={handleCreating}
            className="bg-main-blue text-white font-semibold px-4 py-1 rounded-lg text-sm hover:bg-main-blue-dark hover:scale-[1.02]"
          >
            Create new post
          </button>
        </div>
      )}
      {isCreating && <CreatePostForm toggleCreate={() => handleCreating()} />}
      <div className="flex flex-col gap-5 max-h-screen overflow-y-auto">
        {posts.map((post) => {
          return (
            <Post
              key={post.id}
              user={post.user}
              text={post.text}
              date={post.date}
              flashs={post.flashs}
            />
          );
        })}
      </div>
    </div>
  );
}
