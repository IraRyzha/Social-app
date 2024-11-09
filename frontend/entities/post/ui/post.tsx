import Image from "next/image";
import { FlashCoin } from "@/shared/ui/icons";
import flashLogo from "@/shared/images/flashLogo.webp";
import userImage from "@/shared/images/userImage.png";
import sunImage from "@/shared/images/sunImage.jpeg";
import sproutImage from "@/shared/images/sproutImage.jpeg";
import fireImage from "@/shared/images/fireImage.jpeg";
import rainbowImage from "@/shared/images/rainbowImage.jpeg";
import { useRouter } from "next/navigation";
import { useAuth } from "@/config/AuthProvider";
import { TCategory } from "@/shared/types/types";

const avatars = [
  { name: "flash", image: flashLogo },
  { name: "user", image: userImage },
  { name: "sun", image: sunImage },
  { name: "sprout", image: sproutImage },
  { name: "fire", image: fireImage },
  { name: "rainbow", image: rainbowImage },
];

interface Props {
  user: {
    id: string;
    name: string;
    photo: string;
  };
  text: string;
  date: string;
  flashs: number;
  categories: TCategory[] | null;
}
export const Post = ({ user, text, date, flashs, categories }: Props) => {
  const router = useRouter();
  const { profile } = useAuth();

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
    router.push(`users/${user.id}`);
  };

  return (
    <div className="flex flex-col items-start bg-white py-3 px-5 rounded-lg shadow-md">
      <div className="w-full flex flex-1 justify-between">
        <div
          className="flex flex-1 items-center cursor-pointer"
          onClick={handlePostOwnerProfile}
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
        </div>
        <div className="flex justify-center items-center gap-1">
          <FlashCoin className="hover:scale-[1.1] w-4" />
          <span className="text-black text-xs font-semibold">{flashs}</span>
        </div>
      </div>
      <p className="text-gray-700 text-sm mt-3">{text}</p>

      {/* Відображення категорій як хештеги */}
      {categories && categories.length > 0 && (
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
