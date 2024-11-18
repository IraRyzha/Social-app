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
import Button from "@/shared/ui/button/button";
import { followUser } from "../api/follow-user";
import { useAuth } from "@/config/AuthProvider";
import { useEffect, useState } from "react";
import { unfollowUser } from "../api/unfollow-user";
import { checkFollowing } from "../api/check-following";
import { createChat } from "@/entities/chat/api/create-chat";
import { useRouter } from "next/navigation";

const avatars = [
  { name: "flash", image: flashLogo },
  { name: "user", image: userImage },
  { name: "sun", image: sunImage },
  { name: "sprout", image: sproutImage },
  { name: "fire", image: fireImage },
  { name: "rainbow", image: rainbowImage },
];

export default function DetailedProfile({
  userProfile,
  isOwn,
}: {
  userProfile: IProfile;
  isOwn: boolean;
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const { profile } = useAuth();
  const router = useRouter();

  const profileAvatar = avatars.find(
    (avatar) => avatar.name === userProfile.avatar_name
  );

  useEffect(() => {
    const fetchFollowStatus = async () => {
      if (profile) {
        const followingStatus = await checkFollowing(
          profile.user_id,
          userProfile.user_id
        );
        setIsFollowing(followingStatus);
      }
    };
    fetchFollowStatus();
  }, [profile, userProfile.user_id]);

  const handleFollow = async () => {
    if (profile) {
      await followUser(profile.user_id, userProfile.user_id);
      setIsFollowing(true);
    } else {
      window.alert("need login for follow users");
    }
  };

  const handleUnfollow = async () => {
    if (profile) {
      await unfollowUser(profile.user_id, userProfile.user_id);
      setIsFollowing(false);
    }
  };

  const handleMessage = async () => {
    if (profile) {
      const createdChatId = await createChat(false, [
        profile.user_id,
        userProfile.user_id,
      ]);
      router.replace(`/messages/${createdChatId}`);
    }
  };

  return (
    <div className="w-full md:max-w-lg bg-white shadow-md rounded-xl p-6 text-center">
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
      <h2 className="text-2xl font-semibold mb-1">{userProfile.user_name}</h2>
      <p
        className={`text-sm ${
          userProfile.status === "online" ? "text-green-500" : "text-gray-500"
        }`}
      >
        {userProfile.status.charAt(0) + userProfile.status.slice(1)}
      </p>

      {/* Біографія */}
      <p className="text-sm text-gray-600 mt-2">{userProfile.bio}</p>

      {/* Додаткова інформація */}
      <div className="flex justify-around items-center mt-4">
        <div>
          <p className="text-lg font-semibold">{userProfile.followers_count}</p>
          <p className="text-sm text-gray-500">Followers</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{userProfile.following_count}</p>
          <p className="text-sm text-gray-500">Following</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{userProfile.posts_count}</p>
          <p className="text-sm text-gray-500">Posts</p>
        </div>
      </div>

      {/* Очки */}
      <div className="mt-6">
        <p className="text-sm">
          <span className="font-semibold">Points:</span> {userProfile.points}
        </p>
      </div>

      {!isOwn && (
        <div className="mt-6 flex gap-2 justify-center">
          {isFollowing ? (
            <Button
              size="medium"
              color="gray"
              text="small"
              onClick={handleUnfollow}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              size="medium"
              color="blue"
              text="small"
              onClick={handleFollow}
            >
              Follow
            </Button>
          )}
          <Button
            size="medium"
            color="gray"
            text="small"
            onClick={handleMessage}
          >
            Message
          </Button>
        </div>
      )}
    </div>
  );
}
