import Image from "next/image";
import flashLogo from "../../images/flashLogo.webp";

export default function Header() {
  return (
    <header className="w-full px-32 py-3 flex items-center justify-center mb-5 border border-stone-950 bg-white">
      <div className="flex justify-center items-center gap-3">
        <Image
          src={flashLogo}
          alt="logo"
          width={50}
          height={50}
          className="rounded-xl"
        />
        <h1 className="text-3xl font-bold">flash</h1>
      </div>
    </header>
  );
}
