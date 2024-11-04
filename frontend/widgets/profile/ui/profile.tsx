"use client";
import Image from "next/image";
import userImage from "@/shared/images/userImage.png";
import flashLogo from "@/shared/images/flashLogo.webp";
import { FlashCoin } from "@/shared/ui/icons";
import { useAuth } from "@/config/AuthProvider";

export default function Profile() {
  const { isAuthenticated, profile } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="w-full h-auto px-11 py-8 flex flex-col items-center justify-center gap-5 rounded-xl bg-white shadow">
        <Image
          src={userImage}
          alt="Profile Picture"
          width={96}
          height={96}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-auto px-11 py-8 flex flex-col items-start justify-center gap-5 rounded-xl bg-white shadow">
      <div className="w-full h-auto flex flex-col items-center gap-2">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <Image
            src={flashLogo}
            alt="Profile Picture"
            width={96}
            height={96}
            className="object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold">{profile?.user_name}</h2>
          <p className="text-sm text-green-500">{profile?.status}</p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-2">
        <div className="w-full flex justify-center items-center gap-2">
          <StatisticItem
            textSize={"text-sm"}
            amount={profile?.followers_count ?? 0}
            ofEntety={"followwers"}
          />
          <StatisticItem
            textSize={"text-sm"}
            amount={profile?.following_count ?? 0}
            ofEntety={"following"}
          />
        </div>
        <StatisticItem
          textSize={"text-base"}
          amount={profile?.posts_count ?? 0}
          ofEntety={"posts"}
        />
        <StatisticItem
          textSize={"text-lg"}
          amount={profile?.points ?? 0}
          ofEntety={<FlashCoin />}
        />
      </div>
    </div>
  );
}

const StatisticItem = ({
  textSize,
  amount,
  ofEntety,
}: {
  textSize: string;
  amount: number;
  ofEntety: string | JSX.Element;
}) => {
  return (
    <div
      className={`${textSize} hover:scale-[1.02] cursor-pointer flex justify-center items-center gap-1`}
    >
      <span className="text-gray-900 font-semibold">{amount}</span>
      <span className="text-gray-500 font-medium"> {ofEntety}</span>
    </div>
  );
};
