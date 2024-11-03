"use client";
import { getPosts } from "@/entities/post/api/postApi";
import { IPost } from "@/entities/post/model/types";
import { Post } from "@/entities/post/ui/post";
import CreatePostForm from "@/features/create-post/ui/create-post-form";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);

  const fetchPots = async () => {
    const response: IPost[] = await getPosts();
    // const data: IPost[] = await response.json();
    setPosts(response);
  };

  useEffect(() => {
    fetchPots();
  }, [posts]);

  return (
    <div className="w-full h-screen  flex flex-col gap-5 max-h-screen overflow-y-auto">
      <CreatePostForm />
      <div className="flex flex-col gap-3 max-h-screen overflow-y-auto">
        {posts.map((post) => {
          return (
            <Post
              key={post.user.name}
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
