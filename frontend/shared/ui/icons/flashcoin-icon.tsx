import Image from "next/image";
import flashLogo from "../../images/flashLogo.webp";

export const FlashCoin = () => {
  return (
    <Image
      src={flashLogo}
      alt="flashcoin"
      width={24}
      height={24}
      className="rounded-full"
    />
  );
};
