"use client";
import Image from "next/image";
// import { FlashCoin } from "@/shared/ui/icons";
import flashLogo from "@/shared/images/flashLogo.webp";
import userImage from "@/shared/images/userImage.png";
import sunImage from "@/shared/images/sunImage.jpeg";
import sproutImage from "@/shared/images/sproutImage.jpeg";
import fireImage from "@/shared/images/fireImage.jpeg";
import rainbowImage from "@/shared/images/rainbowImage.jpeg";
import { IProfile } from "@/entities/profile";

const avatars = [
  { name: "flash", image: flashLogo },
  { name: "user", image: userImage },
  { name: "sun", image: sunImage },
  { name: "sprout", image: sproutImage },
  { name: "fire", image: fireImage },
  { name: "rainbow", image: rainbowImage },
];

export default function DetailedProfile({ profile }: { profile: IProfile }) {
  const profileAvatar = avatars.find(
    (avatar) => avatar.name === profile.avatar_name
  );

  return (
    <div className="max-w-lg w-full bg-white shadow-md rounded-xl p-6 text-center">
      {/* Аватар */}
      <div className="w-35 h-35 mx-auto flex justify-center items-center rounded-full mb-4">
        <Image
          src={profileAvatar ? profileAvatar.image : userImage}
          alt="Profile Picture"
          width={110}
          height={110}
          className="object-cover rounded-full"
        />
      </div>

      {/* Ім'я та статус */}
      <h2 className="text-2xl font-semibold mb-1">{profile.user_name}</h2>
      <p
        className={`text-sm ${
          profile.status === "online" ? "text-green-500" : "text-gray-500"
        }`}
      >
        {profile.status.charAt(0) + profile.status.slice(1)}
      </p>

      {/* Біографія */}
      <p className="text-sm text-gray-600 mt-2">{profile.bio}</p>

      {/* Додаткова інформація */}
      <div className="flex justify-around items-center mt-4">
        <div>
          <p className="text-lg font-semibold">{profile.followers_count}</p>
          <p className="text-sm text-gray-500">Followers</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{profile.following_count}</p>
          <p className="text-sm text-gray-500">Following</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{profile.posts_count}</p>
          <p className="text-sm text-gray-500">Posts</p>
        </div>
      </div>

      {/* Очки і дати */}
      <div className="mt-6">
        <p className="text-sm">
          <span className="font-semibold">Points:</span> {profile.points}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Created at:</span>{" "}
          {new Date(profile.created_at).toLocaleDateString()}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Last updated:</span>{" "}
          {new Date(profile.updated_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
