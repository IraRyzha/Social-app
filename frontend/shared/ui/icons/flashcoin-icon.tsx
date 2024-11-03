import Image from "next/image";
import flashLogo from "../../images/flashLogo.webp";

export const FlashCoin = ({ className }: { className?: string }) => {
  return (
    <Image
      src={flashLogo}
      alt="flashcoin"
      width={24}
      height={24}
      className={`${className} rounded-full`}
    />
  );
};
