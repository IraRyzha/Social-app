"use client";
import { getProfile, IProfile, Profile } from "@/entities/profile";
import { getPostsByUserId, IPost, Post } from "@/entities/post";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/config/hooks";
import authSlice from "@/features/auth/model/authSlice";

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState<IProfile | null>(null);
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const profile = useAppSelector(authSlice.selectors.profile);

  const params = useParams();
  const router = useRouter();

  const fetchProfile = async () => {
    const response: IProfile = await getProfile(params.id as string);
    setUserProfile(response);
  };

  const fetchUserPosts = async () => {
    const response: IPost[] = await getPostsByUserId(params.id as string);
    setPosts(response);
  };

  useEffect(() => {
    fetchProfile();
    fetchUserPosts();
  }, []);

  if (!profile) {
    router.push("auth");
    return;
  }

  if (!userProfile) {
    return <h3>Not found</h3>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <button
        onClick={() => router.back()}
        className="self-start mb-3 text-main-blue-light hover:underline flex items-center text-sm font-semibold"
      >
        ← Back
      </button>

      <Profile
        type="detailed"
        profile={userProfile}
        isOwn={profile.id === userProfile.id}
      />

      <div className="max-w-3xl w-full mt-10 flex flex-col gap-5">
        {posts ? (
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
        ) : (
          <p className="text-center text-gray-500">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
