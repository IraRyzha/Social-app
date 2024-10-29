import Image from "next/image";
import flashLogo from "@/shared/images/flashLogo.webp";

export default function Navigation() {
  return (
    <div className="w-full px-32 py-5 flex items-center justify-between border-2 border-stone-950">
      <Image
        src={flashLogo}
        alt="logo"
        width={50}
        height={50}
        className="rounded-xl"
      />

      <input type="text" />
      <h3>account</h3>
    </div>
  );
}
