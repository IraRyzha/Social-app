"use client";
import { getProfile, IProfile, Profile } from "@/entities/profile";
import { getPostsByUserId, IPost, Post } from "@/entities/post";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [posts, setPosts] = useState<IPost[] | null>(null);

  const params = useParams();
  const router = useRouter();

  console.log(params.id);

  const fetchProfile = async () => {
    const response: IProfile = await getProfile(params.id as string);
    console.log(response);
    setProfile(response);
  };

  const fetchUserPosts = async () => {
    const response: IPost[] = await getPostsByUserId(params.id as string);
    console.log(response);
    setPosts(response);
  };

  useEffect(() => {
    fetchProfile();
    fetchUserPosts();
  }, []);

  if (!profile) {
    return <h3>Not found</h3>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-3">
      {/* Кнопка назад */}
      <button
        onClick={() => router.back()}
        className="self-start mb-3 text-main-blue-light hover:underline flex items-center text-sm font-semibold"
      >
        ← Back
      </button>

      <Profile type="detailed" profile={profile} />

      {/* Пости */}
      <div className="max-w-3xl w-full mt-10 flex flex-col gap-5">
        {posts ? (
          posts.map((post) => (
            <Post
              key={post.id}
              user={post.user}
              text={post.text}
              date={post.date}
              flashs={post.flashs}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
