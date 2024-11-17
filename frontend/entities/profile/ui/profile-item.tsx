import Image from "next/image";
import flashLogo from "@/shared/images/flashLogo.webp";
import userImage from "@/shared/images/userImage.png";
import sunImage from "@/shared/images/sunImage.jpeg";
import sproutImage from "@/shared/images/sproutImage.jpeg";
import fireImage from "@/shared/images/fireImage.jpeg";
import rainbowImage from "@/shared/images/rainbowImage.jpeg";
import { IProfile } from "@/entities/profile";

// import { useRouter } from "next/navigation";
// import { useAuth } from "@/config/AuthProvider";

const avatars = [
  { name: "flash", image: flashLogo },
  { name: "user", image: userImage },
  { name: "sun", image: sunImage },
  { name: "sprout", image: sproutImage },
  { name: "fire", image: fireImage },
  { name: "rainbow", image: rainbowImage },
];

export default function ProfileItem({
  userProfile,
}: {
  userProfile: IProfile;
}) {
  //   const router = useRouter();
  //   const { profile } = useAuth();

  const postOwnerAvatar = avatars.find(
    (avatar) => avatar.name === userProfile.avatar_name
  );

  return (
    <div className="flex justify-start items-center bg-white py-3 px-5 rounded-lg shadow-md">
      <div className="flex items-center space-x-3">
        <Image
          src={postOwnerAvatar ? postOwnerAvatar.image : userImage}
          width={100}
          height={100}
          alt={`${userProfile.user_name} avatar`}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h1 className="text-base text-black font-semibold">
            {userProfile.user_name}
          </h1>
          <p className="text-sm text-gray-500">{userProfile.bio}</p>
        </div>
      </div>
    </div>
  );
}
