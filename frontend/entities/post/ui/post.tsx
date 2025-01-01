"use client";
import Image from "next/image";
import flashLogo from "@/shared/images/flashLogo.webp";
import userImage from "@/shared/images/userImage.png";
import sunImage from "@/shared/images/sunImage.jpeg";
import sproutImage from "@/shared/images/sproutImage.jpeg";
import fireImage from "@/shared/images/fireImage.jpeg";
import rainbowImage from "@/shared/images/rainbowImage.jpeg";
import { useRouter } from "next/navigation";
import { TCategory } from "@/shared/types/types";
import { HeartIcon } from "@/shared/ui/icons/heart-icon";
import { useEffect, useState } from "react";
import { checkLike } from "../api/check-like";
import { toggleLike } from "../api/toggle-like";
import { HeartFilledIcon } from "@/shared/ui/icons/heart-filled-icon";
import { useAppSelector } from "@/config/hooks";
import authSlice from "@/features/auth/model/authSlice";
import Link from "next/link";

const avatars = [
  { name: "flash", image: flashLogo },
  { name: "user", image: userImage },
  { name: "sun", image: sunImage },
  { name: "sprout", image: sproutImage },
  { name: "fire", image: fireImage },
  { name: "rainbow", image: rainbowImage },
];

interface Props {
  id: string;
  user: {
    id: string;
    name: string;
    photo: string;
  };
  text: string;
  date: string;
  likes: number;
  categories: TCategory[];
}
export const Post = ({ id, user, text, date, likes, categories }: Props) => {
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [likeCount, setLikeCount] = useState<number>(
    typeof likes === "string" ? Number(likes) : likes
  );
  const router = useRouter();
  const profile = useAppSelector(authSlice.selectors.profile);

  const formatTimeAgo = (date: string | number) => {
    const dateInMillis = new Date(date).getTime();

    const seconds = Math.floor((Date.now() - dateInMillis) / 1000);
    const minutes = Math.floor(seconds / 60);

    if (minutes < 1) return `${seconds} seconds ago`;
    else if (minutes < 60) return `${minutes} minutes ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;

    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  const postOwnerAvatar = avatars.find((avatar) => avatar.name === user.photo);

  const handlePostOwnerProfile = () => {
    if (!profile) {
      router.push("auth");
      return;
    }
    // router.push(`/users/${user.id}`);
    const path = `/users/${user.id}`;
    console.log("Navigating to:", path); // Перевіряємо, який шлях генерується
    router.push(path);
  };

  const handleCheckLike = async () => {
    if (profile) {
      const isLike = await checkLike(profile.user_id, id);
      setIsLiked(isLike);
    }
  };

  useEffect(() => {
    handleCheckLike();
  }, []);

  const handleLike = async () => {
    if (!profile) {
      router.push("/auth");
      return;
    }

    const { success, operation } = await toggleLike(profile.user_id, id);

    if (success) {
      if (operation == "add") {
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      }
      if (operation == "delete") {
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
      }
    }
  };

  return (
    <div className="flex flex-col items-start bg-white py-3 px-5 rounded-lg shadow-md">
      <div className="w-full flex flex-1 justify-between">
        <Link
          className="flex flex-1 items-center cursor-pointer"
          href={`/users/${user.id}`}
          // onClick={handlePostOwnerProfile}
        >
          <Image
            src={postOwnerAvatar ? postOwnerAvatar.image : userImage}
            alt={`${user.name}'s profile`}
            className="w-10 h-10 rounded-full mr-3"
            width={35}
            height={35}
          />
          <div className="flex flex-col items-start justify-between">
            <h3 className="font-semibold text-gray-900">{user.name}</h3>
            <span className="text-sm text-gray-500">{formatTimeAgo(date)}</span>
          </div>
        </Link>
        <div className="flex justify-center items-center gap-[3px]">
          {isLiked ? (
            <HeartFilledIcon onClick={() => handleLike()} />
          ) : (
            <HeartIcon onClick={() => handleLike()} />
          )}
          <span className="text-black text-xs font-semibold">{likeCount}</span>
        </div>
      </div>
      <p className="text-gray-700 text-sm mt-3">{text}</p>
      {categories[0] != null && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {categories.map((category) => (
            <span
              key={category}
              className="text-xs text-main-blue bg-main-blue-light bg-opacity-10 rounded-full px-2 py-1"
            >
              #{category}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
